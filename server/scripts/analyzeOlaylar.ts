/**
 * Olay bankasının (~990 olay; kesin sayı çıktının başında) tam envanter analizi:
 *  - Ülkeye (bölge) özel olay sayıları
 *  - Çağ x meslek başına özel olay sayıları
 *  - Yaşa özel olay sayıları (yaş eğrisi)
 *  - Hiçbir kısıta bağlı olmayan, tamamen evrensel olay sayısı
 *  - Gerçek olaySec() fonksiyonuyla (gerçek uygunluk/öncelik/ağırlık mantığı)
 *    binlerce ömür simüle edip, bir ömürde her olay sınıfının ne sıklıkla
 *    karşınıza çıktığını hesaplar.
 *
 * NOT: senaryoUret()'teki "zorlanan/garanti" olay kaskadı (evlilik teklifi,
 * şehir yönetimi başlangıcı, evcil hayvan teklifi, hizip/saray takip
 * olayları, tarihi savaş ilanı — toplam ~14 özel id) bu simülasyona dahil
 * edilmedi; bunlar zaten koşulları sağlandığında %100 garanti tetikleniyor,
 * ayrı bir liste olarak raporun sonunda listeleniyor. (Hayat amacı artık bir
 * olay değil — doğuşta createCharacter() içinde rastgele atanıyor.)
 */
import {
  createCharacter,
  mesleğiSec,
  clampStats,
  checkDeath,
  ilerletYas,
  durumlariUygula,
  durumEkle,
  etiketEkle,
  etiketSil,
  pasifEkonomiUygula,
  yaslanmaUygula,
  capraletkiUygula,
  sansOlayiDene,
  aniOlumDene,
  MESLEKLER,
  BOLGELER_BY_CAG,
} from "../src/game/stateManager";

/** hizip_asker/tuccar/din_saflasma olayının seçenekleriyle birebir aynı — orada tanımlı isimler. */
const HIZIP_SECENEKLERI: Record<string, [string, string]> = {
  Asker: ["Eski Muhafızlar", "Yeni Nizam"],
  Tüccar: ["Liman Loncası", "Pazar Birliği"],
  "Din Adamı": ["Gelenekçiler", "Yenilikçiler"],
};
import { jitterUygula } from "../src/game/gameEngine";
import { rollSuccess } from "../src/game/diceRoll";
import { olaySec } from "../src/game/olaySecici";
import { OLAY_BANKASI, OlayTanimi } from "../src/data/olaylar";
import { YERLESIMLER } from "../src/data/yerlesimler";
import { Cag, CharacterState } from "../src/types";

// ---------------------------------------------------------------------------
// PART A: statik envanter (salt veri taraması, simülasyon yok)
// ---------------------------------------------------------------------------

const TUM_BOLGELER = Array.from(new Set([...BOLGELER_BY_CAG["Orta Çağ"], ...BOLGELER_BY_CAG["Sanayi Devrimi"]]));

function gecerliMi(deger: unknown): boolean {
  return deger !== undefined && deger !== null;
}

/** uygunMu() içindeki TÜM kısıt alanlarını tarar; hiçbiri set değilse olay tamamen evrenseldir. */
function tamamenEvrenselMi(o: OlayTanimi): boolean {
  return !(
    gecerliMi(o.cag) ||
    gecerliMi(o.bolgeler) ||
    gecerliMi(o.meslekler) ||
    gecerliMi(o.minYas) ||
    gecerliMi(o.maxYas) ||
    gecerliMi(o.minAhlak) ||
    gecerliMi(o.maxAhlak) ||
    gecerliMi(o.minUn) ||
    gecerliMi(o.maxUn) ||
    gecerliMi(o.minMutluluk) ||
    gecerliMi(o.maxMutluluk) ||
    gecerliMi(o.minRakipPuani) ||
    gecerliMi(o.maxRakipPuani) ||
    gecerliMi(o.gerekliEtiketler) ||
    gecerliMi(o.yasakliEtiketler) ||
    gecerliMi(o.gerekliUlke) ||
    gecerliMi(o.gerekliKisilik) ||
    gecerliMi(o.gerekliDin) ||
    gecerliMi(o.minRutbeSeviye) ||
    gecerliMi(o.gerekliEkip) ||
    gecerliMi(o.gerekliEkipRolu) ||
    gecerliMi(o.gerekliHizip) ||
    o.hapisOlayi === true
  );
}

