import { CharacterState, Cag } from "../types";
import { OLAY_BANKASI, OlayTanimi } from "../data/olaylar";
import { temelUygunMu } from "./olaySecici";
import { createCharacter, mesleğiSec, MESLEKLER, BOLGELER_BY_CAG } from "./stateManager";

/**
 * "Az olay var" şikayetinin kök nedenini ölçmek için: belirli bir anlık
 * karakter durumunda (çağ×bölge×meslek×yaş) normal ağırlıklı havuzdan
 * gerçekten seçilebilecek DİSTİNCT olay sayısını sayar — `olaySec()`'teki
 * `uygunMu` ile birebir aynı kural (temelUygunMu + sosyalleşme/mülk olayı
 * dışlaması). §12/§25/§13'teki mimariye göre bu sayı toplam ~1115 olayın
 * çok altındadır (havuzların ~%45'i mekân/yolculuk/hizip/kariyer-yolu gibi
 * ayrı alt sistemlere kilitli). Bu dosya saf/test edilebilir tutulur — CLI
 * çıktısı `scripts/analyzeOlaylar.ts`'te, regresyon kilidi
 * `tests/olayKapsami.test.ts`'te.
 */

export function erisilebilirHavuz(state: CharacterState): OlayTanimi[] {
  return OLAY_BANKASI.filter(
    (o) => temelUygunMu(o, state) && o.sosyallesmeYeri === undefined && o.mulkOlayi === undefined
  );
}

export interface KapsamSatiri {
  cag: Cag;
  bolge: string;
  meslek: string;
  yas: number;
  sayi: number;
}

/** Temsili yaş bantları — erken/orta/geç kariyer + ileri yaş. */
export const KAPSAM_YAS_BANTLARI = [20, 35, 50, 65, 80];

/**
 * Her (çağ × bölge × meslek × yaş) kombinasyonu için nötr statlarla (etiketsiz,
 * ortalama ahlak/mutluluk/ün, hizipsiz, evcil hayvansız vb.) bir karakter
 * kurup erişilebilir havuz büyüklüğünü ölçer. Bu "en iyi senaryo"dur — gerçek
 * oyuncularda ek etiketler (suç kademesi, evlilik, hizip vb.) havuzu daha da
 * daraltabilir; bu yüzden buradaki sayı bir ÜST SINIRDIR.
 */
export function kapsamMatrisiHesapla(): KapsamSatiri[] {
  const satirlar: KapsamSatiri[] = [];
  for (const cag of Object.keys(BOLGELER_BY_CAG) as Cag[]) {
    for (const bolge of BOLGELER_BY_CAG[cag]) {
      for (const meslek of MESLEKLER) {
        for (const yas of KAPSAM_YAS_BANTLARI) {
          const state = createCharacter(cag, bolge, "kasaba");
          mesleğiSec(state, meslek);
          state.yas = yas;
          const sayi = erisilebilirHavuz(state).length;
          satirlar.push({ cag, bolge, meslek, yas, sayi });
        }
      }
    }
  }
  return satirlar;
}

/**
 * §17/§27'deki dört "havuz kilidi" (hapis/yolculuk/kaçak/veba-hastası) etiketi
 * eklenince normal havuz TAMAMEN kapanıp yalnız kendi özel alt-havuzu görünür
 * hale gelir. Bunlar küçük, sabit havuzlar olduğu için ("Az olay var"
 * şikayetinin en olası tek gerçek kaynağı) ayrı raporlanır.
 */
export interface KilitliHavuzSatiri {
  etiket: string;
  sayi: number;
}

export function kilitliHavuzlariHesapla(): KilitliHavuzSatiri[] {
  const cag: Cag = "Orta Çağ";
  const bolge = BOLGELER_BY_CAG[cag][0];
  const satirlar: KilitliHavuzSatiri[] = [];

  for (const etiket of ["hapiste", "kacak", "veba_hastasi"]) {
    const state = createCharacter(cag, bolge, "kasaba");
    mesleğiSec(state, "Asker");
    state.yas = 35;
    state.etiketler.push(etiket);
    satirlar.push({ etiket, sayi: erisilebilirHavuz(state).length });
  }

  // "yolculukta" tek başına yeterli değil — her yolculuk türü ayrıca kendi
  // özel tag'ini ister (ör. hac_yolunda + yolculuk_yolu:kara), bkz. yolculuk.ts.
  // Temsili bir yolculuk (Sünni Hac, kara yolu) ile ölçülür.
  const yolState = createCharacter("Orta Çağ", BOLGELER_BY_CAG["Orta Çağ"].find((b) => b === "Selçuklu")!, "kasaba");
  mesleğiSec(yolState, "Din Adamı");
  yolState.yas = 30;
  yolState.etiketler.push("yolculukta", "hac_yolunda", "yolculuk_yolu:kara");
  satirlar.push({ etiket: "yolculukta (hac, kara yolu)", sayi: erisilebilirHavuz(yolState).length });

  return satirlar;
}

/**
 * "İdeal" nötr statlar yerine, birkaç yaygın etiket birikimini taklit eden
 * gerçekçi profillerde havuz ne kadar daralıyor — kapsamMatrisiHesapla'nın
 * ölçtüğü ÜST SINIRLA arasındaki farkı gösterir.
 */
export interface GercekciProfilSatiri {
  profil: string;
  sayi: number;
}

export function gercekciProfilleriHesapla(): GercekciProfilSatiri[] {
  const cag: Cag = "Orta Çağ";
  const bolge = BOLGELER_BY_CAG[cag][0];

  const nötr = () => {
    const state = createCharacter(cag, bolge, "kasaba");
    mesleğiSec(state, "Tüccar");
    state.yas = 45;
    return state;
  };

  const profiller: GercekciProfilSatiri[] = [];

  const s1 = nötr();
  profiller.push({ profil: "nötr (etiketsiz)", sayi: erisilebilirHavuz(s1).length });

  const s2 = nötr();
  s2.etiketler.push("medeni:evli", "hizip:Liman Loncası", "hizip_secildi", "cocuk_var");
  profiller.push({ profil: "evli + hizipli + çocuklu", sayi: erisilebilirHavuz(s2).length });

  const s3 = nötr();
  s3.suc_seviyesi = 35;
  s3.ahlak = 25;
  profiller.push({ profil: "orta suçlu (kademe 1, düşük ahlak)", sayi: erisilebilirHavuz(s3).length });

  const s4 = nötr();
  s4.etiketler.push("medeni:evli", "hizip:Liman Loncası", "hizip_secildi", "cocuk_var", "bagimlilik:ayyas", "bagimlilik:var");
  s4.suc_seviyesi = 25;
  s4.ahlak = 30;
  profiller.push({ profil: "evli+hizipli+ayyaş+hafif suçlu (birikmiş)", sayi: erisilebilirHavuz(s4).length });

  return profiller;
}
