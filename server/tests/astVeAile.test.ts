import { describe, it, expect } from "vitest";
import { createCharacter, mesleğiSec, rutbeGuncelle, BOLGELER_BY_CAG } from "../src/game/stateManager";

describe("ebeveynler (anne/baba)", () => {
  it("yeni karakterin anne_adi ve baba_adi'si dolu ve birbirinden/dost-rakipten farklıdır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    expect(state.anne_adi).toBeTruthy();
    expect(state.baba_adi).toBeTruthy();
    expect(state.anne_adi).not.toBe(state.baba_adi);
    expect(state.anne_adi).not.toBe(state.dost_adi);
    expect(state.anne_adi).not.toBe(state.rakip_adi);
    expect(state.baba_adi).not.toBe(state.dost_adi);
    expect(state.baba_adi).not.toBe(state.rakip_adi);
  });

  it("her bölgede anne_adi hep kadın, baba_adi hep erkek isim havuzundan gelir (100 karakterlik örnekte)", () => {
    for (const cag of Object.keys(BOLGELER_BY_CAG) as (keyof typeof BOLGELER_BY_CAG)[]) {
      for (const bolge of BOLGELER_BY_CAG[cag]) {
        for (let i = 0; i < 100; i++) {
          const state = createCharacter(cag, bolge, "kasaba");
          expect(KADIN_ISIMLERI[bolge]).toBeDefined();
          expect(KADIN_ISIMLERI[bolge]).toContain(state.anne_adi);
          expect(ERKEK_ISIMLERI[bolge]).toContain(state.baba_adi);
        }
      }
    }
  });
});

/** Testin kendi bağımsız beklenti listesi — npcIsimleri.ts'teki gerçek havuzla birebir örtüşmeli. */
const KADIN_ISIMLERI: Record<string, string[]> = {
  Fransa: [
    "Isabeau", "Marguerite", "Blanche", "Aliénor", "Adèle", "Mahaut",
    "Béatrice", "Jeanne", "Sibylle", "Agnès", "Ermengarde", "Constance",
  ],
  "Kutsal Roma": [
    "Adelheid", "Gertrud", "Brunhild", "Hildegard", "Kunigunde", "Mechthild",
    "Agnes", "Beatrix", "Irmgard", "Uta", "Sophie", "Richenza",
  ],
  Bizans: [
    "Zoe", "Eirene", "Theodora", "Anna", "Maria", "Euphrosyne",
    "Helena", "Sophia", "Kale", "Xene", "Martha", "Pulcheria",
  ],
  Selçuklu: [
    "Elif", "Zeynep", "Gülhatun", "Terken", "Mahperi", "Devlet",
    "Safiye", "Gevher", "Melike", "Hunat", "Raziye", "Şahnaz",
  ],
  Eyyubiler: [
    "Zeynab", "Amina", "Leyla", "Nur", "Fatıma", "Halime",
    "Rabia", "Safiye", "Aişe", "Cemile", "Rukiye", "Sara",
  ],
  İngiltere: [
    "Margaret", "Charlotte", "Alice", "Emily", "Victoria", "Eleanor",
    "Florence", "Harriet", "Jane", "Mary", "Edith", "Beatrice",
  ],
  Osmanlı: [
    "Fatma", "Ayşe", "Zehra", "Emine", "Hatice", "Zeliha",
    "Hanife", "Naime", "Şerife", "Rukiye", "Münevver", "Sıdıka",
  ],
  Rusya: [
    "Elena", "Anastasia", "Olga", "Irina", "Tatiana", "Ekaterina",
    "Natalia", "Maria", "Vera", "Sofia", "Lidia", "Praskovya",
  ],
};

