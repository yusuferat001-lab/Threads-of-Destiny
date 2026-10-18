import type { OlayTanimi } from "./types";

/**
 * Aranma kademesi olay havuzu. TEK suç/aranma ekseni olan suc_seviyesi'nin (0-100)
 * 4 yıldızlık (25 puanlık) bantlarına kilitlenir (2026-09 yeniden düzenleme):
 * 0-24 temiz (giriş/tetikleyici olaylar, maxSucSeviyesi:24) — rutin çevirme/rüşvet,
 * 25-49 kademe 1 (yakalanma: öde-ve-düş VEYA reddet-ve-hapse-gir/kaç dalı — bkz.
 * aranma_2_ev_arastirmasi_tehdidi/aranma_2_ihbarci_tehdidi'nin "reddet" seçeneği artık
 * başarısızlıkta doğrudan etiket_ekle:["hapiste"] veriyor, hapis.ts'teki parasız riskli
 * kaçış olaylarıyla "hapis yatarak kaçmaya çalış" akışını açıyor),
 * 50-74 kademe 2/"baskın" (giderek artan kefaret + zorunlu ev/işyeri baskını —
 * aranma_baskin_ortacag/sanayi eşiği 60'tan 50'ye çekildi; ceza formülü bu bantta
 * EN AZ 5 yıl dayatır, bkz. gameEngine.ts hapis_ceza_kalan hesaplaması),
 * 75-100 kademe 3/"azılı suçlu" (ceza formülü SABİT 10 yıl + en yüksek kefaretler).
 * Her kademenin kendi kefaret/rüşvet çıkışı var: suc_artis negatif. 50+ iken devreye
 * giren iki büyük "baskın" olayı (minSucSeviyesi:50, max yok) -> başarılı kaçış sonrası
 * "kacak" etiketiyle açılan, şehir havuzunu tamamen kapatan bağımsız dağ/kaçak olay
 * havuzu (hapisOlayi/yolculukOlayi ile birebir aynı mantık; kacakOlayi:true). Büyük
 * baskınların "temize çık / kademe 1'e in" sonuçları suc_seviyesi_ayarla ile kesin
 * değere sabitler.
 */
