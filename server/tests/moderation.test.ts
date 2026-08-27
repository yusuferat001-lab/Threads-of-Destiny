import { describe, it, expect } from "vitest";
import { uygunsuzMu } from "../src/moderasyon/kufurFiltresi";

describe("leaderboard küfür filtresi", () => {
  it("temiz isimleri geçirir", () => {
    expect(uygunsuzMu("Yusuf")).toBe(false);
    expect(uygunsuzMu("Kader Çarkı Kahramanı")).toBe(false);
    expect(uygunsuzMu("Ayşe Kaptan")).toBe(false);
    expect(uygunsuzMu("Sör Lancelot")).toBe(false);
  });

  it("doğrudan küfür/hakaret içeren isimleri engeller", () => {
    expect(uygunsuzMu("amk kral")).toBe(true);
    expect(uygunsuzMu("siktir git")).toBe(true);
    expect(uygunsuzMu("aptal biri")).toBe(true);
    expect(uygunsuzMu("fuck yeah")).toBe(true);
  });

  it("ayraç ve leetspeak ile gizlenmiş varyasyonları da yakalar", () => {
    expect(uygunsuzMu("a.m.k")).toBe(true);
    expect(uygunsuzMu("4ptal")).toBe(true);
  });

  it("büyük/küçük harf ve Türkçe karakterlerden bağımsız çalışır", () => {
    expect(uygunsuzMu("APTAL")).toBe(true);
    expect(uygunsuzMu("ApTaL")).toBe(true);
  });
});
