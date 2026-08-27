/**
 * Tam-oyun simülasyonu: gerçek gameEngine.ts orkestrasyon fonksiyonlarını (senaryoUret,
 * secimUygula, yatirimYap, magazadanSatinAl, konutDegistir, yasamSecimiDegistir,
 * mulkSatinAl, sosyallesmeYerineGit, zarAt, envanterEsyasiKullan) doğrudan çağırarak,
 * gerçek bir oyuncu gibi mağaza/yatırım/ev/yemek/sosyalleşme kararları veren bir "bot"
 * ile her çağ × meslek kombinasyonu için yüzlerce tam ömür oynar.
 *
 * HTTP/Express katmanı (ve onun rate-limiter'ı) tamamen atlanır — fonksiyonlar
 * process içinde doğrudan çağrılır, SQLite'a (ayrı bir simulation.db dosyasına,
 * gerçek dev.db'ye DOKUNULMAZ) yazılır.
 *
 * Kullanım: DATABASE_URL="file:./simulation.db" npx tsx scripts/simulateFullPlaythroughs.ts
 * Çıktı: scripts/simulateFullPlaythroughs.sonuc.json (ham kayıtlar) + konsola özet.
 */
import fs from "fs";
import path from "path";
import { prisma } from "../src/db/prismaClient";
import {
  yeniOyun,
  mesleğiAta,
  senaryoUret,
  secimUygula,
  stateGetir,
  finansGetir,
  konutDegistir,
  yasamSecimiDegistir,
  yatirimConfigGetir,
  yatirimYap,
  mulkConfigGetir,
  mulkSatinAl,
  sosyallesmeYerleriGetir,
  sosyallesmeYerineGit,
  magazaConfigGetir,
  magazadanSatinAl,
  envanterEsyasiKullan,
  zarKademeleriGetir,
  zarAt,
} from "../src/game/gameEngine";
import { MESLEKLER, BOLGELER_BY_CAG, hesaplaSkor, gayrimenkulDegeriHesapla } from "../src/game/stateManager";
import { KONUTLAR, KonutTanimi } from "../src/data/konutlar";
import { YASAM_SECENEKLERI, YasamSecenegiTanimi } from "../src/data/yasamSecenekleri";
import { YERLESIMLER } from "../src/data/yerlesimler";
import { CharacterState, Cag } from "../src/types";

const N_PER_GROUP = Number(process.env.SIM_N ?? 100);
const MAX_TUR_GUARD = 400;

function rastgele<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * tabanIndex: aramanın başlayacağı (ve asla altına inilmeyecek) kademe — gerçek bir oyuncu,
 * oyunun kendi varsayılanından (ör. "ucuza_ye") DAHA KÖTÜ bir kademeye (ör. "copten_topla")
 * bilerek geçmez; sadece borçluyken bilinçli olarak oraya çekilir (ayrı dal, aşağıda).
 */
function enIyiKademe<T>(
  kademeler: T[],
  maasYillik: number,
  oran: number,
  maliyetGetir: (k: T) => number,
  tabanIndex = 0
): T {
  let secilen = kademeler[tabanIndex];
  for (let i = tabanIndex; i < kademeler.length; i++) {
    if (maliyetGetir(kademeler[i]) <= maasYillik * oran) secilen = kademeler[i];
  }
  return secilen;
}

interface Secenek {
  metin: string;
  basari_sansi: number;
  kilitli: boolean;
}

/** Kilitli olmayan seçenekler arasında başarı şansına ağırlıklı (ama gerçek bir oyuncu gibi kusurlu) rastgele seçim. */
function secenekSec(secenekler: Secenek[]): number {
  const uygunlar = secenekler.map((s, i) => ({ s, i })).filter((x) => !x.s.kilitli);
  const havuz = uygunlar.length > 0 ? uygunlar : secenekler.map((s, i) => ({ s, i }));
  const agirliklar = havuz.map((x) => Math.max(5, x.s.basari_sansi) * (0.7 + Math.random() * 0.6));
  const toplam = agirliklar.reduce((a, b) => a + b, 0);
  let hedef = Math.random() * toplam;
  for (let k = 0; k < havuz.length; k++) {
    hedef -= agirliklar[k];
    if (hedef <= 0) return havuz[k].i;
  }
  return havuz[havuz.length - 1].i;
}

/** onTepki ara-ekranında geri çekil(0)/ısrar et(1) kararı — fevrilik eksenine göre. */
function tepkiSec(state: CharacterState): number {
  const fevrilik = state.kisilik_eksenleri?.fevrilik ?? 50;
  const israrOlasiligi = 0.15 + (fevrilik / 100) * 0.55;
  return Math.random() < israrOlasiligi ? 1 : 0;
}

