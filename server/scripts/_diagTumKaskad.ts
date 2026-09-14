/**
 * Tek seferlik teşhis (kalıcı değil): §11'deki TÜM zorlanan-olay kaskad
 * kurallarının bir ömürde ortalama kaç kez tetiklendiğini ölçer.
 */
import "./_simPrismaStub";
import { yeniOyun, mesleğiAta, senaryoUret, secimUygula, stateGetir } from "../src/game/gameEngine";
import { BOLGELER_BY_CAG, MESLEKLER } from "../src/game/stateManager";
import { EVCIL_HAYVAN_GENEL_TAKIP_OLAY_IDLERI } from "../src/data/evcilHayvanlar";
import { GIZEMLI_ESYA_TAKIP_HAVUZU } from "../src/data/gizemliEsyalar";
import { Cag, CharacterState } from "../src/types";

const N_PER_KOMBO = Number(process.env.SIM_N ?? 60);
const MAX_TUR_GUARD = 350;

function rastgele<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface Secenek {
  basari_sansi: number;
  kilitli: boolean;
}

function secenekSec(secenekler: Secenek[]): number {
  const acikIndexler = secenekler.map((s, i) => i).filter((i) => !secenekler[i].kilitli);
  const havuz = acikIndexler.length > 0 ? acikIndexler : secenekler.map((_, i) => i);
  return havuz[Math.floor(Math.random() * havuz.length)];
}

const SARAY_OLAY_IDLERI = [
  "saray_ic_entrika",
  "saray_balosu",
  "saray_dedikodu",
  "saray_av_daveti",
  "saray_suikast_duyumu",
  "saray_mutfak_kazasi",
];

const YOL_GIRIS_IDLERI = new Set([
  "oc_asker_yol_ilk_emir",
  "oc_din_yol_ilk_sinav",
  "oc_tuccar_yol_ilk_anlasma",
  "sd_asker_yol_ilk_gorev",
  "sd_tuccar_yol_ilk_karar",
  "sd_din_yol_ilk_vaaz",
]);
const YOL_ONEKLERI = ["oc_asker_yol_", "oc_din_yol_", "oc_tuccar_yol_", "sd_asker_yol_", "sd_tuccar_yol_", "sd_din_yol_"];

const SEHIR_YONETIM_GIRIS = new Set([
  "sehir_yonetim_tuccar_baslangic",
  "sehir_yonetim_dinadami_baslangic",
  "sehir_yonetim_asker_baslangic",
]);

const EVCIL_HAYVAN_TEKLIF = new Set(["evcilhayvan_sahiplenme_teklifi_sanayi", "evcilhayvan_sahiplenme_teklifi_ortacag"]);

interface Sayaclar {
  tarihiSavas: number;
  yolGiris: number;
  yolTakip: number;
  evlilikTeklifi: number;
  sehirYonetimGiris: number;
  evcilHayvanTeklif: number;
  evcilHayvanTakip: number;
  gizemliEsyaTakip: number;
  hizipTakip: number;
  sarayDaveti: number;
  sarayTakip: number;
  yolculukTeklifEdildi: boolean;
  yolculuktaOldu: boolean;
  mistikGaranti: number;
}

function bosSayaclar(): Sayaclar {
  return {
    tarihiSavas: 0,
    yolGiris: 0,
    yolTakip: 0,
    evlilikTeklifi: 0,
    sehirYonetimGiris: 0,
    evcilHayvanTeklif: 0,
    evcilHayvanTakip: 0,
    gizemliEsyaTakip: 0,
    hizipTakip: 0,
    sarayDaveti: 0,
    sarayTakip: 0,
    yolculukTeklifEdildi: false,
    yolculuktaOldu: false,
    mistikGaranti: 0,
  };
}

const TUM_GIZEMLI_ESYA_TAKIP_IDLERI = new Set(Object.values(GIZEMLI_ESYA_TAKIP_HAVUZU).flat());

function sayHesapla(son: CharacterState): Sayaclar {
  const s = bosSayaclar();
  const gecmis = son.gecmis_olaylar;
  for (const id of gecmis) {
    if (id === "dunya_savas_ilani_asker" || id === "dunya_savas_ilani") s.tarihiSavas++;
    if (YOL_GIRIS_IDLERI.has(id)) s.yolGiris++;
    else if (YOL_ONEKLERI.some((p) => id.startsWith(p))) s.yolTakip++;
    if (id === "iliski_evlilik_teklifi") s.evlilikTeklifi++;
    if (SEHIR_YONETIM_GIRIS.has(id)) s.sehirYonetimGiris++;
    if (EVCIL_HAYVAN_TEKLIF.has(id)) s.evcilHayvanTeklif++;
    if (EVCIL_HAYVAN_GENEL_TAKIP_OLAY_IDLERI.includes(id)) s.evcilHayvanTakip++;
    if (TUM_GIZEMLI_ESYA_TAKIP_IDLERI.has(id)) s.gizemliEsyaTakip++;
    if (id === "saray_kral_daveti") s.sarayDaveti++;
    if (SARAY_OLAY_IDLERI.includes(id)) s.sarayTakip++;
  }
  s.yolculukTeklifEdildi = son.etiketler.includes("yolculuk_teklifi_edildi") || son.etiketler.includes("yolculuk_tamamlandi");
  s.yolculuktaOldu = son.etiketler.includes("yolculuk_tamamlandi") || son.etiketler.includes("yolculukta");
  // Hizip takip: hizbe katılmışsa ve 45-50 aralığını geçtiyse ne kadar hizip-özel olay görüldüğü (kabaca id içinde "hizip" geçenler)
  s.hizipTakip = son.hizip !== null ? gecmis.filter((id) => id.toLowerCase().includes("hizip")).length : 0;
  // Mistik garanti: ilk gizemli olay -- id listesi elimizde değil, kaba tahmin: esyaVeGizem.ts/buyuluOlaylar.ts önekleri
  s.mistikGaranti = gecmis.filter((id) => id.startsWith("gizem_") || id.startsWith("buyu_") || id.startsWith("derinlik_")).length;
  return s;
}

