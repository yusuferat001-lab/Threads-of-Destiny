import type { OlayTanimi } from "./types";

/**
 * Karakter vebayı BİZZAT kaptığında (etiket "veba_hastasi", vebaYillikKontrol
 * ile) açılan özel olay havuzu. Hastayken normal olay havuzu tamamen kapanır
 * (hapisOlayi/yolculukOlayi ile aynı mantık, bkz. olaySecici.uygunMu).
 *
 * Her turda BİR ölüm/iyileşme zarı atılır (vebaHastaligiKontrol): başlangıç
 * ölüm riski ~%70, her hayatta kalınan turda -15 doğal düşüş, ≤12'de iyileşme.
 * Buradaki seçimler bu zarı ATILMADAN ÖNCE `veba_olum_riski_artis` ile
 * değiştirir — para harcayarak (hekim/ilaç/tedavi) hayatta kalma şansını
 * belirgin biçimde yükseltebilir; ihmal/şarlatan/çalışmaya devam riski artırır.
 * Negatif `veba_olum_riski_artis` = risk DÜŞER (iyi).
 */
export const OLAY_VEBA_HASTALIGI: OlayTanimi[] = [
  {
    id: "veba_hasta_hekim",
    kategori: "saglik",
    vebaHastasiOlayi: true,
    ton: "agir",
    agirlik: 1.4,
    gorsel: "🩺",
    baslik: "Bir Hekim Getirt",
    metin:
      "Ateşin düşmüyor, lekeler koltuk altına vurdu. Şehirde hâlâ ayakta kalan birkaç hekimden biri, ağır bir ücret karşılığı seninle ilgilenmeyi kabul ediyor.",
    secenekler: [
      {
        metin: "Ne isterse öde, hekim başında kalsın.",
        baseBasariSansi: 75,
        maliyet: 18,
        kilitAciklamasi: "Hekimin ücretini karşılayacak paran yok.",
        ipucu: "En güçlü tedavi; pahalı",
        basariliSonuc: {
          para: -18,
          saglik: 4,
          veba_olum_riski_artis: -30,
          mesaj: "Hekim günlerce yanından ayrılmadı; kan aldı, lapa yaptı, ateşini takip etti. Kriz yavaş yavaş geriledi.",
          detay: "Doğru bakım her şeyi değiştirir.",
        },
        basarisizSonuc: {
          para: -18,
          veba_olum_riski_artis: -10,
          mesaj: "Hekimin elinden geleni yaptı ama vaka ağırdı; yine de yalnız kalmaktan iyiydi.",
          detay: "Bazen para bile yetmiyor.",
        },
      },
      {
        metin: "Parayı veremem; kendi başına atlatmaya çalış.",
        baseBasariSansi: 90,
        ipucu: "Bedava; hiçbir iyileşme yok",
        basariliSonuc: {
          mesaj: "Hekimi geri gönderdin. Yatağında ter içinde, kendi bedeninin savaşını izledin.",
        },
        basarisizSonuc: {
          mutluluk: -3,
          mesaj: "Geceleri daha da kötüleşti; keşke o parayı verseydim diye düşündün.",
        },
      },
    ],
  },
  {
    id: "veba_hasta_sifaci_otu",
    kategori: "saglik",
    vebaHastasiOlayi: true,
    ton: "agir",
    agirlik: 1.2,
    gorsel: "🌿",
    baslik: "Şifacının Otları",
    metin:
      "Mahallede bir şifacı kadın, vebalılara kaynatıp içirdiği acı bir ot karışımı satıyor. Kimi işe yaradığına yemin ediyor, kimi 'zehir' diyor.",
    secenekler: [
      {
        metin: "Karışımı al, tarifine göre iç.",
        baseBasariSansi: 62,
        maliyet: 12,
        kilitAciklamasi: "Şifacıya verecek paran yok.",
        ipucu: "Orta güçte; ucuz ama garantisiz",
        basariliSonuc: {
          para: -12,
          veba_olum_riski_artis: -22,
          mesaj: "İçtiğin gece kan ter içinde kaldın, sabaha ateşin bir tık düşmüştü. Sonraki günler daha iyiydi.",
        },
        basarisizSonuc: {
          para: -12,
          saglik: -6,
          veba_olum_riski_artis: 10,
          mesaj: "Karışım miden kaldıramadı; günlerce kustun, hâlin daha da ağırlaştı.",
        },
      },
      {
        metin: "Güvenmiyorum, almıyorum.",
        baseBasariSansi: 90,
        basariliSonuc: {
          mesaj: "Şifacıyı geri çevirdin. Belki doğru karardı, belki bir şansı tepmiş oldun.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Reddettikten sonra 'ya işe yarayacaktıysa?' diye kara kara düşündün.",
        },
      },
    ],
  },
  {
    id: "veba_hasta_kadim_ilac",
    kategori: "din",
    vebaHastasiOlayi: true,
    cag: "Orta Çağ",
    ton: "agir",
    agirlik: 1.1,
    gorsel: "⛪",
    baslik: "Manastırın Merhemi",
    metin:
      "Şehir dışındaki manastırın keşişleri, nesillerdir sakladıkları bir merhem ve dua kürü uyguluyor. Kabul ederlerse birkaç gün orada kalman gerekiyor.",
    secenekler: [
      {
        metin: "Manastıra git, kürü tamamla.",
        baseBasariSansi: 68,
        maliyet: 16,
        kilitAciklamasi: "Manastıra bağış yapıp orada kalacak paran yok.",
        ipucu: "Güçlü tedavi + huzur; birkaç gün yol",
        basariliSonuc: {
          para: -16,
          mutluluk: 4,
          veba_olum_riski_artis: -28,
          mesaj: "Serin taş odalarda, ot kokusu ve ilahiler arasında dinlendin. Bedenin toparlanmaya başladı, için de.",
        },
        basarisizSonuc: {
          para: -16,
          veba_olum_riski_artis: -8,
          mesaj: "Merhem beklediğin mucizeyi yapmadı ama en azından temiz bir yatakta, bakılarak geçti günlerin.",
        },
      },
      {
        metin: "Bu hâlde yola çıkamam, evde kalıyorum.",
        baseBasariSansi: 88,
        basariliSonuc: {
          mesaj: "Yolculuğu göze alamadın; evinde, kendi imkânlarınla direndin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Evde yalnız kalmak ağır geldi; keşişlerin sözünü aklından çıkaramadın.",
        },
      },
    ],
  },
  {
    id: "veba_hasta_deneysel_tedavi",
    kategori: "saglik",
    vebaHastasiOlayi: true,
    cag: "Sanayi Devrimi",
    ton: "agir",
    agirlik: 1.1,
    gorsel: "💉",
    baslik: "Genç Doktorun Yöntemi",
    metin:
      "Yeni açılan bir hastanede, salgını inceleyen genç bir doktor deneysel bir tedavi uyguluyor: düzenli müdahale, temiz oda, sıkı takip. Ücreti yüksek, sonucu belirsiz.",
    secenekler: [
      {
        metin: "Hastaneye yatır kendini, tedaviyi dene.",
        baseBasariSansi: 60,
        maliyet: 24,
        kilitAciklamasi: "Hastane ücretini ödeyecek paran yok.",
        ipucu: "En güçlü şans; en pahalı, garantisiz",
        basariliSonuc: {
          para: -24,
          saglik: 5,
          veba_olum_riski_artis: -34,
          mesaj: "Beyaz bir odada, saat başı kontrol edilerek geçti günlerin. Doktorun yöntemi tuttu; krizi atlattın.",
        },
        basarisizSonuc: {
          para: -24,
          saglik: -8,
          veba_olum_riski_artis: 16,
          mesaj: "Tedavi henüz oturmamıştı; müdahalelerin bir kısmı seni daha da yıprattı. Doktor not aldı, sen ağırlaştın.",
        },
      },
      {
        metin: "Deney faresi olmam, evde kalırım.",
        baseBasariSansi: 88,
        basariliSonuc: {
          mesaj: "Hastaneyi reddettin; kendi yatağında, bildiğin yöntemlerle direndin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Evde beklerken hastanedeki o temiz odayı düşünüp durdun.",
        },
      },
    ],
  },
  {
    id: "veba_hasta_hacamat",
    kategori: "saglik",
    vebaHastasiOlayi: true,
    ton: "agir",
    agirlik: 1.0,
    gorsel: "🩸",
    baslik: "Kan Alma",
    metin:
      "Dönemin yaygın inancı: hastalık 'kirli kanla' yayılır. Bir berber-cerrah, damarından bir miktar kan alıp 'zehri boşaltmayı' öneriyor. Bazen işe yarıyor, bazen hastayı daha da düşürüyor.",
    secenekler: [
      {
        metin: "Bırak kanını alsın.",
        baseBasariSansi: 50,
        maliyet: 6,
        ipucu: "Kumar gibi: ya belirgin düzelme ya sert düşüş",
        basariliSonuc: {
          para: -6,
          veba_olum_riski_artis: -24,
          mesaj: "İşlemden sonra tuhaf bir hafifleme hissettin; ateşin birkaç gün içinde kırıldı.",
        },
        basarisizSonuc: {
          para: -6,
          saglik: -10,
          veba_olum_riski_artis: 22,
          mesaj: "Zaten güçsüz bedenin bir de kan kaybıyla sarsıldı; bayıldın, günlerce ayağa kalkamadın.",
        },
      },
      {
        metin: "Hayır, bu kadar kanım yok.",
        baseBasariSansi: 92,
        basariliSonuc: {
          mesaj: "Berber-cerrahı gönderdin. En azından olduğun yerde kaldın, daha kötüsü olmadı.",
        },
        basarisizSonuc: {
          mutluluk: -1,
          mesaj: "Reddettin ama komşular 'inatçılığı yüzünden' diye fısıldadı durdu.",
        },
      },
    ],
  },
  {
    id: "veba_hasta_dinlen",
    kategori: "saglik",
    vebaHastasiOlayi: true,
    agirlik: 1.2,
    gorsel: "🛏️",
    baslik: "Her Şeyi Bırak",
    metin:
      "İş, borç, sorumluluk... hepsi bekleyebilir. Bedenin tek bir şey istiyor: kesintisiz dinlenme, sıcak çorba, sessizlik.",
    secenekler: [
      {
        metin: "İşi tamamen bırak, sadece dinlen.",
        baseBasariSansi: 82,
        ipucu: "Bedava değil (kazanç kaybı) ama güvenli bir iyileşme",
        basariliSonuc: {
          para: -8,
          mutluluk: -2,
          veba_olum_riski_artis: -14,
          mesaj: "Günlerce yatakta, uyuyarak ve terleyerek geçirdin. Kazancından oldun ama bedenin toparlandı.",
        },
        basarisizSonuc: {
          para: -8,
          veba_olum_riski_artis: -6,
          mesaj: "Dinlenmeye çalıştın ama endişeden uyuyamadın; yine de yıpratıcı bir işten uzak kalmak iyi geldi.",
        },
      },
      {
        metin: "Dinlenmeye lüksüm yok, ayakta kalmalıyım.",
        baseBasariSansi: 70,
        ipucu: "Kazancını korursun ama hastalık uzayabilir",
        basariliSonuc: {
          para: 4,
          veba_olum_riski_artis: 2,
          mesaj: "Dişini sıkıp işini gördün. Kazancın döndü ama akşamları kendini yerlerde buldun.",
        },
        basarisizSonuc: {
          saglik: -10,
          veba_olum_riski_artis: 16,
          mesaj: "Zorlamak pahalıya patladı; bir gün çarşının ortasında yığıldın, hastalığın azdı.",
        },
      },
    ],
  },
  {
    id: "veba_hasta_sarlatan_iksiri",
    kategori: "ticaret",
    vebaHastasiOlayi: true,
    ton: "agir",
    agirlik: 0.9,
    gorsel: "🧪",
    baslik: "Mucize İksir Satıcısı",
    metin:
      "Kapına bir seyyar satıcı dayandı: elinde parlak şişeler, dilinde 'vebayı bir gecede keser' vaadi. Fiyatı fahiş, içindekiler meçhul.",
    secenekler: [
      {
        metin: "Umutsuzsun; şişeyi al, iç.",
        baseBasariSansi: 32,
        maliyet: 10,
        ipucu: "Çoğu zaman işe yaramaz ya da zehirler; nadiren tutar",
        basariliSonuc: {
          para: -10,
          veba_olum_riski_artis: -26,
          mesaj: "İçindeki her neyse, o gece rahat uyudun ve ateşin kırıldı. Şans mı, mucize mi — bilmiyorsun.",
        },
        basarisizSonuc: {
          para: -10,
          saglik: -8,
          veba_olum_riski_artis: 20,
          mesaj: "İksir mideni yaktı, başın döndü. Satıcı çoktan başka bir kapıdaydı. Hâlin ağırlaştı.",
        },
      },
      {
        metin: "Dolandırıcıyı kov.",
        baseBasariSansi: 93,
        basariliSonuc: {
          mesaj: "Kapıyı yüzüne kapattın. Paran cebinde kaldı, sahte umut da eşikte.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          mesaj: "Kovdun ama 'ya gerçekten işe yarasaydı' düşüncesi geceleri seni kemirdi.",
        },
      },
    ],
  },
  {
    id: "veba_hasta_aile_bakimi",
    kategori: "sosyal",
    vebaHastasiOlayi: true,
    agirlik: 1.1,
    gorsel: "🕯️",
    baslik: "Başında Bekleyen",
    metin:
      "Bir yakının, bulaşma riskini göze alıp başında beklemeye, seni beslemeye, temizlemeye razı. Sağ kalman büyük ölçüde bu bakıma bağlı olabilir — ama onu da tehlikeye atıyorsun.",
    secenekler: [
      {
        metin: "Kabul et, başında beklesin.",
        baseBasariSansi: 78,
        ipucu: "Bakım hayatta kalma şansını yükseltir; sevdiğin de risk alır",
        basariliSonuc: {
          mutluluk: 4,
          veba_olum_riski_artis: -18,
          mesaj: "Günlerce elini bırakmadı. O sıcak ilgi, belki de ilacın kendisiydi; yavaş yavaş kendine geldin.",
        },
        basarisizSonuc: {
          mutluluk: -2,
          veba_olum_riski_artis: -8,
          mesaj: "Elinden geleni yaptı ama vaka ağırdı. Yine de yalnız olmadığını bilmek güç verdi.",
        },
      },
      {
        metin: "Reddet, kimse yaklaşmasın.",
        baseBasariSansi: 85,
        ipucu: "Sevdiğini korursun; sen daha yalnız savaşırsın",
        basariliSonuc: {
          ahlak: 4,
          veba_olum_riski_artis: 4,
          mesaj: "Kapını kilitledin, kimseyi içeri almadın. Onları korudun ama bu savaşı tek başına verdin.",
        },
        basarisizSonuc: {
          mutluluk: -4,
          veba_olum_riski_artis: 8,
          mesaj: "Yalnızlık ve hastalık bir araya gelince ağırlaştın; sesini duyuracak kimse yoktu.",
        },
      },
    ],
  },
  {
    id: "veba_hasta_atesli_sayikla",
    kategori: "saglik",
    vebaHastasiOlayi: true,
    ton: "agir",
    agirlik: 1.0,
    gorsel: "🥵",
    baslik: "Ateş Zirvede",
    metin:
      "Gece ateşin öyle yükseldi ki tavan üstüne geliyor sandın, olmayan sesler duydun. Bu, hastalığın en tehlikeli anı — bedenin ya bu geceyi döner ya dönemez.",
    secenekler: [
      {
        metin: "Son gücünle diren; su iç, ıslak bez, ayakta kal.",
        baseBasariSansi: 55,
        ipucu: "Zorlu ama krizi kırabilir",
        basariliSonuc: {
          saglik: -4,
          veba_olum_riski_artis: -18,
          mesaj: "Sabaha kadar kendini zorladın; şafakla birlikte ateş kırıldı. En kötüsü geride kaldı.",
        },
        basarisizSonuc: {
          saglik: -8,
          veba_olum_riski_artis: 14,
          mesaj: "Direnmeye çalıştın ama beden pes etti; sayıklayarak, terleyerek bir gece daha kaybettin.",
        },
      },
      {
        metin: "Bırak kendini; ne olacaksa olsun.",
        baseBasariSansi: 60,
        ipucu: "Huzurlu ama hastalığa alan açar",
        basariliSonuc: {
          mutluluk: 3,
          veba_olum_riski_artis: 6,
          mesaj: "Direnmeyi bıraktın, tuhaf bir sükûnet çöktü. Beden kendi bildiğince savaştı; sabah hâlâ oradaydın.",
        },
        basarisizSonuc: {
          veba_olum_riski_artis: 18,
          mesaj: "Teslimiyet ağır bastı; ateşin içinde derin bir çukura kaydın, zar zor döndün.",
        },
      },
    ],
  },
];
