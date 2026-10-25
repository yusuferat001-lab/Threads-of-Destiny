import type { OlayTanimi, OlaySecenegi } from "./types";

/**
 * Zanaatkâr hizipleri (Lonca Meclisi / Serbest Ustalar) için özel olay havuzları (2026-10).
 * `hizip_zanaatkar_saflasma` (genel.ts) karakteri bu iki taraftan birine yazar; ama bu taraflar için
 * hiç özel olay yoktu — hizip takip garantisi tek bir genel olayı tekrar tekrar zorluyordu.
 * Her hizbe 8 olay; hepsi `hizip:<ad>` etiketine bağlı, çağdan bağımsız (lonca/atölye dili).
 */

type Sonuc = OlaySecenegi["basariliSonuc"];

function secenek(
  metin: string,
  baseBasariSansi: number,
  basarili: Sonuc,
  basarisiz: Sonuc
): OlaySecenegi {
  return { metin, baseBasariSansi, basariliSonuc: basarili, basarisizSonuc: basarisiz };
}

function olay(
  id: string,
  hizip: "Lonca Meclisi" | "Serbest Ustalar",
  gorsel: string,
  baslik: string,
  metin: string,
  secenekler: OlaySecenegi[]
): OlayTanimi {
  return {
    id,
    kategori: "zanaat",
    meslekler: ["Zanaatkâr"],
    gerekliEtiketler: [`hizip:${hizip}`],
    agirlik: 1.4,
    gorsel,
    baslik,
    metin,
    secenekler,
  };
}