function bolgeyeOzelMi(o: OlayTanimi, bolge: string): boolean {
  return !!o.bolgeler?.includes(bolge);
}

function meslekCagaOzelMi(o: OlayTanimi, meslek: string, cag: Cag): boolean {
  if (!o.meslekler?.includes(meslek)) return false;
  return o.cag === undefined || o.cag === cag;
}

function yasGatedMi(o: OlayTanimi): boolean {
  return gecerliMi(o.minYas) || gecerliMi(o.maxYas);
}

function yasUygunMu(o: OlayTanimi, yas: number): boolean {
  if (o.minYas !== undefined && yas < o.minYas) return false;
  if (o.maxYas !== undefined && yas > o.maxYas) return false;
  return true;
}

function partA(): void {
  console.log("=".repeat(78));
  console.log(`PART A — STATİK ENVANTER (toplam ${OLAY_BANKASI.length} olay)`);
  console.log("=".repeat(78));

  // --- hapis-özel ---
  const hapisOzel = OLAY_BANKASI.filter((o) => o.hapisOlayi === true);
  console.log(`\nHapis-özel olay (sadece "hapiste" etiketliyken görülebilir): ${hapisOzel.length}`);

  // --- çağ dağılımı ---
  const ortaCag = OLAY_BANKASI.filter((o) => o.cag === "Orta Çağ").length;
  const sanayi = OLAY_BANKASI.filter((o) => o.cag === "Sanayi Devrimi").length;
  const cagsiz = OLAY_BANKASI.filter((o) => o.cag === undefined).length;
  console.log(`\nÇağ dağılımı: Orta Çağ'a özel ${ortaCag} · Sanayi Devrimi'ne özel ${sanayi} · her iki çağda da (çağ belirtilmemiş) ${cagsiz}`);

  // --- ülkeye (bölge) özel ---
  console.log("\n--- Ülkeye (bölge) özel olay sayıları ---");
  console.log("(bir olay birden fazla ülkeyi listeleyebilir; o zaman her ikisinde de sayılır)");
  const bolgesiz = OLAY_BANKASI.filter((o) => o.bolgeler === undefined).length;
  console.log(`Bölge kısıtı olmayan (her ülkede çıkabilir) olay: ${bolgesiz}`);
  for (const bolge of TUM_BOLGELER) {
    const sayi = OLAY_BANKASI.filter((o) => bolgeyeOzelMi(o, bolge)).length;
    const cagList = (Object.keys(BOLGELER_BY_CAG) as Cag[]).filter((c) => BOLGELER_BY_CAG[c].includes(bolge));
    console.log(`  ${bolge.padEnd(14)} (${cagList.join("/")}): ${sayi}`);
  }
  const tekBolgeyeOzel = OLAY_BANKASI.filter((o) => o.bolgeler && o.bolgeler.length === 1).length;
  const cokBolgeyeOzel = OLAY_BANKASI.filter((o) => o.bolgeler && o.bolgeler.length > 1).length;
  console.log(`(Bunlardan tam olarak TEK ülkeye özel: ${tekBolgeyeOzel} · birden fazla ülkede ortak: ${cokBolgeyeOzel})`);

  // --- çağ x meslek özel ---
  console.log("\n--- Çağ x Meslek özel olay sayıları ---");
  const mesleksiz = OLAY_BANKASI.filter((o) => o.meslekler === undefined).length;
  console.log(`Meslek kısıtı olmayan (her meslekte çıkabilir) olay: ${mesleksiz}`);
  for (const cag of ["Orta Çağ", "Sanayi Devrimi"] as Cag[]) {
    for (const meslek of MESLEKLER) {
      const sayi = OLAY_BANKASI.filter((o) => meslekCagaOzelMi(o, meslek, cag)).length;
      console.log(`  ${cag.padEnd(18)} x ${meslek.padEnd(12)}: ${sayi}`);
    }
  }
  const meslekIkiCagda = OLAY_BANKASI.filter((o) => o.meslekler !== undefined && o.cag === undefined).length;
  const meslekTekCag = OLAY_BANKASI.filter((o) => o.meslekler !== undefined && o.cag !== undefined).length;
  console.log(`(Meslek-özel olaylardan her iki çağda da geçerli: ${meslekIkiCagda} · tek çağa kilitli: ${meslekTekCag})`);

  // --- yaşa özel ---
  console.log("\n--- Yaşa özel olay sayıları ---");
  const yasGatesiz = OLAY_BANKASI.filter((o) => !yasGatedMi(o)).length;
  const yasGateli = OLAY_BANKASI.length - yasGatesiz;
  console.log(`Yaş kısıtı olmayan (her yaşta çıkabilir) olay: ${yasGatesiz}`);
  console.log(`Yaş kısıtı olan (minYas/maxYas) olay: ${yasGateli}`);

  const minYaslar = OLAY_BANKASI.map((o) => o.minYas).filter((v): v is number => v !== undefined);
  const maxYaslar = OLAY_BANKASI.map((o) => o.maxYas).filter((v): v is number => v !== undefined);
  console.log(
    `Kullanılan minYas aralığı: ${Math.min(...minYaslar)}-${Math.max(...minYaslar)} · maxYas aralığı: ${Math.min(...maxYaslar)}-${Math.max(...maxYaslar)}`
  );

  console.log("\nYaş bandı  → o bantta EN AZ bir yılında uygun olan olay sayısı (5'erli gruplanmış):");
  for (let bandBaslangic = 15; bandBaslangic <= 95; bandBaslangic += 5) {
    const bandBitis = bandBaslangic + 4;
    let sayi = 0;
    for (const o of OLAY_BANKASI) {
      let uygunVarMi = false;
      for (let yas = bandBaslangic; yas <= bandBitis; yas++) {
        if (yasUygunMu(o, yas)) {
          uygunVarMi = true;
          break;
        }
      }
      if (uygunVarMi) sayi++;
    }
    console.log(`  ${bandBaslangic}-${bandBitis}: ${sayi}`);
  }

  // --- tamamen evrensel ---
  const evrensel = OLAY_BANKASI.filter(tamamenEvrenselMi);
  console.log(`\n--- Tamamen evrensel olaylar (HİÇBİR kısıt yok: çağ/bölge/meslek/yaş/ahlak/ün/mutluluk/etiket/din/rütbe/ekip/hizip/hapis) ---`);
  console.log(`Toplam: ${evrensel.length} / ${OLAY_BANKASI.length} (%${((evrensel.length / OLAY_BANKASI.length) * 100).toFixed(1)})`);
}

