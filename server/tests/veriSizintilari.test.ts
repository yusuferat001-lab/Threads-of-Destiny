import { describe, it, expect, vi, afterEach } from "vitest";
import express from "express";
import type { AddressInfo } from "node:net";
import { gizliAlanlariCikar } from "../src/utils/jsonYanit";
import { geriBildirimTemizle } from "../src/routes/geriBildirim.routes";
import { webhookBildirimGonder } from "../src/utils/webhookBildirim";

afterEach(() => {
  vi.restoreAllMocks();
  delete process.env.GERI_BILDIRIM_WEBHOOK_URL;
});

describe("gizli alanlar istemciye gitmez", () => {
  it("res.json yanıtından ekip üyesinin gercekKalite'si çıkar, görünür alanlar kalır", async () => {
    const app = express();
    app.set("json replacer", gizliAlanlariCikar);
    app.get("/x", (_req, res) => {
      res.json({ state: { ekip: [{ isim: "Aron", tahminiMin: 40, tahminiMax: 60, gercekKalite: 83 }] } });
    });
    const sunucu = app.listen(0);
    try {
      const { port } = sunucu.address() as AddressInfo;
      const veri = (await (await fetch(`http://127.0.0.1:${port}/x`)).json()) as any;
      const uye = veri.state.ekip[0];
      expect(uye.gercekKalite).toBeUndefined();
      expect(uye.tahminiMin).toBe(40);
      expect(uye.isim).toBe("Aron");
    } finally {
      sunucu.close();
    }
  });

  it("JSON.stringify (DB kalıcılığı) bu replacer'dan etkilenmez: yalnız res.json kullanır", () => {
    const s = JSON.stringify({ gercekKalite: 70 });
    expect(JSON.parse(s).gercekKalite).toBe(70);
  });
});

describe("geri bildirim güvenliği", () => {
  it("bağlamdaki stateId (oturum kimliği) kaydedilmez, diğer alanlar kalır", () => {
    const sonuc = geriBildirimTemizle({
      mesaj: "Merhaba dünya",
      baglam: { stateId: "11111111-2222-3333-4444-555555555555", cag: "Orta Çağ", yas: 30 },
    });
    expect(sonuc.ok).toBe(true);
    if (sonuc.ok) {
      expect(sonuc.kayit.baglam.stateId).toBeUndefined();
      expect(sonuc.kayit.baglam.cag).toBe("Orta Çağ");
    }
  });

  it("Discord webhook'u kimseyi etiketlemez (allowed_mentions.parse boş)", async () => {
    process.env.GERI_BILDIRIM_WEBHOOK_URL = "https://discord.com/api/webhooks/1/abc";
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}"));
    await webhookBildirimGonder("@everyone herkes uyansın");
    const govde = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
    expect(govde.allowed_mentions).toEqual({ parse: [] });
    expect(govde.content).toContain("@everyone");
  });
});