export const OLAY_ARANMA_SEVIYESI: OlayTanimi[] = [
  // ---- Giriş/tetikleyici olaylar: suc_seviyesi 0-19 bandında (temiz) ----
  {
    id: "aranma_giris_devriye_durdurmasi",
    kategori: "siyaset",
    maxSucSeviyesi: 24,
    agirlik: 1.5,
    gorsel: "🛡️",
    baslik: "Devriye Seni Durdurdu",
    metin:
      "Köşedeki devriye üstünü aramak istiyor. Rutin kontrol — ama tavrın onları meraklandırdı.",
    secenekler: [
      {
        metin: "Sakin kal, sorularını yanıtla.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Kısa kontrolün ardından seni yoluna gönderdiler.",
          detay: "Saklayacak şeyin yoksa rahatsın.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          mutluluk: -5,
          mesaj: "Biri şüphelendi; adını bir deftere yazdılar.",
          detay: "Artık gözleri üstünde.",
        },
      },
      {
        metin: "Kalabalığa karışıp sıvış.",
        baseBasariSansi: 40,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Kalabalıkta kayboldun; devriye seni bulamadı.",
          detay: "Bugünlük şansın yaver gitti.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          saglik: -5,
          mesaj: "Omzundan yakalandın; kaçman şüpheyi doğruladı.",
          detay: "Artık resmen aranıyorsun.",
        },
      },
    ],
  },
  {
    id: "aranma_giris_meyhane_kavgasi",
    kategori: "sosyal",
    maxSucSeviyesi: 24,
    agirlik: 1.5,
    gorsel: "🍺",
    baslik: "Meyhanede Kavga",
    metin:
      "Kadeh tokuşturduğun adam hakaret etmeye başladı; masalar devrildi, yumruklar uçuşuyor. Karar vakti.",
    secenekler: [
      {
        metin: "Karışma, dışarı süzül.",
        baseBasariSansi: 80,
        basariliSonuc: {
          mutluluk: -3,
          mesaj: "Kavgaya bulaşmadan kapıdan sıyrıldın.",
          detay: "En iyi zafer, hiç savaşmamaktır.",
        },
        basarisizSonuc: {
          saglik: -8,
          mesaj: "Çıkarken sıçrayan bir sandalye seni de yere serdi.",
          detay: "Kavgadan kimse tam temiz çıkmaz.",
        },
      },
      {
        metin: "Adama son bir yumruk at.",
        baseBasariSansi: 55,
        basariliSonuc: {
          suc_sinifi: "buyuk",
          mutluluk: 10,
          ahlak: -5,
          mesaj: "Adamı yere serdin; meyhane alkışladı ama devriye duydu.",
          detay: "Zafer bazen bedava değildir.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          saglik: -15,
          ahlak: -5,
          mesaj: "Adam güçlüydü; kavga sokağa taştı, devriye ikinizi de yazdı.",
          detay: "Hem yaralısın hem fişlendin.",
        },
      },
    ],
  },
  {
    id: "aranma_giris_vergi_direnci",
    kategori: "ticaret",
    maxSucSeviyesi: 24,
    agirlik: 1.5,
    gorsel: "📜",
    baslik: "Tahsildara Kafa Tutmak",
    metin:
      "Tahsildar kapında; istediği tutar hakkından fazla, üstelik kanıt yok. İtiraz cazip ama tahsildarlar unutmaz.",
    secenekler: [
      {
        metin: "Öde, tartışmaya değmez.",
        baseBasariSansi: 90,
        maliyet: 12,
        basariliSonuc: {
          para: -12,
          mesaj: "Homurdanarak ödedin; tahsildar seni unuttu bile.",
          detay: "Bazı savaşlar baştan kaybedilir.",
        },
        basarisizSonuc: {
          para: -12,
          mutluluk: -5,
          mesaj: "Ödedin ama tahsildar bir de küçümseyici laf sıkıştırdı.",
          detay: "Parayı aldı, gururunu da.",
        },
      },
      {
        metin: "Hesabı sorgula, ödemeyi reddet.",
        baseBasariSansi: 35,
        basariliSonuc: {
          un: 10,
          mesaj: "Hesaptaki tutarsızlığı yakaladın; tahsildar mahcup çekildi.",
          detay: "Bu sefer haklı çıkan sendin.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          mutluluk: -5,
          mesaj: "İtirazın deftere 'devlete karşı gelmek' diye geçti.",
          detay: "Artık resmi kayıtlarda adın var.",
        },
      },
    ],
  },
  {
    id: "aranma_giris_karanlik_teklif",
    kategori: "ticaret",
    maxSucSeviyesi: 24,
    agirlik: 1.3,
    gorsel: "🕶️",
    baslik: "Karanlık Bir Teklif",
    metin:
      "Karanlık bir aralıkta biri hızlı para getirecek ama yasa dışı bir iş öneriyor. Gözleri sürekli etrafı tarıyor.",
    secenekler: [
      {
        metin: "Teklifi reddet, yoluna git.",
        baseBasariSansi: 95,
        basariliSonuc: {
          ahlak: 3,
          mutluluk: -1,
          mesaj: "Teklifi reddedip hızla uzaklaştın.",
          detay: "Bazı kapılar kapalı kalmalı.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Reddettin ama adamın son bakışı içini ürpertti.",
          detay: "Burada 'hayır' bile bedelli.",
        },
      },
      {
        metin: "İşi kabul et, parayı cebe indir.",
        baseBasariSansi: 55,
        basariliSonuc: {
          suc_sinifi: "orta",
          para: 25,
          ahlak: -8,
          mesaj: "İş sorunsuz bitti; cebine güzel para girdi.",
          detay: "Vicdanın sızladı ama kese ağırlaştı.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          para: 10,
          ahlak: -8,
          mesaj: "İş yarım kaldı, üstüne gözcüler seni fark etti.",
          detay: "Bu çevrede adın artık kötü anılıyor.",
        },
      },
    ],
  },

  // ---- Kademe 1 (0-25): rutin çevirmeler, rüşvetçi bekçiler, küçük cezalar ----
  {
    id: "aranma_1_rutin_sorgu",
    kategori: "siyaset",
    maxSucSeviyesi: 25,
    agirlik: 3,
    gorsel: "🔍",
    baslik: "Rutin Bir Sorgu",
    metin: "Adının küçük bir şüpheli listesine girdiğini duydun; bir görevli birkaç soru soruyor. Henüz ciddi değil.",
    secenekler: [
      {
        metin: "Anlayış payı uzat. (Kefaret: 18)",
        baseBasariSansi: 85,
        maliyet: 18,
        basariliSonuc: {
          para: -18,
          suc_artis: -25,
          mesaj: "Birkaç sikke adını listeden sildirmeye yetti.",
          detay: "Küçük paralar büyük dertleri çözer.",
        },
        basarisizSonuc: {
          para: -18,
          mesaj: "Parayı aldı, listeye dokunmadı; bugünlük rahat bıraktı.",
          detay: "Açgözlü ama temkinli.",
        },
      },
      {
        metin: "Nazikçe geçiştir, para verme.",
        baseBasariSansi: 55,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Nazik tavrın işe yaradı; görevli omuz silkip gitti.",
          detay: "Bazen tek gereken sakinliktir.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          mesaj: "Cevapların tatmin etmedi; adın resmen işaretlendi.",
          detay: "Şüphe iyice büyüdü.",
        },
      },
    ],
  },
  {
    id: "aranma_1_isyeri_cezasi",
    kategori: "ticaret",
    minYas: 18,
    maxSucSeviyesi: 25,
    agirlik: 3,
    gorsel: "🏷️",
    baslik: "İşyerine Kesilen Ceza",
    metin: "Bir müfettiş 'usulsüzlük' bahanesiyle işyerine küçük bir ceza yazdı. Ödemek can sıkıcı, itiraz daha da.",
    secenekler: [
      {
        metin: "Cezayı hemen öde. (Kefaret: 24)",
        baseBasariSansi: 90,
        maliyet: 24,
        basariliSonuc: {
          para: -24,
          suc_artis: -25,
          mesaj: "Cezayı ödeyip makbuzu aldın; müfettiş dosyanı kapattı.",
          detay: "En ucuz yol, en hızlı olandır.",
        },
        basarisizSonuc: {
          para: -24,
          mesaj: "Ödedin ama müfettiş 'bir dahakine göz açık' diyerek çıktı.",
          detay: "Para işi bitirmedi, erteledi.",
        },
      },
      {
        metin: "İtiraz et, ceza haksız.",
        baseBasariSansi: 30,
        basariliSonuc: {
          un: 8,
          mesaj: "Haklılığını kanıtladın; müfettiş cezayı geri çekti.",
          detay: "Nadiren de olsa itiraz işe yarar.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          para: -10,
          mesaj: "Müfettiş inadını 'işbirliğine yanaşmamak' diye üste bildirdi.",
          detay: "Artık daha yakından izleniyorsun.",
        },
      },
    ],
  },
  {
    id: "aranma_1_rusvetci_nobetci",
    kategori: "siyaset",
    maxSucSeviyesi: 25,
    agirlik: 3,
    gorsel: "🪙",
    baslik: "Rüşvetçi Nöbetçi",
    metin: "Bir nöbetçi fısıldadı: 'Küçük bir jestle dosyanı görmezden gelirim.' Tam fiyat mı, pazarlık mı?",
    secenekler: [
      {
        metin: "Tam meblağı öde. (Kefaret: 25)",
        baseBasariSansi: 88,
        maliyet: 25,
        basariliSonuc: {
          para: -25,
          suc_artis: -25,
          mesaj: "Nöbetçi parayı cebe indirip dosyanı gerçekten kaybetti.",
          detay: "Bazı adamların sözü parayla gelir.",
        },
        basarisizSonuc: {
          para: -25,
          mesaj: "Parayı aldı, dosyayı kaybetmeye cesaret edemedi; sustu.",
          detay: "Korkak nöbetçi bile işe yarar.",
        },
      },
      {
        metin: "Yarıya pazarlık et. (Kefaret: 13)",
        baseBasariSansi: 45,
        maliyet: 13,
        basariliSonuc: {
          para: -13,
          suc_artis: -25,
          mesaj: "Şaşırtıcı biçimde kabul etti; yarı fiyata aynı sonuç.",
          detay: "Bazen cesaret para kazandırır.",
        },
        basarisizSonuc: {
          para: -13,
          mesaj: "Hakaret sayıp reddetti; sikkeler boşa gitti, dosya yerinde.",
          detay: "Ucuz teklif, hiç teklifsizden kötü.",
        },
      },
    ],
  },
  {
    id: "aranma_1_mahalle_dedikodusu",
    kategori: "sosyal",
    maxSucSeviyesi: 25,
    agirlik: 3,
    gorsel: "🗣️",
    baslik: "Mahalledeki Dedikodu",
    metin: "Komşular arasında hakkında bir dedikodu dolaşıyor; biraz daha yayılırsa yanlış kulaklara ulaşır.",
    secenekler: [
      {
        metin: "Muhtara 'bağış' yap. (Kefaret: 21)",
        baseBasariSansi: 85,
        maliyet: 21,
        basariliSonuc: {
          para: -21,
          suc_artis: -25,
          mesaj: "Bağış muhtarın ağzını bağladı; dedikodu bir günde söndü.",
          detay: "Cömertlik en iyi susturucu.",
        },
        basarisizSonuc: {
          para: -21,
          mesaj: "Dedikodu çoktan yayılmıştı; muhtar yine de seni savundu.",
          detay: "Bazı sözler geri alınamaz.",
        },
      },
      {
        metin: "Görmezden gel, kendi söner.",
        baseBasariSansi: 50,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Haklıydın; dedikodu birkaç günde başka olaya kaydı.",
          detay: "Sabır en ucuz çözümdür.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          mesaj: "Sessizliğin dedikoduyu doğruladı; söylenti makamlara ulaştı.",
          detay: "Şimdi seni gerçekten arıyorlar.",
        },
      },
    ],
  },

  // ---- Kademe 2 (25-50): "Yakalanma" — öde ve kefaretle düş, ya da reddet (reddedip kaybedersen hapse girer, oradan kaçmayı deneyebilirsin) ----
  {
    id: "aranma_2_ev_arastirmasi_tehdidi",
    kategori: "siyaset",
    minSucSeviyesi: 25,
    maxSucSeviyesi: 50,
    agirlik: 4,
    gorsel: "🚪",
    baslik: "Ev Araması Tehdidi",
    metin: "Bir görevli ev/iş yeri arama izni çıkaracağını ima ediyor. Şimdi anlaşırsanız kağıt yazılmaz.",
    secenekler: [
      {
        metin: "Kağıt 'kaybolsun'. (Kefaret: 43)",
        baseBasariSansi: 80,
        maliyet: 43,
        basariliSonuc: {
          para: -43,
          suc_artis: -25,
          mesaj: "Kağıt bir daha hiç görülmedi.",
          detay: "Bürokrasi parayla en hızlı işler.",
        },
        basarisizSonuc: {
          para: -43,
          mesaj: "Bir üst araya girdi; kağıt bekletildi, bugün gelmezler.",
          detay: "Her rüşvet garanti değil.",
        },
      },
      {
        metin: "Sakin kal, saklayacak bir şeyin yok.",
        baseBasariSansi: 35,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Kararlı tavrın görevliyi ikna etti; tehdidini geri çekti.",
          detay: "Soğukkanlılık paradan değerli.",
        },
        basarisizSonuc: {
          saglik: -8,
          etiket_ekle: ["hapiste"],
          mesaj: "Blöfünü anladı, arama emri çıktı; ev alt üst, gözaltına alındın.",
          detay: "7-9 yıl hapis; kaçmayı deneyebilirsin.",
        },
      },
    ],
  },
  {
    id: "aranma_2_ihbarci_tehdidi",
    kategori: "sosyal",
    minSucSeviyesi: 25,
    maxSucSeviyesi: 50,
    agirlik: 4,
    gorsel: "🐀",
    baslik: "Bir İhbarcı",
    metin: "Tanıdığın biri ele vermekle tehdit edip susması için bedel istiyor. Tamamını mı verirsin, yarısını mı?",
    secenekler: [
      {
        metin: "İstediği parayı ver. (Kefaret: 46)",
        baseBasariSansi: 82,
        maliyet: 46,
        basariliSonuc: {
          para: -46,
          suc_artis: -25,
          mesaj: "Parayı alınca gerçekten sustu; ihbar gitmedi.",
          detay: "Açgözlü ama sözünü tuttu.",
        },
        basarisizSonuc: {
          para: -46,
          mesaj: "Parayı aldı ama bir şey sızdırmıştı; hasar kısmen oluştu.",
          detay: "Bazı sırlar tam geri alınamaz.",
        },
      },
      {
        metin: "Yarısını teklif et. (Kefaret: 24)",
        baseBasariSansi: 40,
        maliyet: 24,
        basariliSonuc: {
          para: -24,
          suc_artis: -25,
          mesaj: "Beklenmedik biçimde kabul etti; parayı hiç ummuyordu.",
          detay: "Bazen az bile fazlasıyla yeter.",
        },
        basarisizSonuc: {
          para: -24,
          etiket_ekle: ["hapiste"],
          mesaj: "Teklifi hakaret sayıp yetkililere gitti ve seni tutuklattı.",
          detay: "Cimrilik pahalıya patladı: 7-9 yıl hapis.",
        },
      },
    ],
  },
  {
    id: "aranma_2_pazar_ceza_ikinci",
    kategori: "ticaret",
    minSucSeviyesi: 25,
    maxSucSeviyesi: 50,
    agirlik: 4,
    gorsel: "⚖️",
    baslik: "İkinci Ceza",
    metin: "Pazar memuru dosyandaki eski kaydı görüp cezanı ikiye katladı. İtiraz hakkın var, memurun sabrı sınırlı.",
    secenekler: [
      {
        metin: "Sessizce öde. (Kefaret: 49)",
        baseBasariSansi: 88,
        maliyet: 49,
        basariliSonuc: {
          para: -49,
          suc_artis: -25,
          mesaj: "Ödedin; memur dosyanı bir kademe hafifletti.",
          detay: "Bazen susup ödemek en akıllısı.",
        },
        basarisizSonuc: {
          para: -49,
          mesaj: "Makbuzu 'kaybetti', seni yine de listede tuttu.",
          detay: "Bürokrasi kolay unutmaz.",
        },
      },
      {
        metin: "İtiraz et, eski kayıt haksız.",
        baseBasariSansi: 30,
        basariliSonuc: {
          un: 10,
          mesaj: "Savunman mantıklı geldi; memur cezayı iptal etti.",
          detay: "Nadir ama imkansız değil.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          para: -10,
          mesaj: "İtirazın 'küstahlık' sayıldı; dosyana yeni bir not düştü.",
          detay: "Artık daha dikkatli izleniyorsun.",
        },
      },
    ],
  },
  {
    id: "aranma_2_gece_baskin_uyarisi",
    kategori: "siyaset",
    minSucSeviyesi: 25,
    maxSucSeviyesi: 50,
    agirlik: 4,
    gorsel: "🌙",
    baslik: "Gece Baskını Uyarısı",
    metin: "Bir tanıdık fısıldadı: birkaç gün içinde adına küçük bir gece denetimi var. Önceden harekete geçebilirsin.",
    secenekler: [
      {
        metin: "Denetçiyi satın al. (Kefaret: 55)",
        baseBasariSansi: 78,
        maliyet: 55,
        basariliSonuc: {
          para: -55,
          suc_artis: -25,
          mesaj: "Görevli rapora 'temiz' yazıp imzaladı.",
          detay: "Bazı kağıtlar altınla yazılır.",
        },
        basarisizSonuc: {
          para: -55,
          mesaj: "Üstleri de denetime katıldı; rapor temkinli ama ağır değil.",
          detay: "Tam kontrol asla garanti değil.",
        },
      },
      {
        metin: "Ortalığı topla, izleri sil, bekle.",
        baseBasariSansi: 45,
        basariliSonuc: {
          mutluluk: -3,
          mesaj: "Gece boyu temizledin; denetim izsiz geçti.",
          detay: "Bazen tek gereken emektir.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          saglik: -10,
          mesaj: "Bir detayı kaçırdın; denetim görevlileri haklı çıkardı.",
          detay: "Artık resmi bir tehdit sayılıyorsun.",
        },
      },
    ],
  },

  // ---- Kademe 3 (50-75): "Baskın" — kefaretler ciddi artar, ev/işyeri baskını neredeyse kaçınılmaz; tutuklanırsan ceza EN AZ 5 yıl (gameEngine.ts) ----
  {
    id: "aranma_3_tutuklama_ekibi",
    kategori: "siyaset",
    minSucSeviyesi: 50,
    maxSucSeviyesi: 75,
    agirlik: 15,
    gorsel: "⛓️",
    baslik: "Tutuklama Ekibi Sokakta",
    metin: "Artık şüphe değil kesinlik var: özel bir tutuklama ekibi seni arıyor. Sokakta omzunun üstünden bakıyorsun.",
    secenekler: [
      {
        metin: "Ekip başını satın al. (Kefaret: 85)",
        baseBasariSansi: 65,
        maliyet: 85,
        basariliSonuc: {
          para: -85,
          suc_artis: -25,
          mesaj: "Ekip başı parayı alıp 'iz bulunamadı' yazdı.",
          detay: "Yüksek rütbeliler de satılık çıkar.",
        },
        basarisizSonuc: {
          para: -85,
          saglik: -10,
          etiket_ekle: ["hapiste"],
          mesaj: "Parayı aldı ama seni teslim etti: hem parasız hem hapistesin.",
          detay: "Hem altını hem seni satar.",
        },
      },
      {
        metin: "Kaçmadan önce son bir gece saklan.",
        baseBasariSansi: 30,
        basariliSonuc: {
          mutluluk: -5,
          mesaj: "Ahırda saklanıp ekibin aramasını izledin; atlattın.",
          detay: "Ama onlar da senin kadar sabırlı.",
        },
        basarisizSonuc: {
          saglik: -15,
          etiket_ekle: ["hapiste"],
          mesaj: "Saklandığın ahır arandı; kaçacak yerin kalmadı.",
          detay: "Şansın tükendi.",
        },
      },
    ],
  },
  {
    id: "aranma_3_muhbir_agi",
    kategori: "sosyal",
    minSucSeviyesi: 50,
    maxSucSeviyesi: 75,
    agirlik: 15,
    gorsel: "👁️",
    baslik: "Muhbir Ağı",
    metin: "Yetkililer sana ulaşmak için mahalle muhbirlerine para dağıtıyor. En yakın komşun bile ihbar edebilir.",
    secenekler: [
      {
        metin: "Muhbir başına öde. (Kefaret: 92)",
        baseBasariSansi: 60,
        maliyet: 92,
        basariliSonuc: {
          para: -92,
          suc_artis: -25,
          mesaj: "Ağın başı yön değiştirdi; artık başkasını arıyorlar.",
          detay: "En yüksek teklif kazanır.",
        },
        basarisizSonuc: {
          para: -92,
          mesaj: "Ağ kontrolden çıkmıştı; en azından bedel artmadı.",
          detay: "Bazen para bile yetmiyor.",
        },
      },
      {
        metin: "Mahalleni sustur. (Kefaret: 43)",
        baseBasariSansi: 40,
        maliyet: 43,
        basariliSonuc: {
          para: -43,
          suc_artis: -25,
          mesaj: "Mahalle muhbirleri sustu; asıl tehlike oradaymış.",
          detay: "Bazen küçük yatırım yeter.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          para: -43,
          mesaj: "İhbar başka semtten geldi; para boşa gitti.",
          detay: "Dar çözüm dar kalır.",
        },
      },
    ],
  },
  {
    id: "aranma_3_sokak_baskini",
    kategori: "siyaset",
    minSucSeviyesi: 50,
    maxSucSeviyesi: 75,
    agirlik: 15,
    ton: "agir",
    gorsel: "🚨",
    baslik: "Sokak Ortasında Baskın",
    metin: "Köşeyi dönünce iki görevli kimliğini soruyor; ellerinde eşkalini taşıyan bir kağıt var. Kaçacak vakit az.",
    secenekler: [
      {
        metin: "Kalabalığa dalıp koş.",
        baseBasariSansi: 35,
        basariliSonuc: {
          saglik: -5,
          mesaj: "Tezgahların arasından süzülüp bir ara sokağa sığındın.",
          detay: "Kalbin hâlâ küt küt atıyor.",
        },
        basarisizSonuc: {
          saglik: -20,
          etiket_ekle: ["hapiste"],
          mesaj: "Ayağın bir sepete takıldı; düşer düşmez üstüne çöktüler.",
          detay: "Kaçış pek kahramanca bitmedi.",
        },
      },
      {
        metin: "'Yanlış kişi' de. (Kefaret: 77)",
        baseBasariSansi: 55,
        maliyet: 77,
        basariliSonuc: {
          para: -77,
          suc_artis: -25,
          mesaj: "Biraz parayı 'düşürdün'; görevliler eşkali unuttu.",
          detay: "Kimlik kontrolü altınla çözülür.",
        },
        basarisizSonuc: {
          para: -77,
          etiket_ekle: ["hapiste"],
          mesaj: "İkna olmadılar; paranı kaybettin, kelepçelendin.",
          detay: "Hiçbir şey işe yaramadı.",
        },
      },
    ],
  },
  {
    id: "aranma_3_kefaret_odemesi",
    kategori: "din",
    minSucSeviyesi: 50,
    maxSucSeviyesi: 75,
    agirlik: 6,
    gorsel: "🪙",
    baslik: "Resmi Kefaret Ödemesi",
    metin: "Yargıca ulaşan bir aracı, uygun bir kefaretle dosyanı resmen hafifletebileceğini söylüyor.",
    secenekler: [
      {
        metin: "Kefareti öde. (Kefaret: 101)",
        baseBasariSansi: 75,
        maliyet: 101,
        basariliSonuc: {
          para: -91,
          suc_artis: -25,
          mesaj: "Kefaret makamlara ulaştı; dosyan bir kademe hafifledi.",
          detay: "Adalet bazen faturalı iştir.",
        },
        basarisizSonuc: {
          para: -101,
          mesaj: "Hiçbir şey değişmedi; aracı parayı cebe atmış olabilir.",
          detay: "Aracılara güvenmek risklidir.",
        },
      },
      {
        metin: "Aracıya güvenme, kendin hallet.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Aracıyı geri çevirdin; en azından aldatılmadın.",
          detay: "Hiçbir şey yapmamak güvenli.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Reddettin ama 'ya işe yarasaydı' sorusu seni yiyor.",
          detay: "Tereddüt en büyük düşmandır.",
        },
      },
    ],
  },

  // ---- Kademe 4 (75-100): "Azılı Suçlu" — en sert sonuçlar; tutuklanırsan ceza SABİT 10 yıl + en yüksek kefaretler (gameEngine.ts) ----
  {
    id: "aranma_4_azami_takip",
    kategori: "siyaset",
    minSucSeviyesi: 75,
    ton: "agir",
    agirlik: 18,
    gorsel: "🎯",
    baslik: "Azami Takip",
    metin: "Senin için özel bir birim kuruldu; her sokakta bir göz, her handa bir soru. Kaçmak neredeyse imkansız.",
    secenekler: [
      {
        metin: "Hepsini kefarete dök. (Kefaret: 154)",
        baseBasariSansi: 55,
        maliyet: 154,
        basariliSonuc: {
          para: -154,
          suc_artis: -45,
          mesaj: "Kefaret en üst makamlara ulaştı; takip birimi küçültüldü.",
          detay: "Servetin hayatını satın aldı.",
        },
        basarisizSonuc: {
          para: -154,
          saglik: -10,
          etiket_ekle: ["hapiste"],
          mesaj: "O kadar paraya rağmen yakalandın; nakdin de gitti.",
          detay: "Azılı suçlu damgası: 12-14 yıl.",
        },
      },
      {
        metin: "Şehirden tamamen uzaklaş, iz bırakma.",
        baseBasariSansi: 25,
        basariliSonuc: {
          saglik: -10,
          suc_artis: -65,
          mesaj: "Günlerce ara yollardan gidip nüfuz alanından çıktın.",
          detay: "Sınırın ötesini aramazlar.",
        },
        basarisizSonuc: {
          saglik: -25,
          etiket_ekle: ["hapiste"],
          mesaj: "Şehir kapısında bekliyorlardı; kaçış başlamadan bitti.",
          detay: "Her çıkış gözetleniyor; 12-14 yıl.",
        },
      },
    ],
  },
  {
    id: "aranma_4_odul_avcilari",
    kategori: "siyaset",
    minSucSeviyesi: 75,
    ton: "agir",
    agirlik: 18,
    gorsel: "🏹",
    baslik: "Ödül Avcıları",
    metin: "Başına konan ödül, ödül avcılarını da harekete geçirdi. Artık parayı koklayan herkesten saklanmalısın.",
    secenekler: [
      {
        metin: "Bir avcıyı yanına çek. (Kefaret: 139)",
        baseBasariSansi: 50,
        maliyet: 139,
        basariliSonuc: {
          para: -139,
          suc_artis: -45,
          mesaj: "Avcı teklifini ödülden cazip buldu, diğerlerini yanılttı.",
          detay: "Bazen avcı en iyi müttefiktir.",
        },
        basarisizSonuc: {
          para: -139,
          saglik: -20,
          etiket_ekle: ["hapiste"],
          mesaj: "Avcı parayı alıp seni teslim etti: parasız ve yaralısın.",
          detay: "Avcıya güven olmaz; ceza 12-14 yıl.",
        },
      },
      {
        metin: "Kimliğini değiştirip kaybol.",
        baseBasariSansi: 30,
        basariliSonuc: {
          un: -15,
          suc_artis: -45,
          mesaj: "Görünüşünü değiştirdin; eski eşkalin işe yaramıyor.",
          detay: "Biraz itibar kaybettin, hayattasın.",
        },
        basarisizSonuc: {
          saglik: -20,
          etiket_ekle: ["hapiste"],
          mesaj: "Kılık değiştirmen bir avcıdan kaçmadı; tanıyıp yakaladı.",
          detay: "Maskeye kanmayan gözler var; 12-14 yıl.",
        },
      },
    ],
  },
  {
    id: "aranma_4_son_sans_kefareti",
    kategori: "din",
    minSucSeviyesi: 75,
    agirlik: 7,
    gorsel: "🙏",
    baslik: "Son Şans Kefareti",
    metin: "Etkili bir aracı en üst makamlara şefaat edebileceğini söylüyor — ama bedeli akıl almaz bir kefaret.",
    secenekler: [
      {
        metin: "Devasa kefareti öde. (Kefaret: 200)",
        baseBasariSansi: 60,
        maliyet: 200,
        basariliSonuc: {
          para: -190,
          suc_artis: -65,
          mesaj: "Şefaat işe yaradı; dosyan neredeyse tertemiz.",
          detay: "Büyük borç, büyük parayla kapanır.",
        },
        basarisizSonuc: {
          para_yuzde_kaybet: 50,
          mesaj: "Şefaat tutmadı; paranın çoğu 'masraf' diye gitti.",
          detay: "Büyük kumar büyük kayıp getirir.",
        },
      },
      {
        metin: "Riske girme, paranı koru.",
        baseBasariSansi: 95,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Teklifi reddettin; son paran cebinde kaldı.",
          detay: "Bazen hiç oynamamak en akıllısı.",
        },
        basarisizSonuc: {
          mutluluk: -8,
          mesaj: "Reddettin ama 'ya kurtarsaydı' düşüncesi uyutmadı.",
          detay: "Bu seviyede her karar ağır.",
        },
      },
    ],
  },
  {
    id: "aranma_4_gece_yarisi_baskini",
    kategori: "siyaset",
    minSucSeviyesi: 75,
    ton: "agir",
    agirlik: 18,
    gorsel: "🔦",
    baslik: "Gece Yarısı Kapı Çalınıyor",
    metin: "Gece yarısı kapı şiddetle vuruluyor; dışarıda meşaleler, öfkeli sesler. Büyük baskının küçük bir öncüsü.",
    secenekler: [
      {
        metin: "Çatıya sıçrayıp kaç.",
        baseBasariSansi: 30,
        basariliSonuc: {
          saglik: -12,
          mesaj: "Kayarak komşu çatıya atladın; bağırışlar geride kaldı.",
          detay: "Hayatının en hızlı koşusuydu.",
        },
        basarisizSonuc: {
          saglik: -22,
          etiket_ekle: ["hapiste"],
          mesaj: "Çatıdan düştün, düşer düşmez üstüne çöktüler.",
          detay: "Plan tutmadı; önünde 12-14 yıl var.",
        },
      },
      {
        metin: "Parayla oyala. (Kefaret: 147)",
        baseBasariSansi: 45,
        maliyet: 147,
        basariliSonuc: {
          para: -147,
          suc_artis: -45,
          mesaj: "Parayı komutana tutuşturdun; 'yanlış ev' deyip çekildi.",
          detay: "Açgözlülük hayatını kurtardı.",
        },
        basarisizSonuc: {
          para: -147,
          saglik: -15,
          etiket_ekle: ["hapiste"],
          mesaj: "Komutan parayı reddedip işaret etti; kapı kırıldı.",
          detay: "Teklif yetmedi; 12-14 yıl yatarsın.",
        },
      },
    ],
  },

  // ---- Kritik olay: Ev/İş Yeri Baskını — Kademe 3 VE 4'te devreye girer (50+) ----
  {
    id: "aranma_baskin_ortacag",
    kategori: "siyaset",
    cag: "Orta Çağ",
    minSucSeviyesi: 50,
    ton: "agir",
    agirlik: 28,
    gorsel: "🏹",
    baslik: "Ev Baskını",
    metin:
      "Şafakta kapın kırıldı. Zırhlı muhafızlar lordun mühürlü arama emriyle doldu. Üç yolun var, hepsi bedelli.",
    secenekler: [
      {
        metin: "Teslim ol, direnme.",
        baseBasariSansi: 95,
        basariliSonuc: {
          etiket_ekle: ["hapiste"],
          para_sifirla: true,
          un_sifirla: true,
          suc_seviyesi_ayarla: 10,
          mesaj: "Teslim oldun; evin yağmalandı, zincire vuruldun.",
          detay: "En az 9 yıl; kefaret kısaltmaz.",
        },
        basarisizSonuc: {
          saglik: -10,
          etiket_ekle: ["hapiste"],
          para_sifirla: true,
          un_sifirla: true,
          suc_seviyesi_ayarla: 10,
          mesaj: "Teslim olsan da yere yapıştırıldın; kelepçe acıttı.",
          detay: "Direnmemek de dayaktan kurtarmadı.",
        },
      },
      {
        metin: "Rüşvet ver. (En az 77 gerekir)",
        baseBasariSansi: 60,
        maliyet: 77,
        basariliSonuc: {
          para_yuzde_kaybet: 75,
          suc_seviyesi_ayarla: 30,
          mesaj: "Başmuhafız altınları görünce 'yanlış ev' deyip çekildi.",
          detay: "Servet gitti, özgürsün; ad kayıtlı.",
        },
        basarisizSonuc: {
          para_yuzde_kaybet: 75,
          saglik: -8,
          etiket_ekle: ["hapiste"],
          un_sifirla: true,
          suc_seviyesi_ayarla: 10,
          mesaj: "Altını alıp seni yine de verdi: parasız, kelepçeli.",
          detay: "Bazıları hem parayı hem seni satar.",
        },
      },
      {
        metin: "Arka kapıdan kaçmayı dene.",
        baseBasariSansi: 25,
        basariliSonuc: {
          saglik: -9,
          suc_seviyesi_ayarla: 10,
          etiket_ekle: ["kacak"],
          mesaj: "Duvarı aşıp kayboldun; günler sonra bir dağ mağarasına sığındın.",
          detay: "Artık dağların sakladığı bir kaçaksın.",
        },
        basarisizSonuc: {
          saglik: -28,
          etiket_ekle: ["hapiste"],
          para_sifirla: true,
          un_sifirla: true,
          suc_seviyesi_ayarla: 10,
          mesaj: "Duvarda bileğini kavradılar; direnmek sadece dayak getirdi.",
          detay: "Dayak yedin, yine de zindandasın.",
        },
      },
    ],
  },
  {
    id: "aranma_baskin_sanayi",
    kategori: "siyaset",
    cag: "Sanayi Devrimi",
    minSucSeviyesi: 50,
    ton: "agir",
    agirlik: 28,
    gorsel: "🚔",
    baslik: "İş Yeri Baskını",
    metin:
      "Sabaha karşı üniformalı görevliler resmi emirle baskın yaptı; adın takip listesinde. Üç yolun var, hepsi bedelli.",
    secenekler: [
      {
        metin: "Teslim ol, direnme.",
        baseBasariSansi: 95,
        basariliSonuc: {
          etiket_ekle: ["hapiste"],
          para_sifirla: true,
          un_sifirla: true,
          suc_seviyesi_ayarla: 10,
          mesaj: "Teslim oldun; kasana el kondu, demir kelepçelendin.",
          detay: "En az 9 yıl; kefaret kısaltmaz.",
        },
        basarisizSonuc: {
          saglik: -10,
          etiket_ekle: ["hapiste"],
          para_sifirla: true,
          un_sifirla: true,
          suc_seviyesi_ayarla: 10,
          mesaj: "Teslim olsan da duvara bastırıldın; kelepçe acıttı.",
          detay: "Direnmemek de sertlikten kurtarmadı.",
        },
      },
      {
        metin: "Rüşvet ver. (En az 77 gerekir)",
        baseBasariSansi: 60,
        maliyet: 77,
        basariliSonuc: {
          para_yuzde_kaybet: 75,
          suc_seviyesi_ayarla: 30,
          mesaj: "Amirin çekmecesindeki tomar, emri sessizce cebe koydurdu.",
          detay: "Servet gitti, özgürsün; dosya bekler.",
        },
        basarisizSonuc: {
          para_yuzde_kaybet: 75,
          saglik: -8,
          etiket_ekle: ["hapiste"],
          un_sifirla: true,
          suc_seviyesi_ayarla: 10,
          mesaj: "Amir parayı alıp emri yine uyguladı: parasız, kelepçeli.",
          detay: "Rüşveti de seni de alırlar.",
        },
      },
      {
        metin: "Arka kapıdan kaçmayı dene.",
        baseBasariSansi: 25,
        basariliSonuc: {
          saglik: -9,
          suc_seviyesi_ayarla: 10,
          etiket_ekle: ["kacak"],
          mesaj: "Avludan atlayıp sokaklara karıştın; günler sonra dağ köyündesin.",
          detay: "Artık dağların sakladığı bir kaçaksın.",
        },
        basarisizSonuc: {
          saglik: -28,
          etiket_ekle: ["hapiste"],
          para_sifirla: true,
          un_sifirla: true,
          suc_seviyesi_ayarla: 10,
          mesaj: "Düdük öttü, iki görevli yolunu kesti; direnmek dayak getirdi.",
          detay: "Dayak yedin, yine de zindandasın.",
        },
      },
    ],
  },

  // ---- Kaçak (dağ/fugitive) havuzu: "kacak" etiketiyle şehir havuzu tamamen
  // kapanır (hapisOlayi/yolculukOlayi ile birebir aynı mantık) — bu yüzden bu
  // havuz kendi başına yeterli olmalı, hiçbir filtre (cag/meslek) taşımaz.
  {
    id: "aranma_kacak_ilk_geceler",
    kategori: "saglik",
    kacakOlayi: true,
    agirlik: 1.3,
    gorsel: "🔥",
    baslik: "Dağ Başındaki İlk Geceler",
    metin: "Mağara soğuğu kemiklerine işliyor; ne çatın ne dostun var. Hayatta kalmak için hızlı öğrenmelisin.",
    secenekler: [
      {
        metin: "Son sikkelerle çobandan erzak al.",
        baseBasariSansi: 70,
        maliyet: 10,
        basariliSonuc: {
          para: -10,
          saglik: 10,
          mesaj: "Çoban soru sormadan ekmek ve peynir sattı.",
          detay: "Dağ insanı soru sormaz.",
        },
        basarisizSonuc: {
          para: -10,
          mesaj: "Çoban parayı aldı ama söz verdiğinden az erzak verdi.",
          detay: "Kaçaklar iyi pazarlık yapamaz.",
        },
      },
      {
        metin: "Doğadan kendin topla.",
        baseBasariSansi: 45,
        basariliSonuc: {
          saglik: 5,
          mesaj: "Yabani meyve ve kök bulup karnını doyurdun.",
          detay: "Dağ sabırlıya verir.",
        },
        basarisizSonuc: {
          saglik: -12,
          mesaj: "Yanlış bitkiyi yiyip geceyi kıvranarak geçirdin.",
          detay: "Dağın her armağanı güvenli değil.",
        },
      },
    ],
  },
  {
    id: "aranma_kacak_diger_kacaklar",
    kategori: "sosyal",
    kacakOlayi: true,
    agirlik: 1.1,
    gorsel: "🏕️",
    baslik: "Diğer Kaçaklar",
    metin: "Bir vadide, senin gibi kanundan kaçan küçük bir grup ateş yakmış. Aralarına katılman teklif ediliyor.",
    secenekler: [
      {
        metin: "Gruba katıl, birlikte kalın.",
        baseBasariSansi: 65,
        basariliSonuc: {
          ekip_ekle: { rol: "Haydut", tahminGenisligi: 30 },
          mutluluk: 10,
          mesaj: "Ateşin başında hikayeni anlattın; grup seni kabul etti.",
          detay: "Yalnızlık biraz hafifledi.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Güvensizlik sezip geceyi tek başına, uzakta geçirdin.",
          detay: "Kaçak, kaçağa güvenmez.",
        },
      },
      {
        metin: "Uzak dur, yalnız kal.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Grubu selamlayıp geçtin; yalnızlık daha az riskli.",
          detay: "Yalnızlık bazen tercihtir.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Onları geride bırakırken içini yalnızlık kapladı.",
          detay: "Dağda yalnız kalmak ağır bedel.",
        },
      },
    ],
  },
  {
    id: "aranma_kacak_yasli_cift",
    kategori: "sosyal",
    kacakOlayi: true,
    agirlik: 1.1,
    gorsel: "🏚️",
    baslik: "Issız Bir Kulübe",
    metin: "Dağ eteğinde yaşlı bir çift sana barınak teklif etti. Kimliğini sormuyorlar ama gözlerinde merak var.",
    secenekler: [
      {
        metin: "Kulübelerini onarmaya yardım et.",
        baseBasariSansi: 80,
        basariliSonuc: {
          ahlak: 10,
          mutluluk: 8,
          saglik: 5,
          mesaj: "Çatı onarıp odun kestin; çift sana çocukları gibi baktı.",
          detay: "Bazı aileler kansız kurulur.",
        },
        basarisizSonuc: {
          saglik: -5,
          mesaj: "Şehirli ellerin dağ işine yatkın değildi.",
          detay: "Yine de niyetin takdir edildi.",
        },
      },
      {
        metin: "Gece azıklarını çalıp sıvış.",
        baseBasariSansi: 60,
        basariliSonuc: {
          suc_sinifi: "orta",
          para: 15,
          ahlak: -15,
          mesaj: "Kilerden aldığın erzakla sessizce dağa döndün.",
          detay: "Yaşamak bazen vicdanı geride bırakır.",
        },
        basarisizSonuc: {
          suc_sinifi: "buyuk",
          ahlak: -10,
          mutluluk: -10,
          mesaj: "Yaşlı adam seni yakaladı; hayal kırıklığı her sözden ağırdı.",
          detay: "Utanç bazen açlıktan çok acıtır.",
        },
      },
    ],
  },
  {
    id: "aranma_kacak_iz_surenler",
    kategori: "siyaset",
    kacakOlayi: true,
    agirlik: 1.0,
    ton: "agir",
    gorsel: "🐺",
    baslik: "İzini Sürenler",
    metin: "Uzaktan köpek havlaması ve at nalı sesleri kanını dondurdu; birileri hâlâ izini sürüyor olabilir.",
    secenekler: [
      {
        metin: "Kampı sök, başka vadiye geç.",
        baseBasariSansi: 55,
        basariliSonuc: {
          saglik: -8,
          mesaj: "Gece toplanıp saatlerce yürüdün; yeni vadi daha güvenli.",
          detay: "Sürekli hareket kaçağın dostudur.",
        },
        basarisizSonuc: {
          saglik: -15,
          mesaj: "Karanlıkta kayalıktan düştün; yine de mesafe koydun.",
          detay: "Bu kaçış hiç kolay geçmedi.",
        },
      },
      {
        metin: "Sakince bekleyip sesleri izle.",
        baseBasariSansi: 35,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Sesler bir avcı grubuymuş; boşuna paniklemişsin.",
          detay: "Dağda her ses tehdit değildir.",
        },
        basarisizSonuc: {
          saglik: -18,
          mesaj: "İz sürücülermiş; fark edip kovaladılar, güç bela sıyrıldın.",
          detay: "Bu sefer şansın yaver gitmedi.",
        },
      },
    ],
  },
  {
    id: "aranma_kacak_kervan_baskini",
    kategori: "ticaret",
    kacakOlayi: true,
    agirlik: 1.0,
    gorsel: "🐎",
    baslik: "Yalnız Bir Kervana Rastladın",
    metin: "Dağ geçidinden yalnız geçen küçük bir tüccar kervanı gördün. Erzağa ihtiyacın var; soymak bir seçenek.",
    secenekler: [
      {
        metin: "Pusu kur, kervanı bas.",
        baseBasariSansi: 40,
        basariliSonuc: {
          suc_sinifi: "buyuk",
          para: 30,
          ahlak: -15,
          mesaj: "Baskın işe yaradı; erzak ve birkaç sikke aldın.",
          detay: "Dağın kanunu şehrinkinden farklı.",
        },
        basarisizSonuc: {
          suc_sinifi: "agir",
          saglik: -20,
          ahlak: -5,
          mesaj: "Kervancılar daha iyi silahlıydı; kaçarken ağır darbe aldın.",
          detay: "Her pusu planlandığı gibi gitmez.",
        },
      },
      {
        metin: "Dürüst bir takas teklif et.",
        baseBasariSansi: 60,
        basariliSonuc: {
          para: -5,
          saglik: 8,
          mesaj: "Eşyalarını erzakla takas ettin; kervancı soru sormadı.",
          detay: "Tüccar ticaret düşünür.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Kervancı eşkalini tanıyıp iş yapmadı; eli boş döndün.",
          detay: "Adın dağ yollarına bile ulaşmış.",
        },
      },
    ],
  },
  {
    id: "aranma_kacak_soguk_kis",
    kategori: "saglik",
    kacakOlayi: true,
    agirlik: 1.0,
    gorsel: "❄️",
    baslik: "Amansız Bir Kış",
    metin: "Dağ başındaki ilk kışın acımasız; kar fırtınası günlerce dinmiyor, erzağın tükeniyor.",
    secenekler: [
      {
        metin: "Her şeyi ateşe ve barınağa harca.",
        baseBasariSansi: 75,
        basariliSonuc: {
          saglik: -5,
          mesaj: "Fırtınayı zor atlattın; parmakların kıl payı kurtuldu.",
          detay: "Kış dağın gerçek yüzünü gösterdi.",
        },
        basarisizSonuc: {
          saglik: -22,
          mesaj: "Fırtına barınağını yıktı; günlerce açıkta titredin.",
          detay: "Bazı kışlar neredeyse imkansız.",
        },
      },
      {
        metin: "Alçak bir vadiye inmeyi göze al.",
        baseBasariSansi: 45,
        basariliSonuc: {
          saglik: 5,
          mesaj: "İnişte bulduğun terk edilmiş kulübe seni fırtınadan korudu.",
          detay: "Bazen risk tek çaredir.",
        },
        basarisizSonuc: {
          saglik: -18,
          mesaj: "İnerken fırtınada kalıp saatlerce yön bulamadın.",
          detay: "Dağ cömert olduğu kadar acımasız.",
        },
      },
    ],
  },
  {
    id: "aranma_kacak_yeni_kimlik",
    kategori: "ticaret",
    kacakOlayi: true,
    agirlik: 0.6,
    gorsel: "🎭",
    baslik: "Yeni Bir Kimlik",
    metin: "Dağ köyünde sahte kimlik düzenleyen gizemli bir adamla tanıştın. Parayla geçmişini silebilirsin.",
    secenekler: [
      {
        metin: "Kimlik al. (En az 40 gerekir)",
        baseBasariSansi: 55,
        maliyet: 40,
        basariliSonuc: {
          para: -34,
          un: -8,
          etiket_sil: ["kacak"],
          etiket_ekle: ["kalici:yeni_kimlik"],
          mesaj: "Eski adın geride kaldı; kimse seni tanımıyor, aramıyor.",
          detay: "İzler silindi ama hayattasın.",
        },
        basarisizSonuc: {
          para: -40,
          mesaj: "Kağıtlar o kadar kötü sahteydi ki kullanamadın.",
          detay: "Bazı 'usta'lar para almakta ustadır.",
        },
      },
      {
        metin: "Güvenme, kendi yoluna devam et.",
        baseBasariSansi: 90,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Teklifi reddedip dağın derinliklerine yürüdün.",
          detay: "Güvenmemek bazen en güvenlisi.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Reddettin ama günlerce 'ya kabul etseydim' diye düşündün.",
          detay: "Bazı fırsatlar geri gelmez.",
        },
      },
    ],
  },
  {
    id: "aranma_kacak_iz_soguyor",
    kategori: "siyaset",
    kacakOlayi: true,
    agirlik: 0.5,
    gorsel: "🕊️",
    baslik: "İzin Soğuduğu Zaman",
    metin: "Yıllar geçti. Gezginler artık senin hikayeni değil, başka dedikodular taşıyor. Belki kimse peşinde değil.",
    secenekler: [
      {
        metin: "Temkinle şehre, eski hayatına dön.",
        baseBasariSansi: 60,
        basariliSonuc: {
          etiket_sil: ["kacak"],
          suc_seviyesi_ayarla: 10,
          mutluluk: 12,
          mesaj: "Şehre girdiğinde kimse bakmadı bile; adın unutulmuş.",
          detay: "Yıllar sonra korkmadan yürüdün.",
        },
        basarisizSonuc: {
          saglik: -10,
          mesaj: "Şehre girerken tanıdık biri seni fark etti; dağa kaçtın.",
          detay: "Bazı geçmişler uzun hafızalıdır.",
        },
      },
      {
        metin: "Riske girme, dağda kal.",
        baseBasariSansi: 95,
        basariliSonuc: {
          unvan_kazan: "Dağların Efsanesi",
          mutluluk: 5,
          mesaj: "Şehri sonsuza dek bıraktın; dağ artık yurdun.",
          detay: "Adın aşağıda bir masala dönüştü.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          mesaj: "Kararından emin olamadın; huzursuz bir gece geçirdin.",
          detay: "Bazı kararlar sonra da rahatsız eder.",
        },
      },
    ],
  },
  {
    id: "aranma_kacak_dagli_koyu_ticaret",
    kategori: "ticaret",
    kacakOlayi: true,
    agirlik: 0.9,
    gorsel: "🧺",
    baslik: "Uzak Bir Dağ Köyü",
    metin: "Haritada bile zor bulunan küçük bir dağ köyüne rastladın. Köylüler temkinli, düşman değil; alışveriş olabilir.",
    secenekler: [
      {
        metin: "Avladığın/topladığın malları sat.",
        baseBasariSansi: 70,
        basariliSonuc: {
          mutluluk: -7,
          un: -3,
          para: 18,
          mesaj: "Köylüler iyi fiyat verdi; cebine biraz para girdi.",
          detay: "Nadir mal dağda değerlidir.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          para: 5,
          mesaj: "Köylüler pazarlıkta sıkıştırdı; beklediğinden az kazandın.",
          detay: "Dağ köyünün pazarlığı kendine has.",
        },
      },
      {
        metin: "Handa bir gece kalıp dinlen.",
        baseBasariSansi: 85,
        maliyet: 5,
        basariliSonuc: {
          para: -5,
          saglik: 10,
          mutluluk: 8,
          mesaj: "Ocak başında haftalar sonra ilk rahat uykuyu uyudun.",
          detay: "Bazen dört duvar ve bir ateş yeter.",
        },
        basarisizSonuc: {
          para: -5,
          mesaj: "Ocak sıcaktı ama kaygılar uyumana izin vermedi.",
          detay: "Kaçağın zihni tam dinlenmez.",
        },
      },
    ],
  },
  {
    id: "aranma_kacak_vahsi_hayvan",
    kategori: "saglik",
    kacakOlayi: true,
    agirlik: 0.9,
    gorsel: "🐻",
    baslik: "Karşına Çıkan Vahşi Hayvan",
    metin: "Dar bir dağ patikasında karşına iri bir yaban hayvanı çıktı; ne o çekiliyor ne sen geçebiliyorsun.",
    secenekler: [
      {
        metin: "Ani hareket etmeden yavaşça çekil.",
        baseBasariSansi: 65,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Adım adım çekilip başka patikaya geçtin; fark etmedi.",
          detay: "Dağda sabır kılıçtan değerlidir.",
        },
        basarisizSonuc: {
          saglik: -15,
          mesaj: "Çekilirken dala takılıp düştün; ses hayvanı saldırttı.",
          detay: "Dağda en küçük hata ağır öder.",
        },
      },
      {
        metin: "Elindekiyle savaş, kendini koru.",
        baseBasariSansi: 40,
        basariliSonuc: {
          mutluluk: -5,
          un: -2,
          saglik: -8,
          para: 12,
          mesaj: "Zorlu boğuşmadan sonra hayvanı püskürttün; postu işe yarar.",
          detay: "Hayatta kalmak bazen savaşmaktır.",
        },
        basarisizSonuc: {
          saglik: -25,
          mesaj: "Hayvan çok güçlüydü; pençeleri derin izler bıraktı.",
          detay: "Bazı kavgalar baştan kaybedilmiştir.",
        },
      },
    ],
  },
];