// ---------------------------------------------------------------------------
// PART B: gerçek olaySec() ile ömür-boyu simülasyon (olasılık hesaplaması)
// ---------------------------------------------------------------------------

interface OlaySinifi {
  bolgeye_ozel: boolean;
  mesleğe_ozel: boolean;
  yasa_ozel: boolean;
  tamamen_evrensel: boolean;
  hizipli: boolean;
}

const SINIF_CACHE = new Map<string, OlaySinifi>();
function olaySinifiGetir(o: OlayTanimi): OlaySinifi {
  let sinif = SINIF_CACHE.get(o.id);
  if (!sinif) {
    sinif = {
      bolgeye_ozel: o.bolgeler !== undefined,
      mesleğe_ozel: o.meslekler !== undefined,
      yasa_ozel: yasGatedMi(o),
      tamamen_evrensel: tamamenEvrenselMi(o),
      hizipli: o.gerekliHizip === true || (o.gerekliEtiketler?.some((e) => e.startsWith("hizip:")) ?? false),
    };
    SINIF_CACHE.set(o.id, sinif);
  }
  return sinif;
}

const YAS_TAVANI = 140;

interface OmurOlayIstatistigi {
  toplamGosterim: number;
  distinctGosterim: number;
  bolgeGosterim: number;
  meslekGosterim: number;
  yasGosterim: number;
  evrenselGosterim: number;
  digerGosterim: number;
  hizipGosterim: number;
  hizipGosterim60Once: number;
  hizibeKatildi: boolean;
}

