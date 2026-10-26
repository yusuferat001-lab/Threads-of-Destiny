import type { OlayTanimi } from "./types";

/**
 * Büyü / büyücü / medyum / kehanet / ritüel temalı gizemli olaylar (büyük denge turu —
 * kullanıcı: "büyü büyücü medyum ve çok farklı gizemli olaylar başımıza gelsin").
 *
 * Hepsi `gizemli: true` → "her ömürde en az bir esrarengiz olay" kaskad garantisi (§11.12)
 * bunları otomatik kapsar; ayrıca düşük `agirlik` ile normal havuzda da fırsatçı çıkarlar.
 * Ton karışık, ama mutluluk deltaları genelde tedirginlik/negatif yönlü (nadir "içi
 * rahatladı" pozitif) — olay geneli morali kırsın kuralına uygun.
 *
 * Orta Çağ: cadılık/engizisyon riski daha ağır. Sanayi Devrimi: sahte medyum / spiritüalist
 * salon dolandırıcılığı. Çağ kısıtı olmayanlar her ikisinde de çıkar.
 */
export const OLAY_BUYULU: OlayTanimi[] = [
  {
    id: "buyu_koy_medyumu",
    gizemli: true,
    kategori: "sosyal",
    agirlik: 0.5,
    minYas: 16,
    gorsel: "🔮",
    baslik: "Köyün Medyumu",
    metin:
      "Kenar mahallede boncuk perdeli bir kulübede yaşlı bir falcı seni çağırıyor. 'Kaderini görmek ister misin?'",
    secenekler: [
      {
        metin: "Avucunu aç, dinle.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: -3,
          para: -2,
          mesaj:
            "'Yakında bir kayıp' dedi ve sustu. Günlerce düşündün.",
        },
        basarisizSonuc: {
          mutluluk: -6,
          para: -3,
          mesaj:
            "'Bugün olmaz' deyip seni kapı dışarı etti. İçin rahat değil.",
        },
      },
      {
        metin: "İnanmam, geç yanından.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -1,
          ahlak: 3,
          mesaj: "Omuz silkip yürüdün. Batıla pabuç bırakmamak da huzur.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Arkandan bir şeyler mırıldandı. Çınlayan kulaklarla uzaklaştın.",
        },
      },
    ],
  },
  {
    id: "buyu_kristal_kure",
    gizemli: true,
    kategori: "sosyal",
    agirlik: 0.45,
    minYas: 18,
    gorsel: "🔮",
    baslik: "Kristal Kürede Bir Gölge",
    metin:
      "Panayırda mor cübbeli bir kâhin küresine eğilmiş. 'Sende bir yük var, görebilirim — ama bedeli var.'",
    secenekler: [
      {
        metin: "Bedelini öde, küreye baktır.",
        maliyet: 4,
        baseBasariSansi: 45,
        basariliSonuc: {
          para: -4,
          mutluluk: -4,
          etiket_ekle: ["bilgi:yasak_ilim"],
          mesaj:
            "Kürede bir an yıllar sonraki yüzünü gördün sandın. Aklından çıkmıyor.",
        },
        basarisizSonuc: {
          para: -6,
          mutluluk: -5,
          mesaj: "Küre buğulandı, kâhin 'bugün suskun' dedi. Paran gitti.",
        },
      },
      {
        metin: "Dolandırıcı bu, reddet.",
        baseBasariSansi: 75,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -1,
          ahlak: 2,
          mesaj: "Sırtını döndün. 'Pişman olacaksın' lafı bir tezgâhtı.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "O gece kürede gördüğünü sandığın gölgeyi düşündün.",
        },
      },
    ],
  },
  {
    id: "buyu_cadi_pazarligi",
    gizemli: true,
    kategori: "din",
    cag: "Orta Çağ",
    ton: "agir",
    agirlik: 0.4,
    minYas: 20,
    gorsel: "🧙‍♀️",
    baslik: "Ormandaki Kadın",
    metin:
      "Köylülerin 'cadı' dediği, ormandaki bir kadın seni çağırıyor. 'İstediğini veririm, karşılığında bir söz isterim.'",
    secenekler: [
      {
        metin: "Ne istediğini sor, pazarlık et.",
        baseBasariSansi: 35,
        basariliSonuc: {
          suc_sinifi: "orta",
          para: 25,
          ahlak: -12,
          mutluluk: -5,
          mesaj:
            "Bir kese altınla döndün ama verdiğin söz içini kemiriyor. Kimseye anlatamazsın.",
        },
        basarisizSonuc: {
          suc_sinifi: "buyuk",
          saglik: -12,
          mutluluk: -10,
          etiket_ekle: ["kalici:kronik_agri"],
          durum_ekle: { id: "lanet", ad: "Üstündeki Gölge", tur: "kalici", yil_basi_saglik: -0.7 },
          mesaj:
            "Kadın güldü, alnına dokundu. Artık uyuyamıyorsun; beden lanetli gibi.",
        },
      },
      {
        metin: "Haç çıkarıp geri çekil.",
        baseBasariSansi: 70,
        basariliSonuc: {
          un: 2,
          mutluluk: -2,
          mesaj: "Dua ederek çekildin. Köyde 'şeytana kanmadım' dedin, seni dinlediler.",
        },
        basarisizSonuc: {
          mutluluk: -6,
          mesaj:
            "Biri seni ormandan çıkarken gördü. Köy 'onunla konuştu' diye fısıldıyor.",
        },
      },
    ],
  },
  {
    id: "buyu_muska",
    gizemli: true,
    kategori: "din",
    agirlik: 0.5,
    minYas: 16,
    gorsel: "🧿",
    baslik: "Bir Muska",
    metin:
      "Yaşlı bir seyyar satıcı deri bir muska uzatıyor. 'İçinde dua var, nazardan korur.'",
    secenekler: [
      {
        metin: "Al, boynuna as.",
        maliyet: 2,
        baseBasariSansi: 60,
        basariliSonuc: {
          para: -3,
          mutluluk: 4,
          mesaj: "İşe yarar mı bilmiyorsun ama boynundaki ağırlık içini rahatlattı.",
        },
        basarisizSonuc: {
          para: -3,
          mutluluk: -2,
          mesaj: "Birkaç gün sonra dikişi söküldü, içinden kuru ot çıktı. Kandırıldın.",
        },
      },
      {
        metin: "'Dua kâğıttan olmaz' deyip geç.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -1,
          ahlak: 3,
          mesaj: "Satıcı bozuldu ama sen inancını deri parçasına bağlamazsın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "O gece kötü rüya gördün, 'keşke alsaydım' dedin. Saçma, biliyorsun.",
        },
      },
    ],
  },
  {
    id: "buyu_lanet_kaldirma",
    gizemli: true,
    kategori: "din",
    agirlik: 0.4,
    minYas: 22,
    gerekliEtiketler: ["bilgi:yasak_ilim"],
    gorsel: "🕯️",
    baslik: "Lanet Kaldırma Ayini",
    metin:
      "Uykuların bölünüyor, işlerin ters gidiyor. Bir okuyucu, bir gecelik ayinle 'üstündekini' alacağını söylüyor.",
    secenekler: [
      {
        metin: "Ayine katıl, sabaha kadar otur.",
        maliyet: 5,
        baseBasariSansi: 50,
        basariliSonuc: {
          para: -8,
          saglik: -3,
          mutluluk: 10,
          etiket_sil: ["bilgi:yasak_ilim"],
          durum_sil: ["lanet"],
          mesaj:
            "Şafakta tükenmiştin ama omzundan bir yük kalkmıştı. İlk kez deliksiz uyudun.",
        },
        basarisizSonuc: {
          para: -8,
          saglik: -6,
          mutluluk: -6,
          mesaj: "Mumlar söndü, hiçbir şey değişmedi. Hem yoruldun hem paran gitti.",
        },
      },
      {
        metin: "Kendi başına dua et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 5,
          un: 1,
          mesaj: "Sadelik işe yaradı. Korkunu kimseye para vermeden yendin.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Dualar içini rahatlatmadı. Belki mesele dua değildi.",
        },
      },
    ],
  },
  {
    id: "buyu_ruh_cagirma",
    gizemli: true,
    kategori: "sosyal",
    ton: "agir",
    agirlik: 0.4,
    minYas: 18,
    gorsel: "👻",
    baslik: "Masanın Etrafında",
    metin:
      "Loş bir odada birkaç kişi el ele bardağı izliyor. 'Ruh çağıracağız, sen de gel, halka eksik kalmasın.'",
    secenekler: [
      {
        metin: "Halkaya gir, bardağa bak.",
        baseBasariSansi: 45,
        basariliSonuc: {
          mutluluk: -8,
          etiket_ekle: ["envanter:fisildayan_tas"],
          mesaj:
            "Bardak kaydı, rüzgâr mı el mi bilinmez. Cebinde tanımadığın bir taş buldun.",
        },
        basarisizSonuc: {
          mutluluk: -6,
          saglik: -3,
          mesaj: "Biri çığlık attı, mumlar devrildi. Kaçtın; kalbin haftalarca yatışmadı.",
        },
      },
      {
        metin: "'Tehlikeli' deyip çık.",
        baseBasariSansi: 78,
        basariliSonuc: {
          ahlak: 2,
          mutluluk: -1,
          mesaj: "Kapıyı kapattın. İçeridekilerin ne gördüğünü hiç öğrenmedin.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Çıktın ama o gece odandaki her gıcırtıda irkildin.",
        },
      },
    ],
  },
  {
    id: "buyu_simyaci",
    gizemli: true,
    kategori: "ticaret",
    agirlik: 0.45,
    minYas: 20,
    gorsel: "⚗️",
    baslik: "Simyacının Çırağı",
    metin:
      "Kükürt kokan bir bodrumda yanık izli bir adam kurşunu altına çevirdiğini söylüyor. 'Sermaye koy, kârı bölüşelim.'",
    secenekler: [
      {
        metin: "Biraz para koy.",
        maliyet: 8,
        baseBasariSansi: 25,
        basariliSonuc: {
          un: -3,
          para: 30,
          mutluluk: -3,
          mesaj:
            "Mucize mi hile mi bilmiyorsun ama elinde gerçek altın var. Adam kayboldu.",
        },
        basarisizSonuc: {
          para: -12,
          mutluluk: -9,
          mesaj: "Deney patladı, kaşların yandı, adam bir daha görünmedi. Paran duman oldu.",
        },
      },
      {
        metin: "Gülüp merdivenleri çık.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Simya masalına kanmadın. Temiz havaya çıkmak bile iyi geldi.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Yıllar sonra 'ya becerdiyse' diye düşündün. Aptalca.",
        },
      },
    ],
  },
  {
    id: "buyu_yildiz_fali",
    gizemli: true,
    kategori: "sosyal",
    agirlik: 0.5,
    minYas: 16,
    gorsel: "✨",
    baslik: "Yıldızlara Bakan Adam",
    metin:
      "Gece yarısı tepede bir adam bakır aletle gökyüzünü tarıyor. 'Doğduğun yılı söyle, yıldızların yazdığını okuyayım.'",
    secenekler: [
      {
        metin: "Doğum yılını söyle, dinle.",
        baseBasariSansi: 60,
        basariliSonuc: {
          mutluluk: 3,
          mesaj:
            "'Uzun bir yol seni bekliyor' dedi. Belirsizdi ama içine umut düştü.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "'Bu yıl dikkatli ol' deyip toplandı. Gecenin kalanını düşünerek geçirdin.",
        },
      },
      {
        metin: "Aletini sor, nasıl çalışır?",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 2,
          mutluluk: 2,
          mesaj: "Adam usturlabı anlattı; fal değil, gökbilim. Yeni bir şey öğrenmek güzeldi.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Adam 'sırrımı vermem' deyip ışığını söndürdü. Yolunu karanlıkta buldun.",
        },
      },
    ],
  },
  {
    id: "buyu_ruya_tabircisi",
    gizemli: true,
    kategori: "din",
    agirlik: 0.5,
    minYas: 18,
    gorsel: "🌙",
    baslik: "Rüya Tabircisi",
    metin:
      "Günlerdir aynı rüyayı görüyorsun. Bir tabirci: 'Anlat, her rüyanın bir haberi vardır.'",
    secenekler: [
      {
        metin: "Rüyanı anlat, yorum iste.",
        maliyet: 2,
        baseBasariSansi: 55,
        basariliSonuc: {
          para: -2,
          mutluluk: 6,
          mesaj: "'Bir yükü bırakacaksın' dedi. Anlamadın ama rüya o gece tekrar etmedi.",
        },
        basarisizSonuc: {
          para: -2,
          mutluluk: -5,
          mesaj: "'İyiye alâmet değil' deyip sustu. Şimdi hem rüyadan hem yorumdan korkuyorsun.",
        },
      },
      {
        metin: "Rüya rüyadır, boşver.",
        baseBasariSansi: 75,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mesaj: "Üstünde durmadın. Birkaç günde rüya kendiliğinden geçti.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Rüya geçmedi. Belki birine anlatmalıydın.",
        },
      },
    ],
  },
  {
    id: "buyu_seytanla_pazarlik",
    gizemli: true,
    kategori: "din",
    ton: "agir",
    agirlik: 0.3,
    minYas: 25,
    maxAhlak: 45,
    gorsel: "😈",
    baslik: "Dört Yol Ağzında",
    metin:
      "Gece yarısı dört yol ağzında bir yabancı bekliyor, yüzü görünmüyor. 'Ne istersen,' diyor, 'adını bir deftere yaz.'",
    secenekler: [
      {
        metin: "Deftere adını yaz.",
        baseBasariSansi: 40,
        basariliSonuc: {
          suc_sinifi: "orta",
          para: 40,
          ahlak: -20,
          mutluluk: -8,
          efsanevi_olum: "Dört yol ağzında verdiği sözün bedelini ödedi",
          mesaj:
            "Cebin doldu, işlerin açıldı. Ama her yol ağzında içinden bir şey kopuyor.",
        },
        basarisizSonuc: {
          suc_sinifi: "buyuk",
          saglik: -10,
          mutluluk: -12,
          mesaj: "Kalem değmeden yabancı kayboldu. Eve dönünce günlerce hastalandın.",
        },
      },
      {
        metin: "Dua edip koşarak uzaklaş.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 3,
          mutluluk: -2,
          unvan_kazan: "Şeytanı Geri Çeviren",
          mesaj: "Nefes nefese eve vardın. O yoldan bir daha geçmedin ama vicdanın temiz.",
        },
        basarisizSonuc: {
          mutluluk: -6,
          saglik: -4,
          mesaj: "Koşarken düştün, dizin parçalandı. Arkana bakmaya cesaret edemedin.",
        },
      },
    ],
  },
  {
    id: "buyu_kara_kedi",
    gizemli: true,
    kategori: "sosyal",
    agirlik: 0.5,
    minYas: 16,
    gorsel: "🐈‍⬛",
    baslik: "Yolunu Kesen Kedi",
    metin:
      "Dar sokakta kapkara bir kedi önünde durup gözlerini dikti. Arkadakiler 'uğursuzluk' diye mırıldanıyor.",
    secenekler: [
      {
        metin: "Eğil, kediyi sev.",
        baseBasariSansi: 65,
        basariliSonuc: {
          mutluluk: 4,
          mesaj: "Kedi elini yaladı, kuyruğunu dikip gitti. Kalabalık şaşırdı, sen güldün.",
        },
        basarisizSonuc: {
          saglik: -2,
          mutluluk: -2,
          mesaj: "Kedi elini tırmalayıp kaçtı. 'Demiştik' dediler. Aptalca ama moralin bozuldu.",
        },
      },
      {
        metin: "Başka yoldan dolaş.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -2,
          mesaj: "Uzun yoldan gittin. Kediden kaçtığına kızdın ama bir şey olmadı.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Dolaştığın sokakta ayağın burkuldu. 'Kedi yüzünden' demek saçma.",
        },
      },
    ],
  },
  {
    id: "buyu_kahin_kehaneti",
    gizemli: true,
    kategori: "siyaset",
    ton: "agir",
    agirlik: 0.35,
    minYas: 24,
    minUn: 30,
    gorsel: "📜",
    baslik: "Meydandaki Kâhin",
    metin:
      "Kalabalık meydanda yarı çıplak bir kâhin adını haykırıyor: 'Yükseleceksin ama düşüşün sert olacak!' Herkes sana bakıyor.",
    secenekler: [
      {
        metin: "Kâhini çağır, ne demek istediğini sor.",
        baseBasariSansi: 45,
        basariliSonuc: {
          mutluluk: -6,
          un: 2,
          etiket_ekle: ["bilgi:yasak_ilim"],
          mesaj:
            "Kulağına birkaç kelime fısıldayıp kayboldu. Kafandan çıkmıyor.",
        },
        basarisizSonuc: {
          un: -4,
          mutluluk: -5,
          mesaj: "Kâhin kaçtı, kalabalık güldü. 'Deli işte' dediler ama sen gülemedin.",
        },
      },
      {
        metin: "Muhafızlar götürsün.",
        baseBasariSansi: 70,
        basariliSonuc: {
          un: 3,
          ahlak: -3,
          mesaj: "Kâhini sürüklediler. Sağlam durdun ama sözleri kulağında çınlıyor.",
        },
        basarisizSonuc: {
          un: -5,
          mutluluk: -4,
          mesaj: "Kâhin muhafızlardan kurtulup 'korkuyor!' diye bağırdı. Rezil oldun.",
        },
      },
    ],
  },
  {
    id: "buyu_sahte_iksir",
    gizemli: true,
    kategori: "ticaret",
    agirlik: 0.5,
    minYas: 18,
    gorsel: "🧪",
    baslik: "Şifa Şişesi Satıcısı",
    metin:
      "Tezgâhta rengârenk şişeler. Satıcı bağırıyor: 'Her derde deva!' Eline bir şişe tutuşturuyor.",
    secenekler: [
      {
        metin: "Bir şişe al, dene.",
        maliyet: 3,
        baseBasariSansi: 30,
        basariliSonuc: {
          para: -4,
          saglik: 3,
          mutluluk: 2,
          mesaj: "Tadı berbattı ama ertesi gün biraz daha iyiydin. Belki inandığın içindir.",
        },
        basarisizSonuc: {
          para: -4,
          saglik: -5,
          mutluluk: -4,
          mesaj: "İçtiğin şey midene dokundu. Satıcı tezgâhını çoktan toplamıştı.",
        },
      },
      {
        metin: "'Zehirdir bu' deyip uzaklaş.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -1,
          ahlak: 2,
          mesaj: "Renkli şişelere kanmadın. Bazen en iyi ilaç hiçbir şey almamaktır.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Satıcı arkandan 'pişman olacaksın' diye bağırdı. Tezgâh lafıydı.",
        },
      },
    ],
  },
  {
    id: "buyu_golge_adam",
    gizemli: true,
    kategori: "sosyal",
    ton: "agir",
    agirlik: 0.3,
    minYas: 20,
    gorsel: "🕴️",
    baslik: "Köşedeki Gölge",
    metin:
      "Birkaç gecedir aynı köşede uzun paltolu bir adam duruyor, yüzü karanlıkta. Bu gece sana bir adım attı.",
    secenekler: [
      {
        metin: "Üstüne yürü, kim olduğunu sor.",
        baseBasariSansi: 50,
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Yolunu şaşırmış yaşlı bir yolcuymuş. Güldünüz. Korkular çoğu zaman böyle.",
        },
        basarisizSonuc: {
          saglik: -4,
          mutluluk: -8,
          mesaj:
            "Yaklaşınca bir anda yoktu. O köşeden bir daha geçmedin.",
        },
      },
      {
        metin: "Görmezden gel, eve kapan.",
        baseBasariSansi: 70,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -3,
          mesaj: "Kapıyı sürgüledin. Birkaç gece sonra gölge kayboldu — ya da bakmayı bıraktın.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          saglik: -2,
          mesaj: "Perdeden her baktığında oradaydı. Uykuların bölündü.",
        },
      },
    ],
  },
  {
    id: "buyu_ay_tutulmasi",
    gizemli: true,
    kategori: "din",
    agirlik: 0.4,
    minYas: 16,
    gorsel: "🌑",
    baslik: "Ay Kana Boyandı",
    metin:
      "Ay yavaşça kızıla döndü. Kimi dua ediyor, kimi 'kıyamet' diye bağırıyor. Meydanda ateş yakılıp ritüel başlamış.",
    secenekler: [
      {
        metin: "Ritüele katıl, sabaha dek davul çal.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 5,
          dost_puani: 4,
          mesaj: "Ay yerine dönünce herkes sarıldı. Korkuyu paylaşmak tuhaf bir yakınlık kurdu.",
        },
        basarisizSonuc: {
          saglik: -3,
          mutluluk: -3,
          mesaj: "Sabaha dek ayakta kaldın, üşüdün, hasta oldun. Ay zaten düzelirdi.",
        },
      },
      {
        metin: "Perdeyi çek, yat uyu.",
        baseBasariSansi: 75,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mesaj: "Sabah ay yerindeydi, dünya dönüyordu. Panik yapmamak da marifet.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Uyuyamadın. Perdeden sızan kızıl ışık bütün gece üstündeydi.",
        },
      },
    ],
  },
  {
    id: "buyu_spiritualist_salon",
    gizemli: true,
    kategori: "sosyal",
    cag: "Sanayi Devrimi",
    agirlik: 0.5,
    minYas: 20,
    gorsel: "🕯️",
    baslik: "Spiritüalist Salonu",
    metin:
      "Şık bir evde madam 'seans' düzenliyor; masada zil ve borazan. 'Öte taraftan biri seninle konuşmak istiyor,' diyor.",
    secenekler: [
      {
        metin: "Otur, 'mesajı' dinle.",
        maliyet: 5,
        baseBasariSansi: 40,
        basariliSonuc: {
          para: -5,
          mutluluk: -4,
          mesaj:
            "Masanın altında ip, ayakta pedal gördün. Yine de sözleri bir an seni sarstı.",
        },
        basarisizSonuc: {
          para: -7,
          mutluluk: -6,
          mesaj: "Borazan yüzüne çarptı, mumlar söndü, madam bayılma taklidi yaptı. Cebin boşaldı.",
        },
      },
      {
        metin: "Işıkları aç, düzeneği göster.",
        baseBasariSansi: 45,
        basariliSonuc: {
          un: 6,
          ahlak: 4,
          mutluluk: 1,
          mesaj: "Lambayı yaktın: ipler, pedallar ortada. Salon dağıldı, herkes seni konuştu.",
        },
        basarisizSonuc: {
          un: -5,
          mutluluk: -4,
          mesaj: "Lambayı devirdin, kimse bir şey görmedi; 'kabalık' diye atıldın.",
        },
      },
    ],
  },
];