interface Sayaclar {
  yatirimSayisi: number;
  mulkSayisi: number;
  magazaSifaSayisi: number;
  magazaLuksSayisi: number;
  envanterKullanSayisi: number;
  zarSayisi: number;
  zarKazanma: number;
  sosyallesmeSayisi: number;
  /** Kendi işine (yatirimYap) ömür boyu harcanan toplam nakit. */
  kendiIsHarcanan: number;
  /** Piyasa mülklerine (mulkSatinAl) ömür boyu harcanan toplam nakit. */
  mulkHarcanan: number;
}

/** Gerçek bir oyuncu gibi: her turdan önce ev/yemek/yatırım/mülk/mağaza/sosyalleşme/kumar kararlarını dener. */
async function yanEylemler(id: string, state: CharacterState, sayaclar: Sayaclar): Promise<void> {
  let finans: { maasYillik: number } | null = null;
  try {
    finans = await finansGetir(id);
  } catch {
    /* yok say */
  }
  const maasYillik = finans?.maasYillik ?? state.maas_yillik ?? 10;

  // 1) Konut & yaşam tarzı — servete göre her turda yeniden değerlendirilir.
  try {
    if (state.para < 0) {
      if (state.konut_id !== "basit_barinak") await konutDegistir(id, "basit_barinak");
      if (state.yasam_secimi_id !== "copten_topla") await yasamSecimiDegistir(id, "ucuza_ye");
    } else {
      const hedefKonut = enIyiKademe<KonutTanimi>(KONUTLAR, maasYillik, 0.18, (k) => k.kiraYillik, 0);
      // tabanIndex:1 -> "copten_topla" (index 0) hiç düşünülmez; oyunun varsayılanı olan
      // "ucuza_ye" (index 1) her zaman taban kabul edilir, bilerek daha kötüsüne inilmez.
      const hedefYasam = enIyiKademe<YasamSecenegiTanimi>(YASAM_SECENEKLERI, maasYillik, 0.14, (y) => y.maliyetYillik, 1);
      if (hedefKonut.id !== state.konut_id) await konutDegistir(id, hedefKonut.id);
      if (hedefYasam.id !== state.yasam_secimi_id) await yasamSecimiDegistir(id, hedefYasam.id);
    }
  } catch {
    /* yok say */
  }

  // 2) Kendi işine yatırım.
  try {
    if (Math.random() < 0.3) {
      const cfg = await yatirimConfigGetir(id);
      if (state.para >= cfg.kendiIsiMaliyeti * 1.8) {
        await yatirimYap(id);
        sayaclar.yatirimSayisi++;
        sayaclar.kendiIsHarcanan += cfg.kendiIsiMaliyeti;
      }
    }
  } catch {
    /* yok say (ordu/teçhizat tavanı vb.) */
  }

  // 3) Piyasa mülkü.
  try {
    if (Math.random() < 0.25) {
      const mulkler = await mulkConfigGetir(id);
      const adaylar = mulkler.filter((m) => !m.sahipMi && m.maliyet <= state.para * 0.6 && m.tahminiYillikGetiriYuzdesi > -5);
      if (adaylar.length > 0) {
        const secilen = rastgele(adaylar);
        await mulkSatinAl(id, secilen.tur);
        sayaclar.mulkSayisi++;
        sayaclar.mulkHarcanan += secilen.maliyet;
      }
    }
  } catch {
    /* yok say */
  }

  // 4) Mağaza — şifa (sağlık düşükken).
  try {
    if (state.saglik < 75 && Math.random() < 0.35) {
      const katalog = await magazaConfigGetir(id);
      const adaylar = katalog.filter((e) => e.kategori === "sifa" && !e.kilitli && e.fiyat <= state.para * 0.5);
      if (adaylar.length > 0) {
        adaylar.sort((a, b) => a.fiyat - b.fiyat);
        const secilen = state.para > maasYillik * 2 ? adaylar[adaylar.length - 1] : adaylar[0];
        await magazadanSatinAl(id, secilen.id);
        sayaclar.magazaSifaSayisi++;
      }
    }
  } catch {
    /* yok say (3 yıllık kategori kilidi vb.) */
  }

  // 5) Mağaza — lüks (zenginken, ün için).
  try {
    if (Math.random() < 0.12) {
      const katalog = await magazaConfigGetir(id);
      const adaylar = katalog.filter((e) => e.kategori === "luks" && !e.sahipMi && e.fiyat <= state.para * 0.35);
      if (adaylar.length > 0) {
        const secilen = rastgele(adaylar);
        await magazadanSatinAl(id, secilen.id);
        sayaclar.magazaLuksSayisi++;
      }
    }
  } catch {
    /* yok say */
  }

  // 6) Envanterdeki şifa eşyasını kullan (sağlık düşükken).
  try {
    const sifalar = state.magaza_envanteri.filter((e) => e.kategori === "sifa");
    if (state.saglik < 65 && sifalar.length > 0) {
      const secilen = sifalar.sort((a, b) => (a.kalanYil ?? 99) - (b.kalanYil ?? 99))[0];
      await envanterEsyasiKullan(id, secilen.id);
      sayaclar.envanterKullanSayisi++;
    }
  } catch {
    /* yok say */
  }

  // 7) Yeraltı zar masası (küçük bir kumar merakı).
  try {
    if (Math.random() < 0.06) {
      const kademeler = await zarKademeleriGetir(id);
      const uygun = kademeler.filter((k) => k <= state.para * 0.4);
      if (uygun.length > 0) {
        const tutar = rastgele(uygun);
        const sonuc = await zarAt(id, tutar);
        sayaclar.zarSayisi++;
        if (sonuc.kazandi) sayaclar.zarKazanma++;
      }
    }
  } catch {
    /* yok say */
  }

  // 8) Sosyalleşme mekânına gitmek (bir sonraki tur o mekânın olayını getirir).
  try {
    if (Math.random() < 0.22) {
      const yerler = await sosyallesmeYerleriGetir(id);
      if (yerler.length > 0) {
        const secilen = rastgele(yerler);
        await sosyallesmeYerineGit(id, secilen.id);
        sayaclar.sosyallesmeSayisi++;
      }
    }
  } catch {
    /* yok say */
  }
}