const ERKEK_ISIMLERI: Record<string, string[]> = {
  Fransa: [
    "Étienne", "Baudouin", "Guillaume", "Aymeric", "Thibault", "Renaud",
    "Geoffroi", "Foulques", "Hugues", "Amaury", "Gautier", "Enguerrand",
    "Raoul", "Barthélemy", "Gilles", "Eudes", "Payen", "Adhémar",
    "Bertrand", "Gervais", "Simon", "Anselme", "Roland", "Girard",
    "Philippe", "Josselin", "Robert", "Hervé", "Lancelin", "Garnier",
  ],
  "Kutsal Roma": [
    "Konrad", "Heinrich", "Friedrich", "Wolfram", "Ludwig", "Otto",
    "Albrecht", "Dietrich", "Gottfried", "Lothar", "Sigmund", "Rudolf",
    "Bernhard", "Ekkehard", "Kuno", "Werner", "Hartmann", "Gerhard",
    "Adalbert", "Reinhard", "Wilhelm", "Berthold", "Manfred", "Günther",
    "Arnulf", "Eberhard", "Sieghart", "Volker", "Hermann", "Diethelm",
  ],
  Bizans: [
    "Theodoros", "Ioannes", "Anastasios", "Konstantinos", "Photios", "Nikephoros",
    "Alexios", "Basileios", "Michael", "Georgios", "Demetrios", "Leon",
    "Romanos", "Isaakios", "Andronikos", "Stephanos", "Manuel", "Nikolaos",
    "Bardas", "Symeon", "Petros", "Loukas", "Kosmas", "Theophylaktos",
    "Prokopios", "Eustathios", "Gregorios", "Sergios", "Philaretos", "Niketas",
  ],
  Selçuklu: [
    "Alparslan", "Yusuf", "Melikşah", "Turhan", "Sencer", "Tuğrul", "Kılıçarslan",
    "Berkyaruk", "Mesud", "Süleyman", "Çağrı", "Arslan", "Böri", "Danişmend",
    "Aytekin", "Kutalmış", "Porsuk", "Gümüştekin", "Sungur", "Yağızarslan", "Tekiş",
    "Artuk", "Çaka", "Balak", "Aksungur", "Bozan", "Karatekin",
    "Yaruk", "Emirdad", "Kürboğa", "Tutuş", "İlgazi", "Altuntaş",
  ],
  Eyyubiler: [
    "Selahaddin", "Faruk", "Halil", "Kerim", "Tarık", "Eyüp",
    "Turan", "Adil", "Kamil", "Salih", "Nasır", "Efdal",
    "Aziz", "Muzaffer", "İmad", "Esed", "Şirkuh", "Necmeddin",
    "Emin", "Cafer", "Behram", "Zahir", "Mansur", "Reşid",
    "Sabri", "Şihab", "Fahreddin", "Bahaeddin", "Seyfeddin", "Alaeddin",
  ],
  İngiltere: [
    "Thomas", "William", "Edward", "Henry", "George", "Arthur",
    "Charles", "James", "John", "Frederick", "Albert", "Walter",
    "Ernest", "Herbert", "Alfred", "Samuel", "Francis", "Robert",
    "Edwin", "Percy", "Reginald", "Harold", "Wilfred", "Cecil",
    "Leonard", "Horace", "Sidney", "Clarence", "Bertram", "Oswald",
  ],
  Osmanlı: [
    "Ahmet", "Mehmet", "Hasan", "Hüseyin", "Mustafa", "Osman",
    "İbrahim", "İsmail", "Ali", "Süleyman", "Kemal", "Rıza",
    "Cemal", "Salih", "Halil", "Ömer", "Yusuf", "Bekir",
    "Kadri", "Şükrü", "Necip", "Tahir", "Nuri", "Recep",
    "Fuat", "Hakkı", "Sadık", "Vehbi", "Zeki", "Lütfi",
  ],
  Rusya: [
    "Ivan", "Nikolai", "Mikhail", "Dmitri", "Pyotr", "Sergei",
    "Alexei", "Fyodor", "Vasili", "Andrei", "Grigori", "Pavel",
    "Boris", "Yuri", "Konstantin", "Stepan", "Anton", "Lev",
    "Maksim", "Timofei", "Ignat", "Rodion", "Kirill", "Yakov",
    "Semyon", "Gavriil", "Arkadi", "Nikita", "Prokhor", "Yefim",
  ],
};

/** Test yardımcısı: eşikleri fazlasıyla doldurup yılı ilerleterek karakteri hedef kademeye çıkarır. */
function terfiEttir(state: ReturnType<typeof createCharacter>, hedefSeviye: number): void {
  let guard = 0;
  while (state.rutbe_seviye < hedefSeviye && guard++ < 20) {
    state.kariyer_puani = 999;
    state.un = 100;
    state.ahlak = 100;
    state.meslek_musteri = state.pazar_musteri * 0.6; // pay şartı (işletmeli meslekte S5 %50)
    state.yil += 10; // her kademe cooldown'unu fazlasıyla aşar
    rutbeGuncelle(state);
  }
}

describe("astlar", () => {
  it("meslek seçildiğinde (rütbe seviye 1) hiç ast yok", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Asker");
    expect(state.rutbe_seviye).toBe(1);
    expect(state.astlar).toEqual([]);
  });

  it("seviye 2'ye terfi edince tam 1 ast, kendinden düşük (seviye 1) unvanla eklenir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Asker");
    state.kariyer_puani = 20;
    state.un = 40;
    rutbeGuncelle(state);
    expect(state.rutbe_seviye).toBe(2);
    expect(state.astlar).toHaveLength(1);
    expect(state.astlar[0].rutbe).toBe("Er");
    expect(state.astlar[0].isim).toBeTruthy();
    expect(state.astlar[0].isim).not.toBe(state.dost_adi);
    expect(state.astlar[0].isim).not.toBe(state.rakip_adi);
    expect(state.astlar[0].isim).not.toBe(state.anne_adi);
    expect(state.astlar[0].isim).not.toBe(state.baba_adi);
  });

  it("seviye 3'e terfi edince 2. bir ast (seviye 2 unvanlı) eklenir, ilk astın ismi değişmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Asker");
    state.kariyer_puani = 20;
    state.un = 40;
    rutbeGuncelle(state);
    const ilkAstIsim = state.astlar[0].isim;

    state.kariyer_puani = 60;
    state.un = 55;
    state.yil += 5; // seviye 3 cooldown'u (3 yıl) aşılır
    rutbeGuncelle(state);

    expect(state.rutbe_seviye).toBe(3);
    expect(state.astlar).toHaveLength(2);
    expect(state.astlar[0].isim).toBe(ilkAstIsim);
    expect(state.astlar[0].rutbe).toBe("Er");
    expect(state.astlar[1].rutbe).toBe("Onbaşı");
    expect(state.astlar[1].isim).not.toBe(state.astlar[0].isim);
  });

  it("amir_adi en üst kademede (5) null olsa da astlar dolu kalır — en tepede bile ast eksikliği olmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    terfiEttir(state, 5);
    expect(state.rutbe_seviye).toBe(5);
    expect(state.amir_adi).toBeNull();
    expect(state.astlar).toHaveLength(4);
  });
});