export const OLAY_HIZIP_ZANAATKAR: OlayTanimi[] = [
  // ═══════════════════════════ LONCA MECLİSİ ═══════════════════════════
  olay("hizip_lonca_meclisi_sabit_tarife", "Lonca Meclisi", "⚖️", "Sabit Tarife",
    "Meclis bu yıl için tek bir fiyat tarifesi ilan etti. Altına satan da üstüne satan da cezalanacak.",
    [
      secenek("Tarifeye harfiyen uy.", 85,
        { para: 10, un: 4, ahlak: 2, mesaj: "Tarifeye uydun; Meclis seni örnek gösterdi.", detay: "Düzen sakin ama dar bir kazanç verir." },
        { para: -6, mutluluk: -2, mesaj: "Müşteri tarifeyi beğenmeyip komşuna gitti.", detay: "Sabit fiyat, sabit müşteri vermez." }),
      secenek("Müşteriye göz kırp, biraz indir.", 45,
        { para: 18, ahlak: -4, mesaj: "İndirimle müşteri doldu; kimse görmedi.", detay: "Kuralın kıyısı geniştir." },
        { para: -18, un: -6, mesaj: "Denetçi indirimini yakaladı; ceza yedin.", detay: "Meclis küçük sapmayı da duyar." }),
    ]),
  olay("hizip_lonca_meclisi_cirak_siniri", "Lonca Meclisi", "🧑‍🏭", "Çırak Sınırı",
    "Meclis her ustaya en çok iki çırak hakkı tanıdı. Atölyende iş yığıldı, üçüncü çırak işine yarardı.",
    [
      secenek("Kurala uy, işi iki çırakla yürüt.", 90,
        { un: 4, ahlak: 3, mutluluk: -2, mesaj: "İş yavaşladı ama Meclis'in gözünde temizsin.", detay: "Sabır usta işidir." },
        { para: -8, mutluluk: -3, mesaj: "Yetişemedin, bir sipariş elden gitti.", detay: "Kural yorar." }),
      secenek("Üçüncü çırağı gizlice çalıştır.", 50,
        { para: 14, ahlak: -4, mesaj: "Siparişler yetişti; üçüncü çırak kimseye görünmedi.", detay: "Gizli emek, gizli kâr." },
        { para: -16, un: -7, mesaj: "Üçüncü çırak ihbar edildi; atölyen mühürlendi.", detay: "Meclis çırak sayar." }),
    ]),
  olay("hizip_lonca_meclisi_muhur_aidati", "Lonca Meclisi", "🔖", "Muhür Aidatı",
    "Meclis ustalık muhrünü yeniledi. Her atölye bu yıl ek aidat ödeyecek, ödemeyen muhrü kaybeder.",
    [
      secenek("Aidatı eksiksiz öde.", 90,
        { para: -9, un: 5, ahlak: 2, mesaj: "Muhrün yenilendi; adın defterde güvende.", detay: "Muhür, güvenin makbuzudur." },
        { para: -12, mutluluk: -2, mesaj: "Defterci tutarı yanlış yazdı, iki kez ödedin.", detay: "Düzen de şaşar." }),
      secenek("Aidatı geciktirip pazarlık et.", 50,
        { para: -3, un: 3, mesaj: "Meclis süre tanıdı; kazancını korudun.", detay: "Sözün geçiyorsa vakit kazanırsın." },
        { para: -14, un: -6, mesaj: "Süre tanınmadı; ceza ve aidat birlikte kesildi.", detay: "Geciken, katlanır." }),
    ]),
  olay("hizip_lonca_meclisi_serbest_usta", "Lonca Meclisi", "🚪", "Kapı Komşusu",
    "Yan sokaktaki bir serbest usta, Meclis'e uymadan iş yapıyor. Müşteriler ona akıyor.",
    [
      secenek("Meclis'e ihbar et.", 70,
        { para: 12, un: 3, ahlak: -5, mesaj: "Atölyesi kapatıldı; müşterileri sana döndü.", detay: "Düzen korundu, komşuluk bozuldu." },
        { ahlak: -4, un: -4, mutluluk: -3, mesaj: "İhbarın duyuldu; sokakta sana sırt çevirdiler.", detay: "Fısıltı hep geri döner." }),
      secenek("Görmezden gel.", 85,
        { ahlak: 4, mutluluk: -1, mesaj: "Sustun; yan atölye işine devam etti.", detay: "Bazı kapılar çalınmaz." },
        { para: -7, un: -3, mesaj: "Meclis susmanı bir ihanet saydı.", detay: "Sessizlik de suç ortaklığıdır." }),
    ]),
  olay("hizip_lonca_meclisi_denetim", "Lonca Meclisi", "🔍", "Denetim Günü",
    "Meclis denetçisi habersiz atölyene girdi. Ölçüleri, ayarları ve defterini tek tek inceleyecek.",
    [
      secenek("Defterleri eksiksiz göster.", 80,
        { un: 6, ahlak: 3, mesaj: "Denetçi her şeyi yerinde buldu; adın övüldü.", detay: "Temiz defter, rahat uyku." },
        { para: -10, un: -3, mesaj: "Küçük bir kayıt hatası yüzünden ceza yedin.", detay: "En titiz el de yanılır." }),
      secenek("Denetçiyi hediyeyle yumuşat.", 50,
        { para: -6, un: 2, ahlak: -4, mesaj: "Denetçi gözlerini kapadı; ama senden bir hediye eksildi.", detay: "Sessizliğin fiyatı vardır." },
        { para: -22, un: -8, ahlak: -5, mesaj: "Hediye rüşvet sayıldı; Meclis'ten ağır ceza aldın.", detay: "Yanlış kapıya sunulan hediye yakar." }),
    ]),
  olay("hizip_lonca_meclisi_baskan_secimi", "Lonca Meclisi", "🗳️", "Meclis Başkanı",
    "Meclis'in başkanlık seçimi yaklaşıyor. İki aday senden destek istiyor: biri katı, biri esnek.",
    [
      secenek("Katı adayı destekle.", 60,
        { un: 7, ahlak: 3, mesaj: "Adayın kazandı; Meclis'te sözün ağırlaştı.", detay: "Güçlü safta durmak itibar verir." },
        { un: -5, mutluluk: -3, mesaj: "Adayın kaybetti; yeni başkan seni hatırlayacak.", detay: "Yanlış at, uzun yol." }),
      secenek("Oy kullanma, çekimser kal.", 85,
        { mutluluk: -1, mesaj: "Kimseye bağlanmadın; kimse de sana sormadı.", detay: "Tarafsızlık da bir tavırdır." },
        { un: -4, mesaj: "Çekimserliğin korkaklık sayıldı.", detay: "Sessizlik herkese hoş gelmez." }),
    ]),
  olay("hizip_lonca_meclisi_yangin_sandigi", "Lonca Meclisi", "🔥", "Yangın Sandığı",
    "Sokaktaki bir atölye yandı. Meclis herkesten yardım sandığına pay istiyor.",
    [
      secenek("Payını cömertçe ver.", 90,
        { para: -12, un: 8, ahlak: 5, mesaj: "Yangınzede ayağa kalktı; Meclis seni övdü.", detay: "Verdiğin geri döner, geç de olsa." },
        { para: -12, ahlak: 2, mutluluk: -2, mesaj: "Sandık kötü yönetildi; paran heba oldu.", detay: "İyilik her zaman yerini bulmaz." }),
      secenek("Asgari payı ver.", 85,
        { para: -4, un: -2, mesaj: "Borcunu ödedin; kimse seni anmadı.", detay: "Az vermek, az sevgi." },
        { para: -4, un: -6, mesaj: "Cimriliğin Meclis'te konuşuldu.", detay: "Küçük kesenin büyük gölgesi olur." }),
    ]),
  olay("hizip_lonca_meclisi_usta_sinavi", "Lonca Meclisi", "🏅", "Ustalık Jürisi",
    "Meclis seni genç bir kalfanın ustalık sınavı jürisine seçti. Kalfanın eseri güzel ama kusurlu.",
    [
      secenek("Eseri onayla.", 60,
        { un: 5, ahlak: 2, mesaj: "Kalfa usta oldu; atölyene minnet duyuyor.", detay: "Cömert jüri, sadık kalfa yapar." },
        { un: -6, mesaj: "Kusur sonradan ortaya çıktı; jürinin itibarı sarsıldı.", detay: "Göz yummak bedel ister." }),
      secenek("Düzeltmesini şart koş.", 80,
        { un: 6, ahlak: 4, mutluluk: -1, mesaj: "Kalfa eserini düzeltti; sınır çıtası yükseldi.", detay: "Sertlik ustalığı korur." },
        { un: -2, mutluluk: -3, mesaj: "Kalfa kırıldı, Meclis seni katı buldu.", detay: "Doğru söz bazen yalnız bırakır." }),
    ]),

  // ═══════════════════════════ SERBEST USTALAR ═══════════════════════════
  olay("hizip_serbest_ustalar_serbest_fiyat", "Serbest Ustalar", "💰", "Kendi Fiyatın",
    "Serbest Ustalar kendi fiyatını kendi koyuyor. Bu hafta pahalı bir sipariş geldi; fiyatı sen belirleyeceksin.",
    [
      secenek("Cesur bir fiyat söyle.", 50,
        { para: 22, un: 3, mesaj: "Müşteri pazarlık etmeden kabul etti.", detay: "Değerini bilen kazanır." },
        { para: -6, mutluluk: -3, mesaj: "Müşteri fiyata bakıp gitti.", detay: "Fiyat cesaret ister, şans da." }),
      secenek("Piyasaya yakın bir fiyat ver.", 85,
        { para: 10, mesaj: "Sipariş makul bir kârla kapandı.", detay: "Ölçülü adım tökezlemez." },
        { para: 2, mutluluk: -2, mesaj: "Sipariş küçüldü, kâr da.", detay: "Güvenli yol dar olur." }),
    ]),
  olay("hizip_serbest_ustalar_cirak_kapisi", "Serbest Ustalar", "🧑‍🎓", "Açık Kapı",
    "Çırak sayısına sınır koyan yok. Kapına altı genç çırak olmak için geldi.",
    [
      secenek("Hepsini al, atölyeyi büyüt.", 55,
        { para: 14, un: 4, mutluluk: -2, mesaj: "Atölye büyüdü; siparişler yetişiyor.", detay: "Büyümek yorar ama kazandırır." },
        { para: -14, mutluluk: -4, mesaj: "Çırakların yarısı işi bıraktı; masraf kaldı.", detay: "Kalabalık emek değildir." }),
      secenek("En yeteneklisini seç.", 85,
        { para: 6, un: 2, ahlak: 2, mesaj: "Tek çırak seni şaşırtacak kadar iyi çıktı.", detay: "Az ama iyi." },
        { para: -3, mesaj: "Seçtiğin çırak sandığın kadar iyi değildi.", detay: "Göz de yanılır." }),
    ]),
  olay("hizip_serbest_ustalar_meclis_baskisi", "Serbest Ustalar", "🚷", "Meclis'in Uyarısı",
    "Lonca Meclisi'nin iki adamı atölyene geldi: ya düzene dön ya da tedarikçilerden mal bulamazsın.",
    [
      secenek("Dik dur, kararından dönme.", 55,
        { un: 8, ahlak: 4, mutluluk: -2, mesaj: "Geri adım atmadın; serbest ustalar seni yüceltti.", detay: "Cesaret çevre yaratır." },
        { para: -16, un: -4, mutluluk: -3, mesaj: "Tedarikçiler mal vermeyi kesti.", detay: "Güç gösterisi pahalıya patlar." }),
      secenek("Yatıştırıcı bir söz ver.", 80,
        { para: -3, ahlak: -3, mesaj: "Süre kazandın ama arkadaşların sorgulayacak.", detay: "Barış bedelsiz değil." },
        { un: -5, ahlak: -3, mesaj: "Hem Meclis hem arkadaşların sana güvenmiyor.", detay: "İki sandalyede oturan düşer." }),
    ]),
  olay("hizip_serbest_ustalar_ortak_atolye", "Serbest Ustalar", "🏚️", "Ortak Atölye",
    "Birkaç serbest usta, kirayı bölüşmek için ortak bir atölye kurmayı teklif ediyor.",
    [
      secenek("Ortaklığa katıl.", 60,
        { para: 12, un: 4, mesaj: "Masraflar bölündü; işler hızlandı.", detay: "Birlikte yük hafifler." },
        { para: -12, mutluluk: -3, mesaj: "Ortaklar anlaşamadı; paranın bir kısmı gitti.", detay: "Ortaklık da bir sınavdır." }),
      secenek("Tek başına devam et.", 85,
        { ahlak: 2, mutluluk: -1, mesaj: "Kendi düzenin bozulmadı.", detay: "Yalnız yol bazen sağlam yoldur." },
        { para: -5, mesaj: "Kira bu yıl ağırdı.", detay: "Yalnızlığın faturası var." }),
    ]),
  olay("hizip_serbest_ustalar_yasak_teknik", "Serbest Ustalar", "🛠️", "Yasak Teknik",
    "Meclis'in yasakladığı yeni bir işleme tekniğini bir serbest usta sana öğretmeyi teklif ediyor.",
    [
      secenek("Tekniği öğren.", 60,
        { para: 16, un: 6, mesaj: "Eserlerin parladı; talep arttı.", detay: "Yenilik kapıyı açar." },
        { para: -10, un: -5, mesaj: "Teknik tutmadı, malzeme heba oldu.", detay: "Her yenilik tutmaz." }),
      secenek("Eski yöntemle sürdür.", 85,
        { ahlak: 2, mutluluk: -1, mesaj: "Elinin alıştığı iş yine temiz çıktı.", detay: "Eski yol da yürür." },
        { para: -5, mesaj: "Rakiplerin yeni yöntemle öne geçti.", detay: "Durmak geri gitmektir." }),
    ]),
  olay("hizip_serbest_ustalar_yabanci_siparis", "Serbest Ustalar", "🌍", "Yabancı Müşteri",
    "Uzaktan gelen bir tüccar, serbest ustalardan büyük bir sipariş istiyor. Teslim tarihi sıkı.",
    [
      secenek("Siparişi kabul et.", 55,
        { para: 24, un: 5, mutluluk: -2, mesaj: "Zamanında teslim ettin; tüccar yeniden gelecek.", detay: "Cesur emek ödenir." },
        { para: -14, un: -5, mutluluk: -3, mesaj: "Teslim gecikti; tüccar ödemeyi kesti.", detay: "Büyük iş büyük risktir." }),
      secenek("Küçük bir parçasını yap.", 85,
        { para: 8, mesaj: "Küçük parça temiz teslim edildi.", detay: "Hesaplı adım güvenli adımdır." },
        { para: 1, mutluluk: -2, mesaj: "Tüccar küçük işi önemsemedi.", detay: "Küçük iş, küçük ilgi." }),
    ]),
  olay("hizip_serbest_ustalar_dayanisma_fonu", "Serbest Ustalar", "🤝", "Dayanışma Fonu",
    "Serbest ustalar hastalanan ya da zarar eden arkadaşlar için ortak bir fon kuruyor.",
    [
      secenek("Fona düzenli katıl.", 90,
        { para: -8, un: 6, ahlak: 5, mesaj: "Fon zor günde bir ustayı ayakta tuttu.", detay: "Dayanışma ağdır." },
        { para: -8, ahlak: 2, mutluluk: -2, mesaj: "Fonu yöneten kayıp çıktı; parayı göremedin.", detay: "Güven de sınanır." }),
      secenek("Katılma, kendi birikimini koru.", 80,
        { para: 4, ahlak: -3, mesaj: "Birikimin korundu; kimse bir şey demedi.", detay: "Soğuk hesap sessiz kalır." },
        { para: 4, un: -5, ahlak: -4, mesaj: "Ayrık duruşun arkadaşlarını kırdı.", detay: "Yalnız zenginlik soğuk olur." }),
    ]),
  olay("hizip_serbest_ustalar_meclise_donus", "Serbest Ustalar", "↩️", "Geri Dönüş Teklifi",
    "Lonca Meclisi seni affetmeye hazır: serbest usta olmaktan vazgeçersen cezalar silinecek.",
    [
      secenek("Teklifi reddet.", 65,
        { un: 6, ahlak: 4, mutluluk: -1, mesaj: "Safını korudun; serbest ustalar senden güç aldı.", detay: "Bağımsızlığın bedeli yüksektir." },
        { para: -12, un: -3, mutluluk: -3, mesaj: "Reddin yüzünden eski cezaların yeniden açıldı.", detay: "Köprüyü yakmak kolay." }),
      secenek("Müzakere et, yarı yoldan karşıla.", 55,
        { para: 5, un: 3, ahlak: -3, mesaj: "Cezaların indirildi; ama bazı arkadaşlar kızgın.", detay: "Uzlaşma herkese yaramaz." },
        { un: -6, ahlak: -4, mesaj: "İki taraf da seni güvenilmez buldu.", detay: "Ortada kalan ezilir." }),
    ]),
];