function birOmurSimuleEtVeOlaylariSay(
  cag: Cag,
  bolge: string,
  yerlesimId: string,
  meslek: string,
  hizipeKatil: boolean
): OmurOlayIstatistigi {
  const state = createCharacter(cag, bolge, yerlesimId);
  mesleğiSec(state, meslek);

  if (hizipeKatil) {
    const secenekler = HIZIP_SECENEKLERI[meslek];
    const secilenHizip = secenekler[Math.floor(Math.random() * secenekler.length)];
    state.hizip = secilenHizip;
    etiketEkle(state, [`hizip:${secilenHizip}`, "hizip_secildi"]);
  }

  let toplamGosterim = 0;
  let bolgeGosterim = 0;
  let meslekGosterim = 0;
  let yasGosterim = 0;
  let evrenselGosterim = 0;
  let digerGosterim = 0;
  let hizipGosterim = 0;
  let hizipGosterim60Once = 0;
  const gorulenIdSeti = new Set<string>();
  let zorlananOlayId: string | undefined;
  let sonTon: "agir" | "hafif" | null = null;

  while (state.aktif && state.yas < YAS_TAVANI) {
    let secilenOlay;
    try {
      secilenOlay = olaySec(state, zorlananOlayId, sonTon);
    } catch {
      break; // bu karakter için uygun olay kalmadı (nadir bir kısıt kombinasyonu); ömrü burada kes
    }
    const { olay, senaryo } = secilenOlay;
    zorlananOlayId = undefined;
    sonTon = olay.ton ?? null;

    toplamGosterim++;
    gorulenIdSeti.add(olay.id);
    const sinif = olaySinifiGetir(olay);
    if (sinif.bolgeye_ozel) bolgeGosterim++;
    if (sinif.mesleğe_ozel) meslekGosterim++;
    if (sinif.yasa_ozel) yasGosterim++;
    if (sinif.tamamen_evrensel) evrenselGosterim++;
    if (!sinif.tamamen_evrensel && !sinif.bolgeye_ozel && !sinif.mesleğe_ozel && !sinif.yasa_ozel) digerGosterim++;
    if (sinif.hizipli) {
      hizipGosterim++;
      if (state.yas <= 60) hizipGosterim60Once++;
    }

    // kilitli olmayan bir seçenek seç (hepsi kilitliyse olaySec zaten hepsini açar)
    const secilebilirler = senaryo.secenekler.map((s, i) => i).filter((i) => !senaryo.secenekler[i].kilitli);
    const idx = (secilebilirler.length > 0 ? secilebilirler : senaryo.secenekler.map((_, i) => i))[
      Math.floor(Math.random() * (secilebilirler.length > 0 ? secilebilirler.length : senaryo.secenekler.length))
    ];
    const secenek = senaryo.secenekler[idx];
    const basarili = rollSuccess(secenek.basari_sansi);
    const etki = jitterUygula(basarili ? secenek.basarili_sonuc : secenek.basarisiz_sonuc);

    state.para += etki.para ?? 0;
    state.un += etki.un ?? 0;
    state.ahlak += etki.ahlak ?? 0;
    state.saglik += etki.saglik ?? 0;
    state.mutluluk += etki.mutluluk ?? 0;
    if (etki.durum_ekle) durumEkle(state, etki.durum_ekle);
    if (etki.durum_sil) state.durumlar = state.durumlar.filter((d) => !etki.durum_sil!.includes(d.id));
    etiketEkle(state, etki.etiket_ekle);
    etiketSil(state, etki.etiket_sil);
    if (etki.zorunlu_sonraki) zorlananOlayId = etki.zorunlu_sonraki;
    clampStats(state);

    let olumTetiklendi = etki.olum === true;
    if (!olumTetiklendi && etki.olum_sansi !== undefined) {
      const sans = Math.min(95, etki.olum_sansi * (1 + Math.max(0, 60 - state.saglik) / 40));
      if (Math.random() * 100 < sans) olumTetiklendi = true;
    }
    checkDeath(state, olumTetiklendi, etki.mesaj);
    if (!state.aktif) break;

    // gameEngine.ts ile aynı ağırlıklı dağılım: %40 ihtimalle 1, %60 ihtimalle 2 yıl (ortalama ~1.6 yıl/tur).
    const turSuresi = Math.random() < 0.4 ? 1 : 2;
    const yasArtisi = ilerletYas(state, turSuresi, turSuresi);
    state.gecmis_olaylar.push(olay.id);
    const durumOlumMesaji = durumlariUygula(state);
    if (durumOlumMesaji) checkDeath(state, true, durumOlumMesaji);
    if (!state.aktif) break;

    pasifEkonomiUygula(state, yasArtisi);
    checkDeath(state, false);
    if (!state.aktif) break;

    yaslanmaUygula(state, yasArtisi);
    if (state.saglik <= 0) checkDeath(state, true, "Yaşlılık");
    if (!state.aktif) break;

    capraletkiUygula(state, yasArtisi);
    if (state.saglik <= 0) checkDeath(state, true, "Çöküş");
    if (!state.aktif) break;

    sansOlayiDene(state);
    const aniOlum = aniOlumDene(state);
    if (aniOlum) checkDeath(state, true, aniOlum.mesaj);
    if (!state.aktif) break;

    clampStats(state);
  }

  return {
    toplamGosterim,
    distinctGosterim: gorulenIdSeti.size,
    bolgeGosterim,
    meslekGosterim,
    yasGosterim,
    evrenselGosterim,
    digerGosterim,
    hizipGosterim,
    hizipGosterim60Once,
    hizibeKatildi: hizipeKatil,
  };
}

