import type { Dil } from './ayarlar';

/**
 * Arayüz sözlüğü — oyunun TÜM menü/ekran/panel/buton metinleri.
 * `EN` nesnesi `Metinler` tipinde olduğu için bir anahtarı çevirmeyi unutmak
 * derleme hatası verir; iki dilin anahtar kümesi her zaman eşit kalır.
 *
 * Olay metinleri (server/src/data/olaylar/*) ve motorun ürettiği anlatı
 * (haberler, sonuç/zaman anlatımı) sunucuda çevrilir; burada YOKtur.
 * Sabit katalog değerleri (bölge/meslek/kişilik/aile/rütbe/konut adları vb.)
 * `./katalog` içindeki `kt()` ile çözülür.
 */

/** "{0} {1}" yer tutucularını sırayla değiştirir. */
export function bic(s: string, ...a: (string | number)[]): string {
  return s.replace(/\{(\d+)\}/g, (_, i) => {
    const v = a[Number(i)];
    return v === undefined ? `{${i}}` : String(v);
  });
}

const TR = {
  // ---- Ayarlar modalı ----
  ayarlarBaslik: 'Ayarlar',
  ayarlarİpucu: 'Ayarlar',
  sekmeGenel: 'Genel',
  sekmeGeriBildirim: 'Görüş & Öneri',
  kapat: 'Kapat',
  dilBaslik: 'Dil',
  dilAciklama: 'Arayüz ve oyun metinlerinin dili.',
  dilTurkce: 'Türkçe',
  dilIngilizce: 'English',
  dilBetaNot: 'Menüler ve arayüz İngilizce. Olay metinleri kademeli olarak çevriliyor; henüz çevrilmemiş olaylar Türkçe görünebilir.',
  sesBaslik: 'Ses',
  sesAciklama: 'Seçim sonuçlarında çalan kısa geri bildirim sesleri.',
  sesAcik: 'Açık',
  sesKapali: 'Kapalı',
  muzikBaslik: 'Müzik',
  muzikAciklama: 'Arka planda çalan dönem müziği (çağına ve bulunduğun ekrana göre değişir).',
  gbBaslik: 'Görüşünü paylaş',
  gbAciklama: 'Bir hata mı buldun, bir fikrin mi var? Doğrudan geliştiriciye ulaşır.',
  gbKategoriHata: '🐞 Hata',
  gbKategoriOneri: '💡 Öneri',
  gbKategoriDiger: '💬 Diğer',
  gbMesajYer: 'Mesajını buraya yaz…',
  gbIletisimYer: 'E-posta veya kullanıcı adı (isteğe bağlı — yanıt için)',
  gbGonder: 'Gönder',
  gbGonderiliyor: 'Gönderiliyor…',
  gbBasarili: 'Teşekkürler! Mesajın iletildi.',
  gbHata: 'Gönderilemedi. Lütfen biraz sonra tekrar dene.',
  gbCokKisa: 'Lütfen birkaç kelimelik bir mesaj yaz.',
  gbYeniMesaj: 'Yeni mesaj gönder',

  // ---- Ortak ----
  geri: 'Geri',
  geriDon: 'Geri Dön',
  devamEt: 'Devam Et',
  yukleniyor: 'Yükleniyor...',
  anaMenu: 'Ana Menü',
  yenidenBasla: 'Yeniden Başla',
  kapatX: '✕ Kapat',
  sesiAc: 'Sesi aç',
  sesiKapat: 'Sesi kapat',
  isimsiz: 'İsimsiz',
  puan: 'puan',
  yasinda: 'yaşında',
  yil: 'yıl',
  yilSonek: 'yılı',
  sohret: 'Şöhret',

  // ---- Giriş ekranı ----
  oyunAdi: 'Threads of Destiny',
  girisAciklama:
    'Çağını, ülkeni ve mesleğini sen seç; ailen ve kişiliğin rastgele belirlensin. Gerisini kaderin ve kararların belirlesin. Ölüm kalıcıdır.',
  btnYeniHayat: '⚙️ Yeni Hayata Başla',
  btnLiderlik: '🏆 Liderlik Tablosu',
  btnNasilOynanir: '📖 Nasıl Oynanır?',
  nasilOynanirBaslik: 'Nasıl Oynanır?',
  btnAyarlar: '⚙️ Ayarlar',
  panelGecmisHayatlar: '📜 Geçmiş Hayatların',
  temizle: 'Temizle',
  gecmisHayatBos: 'Bu cihazda henüz tamamlanmış bir hayat yok.',
  panelLiderlik: '🏆 Liderlik',
  tumunuGor: 'Tümünü Gör',
  skorKaydiYok: 'Henüz skor kaydı yok.',
  panelBasarimlar: '🏵️ Başarımların',
  gecmisHayatSkorSonek: 'puan',
  oyunaDevamEt: '▶ Oyuna Devam Et',
  girisDevamAlt: '{0} · {1} yaşında · {2}',
  girisYeniHayatUyari: 'Mevcut oyunun silinmez; Ayarlar → Ana Menü ile geri dönersin.',
  girisGorusCta: '💬 Oyunu birlikte geliştirelim — görüşünü yaz',
  panelYolHaritasi: '🗺️ Yol Haritası',
  yhDurumYakinda: 'Planlanıyor',
  yhDurumYapiliyor: 'Yapılıyor',
  yhDurumTamam: 'Tamamlandı',
  gizemBaslik: '✦ Yakında',
  gizemYeniMeslek: 'Yeni meslek',
  gizemTarih: '12 Eylül',
  panelYapimci: '👤 Yapımcı',
  yapimciLinkedin: 'LinkedIn →',
  anaMenuyeDon: '🏠 Ana Menüye Dön',
  anaMenuAciklama: 'Oyunun kaydı korunur; giriş ekranından "Oyuna Devam Et" ile geri dönebilirsin.',
  bgBaslik: 'Başarımlar',
  bgAc: '🏆 Başarım Galerisi',
  bgGizli: 'Gizli başarım — koşulunu kendin keşfet.',
  bgYeniBasarim: '🏆 Yeni başarım: {0}',

  // ---- Kurulum akışı (çağ→bölge→yerleşim→isim) ----
  adimEtiketi: 'Adım {0} / {1}',
  girisSlogan: 'Weave the threads of your fate.',

  // ---- Çağ seçimi ----
  cagSecBaslik: 'Çağını Seç',
  cagSecAlt: 'Hangi tarihi dönemde yaşamak istersin?',
  cagAciklamaOrtacag: 'Haçlı seferleri, veba, şövalyeler, kervanlar. 11.-13. yüzyıl.',
  cagAciklamaSanayi: 'Fabrikalaşma, sömürgecilik, yeni icatlar. 19. yüzyıl.',

  // ---- Bölge seçimi ----
  bolgeSecBaslik: 'Ülkeni Seç',
  bolgeSecAlt: '{0} döneminde hangi topraklarda doğmak istersin?',

  // ---- Yerleşim seçimi ----
  yerlesimSecBaslik: 'Nerede Yaşayacaksın?',
  yerlesimSecAlt:
    '{0} toprakları geniş; şehir merkezi, sınır bölgesi ve dağ başı çok farklı bir hayat sunar. Artı ve eksileri iyi tart.',

  // ---- İsim seçimi ----
  isimSecBaslik: 'Adın Ne Olsun?',
  isimSecAlt:
    'Bu isim oyun boyunca sol üstte görünecek ve öldüğünde skor tablosuna bu isimle geçebilirsin. İstersen boş bırak; {0} topraklarına uygun rastgele bir isim atanır.',
  isimYer: 'İsmini yaz…',
  btnRastgeleIsim: '🎲 Rastgele İsim',
  btnBuIsimleBasla: 'Bu İsimle Başla',
  btnRastgeleIsimleBasla: 'Rastgele İsimle Başla',

  // ---- Meslek seçimi ----
  meslekSecBaslik: 'Mesleğini Seç',
  meslekSecAlt: 'Ailenin mesleğini sürdürürsen hazır bir müşteri ve tanıdık ağı devralırsın.',
  meslekMirasIpucu: '✓ Aile mesleğin — bonus kazanırsın',
  meslekAciklamaAsker: 'Savaş, sadakat ve rütbe. Yüksek risk, hızlı ün.',
  meslekAciklamaTuccar: 'Kâr, pazarlık ve ağ kurma. Yüksek kazanç potansiyeli.',
  meslekAciklamaDinAdami: 'Cemaat, vicdan ve nüfuz. İstikrarlı saygınlık.',

  // ---- Açılış ----
  acilisAileCocugu: '{0} Ailesinin Çocuğu',
  acilisDurum: 'Doğuştan gelen durumun: {0}',
  statSaglik: 'Sağlık',
  statMutluluk: 'Mutluluk',

  // ---- Oyun ekranı ----
  panelKisiselHayat: 'Kişisel Hayat',
  panelDunyaSiyaset: 'Dünya & Siyaset',
  tepkiNotu: '⏳ Tarih henüz ilerlemedi — bu senin son sözün.',
  kaderSekilleniyor: 'Kaderin şekilleniyor…',
  sansEki: '%{0}-{1} şans',
  btnAileniGor: 'Aileni Gör →',
  zamanBasligi: '— {0} yıl sonra —',
  yasSonek: '{0} yaşında',

  // ---- Ölüm ----
  oldun: 'Öldün.',
  olumOzet:
    '{0} yılı. {1} yaşında, {2} ({3}) olarak, {4} topraklarında hayatını kaybetti. {5} ailesinin çocuğuydu.',
  isimGir: 'İsmini gir',
  btnSkoruKaydet: 'Skoru Kaydet',
  skorKaydedildi: 'Skorun liderlik tablosuna kaydedildi.',
  skorKaydediliyor: 'Skorun liderlik tablosuna kaydediliyor…',
  btnLiderlikTablosu: 'Liderlik Tablosu',

  // ---- Liderlik ----
  liderlikBaslik: 'Liderlik Tablosu',
  sekmeGenelLb: 'Genel',
  sekmeEnZengin: 'En Zenginler',
  sekmeEnUnlu: 'En Çok Tanınanlar',
  kayitYok: 'Henüz kayıt yok.',
  amacTamamladiTitle: 'Hayat amacını tamamladı (x5 skor)',

  // ---- UstSerit ----
  usAraniyorsun: '▲ aranıyorsun',
  usIzSogudu: '▼ iz soğudu',
  usYil: 'Yıl',
  usYas: 'Yaş',
  usCan: 'Can',
  usPara: 'Para',
  usAranma: 'Aranma',
  usAhlak: 'Ahlak',
  usMutluluk: 'Mutluluk',
  usSavasta: '⚔️ Savaşta',
  usSalgin: '☠️ Salgın',
  usKriz: '📉 Kriz',
  usRefah: '📈 Refah',
  usUlkeBilgi: 'Ülke hakkında bilgi',
  usAranmaYildizAria: '{0} yıldız aranma seviyesi',

  // ---- GorevEkrani ----
  ksGorev: 'Görev',
  ksHapiste: 'Hapiste',
  ksAmirin: 'Amirin',
  ksAstin: 'Astın',
  ksAsker: 'asker',
  ksTechizat: 'teçhizat',
  ksSermaye: 'sermaye',
  ksNufuz: 'nüfuz',
  ksYilBasi: 'yıl',
  ksKisilik: 'kişilik',
  ksSadakat: 'sadakat',
  ksKalite: 'kalite',
  ksKov: 'Kov',
  ksOzetAria: 'Görevin ve emrindekilerin özeti',

  // ---- GorevEkrani (tam sayfa) ----
  geBaslik: 'Görevin',
  geGorevGor: '🎖️ Görevini Gör →',
  geHapisYilKalan: 'yıl kaldı',
  geVebaHastasi: 'Veba hastası',
  geVebaHayatta: 'hayatta kalma şansı',
  geAmirYok: 'En tepedesin — doğrudan hükümdara bağlısın.',
  geAstlarin: 'Astların',
  geEkibin: 'Ekibin',
  geMeslekGucu: 'Meslek Gücün',
  geKimseYok: 'Henüz emrinde kimse yok.',
  geEkipYok: 'Ekibinde kimse yok.',

  // ---- FinansOzetPaneli ----
  foYillikGelir: '💰 Yıllık gelir',
  foYillikGider: '📉 Yıllık gider',
  foElineKalan: 'Eline kalan',
  foRutbe: 'Rütbe',
  foKariyerBirikimi: 'Kariyer birikimi',
  foKidem: 'kıdem, şehir yönetimi',
  foItibarin: 'İtibarın',
  foItibarAlt: 'mutluluk, şöhret, ahlak',
  foDonemsel: 'Dönemsel',
  foDonemselAlt: 'ekonomi, savaş, salgın',
  foKalici: 'kalıcı',
  foDegisken: 'değişken',
  foMaasNasil: 'Maaşın nasıl oluşuyor:',
  foTamDokum: 'Tam döküm: Gelir & Gider ekranı',

  // ---- IsyeriPaneli ----
  ipBirligin: 'Birliğin',
  ipIsletmen: 'İşletmen',
  ipCemaatin: 'Cemaatin',
  ipIsyerin: 'İşyerin',
  ipAsker1: 'Yalnız savaşan bir erdersin.',
  ipAsker2: 'Küçük bir müfreze seni takip ediyor.',
  ipAsker3: 'Koca bir birlik senin emrinde.',
  ipTuccar1: 'Küçük bir pazar tezgahın var.',
  ipTuccar2: 'Bir dükkanın ve müşteri ağın var.',
  ipTuccar3: 'Koca bir ticarethanenin sahibisin.',
  ipDin1: 'Küçük bir cemaate vaaz veriyorsun.',
  ipDin2: 'Cemaatin büyüdü, sözün dinleniyor.',
  ipDin3: 'Koca bir cemaatin ruhani lideri oldun.',

  // ---- SahneHotspotlari ----
  shEv: 'Gelir & Gider',
  shIsyeri: 'İşin & Yatırımların',
  shMagaza: 'Mağaza',
  shSosyallesme: 'Sosyalleş',
  shIsinKisa: 'İşin',
  shEvinKisa: 'Evin',
  shEvFallback: 'Ev',
  shIsyeriTitle: '{0} — İşin',
  shEvTitle: '{0} — Gelir & Gider',

  // ---- EtkiCipleri ----
  ecPara: 'Para',
  ecSaglik: 'Sağlık',
  ecMutluluk: 'Mutluluk',
  ecAhlak: 'Ahlak',
  ecSohret: 'Şöhret',
  ecEvlendin: 'Evlendin',
  ecEsKaybi: 'Eşini kaybettin',
  ecCocukEkle: '+{0} çocuk',
  ecCocukKaybi: 'Bir çocuğunu kaybettin',
  ecYeniMeslek: 'Yeni meslek: {0}',
  ecEtkiYok: 'Bu seçim ölçülebilir bir değişim getirmedi.',

  // ---- Aile özet / İlişkiler ----
  aoEs: 'Eş',
  aoCocuklar: 'Çocuklar',
  aoEvcilHayvan: 'Evcil hayvan',
  aoYok: 'yok',
  aoCocukYok: 'Çocuğun yok',
  ilDost: 'Dost',
  ilRakip: 'Rakip',
  ilIliskiler: 'İlişkiler',

  // ---- SiyasetPaneli ----
  syDonem: 'Dönem',
  syHizip: 'Hizip',
  syBagimsiz: 'Bağımsız',
  syOrtacag: 'Orta Çağ',
  sySanayi: 'Sanayi Devrimi',

  // ---- HaberlerPaneli ----
  hbBaslik: 'Haberler',
  hbYok: 'Şu an dünyadan önemli bir haber yok.',

  // ---- DurumPaneli ----
  drBaslik: 'Durumlar',
  drKalici: 'kalıcı',
  drTur: 'tur',

  // ---- KisilikPaneli ----
  kpBaslik: 'Kişilik & Yatkınlıklar',
  kpEksenPlanci: 'Planlı',
  kpEksenFevri: 'Fevri',
  kpEksenZalim: 'Zalim',
  kpEksenBarisci: 'Barışçıl',
  kpKaynaklar: 'Yatkınlık kaynakların',
  kpAile: 'Aile',

  // ---- EnvanterPaneli ----
  enBaslik: 'Envanter',
  enBos: 'Çantanda kayda değer bir şey yok.',
  enKullan: 'Kullan',
  enCurumeUyari: '{0} yıl içinde kullanılmazsa çürür',

  // ---- BolgeBilgisiPaneli ----
  bbNufus: 'Tahmini nüfus',
  bbBiliyorMuydun: 'Biliyor muydun?',

  // ---- HayatHikayesi ----
  hhBaslik: 'Hayat Hikayesi',

  // ---- GecmisGrafik ----
  ggBaslik: 'Zaman İçinde',
  ggPara: 'Para',
  ggSaglik: 'Sağlık',
  ggUn: 'Şöhret',

  // ---- FinansEkrani ----
  feButcen: 'Bütçen',
  feYillikMaas: '💰 Yıllık maaş',
  feRutbedenGelen: '🎖️ Rütbeden gelen',
  feKariyerBirikimi: '📈 Kariyer birikimi',
  feItibarin: '🤝 İtibarın',
  feDonemselEtkiler: '🌍 Dönemsel yüzdelik etkiler',
  feKalici: 'kalıcı',
  feDegisebilir: 'değişebilir',
  feItibarUyari: 'İtibarın gelirini ciddi düşürüyor.',
  feMaasNot:
    '🎖️ Rütbe ve kariyer primleri kalıcıdır — rütbe asla düşmez. Dönemsel etkiler ekonomi, savaş ve salgınla birlikte değişir. 🤝 Mutlu, saygın ve dürüst biri işini daha iyi yapar ve kapıları daha kolay açılır; bu üçünden biri düştükçe gelirin belirgin azalır, üçü de yüksekken maaşına bonus biner. Düşüşün cezası yükselişin iki katıdır.',
  feDunyaBaslik: '🌍 Şu an bütçeni etkileyen dünya durumları',
  feDunyaYok: 'Şu an bütçeni sarsan olağan dışı bir durum yok.',
  feGayrimenkulGeliri: '🏠 Gayrimenkul geliri',
  feGayrimenkulTitle:
    'Sahip olduğun mülklerin şu anki dünya durumuna göre yıllık tahmini net getirisi; maaşından ayrı bir gelir akışıdır ve kötü zamanlarda zarara dönebilir.',
  feYillikGiderler: 'Yıllık giderler',
  feYasam: '🍞 Yaşam',
  feEvKirasi: '🏠 Ev kirası',
  feEkipMaaslari: '🧑 Ekip maaşları',
  feEvcilHayvanBakimi: '🐾 Evcil hayvan bakımı',
  feSavasVergisi: '⚔️ Savaş vergisi',
  feSavasVergisiTitle:
    'Aktif bir büyük savaş sürerken hükümdar pasif gelirinden ek bir savaş vergisi kesiyor.',
  feMaasEksiGider: '↳ Maaş − gider',
  feNetYillikDahil: 'Net yıllık (gayrimenkul dahil)',
  feNetYillik: 'Net yıllık',
  feYasamTarzin: 'Yaşam Tarzın',
  feDegistirNot: 'Tur harcamaz.',
  feSuAnBu: ' (şu an bu)',
  feSuAnBurada: ' (şu an burada)',
  feYillikGider: 'Yıllık gider',
  feYillikKira: 'Yıllık kira',
  feEnflasyonEki: '(liste {0}, +%{1} enflasyon)',
  feTasinNot:
    'İstediğin an taşın, tur harcamaz. Daha pahalı eve geçişte bir kerelik {0} {1} nakliye ücreti; ucuza geri çekilmek bedava.',
  feUcuzaGecis: '↩️ Ucuza geçiş: nakliye ücretsiz',
  feNakliyeUcreti: '🚚 Bir kerelik {0} {1} nakliye ücreti',
  feEvin: 'Evin',
  feSaglikYil: '🩺 Sağlık {0}/yıl',
  feMutlulukYil: '😊 Mutluluk {0}/yıl',
  feSohretYil: '⭐ Şöhret {0}/yıl',

  // ---- IsYatirimEkrani ----
  iyBaslik: 'İşin & Yatırımların',
  iyGorevin: 'Görevin',
  iyYillikKazanc: 'Yıllık Kazanç',
  iyAmirin: 'Amirin',
  iySehirYonetimi: 'Şehir Yönetimi',
  iyTechizat: 'Teçhizat',
  iyOrduMevcudu: 'Ordu Mevcudu',
  iyKademeAria: 'Kademe {0} / 5',
  iySeviyeEk: 'Seviye {0}',
  iyGetiriYilBasi: '/yıl',
  iySaldiriGucu: 'Saldırı Gücü',
  iyTicaretSermayesi: 'Ticaret Sermayesi',
  iyNufuz: 'Nüfuz',
  iyPiyasaDedikodulari: 'Piyasa Dedikoduları',
  iyDedikoduYok: 'Şu an konuşulan bir şey yok.',
  iyYatirimlikGayrimenkuller: 'Yatırımlık Gayrimenkuller',
  iyAvantajli: 'Avantajlı',
  iyDezavantajli: 'Dezavantajlı',
  iySuAnTahminiGetiri: 'Şu an tahmini getiri',
  iyGetiriBrut: '📈 Getiri (brüt): {0}{1} {2}/yıl ({3}%)',
  iyGetiriNet: '💰 Eline kalan (net): {0}{1} {2}/yıl',
  iyBakimVergi: '🔧 Bakım/vergi: ~-{0} {1}/yıl',
  iyBakimTitle:
    '7-11 yılda bir çıkan bakım/vergi masrafının yıllığa bölünmüş yaklaşık tutarı; getiriden ayrı, her koşulda gider.',
  iyBakimAcikla: '🔧 Her mülk 7-11 yılda bir değerinin ~⅓\'ü kadar bakım/vergi çıkarır; "net" bunu düşer.',
  iyKendiParan: 'Kendi Paran',
  iyKendiIsin: 'Kendi İşin',
  iyKendiIsineYatirim: 'Kendi İşine Yatırım Yap',
  iyKendiIsiAsama0: 'Henüz hiç yatırım yapmadın.',
  iyKendiIsiAsama1: 'Şimdiye kadar {0} kez yatırım yaptın; işin büyümeye başladı.',
  iyKendiIsiAsama2: '{0} yatırımla artık köklü, tanınan bir isimsin.',
  iyKendiIsiAsama3: '{0} yatırımla küçük bir imparatorluk kurdun.',
  iyKendiIsiEskalasyon: 'Her yeni yatırım bir öncekinden daha pahalıya gelir.',
  iyKendiIsiKarsilik: 'karşılığında yıllık maaşın kalıcı olarak yaklaşık %5 artar (bir tavana kadar).',
  iyKendiIsiKarsilikVarsayilan: 'karşılığında kazancın kalıcı olarak artar.',
  iyRutbeNasil: 'Rütbe nasıl yükselir?',
  iyRutbeNasilMetin:
    'İşine yatırım yaptıkça ve {0} yüksek tuttukça kariyerin ilerler; zamanla kıdem de kazanırsın. Her terfiden sonra bir sonrakine kadar birkaç yıl geçmesi gerekir. Rütben asla düşmez.',
  iyRutbeAhlakini: 'ahlakını',
  iyRutbeSohretini: 'şöhretini',
  iyRiskliIsler: 'Riskli İşler',
  iySucSeviyen: 'Suç/Aranma seviyen: {0}/100 — {1}',
  iySicilTemiz: 'Sicilin temiz sayılır.',
  iySicilDikkat: 'Muhafızların dikkatini biraz çekiyorsun.',
  iySicilCiddi: 'Ciddi bir ilgi çekiyorsun; dikkatli ol.',
  iySicilPesinde: 'Peşindeler — her an baskın yiyebilirsin.',
  iyZarKazanirsan: 'Kazanırsan {0} {1}, kaybedersen hepsi gider.',
  iySatinAl: 'Satın Al',
  iySahipsin: '· Sahipsin',
  iyYeterliPara: 'Yeterli paran yok',
  iyYatirimYap: 'Yatırım Yap',
  iyMaliyet: 'Maliyet',

  // ---- SosyallesmePaneli ----
  spBaslik: 'Sosyalleş',
  spAciklama:
    'Bir mekâna gitmek tur harcamaz; oradaki insanlarla yaşadığın olayı sonra normal akışta çözersin.',
  spYok: 'Şu an gidebileceğin uygun bir mekân yok.',
  spGit: 'Git',
  spAlkolUyari: '🍷 Alkollü mekân — çok sık gelmek "ayyaş" damgası getirebilir.',
  spZiyaret: 'ziyaret',

  // ---- MagazaPaneli ----
  mpBaslik: 'Mağaza',
  mpAciklama: 'Elindeki {0} {1}. Fiyatlar savaş, kıtlık ve bolluğa göre değişir.',
  mpSekmeSifa: 'Temel Tüketim & Şifa',
  mpSekmeLuks: 'Lüks Tüketim',
  mpSifaAciklama: 'Sağlık/mutluluk verir; kullanılmazsa çürür. Alışveriş kategoriyi bir süre kilitler.',
  mpLuksAciklama: 'Anında ün kazandırır; türünden 1 tane, arada bakım masrafı.',
  mpKategoriBos: 'Bu kategoride şu an çağına uygun bir eşya yok.',
  mpSaglik: 'sağlık',
  mpMutluluk: 'mutluluk',
  mpSohret: 'şöhret',
  mpCurukUyari: '⏳ {0} yıl içinde kullanılmazsa çürür',
  mpSifaSans: '🎲 Kullanınca ~%{0}-{1} ihtimalle tam etki eder; küçük bir ihtimalle hiç işe yaramaz; nadiren ters tepip canını azaltabilir',
  mpSatinAl: 'Satın Al',
  mpSahipsin: 'Sahipsin',
  mpYeterliPara: 'Yeterli paran yok',
  mpKilitli: '🔒 {0}',

  // ---- AileEkrani ----
  aeBaslik: 'Ailen',
  aeAnne: 'Anne',
  aeBaba: 'Baba',
  aeEs: 'Eş',
  aeEsYok: 'Evli değilsin.',
  aeCocuklar: 'Çocuklar',
  aeCocukYok: 'Henüz çocuğun yok.',
  aeDogum: 'doğum {0}',
  aeYasiyor: 'yaşıyor',
  aeVefat: 'vefat etti',
  aeEsPuani: 'Evlilik uyumu',

  // ---- Banner ----
  bnHukumdar: 'Hükümdar',
  bnYil: 'Yıl',
  bnSavasta: '⚔️ Savaşta',
  bnSalgin: '☠️ Salgın',
  bnKriz: '📉 Kriz',
  bnRefah: '📈 Refah',

  // ---- SiyasetPaneli (ek) ----
  syHizbin: 'Hizbin',
  syDonemEki: 'Dönem',

  // ---- HaberlerPaneli (ek) ----
  hbBaslikTam: '📰 Bölgeden Haberler',

  // ---- DurumPaneli (ek) ----
  drBaslikTam: 'Durumlar',
  drBos: 'Aktif bir durum yok.',
  drKaliciTam: 'Kalıcı',
  drTurKaldi: '{0} tur kaldı',
  drTurBasi: '/tur',

  // ---- KisilikPaneli (ek) ----
  kpBaslikTam: 'Kişilik & Miras',
  kpPlanlayici: 'Planlayıcı',
  kpFevri: 'Fevri',
  kpZalim: 'Zalim',
  kpBarisci: 'Barışçıl',
  kpEksenAria: '{0} ile {1} arası eksen',
  kpAilesi: ' Ailesi',

  // ---- AileOzetPaneli (ek) ----
  aoBaslik: 'Aile',
  aoYalniz: 'Henüz yalnızsın.',
  aoEsTek: 'Eş',
  aoCocukTek: 'Çocuk',
  aoCocukCogul: 'Çocuklar',
  aoEvcilHayvanTek: 'Evcil Hayvan',

  // ---- IliskilerPaneli (ek) ----
  ilBaslik: 'İlişkilerin',
  ilDostKusgun: 'Küskün',
  ilDostMesafeli: 'Mesafeli',
  ilDostTanidik: 'Tanıdık',
  ilDostDost: 'Dost',
  ilDostYakin: 'Yakın Dost',
  ilRakipAmansiz: 'Amansız Düşman',
  ilRakipDusman: 'Düşman',
  ilRakipGergin: 'Gergin',
  ilRakipNotr: 'Nötr Rakip',
  ilRakipYumusak: 'Yumuşamış Rakip',

  // ---- GecmisGrafik (ek) ----
  ggGecmisYillar: 'Geçmiş Yıllar',
  ggYetersiz: 'Henüz yeterli geçmiş birikmedi.',
  ggParaGecmisiAria: 'Para geçmişi: {0} yılından {1} yılına, şu anki değer {2} {3}',

  // ---- EnvanterPaneli (ek) ----
  enBaslikTam: 'Envanter',
  enLuksAciklama: 'Kalıcı bir koleksiyon parçası (arada bir bakım/vergi masrafı çıkarabilir).',
  enCurumeUyariTam: '⏳ {0} yıl içinde kullanılmazsa çürür.',
  enKullanimBekliyor: 'Kullanılmayı bekliyor.',
  enKullanTam: 'Kullan',
  enKullanSansHint: '🎲 Kullandığında zar atılır: çoğunlukla tam fayda verir, küçük bir ihtimalle hiç işe yaramaz, nadiren ters tepip canını azaltır.',

  // ---- BolgeBilgisiPaneli (ek) ----
  bbHakkinda: '{0} Hakkında',
  bbNufusTam: '👥 Tahmini nüfus',

  // ---- FinansOzetPaneli (ek) ----
  foMaasNasilTam: 'Maaşın nasıl oluşuyor:',
  foRutbeSat: '🎖️ Rütbe',
  foKariyerSat: '📈 Kariyer birikimi (kıdem, şehir yönetimi)',
  foItibarSat: '🤝 İtibarın (mutluluk, şöhret, ahlak)',
  foDonemselSat: '🌍 Dönemsel (ekonomi, savaş, salgın)',
  foKaliciEk: 'kalıcı',
  foDegiskenEk: 'değişken',
  foTamDokumEk: 'Tam döküm: Gelir & Gider ekranı',

  // ---- FinansEkrani (ek: gider toplamı) ----
  feToplamGider: 'Toplam gider',

  // ---- SosyallesmePaneli (tam) ----
  spBaslikTam: 'Nereye Gidilecek?',
  spAciklamaTam:
    'Bir mekân seç; oraya gitmek turunu harcamaz ama başına bir olay gelir. Onu normal akışta çözersin.',
  spBosTam: 'Şu an gidebileceğin uygun bir mekân yok (hapiste/yolculukta olabilirsin).',
  spGitTam: 'Buraya Git',
  spAlkolluEtiket: '🍷 Alkollü mekân',

  // ---- MagazaPaneli (ek) ----
  mpBaslikTam: 'Mağaza',
  mpSatinAlTam: 'Satın Al',
  mpSahipsinTam: '· Sahipsin',
  mpParaYetmez: 'Yeterli paran yok',

  // ---- AileEkrani (tam) ----
  aeBaslikTam: 'Ailen',
  aeKoken: 'Ailenin Kökeni',
  aeEsin: 'Eşin',
  aeEsYokMetin: 'Henüz bir eşin yok.',
  aeCocuklarin: 'Çocukların',
  aeCocukYokMetin: 'Henüz bir çocuğun yok.',
  aeDogumlu: '{0} doğumlu',
  aeYasindaTam: '{0} yaşında',
  aeKaybedildi: 'kaybedildi',
  aeEsCatirdiyor: 'Çatırdıyor',
  aeEsGergin: 'Gergin',
  aeEsIstikrarli: 'İstikrarlı',
  aeEsSicak: 'Sıcak',
  aeEsCokBagli: 'Çok Bağlı',

  // ---- SosyallesmePaneli (tam) ----
  spSosyallesBaslik: 'Sosyalleş',
  spIntro:
    'Küçük bir ücret ödersin; olay biraz para götürür ama moral verir. Alkollü mekânlara sık gitmek "ayyaş" damgası getirir.',
  spMekanYok: 'Şu an gidebileceğin bir mekân yok.',
  spAyyasZaten: 'Zaten ayyaş olarak tanınıyorsun.',
  spZiyaretUyari: 'Şimdiye kadar {0} kez gittin — {1} ziyaret daha ayyaşlık damgası vurur.',

  // ---- EvlilikPaneli (tam) ----
  evBaslik: 'Evlilik',
  evIntro: 'Kaderin seni bir olayla evlendirmesini beklemeden, kendi adayını seçip teklif edebilirsin. Turu tüketmez, teklif reddedilirse tekrar deneyebilirsin.',
  evYukleniyorMesaji: 'Adaylar aranıyor...',
  evUyum: 'Uyum: ~%{0}',
  evTeklifEt: 'Evlenme Teklif Et',
  evYeniAdaylar: 'Farklı Adaylar Göster',
  evZatenEvli: 'Zaten evlisin.',

  // ---- IsYatirimEkrani (ek) ----
  iyMaliyetEk: 'Maliyet: {0} {1}',
  iyKendiIsiButon: 'Yatırım Yap',
  iyZarKademeButon: '{0} {1} oyna',

  // ---- KarakterAvatari / SonucEfekti (aria) ----
  kaAria: 'Karakter görseli',

  // ---- Sadeleştirilmiş / kısaltılmış metinler ----
  feKirilimLejant: '🎖️ 📈 kalıcı · 🤝 🌍 dünya durumuna göre değişir',
  feTasinNotKisa: 'Tur harcamaz. Pahalıya geçiş bir kerelik {0} {1}.',
  feTasinmaKisa: ' · +{0} {1} taşınma',
  iyNetKisa: '💰 Net ~{0}{1} {2}/yıl ({3}%)',
  iyFiyatKisa: 'Fiyat: {0} {1}',
  iyRutbeNasilKisa: 'İşine yatır, {0} yüksek tut, kıdem biriktir. Rütbe asla düşmez.',
  mpFayda: 'fayda',
  mpRafKisa: '~{0}y raf ömrü',

  // ---- Meslek/çağ kısa etiketler (fallback dolgu) ----
  bilinmiyor: 'Bilinmiyor',
} as const;

