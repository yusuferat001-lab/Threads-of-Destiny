/**
 * İngilizce dil yolunun uçtan uca çalıştığını DB olmadan doğrular:
 * EN karakter oluştur → açılış anlatımı → meslek → senaryo → seçim → sonuç/haber.
 * Çalıştır: npx tsx scripts/verifyCeviri.ts
 */
import "./_simPrismaStub";
import { yeniOyun, mesleğiAta, senaryoUret, secimUygula, finansGetir } from "../src/game/gameEngine";
import { K, T } from "../src/i18n";

function bolum(baslik: string) {
  console.log("\n" + "=".repeat(70) + "\n" + baslik + "\n" + "=".repeat(70));
}

async function main() {
  bolum("K() / T() birim kontrol");
  console.log("K(en, 'Fransa') =", K("en", "Fransa"));
  console.log("K(en, 'Din Adamı') =", K("en", "Din Adamı"));
  console.log("K(en, 'Sinirli') =", K("en", "Sinirli"));
  console.log("T(en, '{0} {birim} kazandın.', [10]) =", T("en", "{0} {birim} kazandın.", [10]));
  console.log("K(tr, 'Fransa') (değişmemeli) =", K("tr", "Fransa"));

  bolum("EN karakter oluştur");
  const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi", "Test", "en");
  console.log("dil:", state.dil, "| bölge (kanonik):", state.bolge, "| para_birimi:", state.para_birimi);
  console.log("açılış anlatımı:\n ", state.acilis_anlatimi);

  bolum("Meslek ata (Asker) + ilk senaryo");
  await mesleğiAta(state.id, "Asker");
  const s1 = await senaryoUret(state.id);
  console.log("başlık:", s1.olay_basligi);
  console.log("metin :", s1.olay_metni.slice(0, 160) + "...");
  console.log("seçenek[0]:", s1.secenekler[0]?.metin);

  bolum("Birkaç tur oyna, çıktı örnekleri");
  for (let i = 0; i < 8; i++) {
    const sen = await senaryoUret(state.id);
    const sonuc: any = await secimUygula(state.id, 0);
    if ("ara_tepki" in sonuc) {
      await secimUygula(state.id, 1);
      continue;
    }
    console.log(`\n[tur ${i + 1}] olay: ${sen.olay_basligi}`);
    console.log("  sonucAnlatimi:", sonuc.sonucAnlatimi);
    if (sonuc.zamanAnlatimi) console.log("  zamanAnlatimi:", sonuc.zamanAnlatimi);
    if (sonuc.state.haberler?.length) console.log("  haber[0]:", sonuc.state.haberler[0]);
    if (!sonuc.state.aktif) {
      console.log("  >>> ÖLDÜ:", sonuc.state.olum_nedeni);
      console.log("  hayat hikayesi:", sonuc.state.hayat_hikayesi.map((h: any) => h.baslik));
      break;
    }
  }

  bolum("Finans ekranı (EN kalem adları + dünya etkileri)");
  const fin = await finansGetir(state.id);
  console.log("maasKirilim kariyerKalemler:", fin.maasKirilim.kariyerKalemler.map((k: any) => k.ad));
  console.log("maasKirilim itibarKalemler :", fin.maasKirilim.itibarKalemler.map((k: any) => k.ad));
  console.log("dunyaEtkileri:", fin.dunyaEtkileri.map((e: any) => e.metin));

  bolum("TR kontrol (regresyon): aynı akış Türkçe");
  const trState = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi", "Test", "tr");
  console.log("dil:", trState.dil);
  console.log("açılış:", trState.acilis_anlatimi.slice(0, 120) + "...");

  console.log("\n✅ verifyCeviri tamamlandı.");
}

main().catch((e) => {
  console.error("HATA:", e);
  process.exit(1);
});