interface OyunKaydi {
  cag: Cag;
  meslek: string;
  bolge: string;
  yerlesim: string;
  din_kultur: string;
  yas: number;
  konut_id_son: string;
  yasam_secimi_id_son: string;
  para: number;
  ahlak: number;
  un: number;
  mutluluk: number;
  suc_seviyesi: number;
  skor: number;
  olum_nedeni: string | null;
  efsanevi_olum: string | null;
  hayat_amaci_ad: string | null;
  hayat_amaci_tamamlandi: boolean;
  rutbe: string;
  rutbe_seviye: number;
  sehir_yonetim_seviyesi: number;
  tur_sayisi: number;
  cocuk_sayisi: number;
  yasayan_cocuk_sayisi: number;
  evliydi: boolean;
  mulk_sayisi: number;
  unvan_sayisi: number;
  ayyas: boolean;
  kacakti: boolean;
  hapisteydi: boolean;
  veba_gecirdi: boolean;
  savastaydi: boolean;
  borclu: boolean;
  ordu_mevcudu: number;
  ticaret_sermaye: number;
  nufuz: number;
  yatirimSayisi: number;
  mulkSatinAlmaSayisi: number;
  magazaSifaSayisi: number;
  magazaLuksSayisi: number;
  envanterKullanSayisi: number;
  zarSayisi: number;
  zarKazanma: number;
  sosyallesmeSayisi: number;
  kendiIsHarcanan: number;
  mulkHarcanan: number;
  gayrimenkulDegeri_son: number;
  hataMi: boolean;
}