export type Metinler = { [K in keyof typeof TR]: string };

const EN: Metinler = {
  // ---- Settings modal ----
  ayarlarBaslik: 'Settings',
  ayarlarİpucu: 'Settings',
  sekmeGenel: 'General',
  sekmeGeriBildirim: 'Feedback',
  kapat: 'Close',
  dilBaslik: 'Language',
  dilAciklama: 'Language of the interface and game text.',
  dilTurkce: 'Türkçe',
  dilIngilizce: 'English',
  dilBetaNot:
    'Menus and interface are in English. Event text is being translated gradually; untranslated events may still appear in Turkish.',
  sesBaslik: 'Sound',
  sesAciklama: 'Short feedback sounds played on choice outcomes.',
  sesAcik: 'On',
  sesKapali: 'Off',
  muzikBaslik: 'Music',
  muzikAciklama: 'Period background music (changes with your era and the screen you are on).',
  gbBaslik: 'Share your thoughts',
  gbAciklama: 'Found a bug or have an idea? It goes straight to the developer.',
  gbKategoriHata: '🐞 Bug',
  gbKategoriOneri: '💡 Idea',
  gbKategoriDiger: '💬 Other',
  gbMesajYer: 'Write your message here…',
  gbIletisimYer: 'Email or username (optional — for a reply)',
  gbGonder: 'Send',
  gbGonderiliyor: 'Sending…',
  gbBasarili: 'Thank you! Your message was sent.',
  gbHata: 'Could not send. Please try again later.',
  gbCokKisa: 'Please write a few words.',
  gbYeniMesaj: 'Send another message',

  // ---- Common ----
  geri: 'Back',
  geriDon: 'Back',
  devamEt: 'Continue',
  yukleniyor: 'Loading...',
  anaMenu: 'Main Menu',
  yenidenBasla: 'Start Again',
  kapatX: '✕ Close',
  sesiAc: 'Turn sound on',
  sesiKapat: 'Turn sound off',
  isimsiz: 'Unnamed',
  puan: 'pts',
  yasinda: 'yrs old',
  yil: 'yr',
  yilSonek: '',
  sohret: 'Fame',

  // ---- Entry screen ----
  oyunAdi: 'Threads of Destiny',
  girisAciklama:
    'Choose your era, your country and your profession; your family and personality are set at random. Let your fate and your choices decide the rest. Death is permanent.',
  btnYeniHayat: '⚙️ Begin a New Life',
  btnLiderlik: '🏆 Leaderboard',
  btnNasilOynanir: '📖 How to Play?',
  nasilOynanirBaslik: 'How to Play',
  btnAyarlar: '⚙️ Settings',
  panelGecmisHayatlar: '📜 Your Past Lives',
  temizle: 'Clear',
  gecmisHayatBos: 'No completed life on this device yet.',
  panelLiderlik: '🏆 Leaderboard',
  tumunuGor: 'See All',
  skorKaydiYok: 'No scores recorded yet.',
  panelBasarimlar: '🏵️ Your Achievements',
  gecmisHayatSkorSonek: 'pts',
  oyunaDevamEt: '▶ Resume Game',
  girisDevamAlt: '{0} · age {1} · {2}',
  girisYeniHayatUyari: 'Your current game is kept; return via Settings → Main Menu.',
  girisGorusCta: "💬 Help shape the game — send your feedback",
  panelYolHaritasi: '🗺️ Roadmap',
  yhDurumYakinda: 'Planned',
  yhDurumYapiliyor: 'In progress',
  yhDurumTamam: 'Done',
  gizemBaslik: '✦ Coming Soon',
  gizemYeniMeslek: 'New profession',
  gizemTarih: 'Sept 12',
  panelYapimci: '👤 Creator',
  yapimciLinkedin: 'LinkedIn →',
  anaMenuyeDon: '🏠 Back to Main Menu',
  anaMenuAciklama: 'Your game is saved; return to it with "Resume Game" from the start screen.',
  bgBaslik: 'Achievements',
  bgAc: '🏆 Achievement Gallery',
  bgGizli: 'Hidden achievement — discover its condition yourself.',
  bgYeniBasarim: '🏆 New achievement: {0}',

  // ---- Setup flow (era→region→settlement→name) ----
  adimEtiketi: 'Step {0} / {1}',
  girisSlogan: 'Weave the threads of your fate.',

  // ---- Era selection ----
  cagSecBaslik: 'Choose Your Era',
  cagSecAlt: 'Which historical period do you want to live in?',
  cagAciklamaOrtacag: 'Crusades, plague, knights, caravans. 11th–13th century.',
  cagAciklamaSanayi: 'Industrialization, colonialism, new inventions. 19th century.',

  // ---- Region selection ----
  bolgeSecBaslik: 'Choose Your Country',
  bolgeSecAlt: 'In the {0} era, which lands would you be born in?',

  // ---- Settlement selection ----
  yerlesimSecBaslik: 'Where Will You Live?',
  yerlesimSecAlt:
    'The lands of {0} are vast; the city center, the frontier and the mountain reaches offer very different lives. Weigh the pros and cons.',

  // ---- Name selection ----
  isimSecBaslik: 'What Shall Your Name Be?',
  isimSecAlt:
    'This name shows in the top-left throughout the game, and you can enter the leaderboard under it when you die. Leave it blank if you like; a random name fitting the lands of {0} will be assigned.',
  isimYer: 'Type your name…',
  btnRastgeleIsim: '🎲 Random Name',
  btnBuIsimleBasla: 'Start With This Name',
  btnRastgeleIsimleBasla: 'Start With a Random Name',

  // ---- Profession selection ----
  meslekSecBaslik: 'Choose Your Profession',
  meslekSecAlt: "If you continue your family's trade, you inherit a ready network of clients and contacts.",
  meslekMirasIpucu: '✓ Your family trade — you earn a bonus',
  meslekAciklamaAsker: 'War, loyalty and rank. High risk, quick fame.',
  meslekAciklamaTuccar: 'Profit, bargaining and networking. High earning potential.',
  meslekAciklamaDinAdami: 'Congregation, conscience and influence. Steady prestige.',

  // ---- Opening ----
  acilisAileCocugu: 'Child of a {0} Family',
  acilisDurum: 'Your condition from birth: {0}',
  statSaglik: 'Health',
  statMutluluk: 'Happiness',

  // ---- Game screen ----
  panelKisiselHayat: 'Personal Life',
  panelDunyaSiyaset: 'World & Politics',
  tepkiNotu: "⏳ Time hasn't moved yet — this is your final word.",
  kaderSekilleniyor: 'Your fate is taking shape…',
  sansEki: '{0}-{1}% chance',
  btnAileniGor: 'View Your Family →',
  zamanBasligi: '— {0} years later —',
  yasSonek: 'age {0}',

  // ---- Death ----
  oldun: 'You have died.',
  olumOzet:
    'The year {0}. Died at {1}, as {2} ({3}), in the lands of {4}. They were the child of a {5} family.',
  isimGir: 'Enter your name',
  btnSkoruKaydet: 'Save Score',
  skorKaydedildi: 'Your score has been saved to the leaderboard.',
  skorKaydediliyor: 'Saving your score to the leaderboard…',
  btnLiderlikTablosu: 'Leaderboard',

  // ---- Leaderboard ----
  liderlikBaslik: 'Leaderboard',
  sekmeGenelLb: 'Overall',
  sekmeEnZengin: 'Richest',
  sekmeEnUnlu: 'Most Renowned',
  kayitYok: 'No records yet.',
  amacTamamladiTitle: 'Completed their life goal (x5 score)',

  // ---- UstSerit ----
  usAraniyorsun: '▲ wanted',
  usIzSogudu: '▼ trail cooled',
  usYil: 'Year',
  usYas: 'Age',
  usCan: 'Health',
  usPara: 'Money',
  usAranma: 'Wanted',
  usAhlak: 'Morality',
  usMutluluk: 'Happiness',
  usSavasta: '⚔️ At War',
  usSalgin: '☠️ Plague',
  usKriz: '📉 Crisis',
  usRefah: '📈 Prosperity',
  usUlkeBilgi: 'About the country',
  usAranmaYildizAria: 'wanted level {0} stars',

  // ---- GorevEkrani ----
  ksGorev: 'Duty',
  ksHapiste: 'In Prison',
  ksAmirin: 'Your superior',
  ksAstin: 'Your subordinate',
  ksAsker: 'troops',
  ksTechizat: 'equipment',
  ksSermaye: 'capital',
  ksNufuz: 'influence',
  ksYilBasi: 'yr',
  ksKisilik: 'personality',
  ksSadakat: 'loyalty',
  ksKalite: 'quality',
  ksKov: 'Dismiss',
  ksOzetAria: 'Summary of your duty and those under your command',

  // ---- GorevEkrani (full screen) ----
  geBaslik: 'Your Duty',
  geGorevGor: '🎖️ View Your Duty →',
  geHapisYilKalan: 'yr left',
  geVebaHastasi: 'Plague-stricken',
  geVebaHayatta: 'survival chance',
  geAmirYok: 'You are at the top — answerable directly to the ruler.',
  geAstlarin: 'Your Subordinates',
  geEkibin: 'Your Crew',
  geMeslekGucu: 'Your Professional Power',
  geKimseYok: 'No one under your command yet.',
  geEkipYok: 'No one on your crew.',

  // ---- FinansOzetPaneli ----
  foYillikGelir: '💰 Yearly income',
  foYillikGider: '📉 Yearly expenses',
  foElineKalan: 'Left in hand',
  foRutbe: 'Rank',
  foKariyerBirikimi: 'Career accrual',
  foKidem: 'seniority, city administration',
  foItibarin: 'Your standing',
  foItibarAlt: 'happiness, fame, morality',
  foDonemsel: 'Situational',
  foDonemselAlt: 'economy, war, plague',
  foKalici: 'permanent',
  foDegisken: 'variable',
  foMaasNasil: 'How your salary is formed:',
  foTamDokum: 'Full breakdown: Income & Expenses screen',

  // ---- IsyeriPaneli ----
  ipBirligin: 'Your Unit',
  ipIsletmen: 'Your Business',
  ipCemaatin: 'Your Congregation',
  ipIsyerin: 'Your Workplace',
  ipAsker1: 'You are a soldier who fights alone.',
  ipAsker2: 'A small squad follows you.',
  ipAsker3: 'A whole unit is under your command.',
  ipTuccar1: 'You have a small market stall.',
  ipTuccar2: 'You have a shop and a network of customers.',
  ipTuccar3: 'You own a great trading house.',
  ipDin1: 'You preach to a small congregation.',
  ipDin2: 'Your congregation has grown; your word carries weight.',
  ipDin3: 'You have become the spiritual leader of a great congregation.',

  // ---- SahneHotspotlari ----
  shEv: 'Income & Expenses',
  shIsyeri: 'Work & Investments',
  shMagaza: 'Shop',
  shSosyallesme: 'Socialize',
  shIsinKisa: 'Work',
  shEvinKisa: 'Home',
  shEvFallback: 'Home',
  shIsyeriTitle: '{0} — Work',
  shEvTitle: '{0} — Income & Expenses',

  // ---- EtkiCipleri ----
  ecPara: 'Money',
  ecSaglik: 'Health',
  ecMutluluk: 'Happiness',
  ecAhlak: 'Morality',
  ecSohret: 'Fame',
  ecEvlendin: 'You got married',
  ecEsKaybi: 'You lost your spouse',
  ecCocukEkle: '+{0} child',
  ecCocukKaybi: 'You lost a child',
  ecYeniMeslek: 'New profession: {0}',
  ecEtkiYok: 'This choice brought no measurable change.',

  // ---- Family summary / Relationships ----
  aoEs: 'Spouse',
  aoCocuklar: 'Children',
  aoEvcilHayvan: 'Pet',
  aoYok: 'none',
  aoCocukYok: 'You have no children',
  ilDost: 'Friend',
  ilRakip: 'Rival',
  ilIliskiler: 'Relationships',

  // ---- SiyasetPaneli ----
  syDonem: 'Period',
  syHizip: 'Faction',
  syBagimsiz: 'Independent',
  syOrtacag: 'Middle Ages',
  sySanayi: 'Industrial Revolution',

  // ---- HaberlerPaneli ----
  hbBaslik: 'News',
  hbYok: 'No important news from the world right now.',

  // ---- DurumPaneli ----
  drBaslik: 'Conditions',
  drKalici: 'permanent',
  drTur: 'turns',

  // ---- KisilikPaneli ----
  kpBaslik: 'Personality & Aptitudes',
  kpEksenPlanci: 'Planner',
  kpEksenFevri: 'Impulsive',
  kpEksenZalim: 'Ruthless',
  kpEksenBarisci: 'Peaceable',
  kpKaynaklar: 'Your aptitude sources',
  kpAile: 'Family',

  // ---- EnvanterPaneli ----
  enBaslik: 'Inventory',
  enBos: 'Nothing of note in your pack.',
  enKullan: 'Use',
  enCurumeUyari: 'rots if not used within {0} years',

  // ---- BolgeBilgisiPaneli ----
  bbNufus: 'Estimated population',
  bbBiliyorMuydun: 'Did you know?',

  // ---- HayatHikayesi ----
  hhBaslik: 'Life Story',

  // ---- GecmisGrafik ----
  ggBaslik: 'Over Time',
  ggPara: 'Money',
  ggSaglik: 'Health',
  ggUn: 'Fame',

  // ---- FinansEkrani ----
  feButcen: 'Your Budget',
  feYillikMaas: '💰 Yearly salary',
  feRutbedenGelen: '🎖️ From rank',
  feKariyerBirikimi: '📈 Career accrual',
  feItibarin: '🤝 Your standing',
  feDonemselEtkiler: '🌍 Situational percentage effects',
  feKalici: 'permanent',
  feDegisebilir: 'can change',
  feItibarUyari: 'Your standing is seriously lowering your income.',
  feMaasNot:
    '🎖️ Rank and career premiums are permanent — rank never drops. Situational effects shift with the economy, war and plague. 🤝 Someone happy, respected and honest does their job better and opens doors more easily; as any one of the three falls your income drops noticeably, and when all three are high your salary earns a bonus. The penalty for a fall is twice the reward for a rise.',
  feDunyaBaslik: '🌍 World conditions affecting your budget right now',
  feDunyaYok: 'Nothing unusual is shaking your budget right now.',
  feGayrimenkulGeliri: '🏠 Real-estate income',
  feGayrimenkulTitle:
    'The estimated yearly net yield of the properties you own given the current world state; it is a separate stream from your salary and can turn to a loss in bad times.',
  feYillikGiderler: 'Yearly expenses',
  feYasam: '🍞 Living',
  feEvKirasi: '🏠 House rent',
  feEkipMaaslari: '🧑 Crew wages',
  feEvcilHayvanBakimi: '🐾 Pet upkeep',
  feSavasVergisi: '⚔️ War tax',
  feSavasVergisiTitle:
    'While a great war is under way, the ruler levies an extra war tax on your passive income.',
  feMaasEksiGider: '↳ Salary − expenses',
  feNetYillikDahil: 'Net yearly (incl. real estate)',
  feNetYillik: 'Net yearly',
  feYasamTarzin: 'Your Lifestyle',
  feDegistirNot: 'Costs no turn.',
  feSuAnBu: ' (current)',
  feSuAnBurada: ' (currently here)',
  feYillikGider: 'Yearly cost',
  feYillikKira: 'Yearly rent',
  feEnflasyonEki: '(list {0}, +{1}% inflation)',
  feTasinNot:
    'Move whenever you like; it costs no turn. Moving to a more expensive home costs a one-time {0} {1} moving fee; falling back to a cheaper one is free.',
  feUcuzaGecis: '↩️ Cheaper move: no fee',
  feNakliyeUcreti: '🚚 One-time {0} {1} moving fee',
  feEvin: 'Your Home',
  feSaglikYil: '🩺 Health {0}/yr',
  feMutlulukYil: '😊 Happiness {0}/yr',
  feSohretYil: '⭐ Fame {0}/yr',

  // ---- IsYatirimEkrani ----
  iyBaslik: 'Work & Investments',
  iyGorevin: 'Your Duty',
  iyYillikKazanc: 'Yearly Earnings',
  iyAmirin: 'Your Superior',
  iySehirYonetimi: 'City Administration',
  iyTechizat: 'Equipment',
  iyOrduMevcudu: 'Army Strength',
  iyKademeAria: 'Tier {0} / 5',
  iySeviyeEk: 'Level {0}',
  iyGetiriYilBasi: '/yr',
  iySaldiriGucu: 'Attack Power',
  iyTicaretSermayesi: 'Trade Capital',
  iyNufuz: 'Influence',
  iyPiyasaDedikodulari: 'Market Rumors',
  iyDedikoduYok: 'Nothing being talked about right now.',
  iyYatirimlikGayrimenkuller: 'Investment Properties',
  iyAvantajli: 'Favorable',
  iyDezavantajli: 'Unfavorable',
  iySuAnTahminiGetiri: 'Current estimated yield',
  iyGetiriBrut: '📈 Yield (gross): {0}{1} {2}/yr ({3}%)',
  iyGetiriNet: '💰 Take-home (net): {0}{1} {2}/yr',
  iyBakimVergi: '🔧 Upkeep/tax: ~-{0} {1}/yr',
  iyBakimTitle:
    'The upkeep/tax cost that comes due every 7–11 years, divided into a yearly figure; separate from the yield and paid in every case.',
  iyBakimAcikla: '🔧 Every property incurs upkeep/tax of ~⅓ its value every 7–11 years; "net" already subtracts it.',
  iyKendiParan: 'Your Cash',
  iyKendiIsin: 'Your Own Business',
  iyKendiIsineYatirim: 'Invest in Your Own Business',
  iyKendiIsiAsama0: 'You have not invested at all yet.',
  iyKendiIsiAsama1: 'You have invested {0} times so far; your business has begun to grow.',
  iyKendiIsiAsama2: 'With {0} investments you are now an established, known name.',
  iyKendiIsiAsama3: 'With {0} investments you have built a small empire.',
  iyKendiIsiEskalasyon: 'Each new investment costs more than the last.',
  iyKendiIsiKarsilik: 'in return your yearly salary permanently rises by about 5% (up to a cap).',
  iyKendiIsiKarsilikVarsayilan: 'in return your earnings rise permanently.',
  iyRutbeNasil: 'How does rank rise?',
  iyRutbeNasilMetin:
    'Your career advances as you invest in your work and keep your {0} high; over time you also gain seniority. After each promotion a few years must pass before the next. Your rank never drops.',
  iyRutbeAhlakini: 'morality',
  iyRutbeSohretini: 'fame',
  iyRiskliIsler: 'Risky Business',
  iySucSeviyen: 'Your crime/wanted level: {0}/100 — {1}',
  iySicilTemiz: 'Your record is fairly clean.',
  iySicilDikkat: 'You are drawing the guards’ attention a little.',
  iySicilCiddi: 'You are drawing serious attention; be careful.',
  iySicilPesinde: 'They are after you — you could be raided at any moment.',
  iyZarKazanirsan: 'If you win, {0} {1}; if you lose, it all goes.',
  iySatinAl: 'Buy',
  iySahipsin: '· Owned',
  iyYeterliPara: 'Not enough money',
  iyYatirimYap: 'Invest',
  iyMaliyet: 'Cost',

  // ---- SosyallesmePaneli ----
  spBaslik: 'Socialize',
  spAciklama:
    'Going to a venue costs no turn; you resolve the event you have with the people there in the normal flow afterward.',
  spYok: 'There is no suitable venue for you to go to right now.',
  spGit: 'Go',
  spAlkolUyari: '🍷 A drinking venue — coming too often can earn a "drunkard" mark.',
  spZiyaret: 'visits',

  // ---- MagazaPaneli ----
  mpBaslik: 'Shop',
  mpAciklama: 'You hold {0} {1}. Prices shift with war, famine and plenty.',
  mpSekmeSifa: 'Essentials & Remedies',
  mpSekmeLuks: 'Luxury Goods',
  mpSifaAciklama: 'Grants health/happiness; rots if unused. A purchase locks the category for a while.',
  mpLuksAciklama: 'Instant fame; one per type, occasional upkeep cost.',
  mpKategoriBos: 'There is no item in this category suited to your era right now.',
  mpSaglik: 'health',
  mpMutluluk: 'happiness',
  mpSohret: 'fame',
  mpCurukUyari: '⏳ rots if not used within {0} years',
  mpSifaSans: '🎲 When used, ~{0}-{1}% chance of full effect; small chance it does nothing; rarely it backfires and costs you health',
  mpSatinAl: 'Buy',
  mpSahipsin: 'Owned',
  mpYeterliPara: 'Not enough money',
  mpKilitli: '🔒 {0}',

  // ---- AileEkrani ----
  aeBaslik: 'Your Family',
  aeAnne: 'Mother',
  aeBaba: 'Father',
  aeEs: 'Spouse',
  aeEsYok: 'You are not married.',
  aeCocuklar: 'Children',
  aeCocukYok: 'You have no children yet.',
  aeDogum: 'born {0}',
  aeYasiyor: 'alive',
  aeVefat: 'deceased',
  aeEsPuani: 'Marriage harmony',

  // ---- Banner ----
  bnHukumdar: 'Ruler',
  bnYil: 'Year',
  bnSavasta: '⚔️ At War',
  bnSalgin: '☠️ Plague',
  bnKriz: '📉 Crisis',
  bnRefah: '📈 Prosperity',

  // ---- SiyasetPaneli ----
  syHizbin: 'Your Faction',
  syDonemEki: 'Era',

  // ---- HaberlerPaneli ----
  hbBaslikTam: '📰 News From the Region',

  // ---- DurumPaneli ----
  drBaslikTam: 'Conditions',
  drBos: 'No active condition.',
  drKaliciTam: 'Permanent',
  drTurKaldi: '{0} turns left',
  drTurBasi: '/turn',

  // ---- KisilikPaneli ----
  kpBaslikTam: 'Personality & Heritage',
  kpPlanlayici: 'Planner',
  kpFevri: 'Impulsive',
  kpZalim: 'Ruthless',
  kpBarisci: 'Peaceable',
  kpEksenAria: 'axis between {0} and {1}',
  kpAilesi: ' Family',

  // ---- AileOzetPaneli ----
  aoBaslik: 'Family',
  aoYalniz: 'You are alone for now.',
  aoEsTek: 'Spouse',
  aoCocukTek: 'Child',
  aoCocukCogul: 'Children',
  aoEvcilHayvanTek: 'Pet',

  // ---- IliskilerPaneli ----
  ilBaslik: 'Your Relationships',
  ilDostKusgun: 'Estranged',
  ilDostMesafeli: 'Distant',
  ilDostTanidik: 'Acquaintance',
  ilDostDost: 'Friend',
  ilDostYakin: 'Close Friend',
  ilRakipAmansiz: 'Sworn Enemy',
  ilRakipDusman: 'Enemy',
  ilRakipGergin: 'Tense',
  ilRakipNotr: 'Neutral Rival',
  ilRakipYumusak: 'Softened Rival',

  // ---- GecmisGrafik ----
  ggGecmisYillar: 'Past Years',
  ggYetersiz: 'Not enough history yet.',
  ggParaGecmisiAria: 'Money history: from the year {0} to {1}, current value {2} {3}',

  // ---- EnvanterPaneli ----
  enBaslikTam: 'Inventory',
  enLuksAciklama: 'A permanent collector’s piece (may incur an upkeep/tax cost now and then).',
  enCurumeUyariTam: '⏳ rots if not used within {0} years.',
  enKullanimBekliyor: 'Waiting to be used.',
  enKullanTam: 'Use',
  enKullanSansHint: '🎲 Using it rolls the dice: usually gives full benefit, small chance it does nothing, rarely backfires and costs you health.',

  // ---- BolgeBilgisiPaneli ----
  bbHakkinda: 'About {0}',
  bbNufusTam: '👥 Estimated population',

  // ---- FinansOzetPaneli ----
  foMaasNasilTam: 'How your salary is formed:',
  foRutbeSat: '🎖️ Rank',
  foKariyerSat: '📈 Career accrual (seniority, city administration)',
  foItibarSat: '🤝 Your standing (happiness, fame, morality)',
  foDonemselSat: '🌍 Situational (economy, war, plague)',
  foKaliciEk: 'permanent',
  foDegiskenEk: 'variable',
  foTamDokumEk: 'Full breakdown: Income & Expenses screen',

  // ---- FinansEkrani ----
  feToplamGider: 'Total expenses',

  // ---- SosyallesmePaneli ----
  spBaslikTam: 'Where To Go?',
  spAciklamaTam:
    'Pick a venue; going there costs no turn, but an event befalls you. You resolve it in the normal flow.',
  spBosTam: 'No suitable venue for you to go to right now (you may be in prison or on a journey).',
  spGitTam: 'Go Here',
  spAlkolluEtiket: '🍷 Drinking venue',

  // ---- MagazaPaneli ----
  mpBaslikTam: 'Shop',
  mpSatinAlTam: 'Buy',
  mpSahipsinTam: '· Owned',
  mpParaYetmez: 'Not enough money',

  // ---- AileEkrani ----
  aeBaslikTam: 'Your Family',
  aeKoken: 'Your Family Origins',
  aeEsin: 'Your Spouse',
  aeEsYokMetin: 'You have no spouse yet.',
  aeCocuklarin: 'Your Children',
  aeCocukYokMetin: 'You have no children yet.',
  aeDogumlu: 'born {0}',
  aeYasindaTam: 'age {0}',
  aeKaybedildi: 'lost',
  aeEsCatirdiyor: 'Fracturing',
  aeEsGergin: 'Tense',
  aeEsIstikrarli: 'Stable',
  aeEsSicak: 'Warm',
  aeEsCokBagli: 'Deeply Bonded',

  // ---- SosyallesmePaneli ----
  spSosyallesBaslik: 'Socialize',
  spIntro:
    'You pay a small fee; the event costs a little money but lifts your mood. Frequent drinking venues earn a "drunkard" mark.',
  spMekanYok: 'There is no venue for you to go to right now.',
  spAyyasZaten: 'You are already known as a drunkard.',
  spZiyaretUyari: 'You have gone {0} times so far — {1} more visits will earn a drunkard mark.',

  // ---- EvlilikPaneli ----
  evBaslik: 'Marriage',
  evIntro: "Instead of waiting for fate to marry you off through an event, you can pick your own candidate and propose. Costs no turn — if rejected, you can try again.",
  evYukleniyorMesaji: 'Searching for candidates...',
  evUyum: 'Compatibility: ~{0}%',
  evTeklifEt: 'Propose Marriage',
  evYeniAdaylar: 'Show Different Candidates',
  evZatenEvli: 'You are already married.',

  // ---- IsYatirimEkrani ----
  iyMaliyetEk: 'Cost: {0} {1}',
  iyKendiIsiButon: 'Invest',
  iyZarKademeButon: 'stake {0} {1}',

  // ---- KarakterAvatari / SonucEfekti ----
  kaAria: 'Character portrait',

  // ---- Simplified / shortened text ----
  feKirilimLejant: '🎖️ 📈 permanent · 🤝 🌍 vary with world conditions',
  feTasinNotKisa: 'Costs no turn. Upgrading costs a one-time {0} {1}.',
  feTasinmaKisa: ' · +{0} {1} to move',
  iyNetKisa: '💰 Net ~{0}{1} {2}/yr ({3}%)',
  iyFiyatKisa: 'Price: {0} {1}',
  iyRutbeNasilKisa: 'Invest in your work, keep your {0} high, build seniority. Rank never drops.',
  mpFayda: 'benefit',
  mpRafKisa: '~{0}y shelf life',

  bilinmiyor: 'Unknown',
};

export function metinler(dil: Dil): Metinler {
  return dil === 'en' ? EN : TR;
}
