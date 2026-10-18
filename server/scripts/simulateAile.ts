/**
 * Aile/evlilik sistemi denge simülasyonu: gerçek gameEngine fonksiyonlarını (senaryoUret,
 * secimUygula, aileDurumGetir, mantikTeklifEt, dugunYap, esEylemYap) doğrudan çağırarak
 * iki oyuncu profiliyle yüzlerce ömür oynar ve evlilik/çocuk dağılımını raporlar:
 *   - "ilgili":   evlendikten sonra her 2 yılda bir zaman geçirir + küçük hediye verir
 *   - "ihmalkar": evlendikten sonra eşiyle hiç ilgilenmez
 * Kullanım: SIM_N=150 npx tsx scripts/simulateAile.ts   (DB gerekmez, bellek-içi stub)
 */
import "./_simPrismaStub";
import {
  yeniOyun,
  mesleğiAta,
  senaryoUret,
  secimUygula,
  aileDurumGetir,
  mantikTeklifEt,
  dugunYap,
  esEylemYap,
  stateGetir,
} from "../src/game/gameEngine";
import { MESLEKLER } from "../src/game/stateManager";
import type { CharacterState } from "../src/types";

const N = Number(process.env.SIM_N ?? 150);
const MAX_TUR = 300;

type Profil = "ilgili" | "ihmalkar";

interface Sonuc {
  evlendi: boolean;
  evlenmeYasi: number | null;
  terk: boolean;
  esOlumu: boolean;
  dogum: number;
  yasayanCocuk: number;
  olumYasi: number;
  barOrt: number;
  barOrnek: number;
}

async function omurOyna(profil: Profil): Promise<Sonuc> {
  const ilk = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
  const id = ilk.id;
  await mesleğiAta(id, MESLEKLER[Math.floor(Math.random() * MESLEKLER.length)]);
  let evlendi = false;
  let evlenmeYasi: number | null = null;
  let terk = false;
  let esOlumu = false;
  let barToplam = 0;
  let barOrnek = 0;
  let oncekiEs: string | null = null;

  for (let tur = 0; tur < MAX_TUR; tur++) {
    let state: CharacterState = await stateGetir(id);
    if (!state.aktif) break;

    // Evlen: 24+ yaşında, bekar, para varsa — mantık, orta düğün.
    if (!state.es_adi && !state.bekleyen_dugun && state.yas >= 24 && state.yas <= 45 && state.para >= 40) {
      try {
        const durum = await aileDurumGetir(id);
        if (durum.mantik.acik && durum.mantik.adaylar.length > 0) {
          const hedef = Math.max(0, durum.mantik.adaylar.findIndex((a) => a.grup === "genc"));
          const sonuc = await mantikTeklifEt(id, hedef, state.para >= 80 ? "ucuz" : "sade");
          if (sonuc.kabul) {
            await dugunYap(id, state.para >= 120 ? "orta" : "ucuz");
            state = await stateGetir(id);
            if (!evlendi) {
              evlendi = true;
              evlenmeYasi = state.yas;
            }
          }
        }
      } catch {
        /* para/koşul yetmedi — sonra tekrar denenir */
      }
    }

    // İlgili profil: eylemleri bekleme süresi dolar dolmaz yap.
    if (profil === "ilgili" && state.es_adi) {
      try {
        await esEylemYap(id, "zaman_gecir");
      } catch {
        /* bekleme sürüyor */
      }
      try {
        await esEylemYap(id, "hediye_ver", "ucuz");
      } catch {
        /* bekleme / para */
      }
      state = await stateGetir(id);
    }

    if (state.es_adi) {
      barToplam += state.es_puani;
      barOrnek++;
      oncekiEs = state.es_adi;
    } else if (oncekiEs && evlendi) {
      // Eş slotu boşaldı: terk mi ölüm mü (yas_bitis_yili eşin gidiş türünü ayırt etmez; terk = yas 1 yıl).
      if (state.yas_bitis_yili - state.yil >= 2) esOlumu = true;
      else terk = true;
      oncekiEs = null;
    }

    try {
      const senaryo = await senaryoUret(id);
      const index = senaryo.secenekler.findIndex((s) => !s.kilitli);
      await secimUygula(id, index >= 0 ? index : 0);
    } catch {
      break;
    }
  }

  const son = await stateGetir(id);
  return {
    evlendi,
    evlenmeYasi,
    terk,
    esOlumu,
    dogum: son.cocuklar.length,
    yasayanCocuk: son.cocuklar.filter((c) => c.yasiyor).length,
    olumYasi: son.yas,
    barOrt: barOrnek > 0 ? barToplam / barOrnek : 0,
    barOrnek,
  };
}

function ozet(ad: string, s: Sonuc[]): void {
  const n = s.length;
  const evli = s.filter((x) => x.evlendi);
  const ort = (a: number[]) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
  const dagilim: Record<number, number> = {};
  for (const x of evli) dagilim[x.dogum] = (dagilim[x.dogum] ?? 0) + 1;
  console.log(`\n=== ${ad} (${n} ömür) ===`);
  console.log(`evlenen: %${Math.round((evli.length / n) * 100)}  ort. evlenme yaşı: ${ort(evli.map((x) => x.evlenmeYasi ?? 0)).toFixed(1)}`);
  console.log(`ort. ölüm yaşı: ${ort(s.map((x) => x.olumYasi)).toFixed(1)}   ort. bar: ${ort(evli.map((x) => x.barOrt)).toFixed(1)}`);
  console.log(`terk: %${Math.round((evli.filter((x) => x.terk).length / Math.max(1, evli.length)) * 100)}   eş ölümü: %${Math.round((evli.filter((x) => x.esOlumu).length / Math.max(1, evli.length)) * 100)}`);
  console.log(`evlilerde ort. doğum: ${ort(evli.map((x) => x.dogum)).toFixed(2)}   yaşayan çocuk: ${ort(evli.map((x) => x.yasayanCocuk)).toFixed(2)}`);
  console.log(`doğum dağılımı (çocuk sayısı → ömür): ${JSON.stringify(dagilim)}`);
}

async function main(): Promise<void> {
  for (const profil of ["ilgili", "ihmalkar"] as Profil[]) {
    const sonuclar: Sonuc[] = [];
    for (let i = 0; i < N; i++) sonuclar.push(await omurOyna(profil));
    ozet(profil, sonuclar);
  }
}

main().then(() => process.exit(0));