async function birOyunSimuleEt(cag: Cag, meslek: string): Promise<OyunKaydi> {
  const bolge = rastgele(BOLGELER_BY_CAG[cag]);
  const yerlesim = rastgele(YERLESIMLER).id;
  let state = await yeniOyun(cag, bolge, yerlesim);
  await mesleğiAta(state.id, meslek);
  const id = state.id;

  const sayaclar: Sayaclar = {
    yatirimSayisi: 0,
    mulkSayisi: 0,
    magazaSifaSayisi: 0,
    magazaLuksSayisi: 0,
    envanterKullanSayisi: 0,
    zarSayisi: 0,
    zarKazanma: 0,
    sosyallesmeSayisi: 0,
    kendiIsHarcanan: 0,
    mulkHarcanan: 0,
  };

  let hataMi = false;
  let guard = 0;
  try {
    while (state.aktif && guard < MAX_TUR_GUARD) {
      guard++;
      await yanEylemler(id, state, sayaclar);
      if (!state.aktif) break;

      const senaryo = await senaryoUret(id);
      const idx = secenekSec(senaryo.secenekler as unknown as Secenek[]);
      let sonuc: any = await secimUygula(id, idx);
      if (sonuc && sonuc.ara_tepki) {
        const idx2 = tepkiSec(state);
        sonuc = await secimUygula(id, idx2);
      }
    }
  } catch (err) {
    hataMi = true;
    console.error(`  [HATA] ${cag}/${meslek} (${id}): ${(err as Error).message}`);
  }

  const son = await stateGetir(id);
  return {
    cag,
    meslek,
    bolge: son.bolge,
    yerlesim: son.yerlesim,
    din_kultur: son.din_kultur,
    yas: son.yas,
    konut_id_son: son.konut_id,
    yasam_secimi_id_son: son.yasam_secimi_id,
    para: Math.round(son.para * 100) / 100,
    ahlak: son.ahlak,
    un: son.un,
    mutluluk: son.mutluluk,
    suc_seviyesi: son.suc_seviyesi,
    skor: Math.round(hesaplaSkor(son)),
    olum_nedeni: son.olum_nedeni,
    efsanevi_olum: son.efsanevi_olum,
    hayat_amaci_ad: son.hayat_amaci?.ad ?? null,
    hayat_amaci_tamamlandi: son.hayat_amaci?.tamamlandi ?? false,
    rutbe: son.rutbe,
    rutbe_seviye: son.rutbe_seviye,
    sehir_yonetim_seviyesi: son.sehir_yonetim_seviyesi,
    tur_sayisi: son.tur_sayisi,
    cocuk_sayisi: son.cocuk_sayisi,
    yasayan_cocuk_sayisi: son.cocuklar.filter((c) => c.yasiyor).length,
    evliydi: son.etiketler.includes("medeni:evli") || son.es_adi !== null,
    mulk_sayisi: son.mulkler.length,
    unvan_sayisi: son.unvanlar.length,
    ayyas: son.etiketler.includes("bagimlilik:ayyas"),
    kacakti: son.etiketler.includes("kacak") || son.gecmis_olaylar.some((e) => e.includes("kacak")),
    hapisteydi: son.etiketler.includes("hapiste"),
    veba_gecirdi: son.veba_gecirdi,
    savastaydi: son.ulke.savasta,
    borclu: son.para < 0,
    ordu_mevcudu: son.ordu_mevcudu,
    ticaret_sermaye: son.ticaret_sermaye,
    nufuz: son.nufuz,
    yatirimSayisi: sayaclar.yatirimSayisi,
    mulkSatinAlmaSayisi: sayaclar.mulkSayisi,
    magazaSifaSayisi: sayaclar.magazaSifaSayisi,
    magazaLuksSayisi: sayaclar.magazaLuksSayisi,
    envanterKullanSayisi: sayaclar.envanterKullanSayisi,
    zarSayisi: sayaclar.zarSayisi,
    zarKazanma: sayaclar.zarKazanma,
    sosyallesmeSayisi: sayaclar.sosyallesmeSayisi,
    kendiIsHarcanan: Math.round(sayaclar.kendiIsHarcanan * 100) / 100,
    mulkHarcanan: Math.round(sayaclar.mulkHarcanan * 100) / 100,
    gayrimenkulDegeri_son: gayrimenkulDegeriHesapla(son),
    hataMi,
  };
}

async function main(): Promise<void> {
  try {
    await prisma.$queryRawUnsafe("PRAGMA journal_mode=WAL;");
    await prisma.$queryRawUnsafe("PRAGMA synchronous=NORMAL;");
  } catch (e) {
    console.error("PRAGMA ayarlanamadı:", e);
  }

  const kombinasyonlar: { cag: Cag; meslek: string }[] = [];
  for (const cag of Object.keys(BOLGELER_BY_CAG) as Cag[]) {
    for (const meslek of MESLEKLER) {
      kombinasyonlar.push({ cag, meslek });
    }
  }

  const tumKayitlar: OyunKaydi[] = [];
  const baslangic = Date.now();
  let toplamOynanan = 0;
  const toplamHedef = kombinasyonlar.length * N_PER_GROUP;

  for (const { cag, meslek } of kombinasyonlar) {
    console.log(`\n=== ${cag} — ${meslek}: ${N_PER_GROUP} ömür simüle ediliyor ===`);
    for (let i = 0; i < N_PER_GROUP; i++) {
      const kayit = await birOyunSimuleEt(cag, meslek);
      tumKayitlar.push(kayit);
      toplamOynanan++;
      if ((i + 1) % 10 === 0 || i === N_PER_GROUP - 1) {
        const gecenSn = ((Date.now() - baslangic) / 1000).toFixed(0);
        console.log(
          `  ${i + 1}/${N_PER_GROUP} tamamlandı (toplam ${toplamOynanan}/${toplamHedef}, ${gecenSn}sn) — son: yaş ${kayit.yas}, para ${kayit.para}, ölüm: ${kayit.olum_nedeni ?? "?"}`
        );
      }
    }
  }

  const cikisYolu = path.join(__dirname, "simulateFullPlaythroughs.sonuc.json");
  fs.writeFileSync(cikisYolu, JSON.stringify(tumKayitlar, null, 2), "utf-8");
  console.log(`\nTüm sonuçlar yazıldı: ${cikisYolu}`);
  console.log(`Toplam ${tumKayitlar.length} ömür simüle edildi (${((Date.now() - baslangic) / 1000).toFixed(0)} saniyede).`);
  const hatali = tumKayitlar.filter((k) => k.hataMi).length;
  if (hatali > 0) console.log(`Uyarı: ${hatali} oyun bir hata sonucu erken sonlandı.`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
