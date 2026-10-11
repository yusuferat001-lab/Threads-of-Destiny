import { describe, it, expect } from "vitest";
import {
  yeniOyun,
  stateGetir,
  oturumlariBellektenTemizle,
  liderlikTablosunaKaydet,
} from "../src/game/gameEngine";
import { hataMetni } from "../src/routes/hata";

describe("oturum bellek temizliği", () => {
  it("yakın zamanda kullanılan aktif oturum atılmaz; uzun süre boşta kalan aktif oturum atılır ve DB'den geri yüklenir", async () => {
    const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    expect(oturumlariBellektenTemizle(60_000, 60_000)).toBe(0);
    // Negatif tolerans: şu andan SONRAKİ bir eşik → her oturum "uzun süre boşta" sayılır.
    expect(oturumlariBellektenTemizle(-1_000, -1_000)).toBeGreaterThanOrEqual(1);
    const geri = await stateGetir(st.id);
    expect(geri.id).toBe(st.id);
    expect(geri.aktif).toBe(true);
  });

  it("aktif tolerans verilmezse aktif oturumlara dokunulmaz (eski davranış)", async () => {
    const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    oturumlariBellektenTemizle(-1_000);
    const geri = await stateGetir(st.id);
    expect(geri.id).toBe(st.id);
  });
});

describe("liderlik tablosuna kayıt yarışı", () => {
  it("aynı oyun için paralel iki kayıt isteğinden yalnız biri başarılı olur", async () => {
    const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    const s = await stateGetir(st.id);
    s.aktif = false;
    s.olum_nedeni = "test";
    const sonuc = await Promise.allSettled([
      liderlikTablosunaKaydet(st.id, "Birinci"),
      liderlikTablosunaKaydet(st.id, "Ikinci"),
    ]);
    expect(sonuc.filter((r) => r.status === "fulfilled")).toHaveLength(1);
    expect(sonuc.filter((r) => r.status === "rejected")).toHaveLength(1);
    expect(s.skoru_kaydedildi).toBe(true);
  });
});

describe("hataMetni", () => {
  it("Prisma hatalarının ayrıntısını istemciye sızdırmaz", () => {
    const e = new Error("Invalid `prisma.session.upsert()` invocation: can't reach db.secret-host:5432");
    e.name = "PrismaClientKnownRequestError";
    const m = hataMetni(e, undefined, "tr");
    expect(m).not.toContain("secret-host");
    expect(m).toContain("veritabanına ulaşılamıyor");
  });

  it("normal oyun hatalarını olduğu gibi (çevirerek) döndürür", () => {
    expect(hataMetni(new Error("Oyun zaten bitmiş."), undefined, "tr")).toBe("Oyun zaten bitmiş.");
  });
});