const N_YASAM = Number(process.env.SIM_N ?? 800);

function partB(): void {
  console.log("\n" + "=".repeat(78));
  console.log(`PART B — ORTALAMA BİR ÖMÜRDE OLAY SINIFI OLASILIKLARI (${N_YASAM} simüle ömür, gerçek olaySec())`);
  console.log("=".repeat(78));
  console.log(
    "\nNOT: senaryoUret()'teki ~14 'zorlanan/garanti' özel olay (evlilik teklifi,\n" +
      "şehir yönetimi başlangıcı, evcil hayvan teklifi, hizip/saray takip,\n" +
      "tarihi savaş ilanı) bu simülasyona dahil değil — onlar koşulu sağlayan her\n" +
      "karaktere zaten %100 garanti gösteriliyor, ayrıca aşağıda listeleniyor."
  );

  let toplamGosterim = 0;
  let toplamDistinct = 0;
  let toplamBolge = 0;
  let toplamMeslek = 0;
  let toplamYas = 0;
  let toplamEvrensel = 0;
  let toplamDiger = 0;
  const gosterimSayilari: number[] = [];

  let hizipKatilanSayisi = 0;
  let hizipKatilanToplamGosterim = 0;
  let hizipKatilanHizipGosterim = 0;
  let hizipKatilanHizipGosterim60Once = 0;
  const hizip60OnceListesi: number[] = [];

  for (let i = 0; i < N_YASAM; i++) {
    const cag: Cag = Math.random() < 0.5 ? "Orta Çağ" : "Sanayi Devrimi";
    const bolgeler = BOLGELER_BY_CAG[cag];
    const bolge = bolgeler[Math.floor(Math.random() * bolgeler.length)];
    const yerlesim = YERLESIMLER[Math.floor(Math.random() * YERLESIMLER.length)];
    const meslek = MESLEKLER[Math.floor(Math.random() * MESLEKLER.length)];
    const hizipeKatil = Math.random() < 0.5; // gerçekçi bir dağılım: karakterlerin yarısı bir hizbe katılır, yarısı tarafsız kalır

    const sonuc = birOmurSimuleEtVeOlaylariSay(cag, bolge, yerlesim.id, meslek, hizipeKatil);
    toplamGosterim += sonuc.toplamGosterim;
    toplamDistinct += sonuc.distinctGosterim;
    toplamBolge += sonuc.bolgeGosterim;
    toplamMeslek += sonuc.meslekGosterim;
    toplamYas += sonuc.yasGosterim;
    toplamEvrensel += sonuc.evrenselGosterim;
    toplamDiger += sonuc.digerGosterim;
    gosterimSayilari.push(sonuc.toplamGosterim);

    if (sonuc.hizibeKatildi) {
      hizipKatilanSayisi++;
      hizipKatilanToplamGosterim += sonuc.toplamGosterim;
      hizipKatilanHizipGosterim += sonuc.hizipGosterim;
      hizipKatilanHizipGosterim60Once += sonuc.hizipGosterim60Once;
      hizip60OnceListesi.push(sonuc.hizipGosterim60Once);
    }
  }

  gosterimSayilari.sort((a, b) => a - b);
  const p = (q: number) => gosterimSayilari[Math.min(gosterimSayilari.length - 1, Math.round((gosterimSayilari.length - 1) * q))];

  console.log(`\nBir ömürde ortalama toplam olay gösterimi: ${(toplamGosterim / N_YASAM).toFixed(1)} (p10=${p(0.1)} · p50=${p(0.5)} · p90=${p(0.9)})`);
  console.log(`Bir ömürde ortalama FARKLI (distinct) olay sayısı: ${(toplamDistinct / N_YASAM).toFixed(1)}`);
  console.log("\nGösterilen olayların sınıflara göre payı (bir olay birden fazla sınıfa aynı anda girebilir):");
  console.log(`  Ülkesine (bölgesine) özel:     %${((toplamBolge / toplamGosterim) * 100).toFixed(1)}  (ortalama ${(toplamBolge / N_YASAM).toFixed(1)} olay/ömür)`);
  console.log(`  Mesleğine (o çağda) özel:      %${((toplamMeslek / toplamGosterim) * 100).toFixed(1)}  (ortalama ${(toplamMeslek / N_YASAM).toFixed(1)} olay/ömür)`);
  console.log(`  Yaşına özel:                   %${((toplamYas / toplamGosterim) * 100).toFixed(1)}  (ortalama ${(toplamYas / N_YASAM).toFixed(1)} olay/ömür)`);
  console.log(`  Tamamen evrensel (hiç kısıt yok): %${((toplamEvrensel / toplamGosterim) * 100).toFixed(1)}  (ortalama ${(toplamEvrensel / N_YASAM).toFixed(1)} olay/ömür)`);
  console.log(`  Diğer kısıtlı (ahlak/ün/mutluluk/etiket/din/rütbe/ekip/hizip/sadece-çağ vb., bölge/meslek/yaş DIŞI): %${((toplamDiger / toplamGosterim) * 100).toFixed(1)}  (ortalama ${(toplamDiger / N_YASAM).toFixed(1)} olay/ömür)`);

  console.log(`\n--- Hizip mensubu karakterler (${hizipKatilanSayisi}/${N_YASAM} simülasyonda bir hizbe katıldı — %50 ihtimalle) ---`);
  hizip60OnceListesi.sort((a, b) => a - b);
  const ph = (q: number) =>
    hizip60OnceListesi.length > 0
      ? hizip60OnceListesi[Math.min(hizip60OnceListesi.length - 1, Math.round((hizip60OnceListesi.length - 1) * q))]
      : 0;
  console.log(
    `  Hizip mensubu bir karakterin karşılaştığı olayların %${((hizipKatilanHizipGosterim / hizipKatilanToplamGosterim) * 100).toFixed(1)}'i hizbine özel (ortalama ${(hizipKatilanHizipGosterim / Math.max(1, hizipKatilanSayisi)).toFixed(1)} olay/ömür, ömür boyu).`
  );
  console.log(
    `  60 yaşından ÖNCE karşılaşılan hizip-özel olay sayısı: ortalama ${(hizipKatilanHizipGosterim60Once / Math.max(1, hizipKatilanSayisi)).toFixed(1)} (p10=${ph(0.1)} · p50=${ph(0.5)} · p90=${ph(0.9)})`
  );

  console.log("\n--- Koşullu olarak %100 garanti tetiklenen özel olaylar (bu simülasyona dahil değil) ---");
  const garantiler = [
    "dunya_savas_ilani — bölgeye özel tarihi bir savaş başladığında garanti",
    "iliski_evlilik_teklifi — 29 yaşına kadar hâlâ bekarsa garanti",
    "sehir_yonetim_{tuccar,dinadami,asker}_baslangic — rütbe seviyesi 4'e ulaşınca garanti",
    "evcilhayvan_sahiplenme_teklifi_{ortacag,sanayi} — 20-25 yaş arası evcil hayvanı yoksa garanti",
    "EVCIL_HAYVAN_GENEL_TAKIP_OLAY_IDLERI havuzundan biri — evcil hayvanı olan karakterde 45-50 yaşta, 2.'den az görülmüşse garanti",
    "hizip takip olaylarından biri — bir hizbe katılmışsa 45-50 yaşta, 3.'ten az görülmüşse garanti",
    "saray_kral_daveti — ün ve ahlak 70+ olunca garanti",
    "SARAY_OLAY_IDLERI havuzundan biri — saraydaysa 50-58 yaşta, 2.'den az görülmüşse garanti",
    "yolculuk teklifi (Haçlı Seferi / Kutsal Toprakları Savunma / Hac / Coğrafi Keşif / Mucit Turnesi / Sömürge Seferi) — 22 yaşından itibaren, meslek/çağ/bölge/dine uygun bir yolculuk hiç tamamlanmadıysa garanti; reddedilirse birkaç yıl sonra tekrar sorulur",
  ];
  garantiler.forEach((g) => console.log(`  • ${g}`));
}

partA();
partB();
