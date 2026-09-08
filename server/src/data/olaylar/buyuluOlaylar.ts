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
      "Kenar mahallede, boncuk perdeli bir kulübede fal bakan yaşlı bir kadının kapısındasın. İçeride tütsü kokusu ve alçak sesle mırıldanan dualar var. 'Kaderini görmek ister misin?' diyor.",
    secenekler: [
      {
        metin: "Avucunu aç, ne diyecek dinle.",
        baseBasariSansi: 55,
        ipucu: "Söyledikleri aklına takılabilir",
        basariliSonuc: {
          mutluluk: -3,
          para: -2,
          mesaj:
            "Çizgilerine uzun uzun baktı, sonra 'yakında bir kayıp' dedi ve sustu. Ne demek istediğini günlerce düşündün.",
        },
        basarisizSonuc: {
          mutluluk: -6,
          para: -3,
          mesaj:
            "Yüzü karardı, elini bıraktı ve 'bugün olmaz' diyip seni kapı dışarı etti. İçin hiç rahat değil.",
        },
      },
      {
        metin: "Bu işlere inanmam, geç yanından.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -1,
          ahlak: 3,
          mesaj: "Omuz silkip yürüdün. Batıl korkulara pabuç bırakmayan biri olmak da bir huzur.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Arkandan bir şeyler mırıldandığını duydun. Kulakların çınlayarak uzaklaştın.",
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
      "Bir panayır çadırında, mor cübbeli bir kâhin kristal küresinin üstüne eğilmiş. 'Sende bir yük var,' diyor, 'onu görebilirim — bir bedeli var ama.'",
    secenekler: [
      {
        metin: "Bedelini öde, küreye baktır.",
        maliyet: 4,
        baseBasariSansi: 45,
        ipucu: "Ya bir uyarı ya bir hayal kırıklığı",
        basariliSonuc: {
          para: -4,
          mutluluk: -4,
          etiket_ekle: ["bilgi:yasak_ilim"],
          mesaj:
            "Kürenin içinde bir an kendi yüzünü, yıllar sonrasını gördün sandın. Gördüğün şey aklından çıkmıyor.",
        },
        basarisizSonuc: {
          para: -6,
          mutluluk: -5,
          mesaj: "Küre buğulandı, kâhin 'bugün suskun' dedi. Paran gitti, elin boş.",
        },
      },
      {
        metin: "Dolandırıcının tekidir; reddet.",
        baseBasariSansi: 75,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -1,
          ahlak: 2,
          mesaj: "Sırtını döndün. Arkandan söylenen 'pişman olacaksın' lafı sadece bir tezgâhtı.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Yine de o gece uyurken kürede gördüğünü sandığın gölgeyi düşündün.",
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
      "Köylülerin 'cadı' dediği, ormanın derininde yaşayan bir kadın seni çağırıyor. 'İstediğini verebilirim,' diyor, 'ama karşılığında bir söz isterim.'",
    secenekler: [
      {
        metin: "Ne istediğini sor ve pazarlık et.",
        baseBasariSansi: 35,
        ipucu: "Büyük kazanç ya da lanet — ve engizisyon riski",
        basariliSonuc: {
          para: 25,
          ahlak: -12,
          mutluluk: -5,
          suc_artis: 10,
          mesaj:
            "Bir kese altınla döndün ama verdiğin sözü hatırladıkça içine bir kurt düşüyor. Kimseye anlatamazsın.",
        },
        basarisizSonuc: {
          saglik: -12,
          mutluluk: -10,
          etiket_ekle: ["kalici:kronik_agri"],
          durum_ekle: { id: "lanet", ad: "Üstündeki Gölge", tur: "kalici", tur_basi_saglik: -1 },
          mesaj:
            "Kadın güldü, elini alnına koydu. O günden beri geceleri uyuyamıyorsun; bedenin de sanki lanetlendi.",
        },
      },
      {
        metin: "Haç çıkarıp geri çekil.",
        baseBasariSansi: 70,
        basariliSonuc: {
          un: 2,
          mutluluk: -2,
          mesaj: "Duayla geri çekildin. Köye döndüğünde 'şeytana kanmadım' diye anlattın, seni dinlediler.",
        },
        basarisizSonuc: {
          mutluluk: -6,
          suc_artis: 8,
          mesaj:
            "Biri seni ormandan çıkarken gördü. Artık köyde 'onunla konuştu' diye fısıldıyorlar.",
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
      "Yaşlı bir seyyar satıcı, deriden dikilmiş küçük bir muska uzatıyor. 'İçinde bir dua var,' diyor, 'nazardan korur, taşıyanı kollar.'",
    secenekler: [
      {
        metin: "Al, boynuna as.",
        maliyet: 2,
        baseBasariSansi: 60,
        ipucu: "Bir teselli — ya da boşa para",
        basariliSonuc: {
          para: -3,
          mutluluk: 4,
          mesaj: "İşe yarar mı bilmiyorsun ama boynunda bir ağırlık hissetmek tuhaf bir şekilde içini rahatlattı.",
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
          mesaj: "Satıcı bozuldu ama sen inancını bir deri parçasına bağlamayacak kadar sağlamsın.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "O gece kötü bir rüya gördün ve 'keşke alsaydım' diye düşündün. Saçmalık, biliyorsun.",
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
      "Uykuların bölünüyor, işlerin ters gidiyor. Bir 'okuyucu', bir gecelik bir ayinle 'üstündekini' alacağını söylüyor. Mum, tuz ve uzun dualar.",
    secenekler: [
      {
        metin: "Ayine katıl, sabaha kadar otur.",
        maliyet: 5,
        baseBasariSansi: 50,
        ipucu: "Ya rahatlarsın ya daha da kötü olur",
        basariliSonuc: {
          para: -8,
          saglik: -3,
          mutluluk: 10,
          etiket_sil: ["bilgi:yasak_ilim"],
          durum_sil: ["lanet"],
          mesaj:
            "Şafakta bittiğinde tükenmiştin ama omzundan bir ağırlık kalkmış gibiydi. İlk defa deliksiz uyudun.",
        },
        basarisizSonuc: {
          para: -8,
          saglik: -6,
          mutluluk: -6,
          mesaj: "Mumlar söndü, okuyucu terledi, hiçbir şey değişmedi. Hem yoruldun hem paran gitti.",
        },
      },
      {
        metin: "Kendi duanla, kendi başına dua et.",
        baseBasariSansi: 55,
        basariliSonuc: {
          mutluluk: 5,
          un: 1,
          mesaj: "Sadelik işe yaradı sanki. Korkunu bir başkasına para ödemeden yendin.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "Dualar içini rahatlatmadı. Belki de mesele duada değildi.",
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
      "Birkaç kişi loş bir odada el ele tutuşmuş, ortadaki bardağı izliyor. 'Bir ruh çağıracağız,' diyorlar, 'sen de gel, halka eksik kalmasın.'",
    secenekler: [
      {
        metin: "Halkaya gir, gözünü bardaktan ayırma.",
        baseBasariSansi: 45,
        ipucu: "Bardak kıpırdarsa geri dönüşü yok",
        basariliSonuc: {
          mutluluk: -8,
          etiket_ekle: ["envanter:fisildayan_tas"],
          mesaj:
            "Bardak masada kaydı — rüzgâr mıydı, el miydi bilmiyorsun. Ertesi gün cebinde tanımadığın küçük bir taş buldun.",
        },
        basarisizSonuc: {
          mutluluk: -6,
          saglik: -3,
          mesaj: "Biri çığlık attı, mumlar devrildi. Odadan kaçarcasına çıktın, kalbin haftalarca yerine oturmadı.",
        },
      },
      {
        metin: "'Bu oyun tehlikeli' deyip çık.",
        baseBasariSansi: 78,
        basariliSonuc: {
          ahlak: 2,
          mutluluk: -1,
          mesaj: "Kapıyı arkandan kapattın. İçeridekilerin ne gördüğünü hiç öğrenmek istemedin.",
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
      "Kükürt kokan bir bodrumda, gözleri yanık izleriyle dolu bir adam kurşunu altına çevirmeye çalıştığını söylüyor. 'Bir ortağa ihtiyacım var — sermaye koy, kârı paylaşalım.'",
    secenekler: [
      {
        metin: "Biraz para koy, işi gör.",
        maliyet: 8,
        baseBasariSansi: 25,
        ipucu: "Neredeyse kesin zarar, ama ya olursa?",
        basariliSonuc: {
          para: 30,
          mutluluk: 6,
          mesaj:
            "Bir mucize mi, bir hile mi bilmiyorsun ama elinde gerçek altın var. Adam ertesi gün ortadan kayboldu.",
        },
        basarisizSonuc: {
          para: -12,
          mutluluk: -9,
          mesaj: "Deney patladı, kaşların yandı, adam 'yarın olur' dedi ve bir daha görünmedi. Paran duman oldu.",
        },
      },
      {
        metin: "Gülüp merdivenleri çık.",
        baseBasariSansi: 85,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -1,
          mesaj: "Simya masalına kanmadın. Bodrumdan temiz havaya çıkmak bile iyi geldi.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Yıllar sonra 'ya gerçekten becerdiyse' diye bir kez daha düşündün. Aptalca.",
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
      "Gece yarısı, tepede bir adam bakır bir aletle gökyüzünü tarıyor. 'Doğduğun yılı söyle,' diyor, 'yıldızların sana ne yazdığını okuyayım.'",
    secenekler: [
      {
        metin: "Doğum yılını söyle, dinle.",
        baseBasariSansi: 60,
        ipucu: "Genelde hoş, ama belirsiz",
        basariliSonuc: {
          mutluluk: 3,
          mesaj:
            "'Uzun bir yol seni bekliyor' dedi, hepsi bu. Belirsizdi ama nedense içine bir umut düştü.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          mesaj: "'Bu yıl dikkatli ol' dedi ve toplandı. Geri kalan geceyi bunu düşünerek geçirdin.",
        },
      },
      {
        metin: "Aletine bak, nasıl çalıştığını sor.",
        baseBasariSansi: 55,
        basariliSonuc: {
          un: 2,
          mutluluk: 2,
          mesaj: "Adam usturlabı anlattı; fal değil, gökbilim. Yeni bir şey öğrenmek keyifliydi.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Adam 'sırlarımı vermem' deyip ışığını söndürdü. Karanlıkta yolunu el yordamıyla buldun.",
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
      "Günlerdir aynı rüyayı görüyorsun. Bir tabirci, 'anlat bana' diyor, 'her rüyanın bir haberi vardır.'",
    secenekler: [
      {
        metin: "Rüyanı anlat, yorumunu iste.",
        maliyet: 2,
        baseBasariSansi: 55,
        ipucu: "Ferahlatabilir ya da tedirgin edebilir",
        basariliSonuc: {
          para: -2,
          mutluluk: 6,
          mesaj: "'Bir yükü bırakacaksın' dedi. Ne olduğunu bilmiyorsun ama o gece rüya tekrar etmedi.",
        },
        basarisizSonuc: {
          para: -2,
          mutluluk: -5,
          mesaj: "'Bu iyiye alâmet değil' deyip sustu. Şimdi hem rüyandan hem yorumundan korkuyorsun.",
        },
      },
      {
        metin: "Rüya rüyadır, boşver.",
        baseBasariSansi: 75,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mesaj: "Üstünde durmadın. Birkaç gün sonra rüya kendiliğinden geçti.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Rüya geçmedi. Belki de birine anlatmalıydın.",
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
      "Gece yarısı, dört yolun kesiştiği yerde bir yabancı bekliyor. Yüzünü göremiyorsun. 'Ne istersen,' diyor, 'sadece adını bir deftere yaz.'",
    secenekler: [
      {
        metin: "Deftere adını yaz.",
        baseBasariSansi: 40,
        ipucu: "Servet ya da felaket — ve vicdanın",
        basariliSonuc: {
          para: 40,
          ahlak: -20,
          mutluluk: -8,
          suc_artis: 12,
          efsanevi_olum: "Dört yol ağzında verdiği sözün bedelini ödedi",
          mesaj:
            "Cebin doldu, işlerin açıldı. Ama her dört yol ağzından geçerken içinden bir şey kopuyor artık.",
        },
        basarisizSonuc: {
          saglik: -10,
          mutluluk: -12,
          mesaj: "Kalem kâğıda değmeden yabancı kayboldu. Eve döndüğünde günlerce hastalandın.",
        },
      },
      {
        metin: "Dua edip koşarak uzaklaş.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 3,
          mutluluk: -2,
          unvan_kazan: "Şeytanı Geri Çeviren",
          mesaj: "Nefes nefese eve vardın. Bir daha o yoldan gece geçmedin ama vicdanın temiz.",
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
      "Dar bir sokakta kapkara bir kedi tam önünde durdu, gözlerini sana dikti ve kıpırdamadı. Arkadan gelenler 'uğursuzluk' diye mırıldanıyor.",
    secenekler: [
      {
        metin: "Eğil, kediyi sev.",
        baseBasariSansi: 65,
        ipucu: "Batıl korkuya meydan okumak",
        basariliSonuc: {
          mutluluk: 4,
          mesaj: "Kedi elini yaladı, sonra kuyruğunu dikip gitti. Kalabalık şaşkın baktı, sen güldün.",
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
          mesaj: "Uzun yoldan gittin. Bir kediden kaçtığın için kendine kızdın ama bir şey olmadı.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Dolaştığın sokakta ayağın burkuldu. 'Kedi yüzünden' demek bile saçma.",
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
      "Kalabalık bir meydanda, yarı çıplak bir kâhin senin adını haykırıyor: 'Sen! Yükseleceksin ama düşüşün de sert olacak!' Herkes sana bakıyor.",
    secenekler: [
      {
        metin: "Kâhini yanına çağır, ne demek istediğini sor.",
        baseBasariSansi: 45,
        ipucu: "Cevabı hoşuna gitmeyebilir",
        basariliSonuc: {
          mutluluk: -6,
          un: 2,
          etiket_ekle: ["bilgi:yasak_ilim"],
          mesaj:
            "Kulağına birkaç kelime fısıldadı ve kayboldu. O kelimeler kafandan hiç çıkmıyor.",
        },
        basarisizSonuc: {
          un: -4,
          mutluluk: -5,
          mesaj: "Kâhin kaçtı, kalabalık güldü. 'Deli işte' dediler ama sen gülemedin.",
        },
      },
      {
        metin: "Muhafızlara işaret et, götürsünler.",
        baseBasariSansi: 70,
        basariliSonuc: {
          un: 3,
          ahlak: -3,
          mesaj: "Kâhini sürüklediler. Sağlam durdun ama söyledikleri kulaklarında çınlıyor.",
        },
        basarisizSonuc: {
          un: -5,
          mutluluk: -4,
          mesaj: "Kâhin muhafızların elinden kurtulup 'gördünüz mü, korkuyor!' diye bağırdı. Rezil oldun.",
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
      "Bir tezgâhta, rengârenk şişeler dizili. Satıcı bağırıyor: 'Her derde deva! Ağrıyı keser, ömrü uzatır, bahtı açar!' Bir şişe tutuşturuyor eline.",
    secenekler: [
      {
        metin: "Bir şişe al, dene.",
        maliyet: 3,
        baseBasariSansi: 30,
        ipucu: "Neredeyse kesin dolandırıcılık",
        basariliSonuc: {
          para: -4,
          saglik: 3,
          mutluluk: 2,
          mesaj: "Tadı berbattı ama ertesi gün kendini biraz daha iyi hissettin. Belki inandığın içindir.",
        },
        basarisizSonuc: {
          para: -4,
          saglik: -5,
          mutluluk: -4,
          mesaj: "İçtiğin şey miden fesada uğrattı. Satıcı çoktan tezgâhını toplamıştı.",
        },
      },
      {
        metin: "'Zehir olmasın bu' deyip uzaklaş.",
        baseBasariSansi: 80,
        basariliSonuc: {
          saglik: 2,
          mutluluk: -1,
          ahlak: 2,
          mesaj: "Renkli şişelere kanmadın. Bazen en iyi ilaç, hiçbir şey almamaktır.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Satıcı arkandan 'pişman olacaksın' diye bağırdı. Bir tezgâh lafıydı, hepsi bu.",
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
      "Birkaç gecedir aynı köşede, uzun paltolu bir adam duruyor. Yüzü hep karanlıkta. Bu gece sana doğru bir adım attı.",
    secenekler: [
      {
        metin: "Üstüne yürü, kim olduğunu sor.",
        baseBasariSansi: 50,
        ipucu: "Belki bir hiç, belki bir kâbus",
        basariliSonuc: {
          mutluluk: 3,
          mesaj: "Meğer yolunu şaşırmış yaşlı bir yolcuymuş. Güldünüz. Korkuların çoğu böyle işte.",
        },
        basarisizSonuc: {
          saglik: -4,
          mutluluk: -8,
          mesaj:
            "Yaklaştığında bir anda yoktu. Rüzgâr mı, adım sesi mi belli değildi. O köşeden bir daha geçmedin.",
        },
      },
      {
        metin: "Görmezden gel, evine kapan.",
        baseBasariSansi: 70,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mutluluk: -3,
          mesaj: "Kapıyı sürgüledin. Birkaç gece sonra gölge kayboldu — ya da sen bakmayı bıraktın.",
        },
        basarisizSonuc: {
          mutluluk: -5,
          saglik: -2,
          mesaj: "Perde aralığından her baktığında oradaydı. Uykuların bölündü.",
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
      "Gökte ay yavaşça kızıla döndü. Sokaklar boşaldı, kimi dua ediyor, kimi 'kıyamet' diye bağırıyor. Bir topluluk meydanda ateş yakıp ritüel başlatmış.",
    secenekler: [
      {
        metin: "Ritüele katıl, sabaha kadar davul çal.",
        baseBasariSansi: 55,
        ipucu: "Ortak korku bazen bağ kurar",
        basariliSonuc: {
          mutluluk: 5,
          dost_puani: 4,
          mesaj: "Ay yerine döndüğünde herkes birbirine sarıldı. Korkuyu paylaşmak tuhaf bir yakınlık kurdu.",
        },
        basarisizSonuc: {
          saglik: -3,
          mutluluk: -3,
          mesaj: "Sabaha kadar ayakta kaldın, üşüdün, hasta oldun. Ay zaten kendiliğinden düzelirdi.",
        },
      },
      {
        metin: "Perdeyi çek, yat uyu.",
        baseBasariSansi: 75,
        basariliSonuc: {
          saglik: 2,
          ahlak: 1,
          mesaj: "Sabah kalktığında ay yerindeydi, dünya dönüyordu. Panik yapmamak da bir marifet.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Uyuyamadın. Perdenin ardından sızan kızıl ışık bütün gece üstündeydi.",
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
      "Şık bir evde, madam bir 'seans' düzenliyor. Perdeler çekili, masada bir zil, bir borazan. 'Öte taraftan biri sizinle konuşmak istiyor,' diyor sana dönerek.",
    secenekler: [
      {
        metin: "Masaya otur, 'mesajı' dinle.",
        maliyet: 5,
        baseBasariSansi: 40,
        ipucu: "Zil çalar, borazan uçar — hepsi ipli",
        basariliSonuc: {
          para: -5,
          mutluluk: -4,
          mesaj:
            "Masanın altında bir ip, madamın ayağında bir pedal gördün. Yine de söyledikleri bir an seni sarstı.",
        },
        basarisizSonuc: {
          para: -7,
          mutluluk: -6,
          mesaj: "Borazan yüzüne çarptı, mumlar söndü, madam bayılma numarası yaptı. Cüzdanın hafifledi.",
        },
      },
      {
        metin: "Işıkları aç, düzeneği herkese göster.",
        baseBasariSansi: 45,
        ipucu: "Rezil edersen ün, edemezsen sen rezil olursun",
        basariliSonuc: {
          un: 6,
          ahlak: 4,
          mutluluk: 1,
          mesaj: "Lambayı yaktın: ipler, pedallar ortada. Salon dağıldı, herkes seni konuştu.",
        },
        basarisizSonuc: {
          un: -5,
          mutluluk: -4,
          mesaj: "Lambayı devirdin, kimse bir şey görmedi, 'kabalık' diye seni dışarı attılar.",
        },
      },
    ],
  },
];