async function birOmurSimuleEt(cag: Cag, meslek: string): Promise<{ sayaclar: Sayaclar; yas: number; hizipVar: boolean; esyaVar: boolean }> {
  const bolge = rastgele(BOLGELER_BY_CAG[cag]);
  const state0 = await yeniOyun(cag, bolge, "kasaba");
  await mesleğiAta(state0.id, meslek);
  const id = state0.id;

  let guard = 0;
  let state = await stateGetir(id);
  try {
    while (state.aktif && guard < MAX_TUR_GUARD) {
      guard++;
      const senaryo = await senaryoUret(id);
      const idx = secenekSec(senaryo.secenekler as unknown as Secenek[]);
      let sonuc: any = await secimUygula(id, idx);
      if (sonuc && sonuc.ara_tepki) {
        sonuc = await secimUygula(id, Math.random() < 0.5 ? 0 : 1);
      }
      state = await stateGetir(id);
    }
  } catch (err) {
    console.error(`  [HATA] ${cag}/${meslek}: ${(err as Error).message}`);
  }

  const son = await stateGetir(id);
  return {
    sayaclar: sayHesapla(son),
    yas: son.yas,
    hizipVar: son.hizip !== null,
    esyaVar: son.etiketler.some((e) => e.startsWith("esya:") || e.startsWith("envanter:")),
  };
}

async function main() {
  const kombinasyonlar: { cag: Cag; meslek: string }[] = [];
  for (const cag of ["Orta Çağ", "Sanayi Devrimi"] as Cag[]) {
    for (const meslek of MESLEKLER) kombinasyonlar.push({ cag, meslek });
  }

  const toplam = bosSayaclar();
  let toplamOmur = 0;
  let hizipliOmur = 0;
  let esyaliOmur = 0;
  let yolculukTeklifSayisi = 0;
  let yolculuktaOlan = 0;

  for (const { cag, meslek } of kombinasyonlar) {
    console.log(`--- ${cag} / ${meslek}: ${N_PER_KOMBO} ömür ---`);
    for (let i = 0; i < N_PER_KOMBO; i++) {
      const r = await birOmurSimuleEt(cag, meslek);
      toplamOmur++;
      if (r.hizipVar) hizipliOmur++;
      if (r.esyaVar) esyaliOmur++;
      if (r.sayaclar.yolculukTeklifEdildi) yolculukTeklifSayisi++;
      if (r.sayaclar.yolculuktaOldu) yolculuktaOlan++;
      for (const k of Object.keys(toplam) as (keyof Sayaclar)[]) {
        const v = r.sayaclar[k];
        if (typeof v === "number") (toplam[k] as number) += v;
      }
    }
  }

  console.log(`\n========= TOPLAM (${toplamOmur} ömür, tüm çağ×meslek karışık) =========`);
  console.log(`Tarihi savaş ilanı: ort. ${(toplam.tarihiSavas / toplamOmur).toFixed(3)} kez/ömür`);
  console.log(`Kariyer yolu girişi: ort. ${(toplam.yolGiris / toplamOmur).toFixed(3)} kez/ömür`);
  console.log(`Yol dalı takip (yeni kural): ort. ${(toplam.yolTakip / toplamOmur).toFixed(3)} kez/ömür`);
  console.log(`Evlilik teklifi garantisi: ort. ${(toplam.evlilikTeklifi / toplamOmur).toFixed(3)} kez/ömür`);
  console.log(`Şehir yönetimi girişi: ort. ${(toplam.sehirYonetimGiris / toplamOmur).toFixed(3)} kez/ömür`);
  console.log(`Evcil hayvan teklifi: ort. ${(toplam.evcilHayvanTeklif / toplamOmur).toFixed(3)} kez/ömür`);
  console.log(`Evcil hayvan takip garantisi: ort. ${(toplam.evcilHayvanTakip / toplamOmur).toFixed(3)} kez/ömür`);
  console.log(`Gizemli eşya takip garantisi: ort. ${(toplam.gizemliEsyaTakip / toplamOmur).toFixed(3)} kez/ömür (${esyaliOmur}/${toplamOmur} ömürde eşya vardı)`);
  console.log(`Hizip-ilişkili olay (kaba tahmin): ort. ${(toplam.hizipTakip / toplamOmur).toFixed(3)} kez/ömür (${hizipliOmur}/${toplamOmur} ömürde hizip vardı)`);
  console.log(`Saray daveti: ort. ${(toplam.sarayDaveti / toplamOmur).toFixed(3)} kez/ömür`);
  console.log(`Saray takip garantisi: ort. ${(toplam.sarayTakip / toplamOmur).toFixed(3)} kez/ömür`);
  console.log(`Yolculuk teklif edilen ömür: ${yolculukTeklifSayisi}/${toplamOmur} (${((yolculukTeklifSayisi / toplamOmur) * 100).toFixed(1)}%)`);
  console.log(`Yolculuğa çıkan/tamamlayan ömür: ${yolculuktaOlan}/${toplamOmur} (${((yolculuktaOlan / toplamOmur) * 100).toFixed(1)}%)`);
  console.log(`Mistik garanti olayları (kaba tahmin, gizem_/buyu_/derinlik_): ort. ${(toplam.mistikGaranti / toplamOmur).toFixed(3)} kez/ömür`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
