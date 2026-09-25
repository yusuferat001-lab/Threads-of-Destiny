import { useEffect, useRef, useState, type ReactNode } from 'react';
import type {
  CharacterState,
  SenaryoResponse,
  SonucEtkisi,
  ScoreKaydi,
  SiralamaTuru,
  SiralamaDonemi,
  KonutTanimi,
  YasamSecenegiTanimi,
  FinansOzeti,
  KotuIsKarti,
  AmaclarDurumu,
  KrediConfig,
  MulkKartBilgisi,
  MulkTuru,
  TepkiSonucu,
  SosyallesmeYeri,
  SosyalAksiyonConfig,
  MagazaEsyaKarti,
  AileDurumu,
  YonetimDurumu,
} from './types';
import {
  mesleklerGetir,
  bolgelerGetir,
  konutlarGetir,
  yasamSecenekleriGetir,
  yeniOyunBaslat,
  meslekAta,
  stateGetir,
  oyunDiliAyarla,
  senaryoGetir,
  secimYap,
  skorKaydet,
  skorTablosuGetir,
  isimOnerisiGetir,
  finansGetir,
  kotuIsYap,
  kotuIsConfigGetir,
  amaclarGetir,
  hediyeEt,
  krediGetir,
  krediAl,
  krediPazarlik,
  mulkConfigGetir,
  mulkSatinAl,
  dedikoduGetir,
  zarKademeleriGetir,
  zarAt,
  ucKagitciOyna,
  bilekGuresiSonuc,
  konutDegistir,
  yasamSecimiDegistir,
  ekipCikar,
  sosyallesmeYerleriGetir,
  sosyallesmeYerineGit,
  sosyallesmeAksiyonConfigGetir,
  sosyallesmeAksiyonYap,
  sosyallesmeOlayCoz,
  magazaKatalogGetir,
  magazadanSatinAl,
  envanterEsyasiKullan,
  geriBildirimGonder,
  evlilikAdaylariGetir,
  evlilikTeklifEt,
  aileDurumGetir,
  aileEtkilesimYap,
  aileTalebiKararlastir,
  yonetimDurumGetir,
  yonetimEtkilesimYap,
  yonetimIstekYap,
  yonetimTalebiKararlastir,
} from './api';
import { Banner } from './components/Banner';
import { UstSerit } from './components/UstSerit';
import { AileOzetPaneli } from './components/AileOzetPaneli';
import { SiyasetPaneli } from './components/SiyasetPaneli';
import { AmacPaneli } from './components/AmacPaneli';
import { EtkiCipleri } from './components/EtkiCipleri';
import { KisilikPaneli } from './components/KisilikPaneli';
import { BolgeSahnesi } from './components/BolgeSahnesi';
import { KarakterAvatari } from './components/KarakterAvatari';
import { IsyeriPaneli } from './components/IsyeriPaneli';
import { GecmisGrafik } from './components/GecmisGrafik';
import { HayatHikayesi } from './components/HayatHikayesi';
import { HaberlerPaneli } from './components/HaberlerPaneli';
import { BolgeBilgisiPaneli } from './components/BolgeBilgisiPaneli';
import { AileEkrani } from './components/AileEkrani';
import { KariyerEkrani } from './components/KariyerEkrani';
import { FinansOzetPaneli } from './components/FinansOzetPaneli';
import { SahneHotspotlari } from './components/SahneHotspotlari';
import { EnvanterPaneli } from './components/EnvanterPaneli';
import { FinansEkrani } from './components/FinansEkrani';
import { SosyallesmePaneli } from './components/SosyallesmePaneli';
import { EvlilikPaneli } from './components/EvlilikPaneli';
import { MagazaPaneli } from './components/MagazaPaneli';
import { IsYatirimEkrani } from './components/IsYatirimEkrani';
import { SonucEfekti } from './components/SonucEfekti';
import { AyarlarModal } from './components/AyarlarModal';
import { ayarlariGetir, ayarlariKaydet, type Dil } from './ayarlar';
import { bolgeOzetiGetir } from './bolgeOzellikleri';
import type { GeriBildirimGirdi, EvlilikAdayi } from './types';
import { sesKapaliMi, sesTercihiKaydet } from './ses';
import { muzikModunuAyarla, muzikDurdur, muzikSessizAyarla, type MuzikModu } from './muzik';
import { aktifOturumIdGetir, aktifOturumIdKaydet, aktifOturumIdSil } from './oturum';
import { basarimlariKaydet, basarimlariGetir } from './basarimlar';
import { gecmisHayatKaydet, gecmisHayatlariGetir, gecmisHayatlariTemizle, gecmisHayatSil, type GecmisHayat } from './gecmisHayatlar';
import { YAPIMCI } from './yapimci';
import { basarimlariDegerlendir, type BasarimTanimi } from './basarimSistemi';
import { hesaplaSkorKirilimi } from './skor';
import { BasarimGaleri } from './components/BasarimGaleri';
import { KozmetikMagaza } from './components/KozmetikMagaza';
import { kozmetikGiyilenlerGetir, type GiyilenKozmetikler } from './kozmetikDolabi';
import { NasilOynanir } from './components/NasilOynanir';
import { YenilikModal } from './components/YenilikModal';
import { yenilikGosterilmeliMi, yenilikGorulduIsaretle } from './yenilikler';
import { istemciId, ziyaretBildir } from './istemci';
import { gunlukSeriKontrolEt, gunlukSeriGetir, type GunlukSeriSonuc } from './gunlukSeri';
import { goldBakiyeGetir, olumGoldHesapla, goldEkle } from './gold';
import { sonucIkonuGetir, unUnvani, MESLEK_KATEGORI, yatkinlikEtiketi, etkiTahminiGetir, type EtkiTahmini } from './bolgeTema';
import { formatPara } from './format';
import { bic } from './i18n';
import { DilContext, dilCtxYap } from './DilContext';
import { CarkLogo, KoseTezhibi, MuhurAyrac, AdimGostergesi, KaderYollari } from './components/Suslemeler';
import { CagAmblemi, BolgeAmblemi } from './components/Amblemler';
import './App.css';
import './giris.css';

// Geçici olarak kapatıldı (2026-09): günlük giriş serisi/ödülü, gold bakiyesi ve kozmetik dolabı
// oyuncuya gösterilmiyor. Alttaki mekanik/veri katmanına dokunulmadı — yeniden açmak için bunu
// `true` yap.
const GUNLUK_KOZMETIK_GOLD_GORUNUR = false;

type Ekran =
  | 'giris'
  | 'cag_sec'
  | 'isim_sec'
  | 'acilis'
  | 'oyun'
  | 'sonuc'
  | 'olum'
  | 'liderlik'
  | 'aile'
  | 'kariyer'
  | 'finans'
  | 'yatirim'
  | 'sosyallesme'
  | 'magaza'
  | 'evlilik';

interface SonEtki {
  basarili: boolean;
  etki: SonucEtkisi;
  yasArtisi: number;
  kategori: string;
  sonucAnlatimi: string;
  zamanAnlatimi: string | null;
  paraBirimi: string;
  terfiOldu: boolean;
}

const MESLEK_SIMGE: Record<string, string> = {
  Asker: '⚔️',
  Tüccar: '💰',
  'Din Adamı': '🙏',
  Zanaatkâr: '🔨',
};

/** Meslek/çağ kısa açıklamaları — dile göre i18n sözlüğünden. */
function meslekAciklama(m: ReturnType<typeof dilCtxYap>['m'], meslek: string): string {
  if (meslek === 'Asker') return m.meslekAciklamaAsker;
  if (meslek === 'Tüccar') return m.meslekAciklamaTuccar;
  if (meslek === 'Din Adamı') return m.meslekAciklamaDinAdami;
  if (meslek === 'Zanaatkâr') return m.meslekAciklamaZanaatkar;
  return '';
}
function cagAciklama(m: ReturnType<typeof dilCtxYap>['m'], cag: string): string {
  if (cag === 'Orta Çağ') return m.cagAciklamaOrtacag;
  if (cag === 'Sanayi Devrimi') return m.cagAciklamaSanayi;
  return '';
}

/**
 * Seçenek altındaki olası etkiler — kullanıcı isteği: tüm artılar TEK yerde,
 * tüm eksiler TEK yerde (dikeyde az yer kaplasın). Her grup tek satır çip.
 */
function TahminOzeti({ tahminler }: { tahminler: EtkiTahmini[] }) {
  if (tahminler.length === 0) return null;
  const poz = tahminler.filter((t) => t.pozitif);
  const neg = tahminler.filter((t) => !t.pozitif);
  return (
    <span className="secenek-tahminler">
      {poz.length > 0 && (
        <span className="secenek-tahmin tahmin-pozitif">
          {poz.map((t) => t.simge).join('')} {poz.map((t) => t.metin).join(' · ')}
        </span>
      )}
      {neg.length > 0 && (
        <span className="secenek-tahmin tahmin-negatif">
          {neg.map((t) => t.simge).join('')} {neg.map((t) => t.metin).join(' · ')}
        </span>
      )}
    </span>
  );
}

/** Gelir/Sosyalleş/Mağaza artık sahne üzerindeki tıklama noktalarından açılır ama tam
 * sayfa olarak (oyun HUD'unun yerini alarak) açılır — hepsi ana oyun ekranıyla aynı "sayfa
 * hiç kaymaz, sadece sütun/ızgara kendi içinde kayar" modelini kullanır (bkz.
 * .oyun-kapsayici-tam) — `aile` de (sol panelden "Aileni Gör →" ile açılır) artık bu gruba
 * dahildir: evin-içi arka planlı, eş/çocuk ilişkisi + etkileşim + talep ekranı (§33). */
const TAM_EKRAN_GRUBU: Ekran[] = [
  'giris',
  'cag_sec',
  'isim_sec',
  'acilis',
  'oyun',
  'sonuc',
  'yatirim',
  'finans',
  'sosyallesme',
  'magaza',
  'evlilik',
  'aile',
  'olum',
];

/** Geri bildirim mesajlarına eklenen uygulama sürümü — bir hata raporunun hangi build'e
 * ait olduğunu ayırt etmek için. Yeni bir sürüm çıkınca elle güncelle. */
const APP_SURUM = '1.0.0';

/** Yakalanan hatayı kullanıcıya gösterilecek sade bir cümleye çevirir (çift "Error:" önekini kırpar). */
function temizHata(err: unknown): string {
  const ham = err instanceof Error ? err.message : String(err);
  return ham.replace(/^(Error:\s*)+/i, '');
}

/** Ekran telefon genişliğinde mi? (oyun ekranı düzeni için tek kırılım noktası, ≤767px) */
function useMobil() {
  const [mobil, setMobil] = useState(
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const dinle = () => setMobil(mq.matches);
    mq.addEventListener('change', dinle);
    return () => mq.removeEventListener('change', dinle);
  }, []);
  return mobil;
}

/**
 * Oyun ekranının yan panelleri (sol: karakter, sağ: dünya & siyaset).
 * Masaüstünde her zaman açık bir kutu; telefonda başlığa dokununca açılıp kapanan bir
 * `<details>` — böylece olay + seçenekler ekrana sığar, ayrıntı isteyen açar (Paket 5).
 */
function YanPanel({
  className,
  baslik,
  mobil,
  children,
}: {
  className: string;
  baslik: string;
  mobil: boolean;
  children: ReactNode;
}) {
  // Başlık kaldırıldıysa (kullanıcı isteği) hiç kutu/summary çubuğu gösterme —
  // düz bir <div>. Katlama tutamacı yalnız gerçek başlığı olan panellerde.
  if (!baslik) {
    return <div className={className}>{children}</div>;
  }
  if (mobil) {
    // Varsayılan AÇIK — iki yan panel mobilde alt alta değil yan yana ve açık durur
    // (bkz. App.css mobil .oyun-govde 2 sütunlu grid). Başlığa dokunarak yine katlanabilir.
    return (
      <details open className={`${className} panel-katla`}>
        <summary className="panel-parsomen-baslik">{baslik}</summary>
        {children}
      </details>
    );
  }
  return (
    <div className={className}>
      <div className="panel-parsomen-baslik">{baslik}</div>
      {children}
    </div>
  );
}

function App() {
  const [ekran, setEkran] = useState<Ekran>('giris');
  // Mobilde tam-sayfa ekranlar (Yatırım/Kariyer/Aile/...) sabit yükseklikte
  // değil, sayfa doğal olarak kayar (bkz. CLAUDE.md §19). Aynı belge içinde
  // ekran değiştirdiğimiz için (route yok) önceki ekrandan kalan scroll
  // pozisyonu korunuyordu — bir önceki ekranda aşağı kaydırılmışsa yeni
  // ekranın başlığı, sabit (position:fixed) para rozeti/ayar dişlisinin
  // ALTINDA gizli kalarak açılıyordu. Her ekran değişiminde tepeye sar.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ekran]);
  const [meslekler, setMeslekler] = useState<string[]>([]);
  const [bolgeler, setBolgeler] = useState<Record<string, string[]>>({});
  const [konutlar, setKonutlar] = useState<KonutTanimi[]>([]);
  const [tasinmaMaliyeti, setTasinmaMaliyeti] = useState(10);
  const [yasamSecenekleri, setYasamSecenekleri] = useState<YasamSecenegiTanimi[]>([]);
  const [secilenCag, setSecilenCag] = useState<string | null>(null);
  const [secilenBolge, setSecilenBolge] = useState<string | null>(null);
  const [secilenYerlesim, setSecilenYerlesim] = useState<string | null>(null);
  const [oyuncuIsmi, setOyuncuIsmi] = useState('');
  const [karakter, setKarakter] = useState<CharacterState | null>(null);
  const [senaryo, setSenaryo] = useState<SenaryoResponse | null>(null);
  const [tepkiModu, setTepkiModu] = useState(false);
  const [sonEtki, setSonEtki] = useState<SonEtki | null>(null);
  // Sosyalleş ekranından çıkmadan çözülen mekân olayı (kullanıcı: "oranın içinde kalalım").
  const [sosyalOlay, setSosyalOlay] = useState<SenaryoResponse | null>(null);
  const [sosyalOlaySonuc, setSosyalOlaySonuc] = useState<SonEtki | null>(null);
  const [sosyalOlayTepkiModu, setSosyalOlayTepkiModu] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState<string | null>(null);

  const [isim, setIsim] = useState('');
  const [kaydedildi, setKaydedildi] = useState(false);
  // Otomatik skor kaydı denendi ve başarısız oldu → ölüm ekranında elle kayıt formunu yedek olarak göster.
  const [otoKayitBasarisiz, setOtoKayitBasarisiz] = useState(false);
  // Ölüm ekranı: Skor Tablosu / Hayat Hikayesi sekmeleri arasında geçiş.

  const [liderlikTuru, setLiderlikTuru] = useState<SiralamaTuru>('genel');
  const [liderlikDonemi, setLiderlikDonemi] = useState<SiralamaDonemi>('tumZaman');
  const [liderlik, setLiderlik] = useState<ScoreKaydi[]>([]);

  const [finans, setFinans] = useState<FinansOzeti | null>(null);
  const [amaclar, setAmaclar] = useState<AmaclarDurumu | null>(null);
  const [aileDurum, setAileDurum] = useState<AileDurumu | null>(null);
  const [yonetimDurum, setYonetimDurum] = useState<YonetimDurumu | null>(null);
  const [kotuIsler, setKotuIsler] = useState<KotuIsKarti[]>([]);
  const [krediConfig, setKrediConfig] = useState<KrediConfig | null>(null);
  const [dedikodular, setDedikodular] = useState<string[]>([]);
  const [mulkler, setMulkler] = useState<MulkKartBilgisi[]>([]);
  const [zarKademeleri, setZarKademeleri] = useState<number[]>([]);
  const [islemMesaji, setIslemMesaji] = useState<string | null>(null);
  const [sosyallesmeYerleri, setSosyallesmeYerleri] = useState<SosyallesmeYeri[]>([]);
  const [sosyalAksiyonConfig, setSosyalAksiyonConfig] = useState<SosyalAksiyonConfig | null>(null);
  const [magazaKatalogu, setMagazaKatalogu] = useState<MagazaEsyaKarti[]>([]);
  const [evlilikAdaylari, setEvlilikAdaylari] = useState<EvlilikAdayi[]>([]);

  const [sesKapali, setSesKapali] = useState(() => sesKapaliMi());
  const [muzikAcik, setMuzikAcik] = useState(() => ayarlariGetir().muzik);
  const [ayarlarAcik, setAyarlarAcik] = useState(false);
  const [ayarlarSekme, setAyarlarSekme] = useState<'genel' | 'geri_bildirim'>('genel');
  const [basarimGaleriAcik, setBasarimGaleriAcik] = useState(false);
  const [nasilOynanirAcik, setNasilOynanirAcik] = useState(false);
  const [yenilikAcik, setYenilikAcik] = useState(false);
  const [yeniBasarimlar, setYeniBasarimlar] = useState<BasarimTanimi[]>([]);
  const [dil, setDil] = useState<Dil>(() => ayarlariGetir().dil);
  const [basarimlar, setBasarimlar] = useState(() => basarimlariGetir());
  const [basarimlarAcik, setBasarimlarAcik] = useState(false);
  const [gecmisHayatlar, setGecmisHayatlar] = useState<GecmisHayat[]>(() => gecmisHayatlariGetir());
  const [secilenGecmisHayat, setSecilenGecmisHayat] = useState<GecmisHayat | null>(null);
  const [liderlikOnizleme, setLiderlikOnizleme] = useState<ScoreKaydi[]>([]);
  const [gunlukSeri, setGunlukSeri] = useState(() => gunlukSeriGetir());
  const [gunlukOdulBildirimi, setGunlukOdulBildirimi] = useState<GunlukSeriSonuc | null>(null);
  const [goldBakiye, setGoldBakiye] = useState(() => goldBakiyeGetir());
  const [kozmetikMagazaAcik, setKozmetikMagazaAcik] = useState(false);
  const [giyilenKozmetikler, setGiyilenKozmetikler] = useState<GiyilenKozmetikler>(() => kozmetikGiyilenlerGetir());
  // Gold/kozmetik dolabı arayüzü şu an gizli (GUNLUK_KOZMETIK_GOLD_GORUNUR=false) — daha önce
  // giyilmiş bir eşya kalmışsa bile oyuncuya avatarda GÖRÜNMESİN.
  const avatarKozmetikleri = GUNLUK_KOZMETIK_GOLD_GORUNUR ? giyilenKozmetikler : undefined;
  const [bolgeBilgiAcik, setBolgeBilgiAcik] = useState(false);
  // Kişilik & Miras artık sol panelde sabit değil — portreye/isme tıklayınca açılan pencere.
  const [kisilikModalAcik, setKisilikModalAcik] = useState(false);

  const dilCtx = dilCtxYap(dil);
  const { m, kt } = dilCtx;

  // Mobilde: her tur / her sonuç ekranında merkez paneli (olay + seçenekler) görünür alana
  // kaydırır — oyuncu üst şeridi/sol paneli geçip aramak zorunda kalmasın.
  const merkezAltRef = useRef<HTMLDivElement | null>(null);
  // Ölümde skorun otomatik kaydedilmesi denendi mi (oturum id başına tek sefer) —
  // StrictMode çift-render'ında ve tekrar render'larda ikinci bir POST /api/scores atmamak için.
  const otoSkorKaydiRef = useRef<string | null>(null);
  const olumGoldOdenenRef = useRef<string | null>(null);
  const [olumGoldKazanci, setOlumGoldKazanci] = useState<number | null>(null);
  const mobil = useMobil();

  function sesToggle() {
    setSesKapali((onceki) => {
      const yeni = !onceki;
      sesTercihiKaydet(yeni);
      return yeni;
    });
  }

  function muzikToggle() {
    setMuzikAcik((onceki) => {
      const yeni = !onceki;
      ayarlariKaydet({ muzik: yeni });
      muzikSessizAyarla(!yeni);
      return yeni;
    });
  }

  // Ekrana/çağa göre arka plan müziği modunu seç. Müzik kapalıysa hiç başlatma.
  useEffect(() => {
    if (!muzikAcik) {
      muzikDurdur();
      return;
    }
    let mod: MuzikModu;
    if (ekran === 'olum') {
      mod = 'olum';
    } else if (
      ekran === 'oyun' ||
      ekran === 'sonuc' ||
      ekran === 'aile' ||
      ekran === 'kariyer' ||
      ekran === 'finans' ||
      ekran === 'yatirim' ||
      ekran === 'sosyallesme' ||
      ekran === 'magaza' ||
      ekran === 'evlilik'
    ) {
      mod = karakter?.cag === 'Sanayi Devrimi' ? 'sanayi' : 'ortacag';
    } else {
      mod = 'menu';
    }
    muzikModunuAyarla(mod);
  }, [ekran, karakter?.cag, muzikAcik]);

  function dilDegistir(yeni: Dil) {
    setDil(yeni);
    ayarlariKaydet({ dil: yeni });
    // Oyun sürerken dil değişirse sunucudaki state.dil'i de güncelle; yoksa
    // arayüz çevrilse bile olay/anlatı metinleri eski dilde takılı kalır
    // (state.dil normalde yalnız yeni oyun açılışında yazılıyor). Değişiklik
    // bir sonraki senaryodan itibaren geçerli olur.
    if (karakter?.id && karakter.aktif) {
      oyunDiliAyarla(karakter.id, yeni)
        .then(({ state }) => setKarakter(state))
        .catch(() => {
          /* sessiz geç: sonraki denemede ya da yeni oyunda düzelir */
        });
    }
  }

  async function geriBildirimGonderHandler(girdi: GeriBildirimGirdi) {
    await geriBildirimGonder({
      ...girdi,
      baglam: {
        stateId: karakter?.id ?? null,
        ekran,
        cag: karakter?.cag ?? secilenCag ?? null,
        bolge: karakter?.bolge ?? secilenBolge ?? null,
        yerlesim: karakter?.yerlesim ?? null,
        meslek: karakter?.meslek ?? null,
        yas: karakter?.yas ?? null,
        yil: karakter?.yil ?? null,
        surum: APP_SURUM,
        dil,
        userAgent: navigator.userAgent,
      },
    });
  }

  // Günde bir kez "ziyaret" istatistik ping'i (§32) — ateşle-unut.
  useEffect(() => {
    ziyaretBildir();
    const sonuc = gunlukSeriKontrolEt();
    setGunlukSeri({ seri: sonuc.seri, enUzunSeri: sonuc.enUzunSeri });
    setGoldBakiye(goldBakiyeGetir());
    if (sonuc.yeniOdulMu) setGunlukOdulBildirimi(sonuc);
    if (yenilikGosterilmeliMi()) setYenilikAcik(true);
  }, []);

  useEffect(() => {
    mesleklerGetir()
      .then(({ meslekler }) => setMeslekler(meslekler))
      .catch(() => setMeslekler(['Asker', 'Tüccar', 'Din Adamı', 'Zanaatkâr']));
    bolgelerGetir()
      .then(({ bolgeler }) => setBolgeler(bolgeler))
      .catch(() =>
        setBolgeler({
          'Orta Çağ': ['Fransa', 'Kutsal Roma', 'Bizans', 'Selçuklu'],
          'Sanayi Devrimi': ['İngiltere', 'Fransa', 'Osmanlı', 'Rusya'],
        })
      );
    konutlarGetir()
      .then(({ konutlar, tasinmaMaliyeti }) => {
        setKonutlar(konutlar);
        setTasinmaMaliyeti(tasinmaMaliyeti);
      })
      .catch(() => setKonutlar([]));
    yasamSecenekleriGetir()
      .then(({ yasamSecenekleri }) => setYasamSecenekleri(yasamSecenekleri))
      .catch(() => setYasamSecenekleri([]));
    skorTablosuGetir('genel')
      .then(({ tablo }) => setLiderlikOnizleme(tablo.slice(0, 3)))
      .catch(() => {});
  }, []);

  // Sol paneldeki gelir/gider özetini her tur (yaş/yıl ilerleyince) tazeler — daha önce sadece
  // Gelir & Gider ekranı açılınca veya konut/yaşam/ekip değişince çekiliyordu.
  useEffect(() => {
    if (!karakter || !karakter.meslek) return;
    let iptal = false;
    finansGetir(karakter.id)
      .then(({ finans }) => {
        if (!iptal) setFinans(finans);
      })
      .catch(() => {});
    return () => {
      iptal = true;
    };
  }, [karakter?.id, karakter?.tur_sayisi, karakter?.meslek]);

  // "🎯 Amaçların" kartı (sağ panel + Görevin + ölüm ekranı) — her tur tazelenir.
  useEffect(() => {
    if (!karakter || !karakter.meslek) {
      setAmaclar(null);
      return;
    }
    let iptal = false;
    amaclarGetir(karakter.id)
      .then((d) => {
        if (!iptal) setAmaclar(d);
      })
      .catch(() => {});
    return () => {
      iptal = true;
    };
  }, [karakter?.id, karakter?.tur_sayisi, karakter?.meslek, ekran]);

  // Mobilde olay/sonuç değişince merkez paneli ekrana getir (masaüstünde sayfa zaten kaymıyor).
  useEffect(() => {
    if (ekran !== 'oyun' && ekran !== 'sonuc') return;
    if (typeof window === 'undefined' || !window.matchMedia('(max-width: 767px)').matches) return;
    const t = setTimeout(() => {
      merkezAltRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
    return () => clearTimeout(t);
  }, [ekran, senaryo?.olay_basligi, sonEtki]);

  // Karakter öldüğünde kazandığı ünvanları/efsanevi ölümü tarayıcının kalıcı başarım koleksiyonuna ekler.
  useEffect(() => {
    if (ekran === 'olum' && karakter) {
      basarimlariKaydet(karakter.unvanlar, karakter.efsanevi_olum);
      setBasarimlar(basarimlariGetir());
      gecmisHayatKaydet(karakter);
      setGecmisHayatlar(gecmisHayatlariGetir());
      setIsim((mevcut) => mevcut || karakter.isim || '');
      const { yeniAcilanlar, skor } = basarimlariDegerlendir(karakter);
      setYeniBasarimlar(yeniAcilanlar);
      // Gold — ölümde kazanılan skorun küçük bir oranı (amaç ×5 çarpanı zaten skora yansımış).
      if (olumGoldOdenenRef.current !== karakter.id) {
        olumGoldOdenenRef.current = karakter.id;
        const kazanc = olumGoldHesapla(skor);
        setGoldBakiye(goldEkle(kazanc));
        setOlumGoldKazanci(kazanc);
      }
    }
  }, [ekran, karakter]);

  // Oynanan her oyun ölünce liderlik tablosuna OTOMATİK eklenir — oyuncu artık
  // ölüm ekranında isim yazıp "kaydet" demek zorunda değil (isim zaten oyun
  // başında alınıyor; boşsa sunucu rastgele atamıştı). Elle kayıt formu yalnız
  // otomatik deneme başarısız olursa yedek olarak görünür kalır.
  useEffect(() => {
    if (ekran !== 'olum' || !karakter) return;
    if (kaydedildi) return;
    if (karakter.skoru_kaydedildi) {
      setKaydedildi(true);
      return;
    }
    if (otoSkorKaydiRef.current === karakter.id) return;
    otoSkorKaydiRef.current = karakter.id;
    const ad = (karakter.isim || '').trim() || (dil === 'en' ? 'Nameless' : 'İsimsiz');
    let iptal = false;
    (async () => {
      try {
        await skorKaydet(karakter.id, ad);
        if (!iptal) setKaydedildi(true);
      } catch {
        // Otomatik kayıt tutmadı (ağ/hız sınırı) → elle kayıt formunu yedek olarak aç.
        if (!iptal) setOtoKayitBasarisiz(true);
      }
    })();
    return () => {
      iptal = true;
    };
  }, [ekran, karakter, kaydedildi, dil]);

  // Sayfa yenilenince (ya da sekme kapatılıp geri açılınca) kaldığı yerden devam etmeyi dener;
  // sunucudaki oyun kalıcı olduğu için sadece tarayıcıdaki bağlantı (state.id) unutuluyordu.
  useEffect(() => {
    const kayitliId = aktifOturumIdGetir();
    if (!kayitliId) return;
    let iptal = false;
    setYukleniyor(true);
    (async () => {
      try {
        const { state } = await stateGetir(kayitliId);
        if (iptal) return;
        setKarakter(state);
        if (!state.aktif) {
          setEkran('olum');
        } else if (!state.meslek) {
          setEkran('acilis');
        } else {
          const { senaryo } = await senaryoGetir(state.id);
          if (iptal) return;
          setSenaryo(senaryo);
          setTepkiModu(false);
          setEkran('oyun');
        }
      } catch {
        // Oturum artık bulunamıyor; sessizce ana menüde kal.
        aktifOturumIdSil();
      } finally {
        if (!iptal) setYukleniyor(false);
      }
    })();
    return () => {
      iptal = true;
    };
  }, []);

  function cagSecildi(cag: string) {
    // Çağ ve bölge artık tek sayfada — çağa tıklamak sadece seçer, altta o çağın
    // bayrakları belirir. Çağ değişince önceki bölge seçimi düşer.
    setSecilenCag(cag);
    setSecilenBolge(null);
  }

  function bolgeSecildi(bolge: string) {
    // Yerleşim seçim ekranı kaldırıldı — yeni karakter her zaman nötr "kasaba"
    // yerleşimini alır; doğrudan isim adımına geç.
    setSecilenBolge(bolge);
    setSecilenYerlesim('kasaba');
    setOyuncuIsmi('');
    setHata(null);
    setEkran('isim_sec');
    // Her oyun başında ülkeye/çağa uygun rastgele bir isim öner (kutuya ön-doldur).
    void rastgeleIsimGetirIcin(secilenCag, bolge);
  }

  async function rastgeleIsimGetirIcin(cag: string | null, bolge: string | null) {
    if (!cag || !bolge) return;
    try {
      const { isim } = await isimOnerisiGetir(cag, bolge);
      setOyuncuIsmi(isim);
    } catch (err) {
      setHata(String(err));
    }
  }

  async function rastgeleIsimGetir() {
    return rastgeleIsimGetirIcin(secilenCag, secilenBolge);
  }

  async function karakteriOlustur() {
    if (!secilenCag || !secilenBolge || !secilenYerlesim) return;
    setHata(null);
    setYukleniyor(true);
    try {
      let isim = oyuncuIsmi.trim();
      if (!isim) {
        try {
          isim = (await isimOnerisiGetir(secilenCag, secilenBolge)).isim;
        } catch {
          isim = '';
        }
      }
      const { state } = await yeniOyunBaslat(
        secilenCag,
        secilenBolge,
        secilenYerlesim,
        isim || undefined,
        dil,
        istemciId()
      );
      setKarakter(state);
      aktifOturumIdKaydet(state.id);
      setEkran('acilis');
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function meslekSecildi(meslek: string) {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const { state } = await meslekAta(karakter.id, meslek);
      setKarakter(state);
      const { senaryo } = await senaryoGetir(state.id);
      setSenaryo(senaryo);
      setTepkiModu(false);
      setEkran('oyun');
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  function tepkiSonucundanSenaryoUret(t: TepkiSonucu): SenaryoResponse {
    return {
      olay_basligi: t.olay_basligi,
      olay_metni: t.olay_metni,
      kategori: senaryo?.kategori ?? 'sosyal',
      gorsel: '🤔',
      secenekler: t.secenekler.map((s) => ({
        metin: s.metin,
        basari_sansi: 100,
        belirsiz_aralik: { min: 100, max: 100 },
        basarili_sonuc: { mesaj: '' },
        basarisiz_sonuc: { mesaj: '' },
        kilitli: false,
      })),
    };
  }

  async function secenekSec(index: number) {
    if (!karakter || !senaryo) return;
    const paraBirimi = karakter.para_birimi;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await secimYap(karakter.id, index);
      if ('ara_tepki' in sonuc) {
        setSenaryo(tepkiSonucundanSenaryoUret(sonuc));
        setTepkiModu(true);
        return;
      }
      setTepkiModu(false);
      setKarakter(sonuc.state);
      setSonEtki({
        basarili: sonuc.basarili,
        etki: sonuc.uygulananEtki,
        yasArtisi: sonuc.yasArtisi,
        kategori: senaryo.kategori,
        sonucAnlatimi: sonuc.sonucAnlatimi,
        zamanAnlatimi: sonuc.zamanAnlatimi,
        paraBirimi,
        terfiOldu: sonuc.terfiOldu,
      });
      setEkran(sonuc.state.aktif ? 'sonuc' : 'olum');
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function devamEt() {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const { senaryo } = await senaryoGetir(karakter.id);
      setSenaryo(senaryo);
      setTepkiModu(false);
      setEkran('oyun');
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function skorunuKaydet() {
    if (!karakter || !isim.trim()) return;
    setYukleniyor(true);
    try {
      await skorKaydet(karakter.id, isim.trim());
      setKaydedildi(true);
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function liderligiAc(tur: SiralamaTuru = liderlikTuru, donem: SiralamaDonemi = liderlikDonemi) {
    setLiderlikTuru(tur);
    setLiderlikDonemi(donem);
    setHata(null);
    setYukleniyor(true);
    try {
      const { tablo } = await skorTablosuGetir(tur, donem);
      setLiderlik(tablo);
      setEkran('liderlik');
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  /** Haftalık liderlik tablosunun sıfırlanmasına kalan süreyi ("Xg Ys") döner (Pazartesi 00:00 UTC). */
  function haftaSonuKalan(): string {
    const simdi = new Date();
    const gun = simdi.getUTCDay();
    const pazartesiyeUzaklik = (gun + 6) % 7;
    const buHaftaBasi = Date.UTC(simdi.getUTCFullYear(), simdi.getUTCMonth(), simdi.getUTCDate() - pazartesiyeUzaklik);
    const sonrakiHaftaBasi = buHaftaBasi + 7 * 24 * 60 * 60 * 1000;
    const kalanMs = sonrakiHaftaBasi - simdi.getTime();
    const kalanSaat = Math.max(0, Math.floor(kalanMs / (60 * 60 * 1000)));
    const gunKalan = Math.floor(kalanSaat / 24);
    const saatKalan = kalanSaat % 24;
    return dil === 'en' ? `${gunKalan}d ${saatKalan}h left` : `${gunKalan}g ${saatKalan}s kaldı`;
  }

  async function finansEkraniniAc() {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const [{ finans }, { config: mulkConfig }] = await Promise.all([
        finansGetir(karakter.id),
        mulkConfigGetir(karakter.id),
      ]);
      setFinans(finans);
      setMulkler(mulkConfig);
      setIslemMesaji(null);
      setEkran('finans');
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function aileEkraniniAc() {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const durum = await aileDurumGetir(karakter.id);
      setAileDurum(durum);
      setIslemMesaji(null);
      setEkran('aile');
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function aileEtkilesimHandler(etkilesimId: string, cocukIndex?: number) {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await aileEtkilesimYap(karakter.id, etkilesimId, cocukIndex);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
      try {
        setAileDurum(await aileDurumGetir(karakter.id));
      } catch {
        /* durum yenilenemezse eldeki kalır */
      }
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function aileTalepHandler(karar: 'kabul' | 'ret') {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await aileTalebiKararlastir(karakter.id, karar);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
      try {
        setAileDurum(await aileDurumGetir(karakter.id));
      } catch {
        /* durum yenilenemezse eldeki kalır */
      }
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  // ===== Kariyer sayfası: Yönetimle Bağlar (§35) =====
  async function kariyerEkraniniAc() {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const [durum, { config }] = await Promise.all([
        yonetimDurumGetir(karakter.id),
        kotuIsConfigGetir(karakter.id),
      ]);
      setYonetimDurum(durum);
      setKotuIsler(config);
      setIslemMesaji(null);
      setEkran('kariyer');
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function yonetimTazele(id: string) {
    try {
      setYonetimDurum(await yonetimDurumGetir(id));
    } catch {
      /* durum yenilenemezse eldeki kalır */
    }
  }

  async function kariyerKaranlikIslerTazele(id: string) {
    try {
      const { config } = await kotuIsConfigGetir(id);
      setKotuIsler(config);
    } catch {
      /* durum yenilenemezse eldeki kalır */
    }
  }

  // Yönetim işlemlerinde hem sonuç hem hata Kariyer ekranındaki açılır pencerede
  // gösterilir (üstte sabit hata bandı yok) — bu yüzden catch'te setHata değil
  // setIslemMesaji kullanılır.
  async function yonetimEtkilesimHandler(etkilesimId: string, kademe?: number) {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await yonetimEtkilesimYap(karakter.id, etkilesimId, kademe);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
      await yonetimTazele(karakter.id);
    } catch (err) {
      setIslemMesaji(temizHata(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function yonetimIstekHandler(istekId: string) {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await yonetimIstekYap(karakter.id, istekId);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
      await yonetimTazele(karakter.id);
    } catch (err) {
      setIslemMesaji(temizHata(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function yonetimTalepHandler(karar: 'kabul' | 'ret' | 'yalan') {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await yonetimTalebiKararlastir(karakter.id, karar);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
      await yonetimTazele(karakter.id);
    } catch (err) {
      setIslemMesaji(temizHata(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function yatirimEkraniniAc() {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const [{ dedikodular }, { config: mulkConfig }, { kademeler }, kr] = await Promise.all([
        dedikoduGetir(karakter.id),
        mulkConfigGetir(karakter.id),
        zarKademeleriGetir(karakter.id),
        krediGetir(karakter.id),
      ]);
      setDedikodular(dedikodular);
      setMulkler(mulkConfig);
      setZarKademeleri(kademeler);
      setKrediConfig(kr);
      setIslemMesaji(null);
      setEkran('yatirim');
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function yatirimEkraniniYenile(stateId: string) {
    const [{ config: mulkConfig }, kr] = await Promise.all([
      mulkConfigGetir(stateId),
      krediGetir(stateId),
    ]);
    setMulkler(mulkConfig);
    setKrediConfig(kr);
  }

  async function kotuIsHandler(tur: string, opts?: { hedefRakipAd?: string; vekil?: boolean }) {
    if (!karakter) return;
    // Kullanıcı isteği: suç işlerken onay sorma; sonuç açılır pencerede gösterilir.
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await kotuIsYap(karakter.id, tur, opts);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
      const { finans } = await finansGetir(sonuc.state.id);
      setFinans(finans);
      await kariyerKaranlikIslerTazele(sonuc.state.id);
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function krediAlHandler(tutar: number) {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await krediAl(karakter.id, tutar);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
      const { finans } = await finansGetir(sonuc.state.id);
      setFinans(finans);
      await yatirimEkraniniYenile(sonuc.state.id);
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function krediPazarlikHandler() {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await krediPazarlik(karakter.id);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
      await yatirimEkraniniYenile(sonuc.state.id);
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function hediyeHandler(
    esyaId: string,
    hedef: 'es' | 'cocuk' | 'ekip' | 'dost',
    opts?: { cocukIndex?: number; ekipId?: string },
  ) {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await hediyeEt(karakter.id, esyaId, hedef, opts);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function mulkSatinAlHandler(tur: MulkTuru) {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await mulkSatinAl(karakter.id, tur);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
      await yatirimEkraniniYenile(sonuc.state.id);
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function zarAtHandler(tutar: number) {
    if (!karakter) return null;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await zarAt(karakter.id, tutar);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
      return sonuc;
    } catch (err) {
      setHata(String(err));
      return null;
    } finally {
      setYukleniyor(false);
    }
  }

  async function ucKagitciHandler(tutar: number, secim: number) {
    if (!karakter) return null;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await ucKagitciOyna(karakter.id, tutar, secim);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
      return sonuc;
    } catch (err) {
      setHata(String(err));
      return null;
    } finally {
      setYukleniyor(false);
    }
  }

  async function bilekGuresiHandler(basarili: boolean) {
    if (!karakter) return null;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await bilekGuresiSonuc(karakter.id, basarili);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
      return sonuc;
    } catch (err) {
      setHata(String(err));
      return null;
    } finally {
      setYukleniyor(false);
    }
  }

  async function sosyallesmeEkraniniAc() {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const [{ yerler }, { kademeler }, aksiyonConfig] = await Promise.all([
        sosyallesmeYerleriGetir(karakter.id),
        zarKademeleriGetir(karakter.id),
        sosyallesmeAksiyonConfigGetir(karakter.id),
      ]);
      setSosyallesmeYerleri(yerler);
      setZarKademeleri(kademeler);
      setSosyalAksiyonConfig(aksiyonConfig);
      setSosyalOlay(null);
      setSosyalOlaySonuc(null);
      setSosyalOlayTepkiModu(false);
      setEkran('sosyallesme');
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function sosyalAksiyonHandler(aksiyonId: string, varyant?: string) {
    if (!karakter) return null;
    setHata(null);
    try {
      const sonuc = await sosyallesmeAksiyonYap(karakter.id, aksiyonId, varyant);
      setKarakter(sonuc.state);
      try {
        const yeniConfig = await sosyallesmeAksiyonConfigGetir(karakter.id);
        setSosyalAksiyonConfig(yeniConfig);
      } catch {
        /* config yenilenemezse eldeki kalır */
      }
      return sonuc;
    } catch (err) {
      setHata(String(err));
      return null;
    }
  }

  async function sosyallesmeYerineGitHandler(yerId: string) {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await sosyallesmeYerineGit(karakter.id, yerId);
      setKarakter(sonuc.state);
      const { senaryo: mekanOlayi } = await senaryoGetir(sonuc.state.id);
      // Ana oyun ekranına GEÇMEDEN, olayı Sosyalleş ekranının içinde göster.
      setSosyalOlay(mekanOlayi);
      setSosyalOlaySonuc(null);
      setSosyalOlayTepkiModu(false);
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function sosyalOlaySecim(index: number) {
    if (!karakter || !sosyalOlay) return;
    const paraBirimi = karakter.para_birimi;
    setHata(null);
    setYukleniyor(true);
    try {
      // TUR HARCAMAYAN çözüm: normal /choice pipeline'ı yerine sosyallesme-olay ucu.
      const sonuc = await sosyallesmeOlayCoz(karakter.id, index);
      setSosyalOlayTepkiModu(false);
      setKarakter(sonuc.state);
      const etki: SonEtki = {
        basarili: sonuc.basarili,
        etki: sonuc.uygulananEtki,
        yasArtisi: 0,
        kategori: sosyalOlay.kategori,
        sonucAnlatimi: '',
        zamanAnlatimi: null,
        paraBirimi,
        terfiOldu: false,
      };
      if (!sonuc.state.aktif) {
        // Mekân olayında öldü (ör. meyhanede bıçak) — ölüm ekranına geç.
        setSonEtki(etki);
        setSosyalOlay(null);
        setSosyalOlaySonuc(null);
        setEkran('olum');
        return;
      }
      setSosyalOlaySonuc(etki);
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function sosyalOlayKapat() {
    setSosyalOlay(null);
    setSosyalOlaySonuc(null);
    setSosyalOlayTepkiModu(false);
    if (!karakter) return;
    setYukleniyor(true);
    try {
      // Tur İLERLEMEDİ — yalnız Sosyalleş ekranının canlı verisini tazele
      // (mekân cooldown'ları + içki/aksiyon kilitleri değişmiş olabilir).
      const [{ yerler }, aksiyonConfig] = await Promise.all([
        sosyallesmeYerleriGetir(karakter.id),
        sosyallesmeAksiyonConfigGetir(karakter.id),
      ]);
      setSosyallesmeYerleri(yerler);
      setSosyalAksiyonConfig(aksiyonConfig);
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function magazaEkraniniAc() {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const { katalog } = await magazaKatalogGetir(karakter.id);
      setMagazaKatalogu(katalog);
      setIslemMesaji(null);
      setEkran('magaza');
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function magazaSatinAlHandler(katalogId: string) {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await magazadanSatinAl(karakter.id, katalogId);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
      const { katalog } = await magazaKatalogGetir(sonuc.state.id);
      setMagazaKatalogu(katalog);
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function evlilikEkraniniAc() {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const { adaylar } = await evlilikAdaylariGetir(karakter.id);
      setEvlilikAdaylari(adaylar);
      setIslemMesaji(null);
      setEkran('evlilik');
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function evlilikYeniAdaylarHandler() {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const { adaylar } = await evlilikAdaylariGetir(karakter.id);
      setEvlilikAdaylari(adaylar);
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function evlilikTeklifEtHandler(aday: EvlilikAdayi) {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await evlilikTeklifEt(karakter.id, aday);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
      if (!sonuc.basarili) {
        const { adaylar } = await evlilikAdaylariGetir(sonuc.state.id);
        setEvlilikAdaylari(adaylar);
      } else {
        setEvlilikAdaylari([]);
      }
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function envanterKullanHandler(esyaId: string) {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await envanterEsyasiKullan(karakter.id, esyaId);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function konutDegistirHandler(konutId: string) {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await konutDegistir(karakter.id, konutId);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
      const { finans } = await finansGetir(sonuc.state.id);
      setFinans(finans);
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function yasamSecimiDegistirHandler(secimId: string) {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await yasamSecimiDegistir(karakter.id, secimId);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
      const { finans } = await finansGetir(sonuc.state.id);
      setFinans(finans);
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function ekipCikarHandler(ekipId: string) {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await ekipCikar(karakter.id, ekipId);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
      const { finans } = await finansGetir(sonuc.state.id);
      setFinans(finans);
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  function bastanBasla() {
    aktifOturumIdSil();
    setKarakter(null);
    setSenaryo(null);
    setSonEtki(null);
    setHata(null);
    setIsim('');
    setKaydedildi(false);
    setOtoKayitBasarisiz(false);
    otoSkorKaydiRef.current = null;
    olumGoldOdenenRef.current = null;
    setOlumGoldKazanci(null);
    setSecilenCag(null);
    setSecilenBolge(null);
    setSecilenYerlesim(null);
    setOyuncuIsmi('');
    setSecilenGecmisHayat(null);
    setYeniBasarimlar([]);
    setEkran('giris');
  }

  return (
    <DilContext.Provider value={dilCtx}>
    <div
      className={[
        'oyun-kapsayici',
        TAM_EKRAN_GRUBU.includes(ekran) ? 'oyun-kapsayici-tam' : null,
        // Çağa göre vurgu rengi (§ CLAUDE.md "Seçenek 2"): Sanayi Devrimi'nde
        // vurgu paleti soğuk pirinç/turkuaza kayar (App.css `.tema-sanayi`).
        // Orta Çağ ve henüz çağ seçilmemiş ekranlar (giriş menüsü) varsayılan
        // amber/bronz paleti kullanır — hiçbir sınıf eklenmez.
        (karakter?.cag ?? secilenCag) === 'Sanayi Devrimi' ? 'tema-sanayi' : null,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        className="ayar-ac-buton"
        onClick={() => setAyarlarAcik(true)}
        aria-label={m.ayarlarBaslik}
        title={m.ayarlarBaslik}
      >
        ⚙️
      </button>
      {/* Ses aç/kapa artık yalnızca Ayarlar modalında (sağ üstteki ayrı buton kaldırıldı). */}
      {/* Oyun-içi yan ekranlarda (Yatırım/Sosyalleş/Mağaza/Aile/Kariyer/Gelir&Gider/Evlilik)
         paranın her zaman görünür olması için sabit bir rozet. Ana oyun/sonuç ekranında
         zaten UstSerit'te para modülü var, orada tekrar göstermeyiz. */}
      {karakter &&
        (['yatirim', 'sosyallesme', 'magaza', 'aile', 'kariyer', 'finans', 'evlilik'] as Ekran[]).includes(
          ekran,
        ) && (
          <div className="oyun-para-rozeti" aria-label={m.iyKendiParan}>
            💰 {formatPara(karakter.para)} {karakter.para_birimi}
          </div>
        )}
      {hata && <div className="hata-kutusu">{hata}</div>}

      {ayarlarAcik && (
        <AyarlarModal
          dil={dil}
          sesKapali={sesKapali}
          muzikAcik={muzikAcik}
          onDilDegistir={dilDegistir}
          onSesToggle={sesToggle}
          onMuzikToggle={muzikToggle}
          onGeriBildirimGonder={geriBildirimGonderHandler}
          onKapat={() => {
            setAyarlarAcik(false);
            setAyarlarSekme('genel');
          }}
          baslangicSekme={ayarlarSekme}
          onAnaMenu={
            ekran === 'giris'
              ? undefined
              : () => {
                  // Oyun kaydını SİLMEDEN ana menüye dön; "Oyuna Devam Et" ile geri gelinir.
                  setAyarlarAcik(false);
                  setAyarlarSekme('genel');
                  setEkran('giris');
                }
          }
        />
      )}

      {yenilikAcik && (
        <YenilikModal
          dil={dil}
          onKapat={() => {
            yenilikGorulduIsaretle();
            setYenilikAcik(false);
          }}
        />
      )}
      {basarimGaleriAcik && <BasarimGaleri dil={dil} onKapat={() => setBasarimGaleriAcik(false)} />}
      {GUNLUK_KOZMETIK_GOLD_GORUNUR && kozmetikMagazaAcik && (
        <KozmetikMagaza
          dil={dil}
          onKapat={() => setKozmetikMagazaAcik(false)}
          onDegisti={() => {
            setGoldBakiye(goldBakiyeGetir());
            setGiyilenKozmetikler(kozmetikGiyilenlerGetir());
          }}
        />
      )}

      {nasilOynanirAcik && <NasilOynanir dil={dil} onKapat={() => setNasilOynanirAcik(false)} />}

      {ekran === 'giris' && (
        <div className="ekran ekran-giris">
          <KoseTezhibi />
          <div className="giris-yollar" aria-hidden="true">
            <KaderYollari />
          </div>

          <div className="giris-hero">
            <h1>{m.oyunAdi}</h1>
            <p className="giris-slogan">{m.girisSlogan}</p>
            <div className="giris-cark-sar">
              <span className="giris-neon-tabela giris-neon-sol" aria-hidden="true">
                <span>{m.neonTabelaSol1}</span>
                <span>{m.neonTabelaSol2}</span>
              </span>
              <CarkLogo boyut={132} />
              <span className="giris-neon-tabela giris-neon-sag" aria-hidden="true">
                <span>{m.neonTabelaSag1}</span>
                <span>{m.neonTabelaSag2}</span>
              </span>
            </div>
            {GUNLUK_KOZMETIK_GOLD_GORUNUR && (
              <div className="giris-durum-rozetleri">
                {gunlukSeri.seri > 0 && (
                  <span className="giris-seri-rozet" title={bic(m.gunlukSeriTitle, gunlukSeri.enUzunSeri)}>
                    🔥 {bic(m.gunlukSeriEtiket, gunlukSeri.seri)}
                  </span>
                )}
                <span className="giris-gold-rozet" title={m.goldAciklama}>
                  🪙 {goldBakiye}
                </span>
              </div>
            )}
            {GUNLUK_KOZMETIK_GOLD_GORUNUR && gunlukOdulBildirimi && (
              <div className="giris-gunluk-odul-bildirim" role="status">
                <span>
                  🔥 {bic(m.gunlukOdulMesaji, gunlukOdulBildirimi.seri, gunlukOdulBildirimi.odulMiktari)}
                </span>
                <button className="ikincil" onClick={() => setGunlukOdulBildirimi(null)}>
                  ✕
                </button>
              </div>
            )}
            <div className="giris-hero-butonlar">
              {karakter?.aktif && (
                <button
                  className="giris-devam-buton"
                  disabled={yukleniyor}
                  onClick={devamEt}
                >
                  <span className="giris-devam-ana">{m.oyunaDevamEt}</span>
                  <span className="giris-devam-alt">
                    {bic(
                      m.girisDevamAlt,
                      karakter.isim || m.isimsiz,
                      karakter.yas,
                      karakter.meslek ? kt(karakter.rutbe || karakter.meslek) : kt(karakter.bolge),
                    )}
                  </span>
                </button>
              )}
              <button
                className={karakter?.aktif ? 'ikincil' : undefined}
                disabled={yukleniyor}
                onClick={() => setEkran('cag_sec')}
                title={karakter?.aktif ? m.girisYeniHayatUyari : undefined}
              >
                {m.btnYeniHayat}
              </button>
              <button className="ikincil" disabled={yukleniyor} onClick={() => setNasilOynanirAcik(true)}>
                {m.btnNasilOynanir}
              </button>
              <button className="ikincil" disabled={yukleniyor} onClick={() => setBasarimGaleriAcik(true)}>
                {m.bgAc}
              </button>
              {GUNLUK_KOZMETIK_GOLD_GORUNUR && (
                <button className="ikincil" disabled={yukleniyor} onClick={() => setKozmetikMagazaAcik(true)}>
                  {m.btnKozmetik}
                </button>
              )}
              <button className="ikincil" disabled={yukleniyor} onClick={() => setAyarlarAcik(true)}>
                {m.btnAyarlar}
              </button>
            </div>
          </div>

          <div className="giris-yan giris-yan-sol">
            <div className="giris-panel">
              <div className="giris-panel-baslik">
                <span>{m.panelGecmisHayatlar} ({gecmisHayatlar.length})</span>
                {gecmisHayatlar.length > 0 && (
                  <button
                    className="ikincil giris-panel-temizle"
                    onClick={() => {
                      gecmisHayatlariTemizle();
                      setGecmisHayatlar([]);
                    }}
                  >
                    {m.temizle}
                  </button>
                )}
              </div>
              {gecmisHayatlar.length === 0 ? (
                <p className="giris-panel-bos">{m.gecmisHayatBos}</p>
              ) : (
                <ul className="gecmis-hayat-liste">
                  {gecmisHayatlar.map((h) => (
                    <li key={h.id} className="gecmis-hayat-satir-kapsayici">
                      <button className="gecmis-hayat-satiri" onClick={() => setSecilenGecmisHayat(h)}>
                        <span className="gecmis-hayat-ust">
                          <strong>💀 {h.isim ?? m.isimsiz}</strong>
                          <span className="gecmis-hayat-skor">{h.skor.toLocaleString(dil === 'en' ? 'en-US' : 'tr-TR')} {m.puan}</span>
                        </span>
                        <span className="gecmis-hayat-alt">
                          {h.yas} {m.yasinda} · {kt(h.meslek)} · {kt(h.bolge)} · {h.olumNedeni}
                        </span>
                      </button>
                      <button
                        className="gecmis-hayat-sil"
                        title={m.temizle}
                        aria-label={m.temizle}
                        onClick={() => {
                          gecmisHayatSil(h.id);
                          setGecmisHayatlar(gecmisHayatlariGetir());
                          if (secilenGecmisHayat?.id === h.id) setSecilenGecmisHayat(null);
                        }}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>

          <div className="giris-yan giris-yan-sag">
            <div className="giris-panel">
              <div className="giris-panel-baslik">
                <span>{m.panelLiderlik}</span>
                <button className="ikincil giris-panel-temizle" onClick={() => liderligiAc('genel')}>
                  {m.tumunuGor}
                </button>
              </div>
              {liderlikOnizleme.length === 0 ? (
                <p className="giris-panel-bos">{m.skorKaydiYok}</p>
              ) : (
                <ol className="giris-liderlik-liste">
                  {liderlikOnizleme.map((k, i) => (
                    <li key={k.id}>
                      <span className="giris-liderlik-sira">{i + 1}.</span>
                      <strong>{k.isim}</strong>
                      <span className="giris-liderlik-skor">{k.skor.toLocaleString(dil === 'en' ? 'en-US' : 'tr-TR')}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            {(basarimlar.unvanlar.length > 0 || basarimlar.olumler.length > 0) && (
              <div className="giris-panel">
                <button
                  className="ikincil basarimlar-baslik-buton"
                  onClick={() => setBasarimlarAcik((a) => !a)}
                >
                  {m.panelBasarimlar} ({basarimlar.unvanlar.length + basarimlar.olumler.length}){' '}
                  {basarimlarAcik ? '▲' : '▼'}
                </button>
                {basarimlarAcik && (
                  <div className="basarimlar-listesi">
                    {basarimlar.unvanlar.map((u) => (
                      <span key={u} className="liderlik-rozet liderlik-rozet-unvan">
                        🏵️ {u}
                      </span>
                    ))}
                    {basarimlar.olumler.map((o) => (
                      <span key={o} className="liderlik-rozet liderlik-rozet-olum">
                        💀 {o}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

          <div className="giris-imza">
            {YAPIMCI.linkedin ? (
              <a
                className="giris-imza-isim"
                href={YAPIMCI.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {YAPIMCI.isim}
              </a>
            ) : (
              <span className="giris-imza-isim">{YAPIMCI.isim}</span>
            )}
            <button
              className="giris-imza-gorus"
              disabled={yukleniyor}
              onClick={() => {
                setAyarlarSekme('geri_bildirim');
                setAyarlarAcik(true);
              }}
            >
              {m.girisGorusCta}
            </button>
          </div>

          {secilenGecmisHayat && (
            <div
              className="gecmis-hayat-detay-katman"
              onClick={() => setSecilenGecmisHayat(null)}
            >
              <div className="gecmis-hayat-detay" onClick={(e) => e.stopPropagation()}>
                <button
                  className="ikincil gecmis-hayat-kapat"
                  onClick={() => setSecilenGecmisHayat(null)}
                >
                  {m.kapatX}
                </button>
                <h3>{secilenGecmisHayat.isim ?? m.isimsiz}</h3>
                <p className="olum-ozet">
                  {bic(m.yilSonek ? '{0} {1}' : '{0}', secilenGecmisHayat.yil, m.yilSonek)} · {secilenGecmisHayat.yas} {m.yasinda} ·{' '}
                  {kt(secilenGecmisHayat.rutbe)} ({kt(secilenGecmisHayat.meslek)}) · {kt(secilenGecmisHayat.bolge)}
                </p>
                <p className="olum-ozet">
                  {formatPara(secilenGecmisHayat.para)} {secilenGecmisHayat.paraBirimi} · {m.sohret}:{' '}
                  {unUnvani(secilenGecmisHayat.un, dil)} ·{' '}
                  {secilenGecmisHayat.skor.toLocaleString(dil === 'en' ? 'en-US' : 'tr-TR')} {m.puan}
                  {secilenGecmisHayat.amacTamamlandi && ' · 🎯 x5'}
                </p>
                <p className="sonuc-hikaye">{secilenGecmisHayat.olumNedeni}</p>
                {(secilenGecmisHayat.unvanlar.length > 0 || secilenGecmisHayat.efsaneviOlum) && (
                  <div className="basarimlar-listesi">
                    {secilenGecmisHayat.unvanlar.map((u) => (
                      <span key={u} className="liderlik-rozet liderlik-rozet-unvan">
                        🏵️ {u}
                      </span>
                    ))}
                    {secilenGecmisHayat.efsaneviOlum && (
                      <span className="liderlik-rozet liderlik-rozet-olum">
                        💀 {secilenGecmisHayat.efsaneviOlum}
                      </span>
                    )}
                  </div>
                )}
                <GecmisGrafik
                  gecmis={secilenGecmisHayat.gecmis}
                  paraBirimi={secilenGecmisHayat.paraBirimi}
                />
                <HayatHikayesi hikaye={secilenGecmisHayat.hayatHikayesi} />
              </div>
            </div>
          )}
        </div>
      )}

      {ekran === 'cag_sec' && (
        <div className="ekran ekran-meslek ekran-kurulum ekran-adim-cag">
          <KoseTezhibi />
          <div className="giris-yollar" aria-hidden="true">
            <KaderYollari />
          </div>
          <AdimGostergesi adim={1} toplam={2} etiket={bic(m.adimEtiketi, 1, 2)} />
          <h2>{m.cagSecBaslik}</h2>
          <MuhurAyrac />
          <p className="giris-aciklama">{m.cagSecAlt}</p>
          <div className="cag-bolge-grid">
            <div className="meslek-kartlari cag-kartlari cag-kartlari-sutun">
              {Object.keys(bolgeler).map((cag) => (
                <button
                  key={cag}
                  className={`meslek-kart${secilenCag === cag ? ' meslek-kart-secili' : ''}`}
                  disabled={yukleniyor}
                  onClick={() => cagSecildi(cag)}
                >
                  <CagAmblemi cag={cag} />
                  <strong>{kt(cag)}</strong>
                  <span className="meslek-aciklama">{cagAciklama(m, cag)}</span>
                </button>
              ))}
            </div>

            {/* Sağ sütun: çağ seçilince o çağın ülke/bayrak kartları burada çıkar. */}
            <div className="bolge-secim-blok">
              {secilenCag ? (
                <>
                  <p className="giris-aciklama">{bic(m.bolgeSecAlt, kt(secilenCag))}</p>
                  <div className="meslek-kartlari bolge-bayrak-kartlari">
                    {(bolgeler[secilenCag] ?? []).map((bolge) => (
                      <button
                        key={bolge}
                        className="meslek-kart bolge-bayrak-kart"
                        disabled={yukleniyor}
                        onClick={() => bolgeSecildi(bolge)}
                        title={bolgeOzetiGetir(dil, secilenCag, bolge) ?? undefined}
                      >
                        <BolgeAmblemi bolge={bolge} cag={secilenCag ?? undefined} />
                        <strong>{kt(bolge)}</strong>
                        {bolgeOzetiGetir(dil, secilenCag, bolge) && (
                          <span className="meslek-aciklama bolge-bayrak-ozet">
                            {bolgeOzetiGetir(dil, secilenCag, bolge)}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <p className="giris-aciklama bolge-secim-bos">{m.cagSecAlt}</p>
              )}
            </div>
          </div>

          <button className="ikincil" onClick={() => setEkran('giris')}>
            {m.geri}
          </button>
        </div>
      )}

      {ekran === 'isim_sec' && (
        <div className="ekran ekran-isim ekran-kurulum ekran-adim-isim">
          <KoseTezhibi />
          <div className="giris-yollar" aria-hidden="true">
            <KaderYollari />
          </div>
          <AdimGostergesi adim={2} toplam={2} etiket={bic(m.adimEtiketi, 2, 2)} />
          <h2>{m.isimSecBaslik}</h2>
          <MuhurAyrac />
          <p className="giris-aciklama">{bic(m.isimSecAlt, kt(secilenBolge))}</p>
          <div className="isim-sec-form">
            <input
              className="isim-sec-input"
              value={oyuncuIsmi}
              onChange={(e) => setOyuncuIsmi(e.target.value)}
              placeholder={m.isimYer}
              maxLength={40}
              autoFocus
            />
            <button className="ikincil" type="button" disabled={yukleniyor} onClick={rastgeleIsimGetir}>
              {m.btnRastgeleIsim}
            </button>
          </div>
          <button disabled={yukleniyor} onClick={karakteriOlustur}>
            {yukleniyor ? m.yukleniyor : oyuncuIsmi.trim() ? m.btnBuIsimleBasla : m.btnRastgeleIsimleBasla}
          </button>
          <button className="ikincil" disabled={yukleniyor} onClick={() => setEkran('cag_sec')}>
            {m.geri}
          </button>
        </div>
      )}

      {ekran === 'acilis' && karakter && (
        <div className="ekran ekran-acilis ekran-kurulum">
          <KoseTezhibi />
          <div className="giris-yollar" aria-hidden="true">
            <KaderYollari />
          </div>
          {/* İki sütunlu "kimlik + anlatı" düzeni: solda kalıcı bir kimlik kartı
             (portre/isim/ülke/kaynaklar/kişilik), sağda anlatı + meslek seçimi.
             Eski tek-sütunlu istifte dar (560px) aile metni tam genişlikteki
             (940px) satırların arasında sıkışıp okunaksız görünüyordu — artık
             her sütunun kendi net genişliği var, hiçbir öğe diğerinin üstüne
             taşmıyor. */}
          <div className="acilis-sahne">
            <aside className="acilis-kimlik">
              <KarakterAvatari kisilik={karakter.kisilik} giyilenKozmetikler={avatarKozmetikleri} />
              <h2 className="acilis-kimlik-ad">
                {karakter.isim && <strong>{karakter.isim}</strong>}
                <span className="acilis-kimlik-alt">{bic(m.acilisAileCocugu, kt(karakter.aile_meslegi))}</span>
              </h2>
              <Banner
                cag={karakter.cag}
                bolge={karakter.bolge}
                yil={karakter.yil}
                ulke={karakter.ulke}
                hukumdar={karakter.hukumdar}
              />
              <div className="acilis-ozet">
                <span>
                  💰 {formatPara(karakter.para)} {karakter.para_birimi}
                </span>
                <span>❤️ {m.statSaglik} {karakter.saglik}</span>
                <span>🙂 {m.statMutluluk} {karakter.mutluluk}</span>
                <span>🏅 {unUnvani(karakter.un, dil)}</span>
                <span>🎭 {karakter.kisilik.map((k) => kt(k)).join(' · ')}</span>
              </div>

              {karakter.durumlar.length > 0 && (
                <p className="acilis-durum">
                  {bic(m.acilisDurum, karakter.durumlar.map((d) => kt(d.ad)).join(', '))}
                </p>
              )}

              <KisilikPaneli
                kisilik={karakter.kisilik}
                aileMeslegi={karakter.aile_meslegi}
                kaynaklar={karakter.yatkinlik_kaynaklari}
                eksenler={karakter.kisilik_eksenleri}
              />
            </aside>

            <div className="acilis-icerik">
              <p className="acilis-metni">{karakter.acilis_anlatimi}</p>

              {/* Meslek seçimi artık ayrı bir sayfa değil — açılışla aynı ekranda. */}
              <h3 className="acilis-meslek-baslik">{m.meslekSecBaslik}</h3>
              <p className="giris-aciklama">{m.meslekSecAlt}</p>
              <div className="meslek-kartlari acilis-meslek-kartlari">
                {meslekler.map((meslek) => {
                  const kategori = MESLEK_KATEGORI[meslek];
                  const puan = kategori ? karakter?.yatkinliklar[kategori] ?? 0 : 0;
                  const { etiket, simge } = yatkinlikEtiketi(puan, dil);
                  return (
                    <button
                      key={meslek}
                      className="meslek-kart"
                      disabled={yukleniyor}
                      onClick={() => meslekSecildi(meslek)}
                    >
                      <span className="meslek-simge">{MESLEK_SIMGE[meslek] ?? '📜'}</span>
                      <strong>{kt(meslek)}</strong>
                      <span className="meslek-aciklama">{meslekAciklama(m, meslek)}</span>
                      <span className="meslek-yatkinlik">
                        {simge} {etiket} ({puan > 0 ? '+' : ''}
                        {puan})
                      </span>
                      {karakter.aile_meslegi === meslek && (
                        <span className="meslek-miras-ipucu">{m.meslekMirasIpucu}</span>
                      )}
                    </button>
                  );
                })}
              </div>
              {yukleniyor && <p className="giris-aciklama">{m.yukleniyor}</p>}
            </div>
          </div>
        </div>
      )}

      {(ekran === 'oyun' || ekran === 'sonuc') && karakter && senaryo && (
        <div className={`oyun-ekrani${ekran === 'sonuc' && sonEtki?.terfiOldu ? ' buyuk-an-terfi' : ''}`}>
          <UstSerit
            bolge={karakter.bolge}
            yil={karakter.yil}
            yas={karakter.yas}
            saglik={karakter.saglik}
            mutluluk={karakter.mutluluk}
            ahlak={karakter.ahlak}
            para={karakter.para}
            paraBirimi={karakter.para_birimi}
            sucSeviyesi={karakter.suc_seviyesi}
            ulke={karakter.ulke}
            hukumdar={karakter.hukumdar}
            onBolgeTikla={() => setBolgeBilgiAcik(true)}
          />
          <div className="oyun-govde">
            <YanPanel className="sol-panel panel-parsomen" baslik="" mobil={mobil}>
              {/* Portre ya da isme dokununca Kişilik & Miras penceresi açılır (default kapalı). */}
              <button
                type="button"
                className="sol-panel-kimlik sol-panel-kimlik-buton"
                onClick={() => setKisilikModalAcik(true)}
                aria-haspopup="dialog"
              >
                <KarakterAvatari
                  meslek={karakter.meslek}
                  kisilik={karakter.kisilik}
                  rutbeSeviye={karakter.rutbe_seviye}
                  giyilenKozmetikler={avatarKozmetikleri}
                />
                <div className="sol-panel-baslik">
                  {karakter.isim && <span className="sol-panel-isim">{karakter.isim}</span>}
                  <strong>
                    {kt(karakter.rutbe)}
                    {karakter.unvanlar.length > 0 && ` "${kt(karakter.unvanlar[karakter.unvanlar.length - 1])}"`}
                  </strong>
                  <span>
                    {kt(karakter.meslek)} · {bic(m.yasSonek, karakter.yas)}
                  </span>
                </div>
              </button>

              <div className="sol-panel-mini-barlar">
                <div className="un-rozeti">
                  <span className="un-rozeti-ikon" aria-hidden="true">
                    🏅
                  </span>
                  <div className="un-rozeti-metin">
                    <span className="un-rozeti-etiket">{m.sohret}</span>
                    <strong>{unUnvani(karakter.un, dil)}</strong>
                  </div>
                </div>
              </div>

              <FinansOzetPaneli finans={finans} maasYillikYedek={karakter.maas_yillik} paraBirimi={karakter.para_birimi} />

              <div className="gorev-blok">
                <button className="ikincil gorev-gor-buton" onClick={magazaEkraniniAc}>
                  🛒 {m.shMagaza}
                </button>
              </div>

              <EnvanterPaneli
                etiketler={karakter.etiketler}
                magazaEnvanteri={karakter.magaza_envanteri}
                evli={!!karakter.es_adi}
                yasayanCocuklar={karakter.cocuklar.filter((c) => c.yasiyor).map((c) => c.isim)}
                ekip={karakter.ekip.map((u) => ({ id: u.id, isim: u.isim, rol: u.rol }))}
                dostAdi={karakter.dost_adi}
                yukleniyor={yukleniyor}
                onKullan={envanterKullanHandler}
                onHediye={hediyeHandler}
              />
            </YanPanel>

            {(() => {
              const hotspotlar = (
                <SahneHotspotlari
                  cag={karakter.cag}
                  meslek={karakter.meslek}
                  dinKultur={karakter.din_kultur}
                  konutId={karakter.konut_id}
                  konutlar={konutlar}
                  devreDisi={yukleniyor}
                  onEv={finansEkraniniAc}
                  onIsyeri={yatirimEkraniniAc}
                  onKariyer={kariyerEkraniniAc}
                  onSosyallesme={sosyallesmeEkraniniAc}
                  talepVar={!!karakter.yonetim_talep}
                />
              );
              return (
            <div className="merkez-panel">
              <div className="merkez-sahne">
                <div className="merkez-sahne-arkaplan">
                  <BolgeSahnesi
                    cag={karakter.cag}
                    bolge={karakter.bolge}
                    yerlesim={karakter.yerlesim}
                    ulke={karakter.ulke}
                    un={karakter.un}
                    tamYukseklik
                  />
                </div>
                {/* Amaçlar arka plan görselinin ÜSTÜNDE ince bir şerit — her amaç
                    çok kısa açıklamasıyla (kullanıcı isteği). */}
                <AmacPaneli durum={amaclar} varyant="serit" />
                {/* Masaüstünde hotspot'lar sahnenin ÜSTÜNDE (cqw/cqh ile görsele yapışık);
                    mobilde sahnenin ALTINDA ayrı bir aksiyon satırı olarak (bkz. Paket 2). */}
                {!mobil && hotspotlar}
              </div>
              {mobil && hotspotlar}

              <div ref={merkezAltRef} className={`merkez-alt${ekran === 'sonuc' ? ' merkez-alt-sonuc' : ''}`}>
                {ekran === 'sonuc' && sonEtki ? (
                  <div className="olay-karti olay-karti-sonuc">
                    <div className="sonuc-efekti-kapsayici">
                      <SonucEfekti
                        kategori={sonEtki.kategori}
                        basarili={sonEtki.basarili}
                        sessiz={sesKapali}
                        terfiOldu={sonEtki.terfiOldu}
                      />
                      <span className="sonuc-ikon">
                        {sonEtki.terfiOldu ? '🎖️' : sonucIkonuGetir(sonEtki.basarili, false, sonEtki.kategori)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="olay-karti">
                    {/* Emoji artık ortada üstte değil; metnin sol ve sağında çapraz
                        duruyor — böylece başlık/metin yatayda daralmıyor. */}
                    <div className="olay-karti-govde">
                      <span
                        className={`olay-gorseli olay-gorseli-sol${yukleniyor ? ' olay-gorseli-yukleniyor' : ''}`}
                        aria-hidden="true"
                      >
                        {senaryo.gorsel}
                      </span>
                      <div className="olay-karti-metin-blok">
                        <h2>{senaryo.olay_basligi}</h2>
                        {tepkiModu && <p className="tepki-notu">{m.tepkiNotu}</p>}
                        <p className="olay-metni">{senaryo.olay_metni}</p>
                      </div>
                      <span
                        className={`olay-gorseli olay-gorseli-sag${yukleniyor ? ' olay-gorseli-yukleniyor' : ''}`}
                        aria-hidden="true"
                      >
                        {senaryo.gorsel}
                      </span>
                    </div>
                  </div>
                )}

                {ekran === 'sonuc' && sonEtki ? (
                  <div className="secenekler sonuc-detay-panel">
                    <EtkiCipleri etki={sonEtki.etki} paraBirimi={sonEtki.paraBirimi} />
                    {(() => {
                      // Tek metin: olay mesajı + (varsa) turun tek durumsal cümlesi.
                      // Sayısal deltalar EtkiCipleri'nde; zamanAnlatimi/sonucAnlatimi
                      // artık çoğu turda boş döner, o zaman yalnız mesaj görünür.
                      const ozet = [sonEtki.etki.mesaj, sonEtki.zamanAnlatimi ?? sonEtki.sonucAnlatimi]
                        .filter((s): s is string => !!s && s.trim() !== '')
                        .join(' ');
                      return ozet ? (
                        <p className="tur-ozeti" title={ozet}>
                          {ozet}
                        </p>
                      ) : null;
                    })()}
                    <button disabled={yukleniyor} onClick={devamEt}>
                      {yukleniyor ? m.yukleniyor : m.devamEt}
                    </button>
                  </div>
                ) : (
                  <div className="secenekler">
                    {yukleniyor && (
                      <p className="secenek-yukleniyor-metni" aria-live="polite">
                        {m.kaderSekilleniyor}
                      </p>
                    )}
                    {senaryo.secenekler.map((secenek, i) => {
                      const tahminler =
                        !secenek.kilitli && !tepkiModu
                          ? etkiTahminiGetir(secenek.basarili_sonuc, secenek.basarisiz_sonuc, dil)
                          : [];
                      return (
                        <button
                          key={i}
                          className={secenek.kilitli ? 'secenek kilitli' : 'secenek'}
                          disabled={yukleniyor || secenek.kilitli}
                          onClick={() => secenekSec(i)}
                        >
                          <span className="secenek-metin">
                            {secenek.kilitli ? '🔒 ' : ''}
                            {secenek.metin}
                          </span>
                          {!secenek.kilitli && !tepkiModu && (
                            <span className="secenek-meta">
                              <TahminOzeti tahminler={tahminler} />
                            </span>
                          )}
                          {secenek.kilitli && <span className="secenek-kilit">{secenek.kilit_nedeni}</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
              );
            })()}

            <YanPanel className="sag-panel panel-parsomen" baslik="" mobil={mobil}>
              <SiyasetPaneli cag={karakter.cag} hizip={karakter.hizip} />
              <HaberlerPaneli haberler={karakter.haberler} />

              <IsyeriPaneli
                meslek={karakter.meslek}
                rutbeSeviye={karakter.rutbe_seviye}
                dinKultur={karakter.din_kultur}
                ticaretSermaye={karakter.ticaret_sermaye}
                nufuz={karakter.nufuz}
                orduTechizatSeviyesi={karakter.ordu_techizat_seviyesi}
              />

              <div className="aile-blok">
                <AileOzetPaneli
                  esAdi={karakter.es_adi}
                  esMeslek={karakter.es_meslek}
                  esRutbe={karakter.es_rutbe}
                  cocuklar={karakter.cocuklar}
                  evcilHayvan={karakter.evcil_hayvan}
                />
                <button className="ikincil aile-gor-buton" onClick={aileEkraniniAc}>
                  {m.btnAileniGor}
                  {karakter.aile_talep ? ' 🔔' : ''}
                  {!karakter.es_adi && karakter.yas >= 18 ? ' 💍' : ''}
                </button>
              </div>
            </YanPanel>
          </div>

          {bolgeBilgiAcik && (
            <div className="gecmis-hayat-detay-katman" onClick={() => setBolgeBilgiAcik(false)}>
              <div
                className="gecmis-hayat-detay bolge-bilgi-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="ikincil gecmis-hayat-kapat bolge-bilgi-modal-kapat"
                  onClick={() => setBolgeBilgiAcik(false)}
                >
                  {m.kapatX}
                </button>
                <BolgeBilgisiPaneli bolge={karakter.bolge} bilgi={karakter.bolge_bilgi} />
              </div>
            </div>
          )}

          {kisilikModalAcik && (
            <div className="gecmis-hayat-detay-katman" onClick={() => setKisilikModalAcik(false)}>
              <div className="gecmis-hayat-detay kisilik-modal" onClick={(e) => e.stopPropagation()}>
                <button
                  className="ikincil gecmis-hayat-kapat"
                  onClick={() => setKisilikModalAcik(false)}
                >
                  {m.kapatX}
                </button>
                <KisilikPaneli
                  kisilik={karakter.kisilik}
                  aileMeslegi={karakter.aile_meslegi}
                  kaynaklar={karakter.yatkinlik_kaynaklari}
                  eksenler={karakter.kisilik_eksenleri}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {ekran === 'finans' && finans && karakter && (
        <FinansEkrani
          finans={finans}
          paraBirimi={karakter.para_birimi}
          para={karakter.para}
          cag={karakter.cag}
          gecmis={karakter.gecmis}
          konutlar={konutlar}
          guncelKonutId={karakter.konut_id}
          tasinmaMaliyeti={tasinmaMaliyeti}
          yasamSecenekleri={yasamSecenekleri}
          guncelYasamSecimiId={karakter.yasam_secimi_id}
          yukleniyor={yukleniyor}
          islemMesaji={islemMesaji}
          onKonutDegistir={konutDegistirHandler}
          onYasamSecimiDegistir={yasamSecimiDegistirHandler}
          onGeriDon={() => {
            setIslemMesaji(null);
            setEkran('oyun');
          }}
        />
      )}

      {ekran === 'yatirim' && karakter && (
        <IsYatirimEkrani
          meslek={karakter.meslek}
          rutbe={karakter.rutbe}
          paraBirimi={karakter.para_birimi}
          orduMevcudu={karakter.ordu_mevcudu}
          orduTechizatSeviyesi={karakter.ordu_techizat_seviyesi}
          sehirYonetimSeviyesi={karakter.sehir_yonetim_seviyesi}
          sehirYonetimUnvan={karakter.sehir_yonetim_unvan}
          krediConfig={krediConfig}
          dedikodular={dedikodular}
          mulkler={mulkler}
          para={karakter.para}
          yukleniyor={yukleniyor}
          islemMesaji={islemMesaji}
          onKrediAl={krediAlHandler}
          onKrediPazarlik={krediPazarlikHandler}
          onMulkSatinAl={mulkSatinAlHandler}
          onGeriDon={() => {
            setIslemMesaji(null);
            setEkran('oyun');
          }}
        />
      )}

      {ekran === 'sosyallesme' && karakter && (
        <SosyallesmePaneli
          yerler={sosyallesmeYerleri}
          yukleniyor={yukleniyor}
          para={karakter.para}
          paraBirimi={karakter.para_birimi}
          zarKademeleri={zarKademeleri}
          aksiyonConfig={sosyalAksiyonConfig}
          olayAcik={!!sosyalOlay}
          olayIcerik={
            sosyalOlay ? (
              <div className="sosyal-olay-karti">
                <span className="olay-gorseli" aria-hidden="true">
                  {sosyalOlay.gorsel}
                </span>
                <h3>{sosyalOlay.olay_basligi}</h3>
                {sosyalOlayTepkiModu && <p className="tepki-notu">{m.tepkiNotu}</p>}
                <p className="olay-metni">{sosyalOlay.olay_metni}</p>

                {sosyalOlaySonuc ? (
                  <div className="secenekler sonuc-detay-panel">
                    <EtkiCipleri etki={sosyalOlaySonuc.etki} paraBirimi={sosyalOlaySonuc.paraBirimi} />
                    {(() => {
                      const ozet = [
                        sosyalOlaySonuc.etki.mesaj,
                        sosyalOlaySonuc.zamanAnlatimi ?? sosyalOlaySonuc.sonucAnlatimi,
                      ]
                        .filter((s): s is string => !!s && s.trim() !== '')
                        .join(' ');
                      return ozet ? (
                        <p className="tur-ozeti" title={ozet}>
                          {ozet}
                        </p>
                      ) : null;
                    })()}
                    <button disabled={yukleniyor} onClick={sosyalOlayKapat}>
                      {yukleniyor ? m.yukleniyor : m.devamEt}
                    </button>
                  </div>
                ) : (
                  <div className="secenekler">
                    {sosyalOlay.secenekler.map((secenek, i) => {
                      const tahminler =
                        !secenek.kilitli && !sosyalOlayTepkiModu
                          ? etkiTahminiGetir(secenek.basarili_sonuc, secenek.basarisiz_sonuc, dil)
                          : [];
                      return (
                        <button
                          key={i}
                          className={secenek.kilitli ? 'secenek kilitli' : 'secenek'}
                          disabled={yukleniyor || secenek.kilitli}
                          onClick={() => sosyalOlaySecim(i)}
                        >
                          <span className="secenek-metin">
                            {secenek.kilitli ? '🔒 ' : ''}
                            {secenek.metin}
                          </span>
                          {!secenek.kilitli && !sosyalOlayTepkiModu && (
                            <span className="secenek-meta">
                              <TahminOzeti tahminler={tahminler} />
                            </span>
                          )}
                          {secenek.kilitli && <span className="secenek-kilit">{secenek.kilit_nedeni}</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : null
          }
          onGit={sosyallesmeYerineGitHandler}
          onAksiyon={sosyalAksiyonHandler}
          onZarAt={zarAtHandler}
          onUcKagitci={ucKagitciHandler}
          onBilekGuresi={bilekGuresiHandler}
          onGeriDon={() => {
            setIslemMesaji(null);
            // Sosyalleşme artık hiç tur harcamıyor — `senaryo` bayat değil, tazelemeye gerek yok.
            setEkran('oyun');
          }}
        />
      )}

      {ekran === 'evlilik' && (
        <EvlilikPaneli
          adaylar={evlilikAdaylari}
          yukleniyor={yukleniyor}
          islemMesaji={islemMesaji}
          onTeklifEt={evlilikTeklifEtHandler}
          onYeniAdaylar={evlilikYeniAdaylarHandler}
          onGeriDon={() => {
            setIslemMesaji(null);
            setEkran('oyun');
          }}
        />
      )}

      {ekran === 'magaza' && karakter && (
        <MagazaPaneli
          para={karakter.para}
          paraBirimi={karakter.para_birimi}
          katalog={magazaKatalogu}
          yukleniyor={yukleniyor}
          islemMesaji={islemMesaji}
          onSatinAl={magazaSatinAlHandler}
          onGeriDon={() => {
            setIslemMesaji(null);
            setEkran('oyun');
          }}
        />
      )}

      {ekran === 'aile' && karakter && (
        <AileEkrani
          anneAdi={karakter.anne_adi}
          babaAdi={karakter.baba_adi}
          dostAdi={karakter.dost_adi}
          rakipAdi={karakter.rakip_adi}
          dostPuani={karakter.dost_puani}
          rakipPuani={karakter.rakip_puani}
          durum={aileDurum}
          evli={!!karakter.es_adi}
          yas={karakter.yas}
          evcilHayvan={karakter.evcil_hayvan}
          yukleniyor={yukleniyor}
          islemMesaji={islemMesaji}
          onEtkilesim={aileEtkilesimHandler}
          onTalep={aileTalepHandler}
          onEvlilik={evlilikEkraniniAc}
          onGeriDon={() => {
            setIslemMesaji(null);
            setEkran('oyun');
          }}
        />
      )}

      {ekran === 'kariyer' && karakter && (
        <KariyerEkrani
          meslek={karakter.meslek}
          rutbe={karakter.rutbe}
          rutbeSeviye={karakter.rutbe_seviye}
          ekip={karakter.ekip}
          rakipler={karakter.rakipler}
          orduMevcudu={karakter.ordu_mevcudu}
          orduTechizatSeviyesi={karakter.ordu_techizat_seviyesi}
          ticaretSermaye={karakter.ticaret_sermaye}
          nufuz={karakter.nufuz}
          hapiste={karakter.etiketler.includes('hapiste')}
          hapisCezaKalan={karakter.hapis_ceza_kalan}
          vebaHastasi={karakter.etiketler.includes('veba_hastasi')}
          vebaOlumRiski={karakter.veba_olum_riski}
          paraBirimi={karakter.para_birimi}
          kotuIsler={kotuIsler}
          sucSeviyesi={karakter.suc_seviyesi}
          yukleniyor={yukleniyor}
          islemMesaji={islemMesaji}
          yonetimDurum={yonetimDurum}
          onEtkilesim={yonetimEtkilesimHandler}
          onIstek={yonetimIstekHandler}
          onTalep={yonetimTalepHandler}
          onEkipCikar={ekipCikarHandler}
          onKotuIs={kotuIsHandler}
          onGeriDon={() => {
            setIslemMesaji(null);
            setEkran('oyun');
          }}
        />
      )}

      {ekran === 'olum' && karakter && (() => {
        // Ölüm ekranının içeriği tek sette tanımlanır, masaüstü/mobil ikisi de
        // AYNI parçaları kullanır — yalnız DÜZENLERİ farklıdır (2026-09 denetim
        // düzeltmesi: eskiden mobilde bunu yapmaya çalışan CSS `order` kuralları
        // DOM'da var olmayan sınıfları hedefliyordu, hiç çalışmıyordu; gerçek
        // düzeltme, farklı sütunlardaki parçaları mobilde YENİDEN GRUPLAMAYI
        // gerektiriyor — bu CSS ile değil, JS ile yapılabilir).
        const ustSerit = (
          <div className="olum-ust-serit">
            <span className="sonuc-ikon">💀</span>
            <div className="olum-ust-metin">
              <h2>{m.oldun}</h2>
              <p className="sonuc-hikaye">{karakter.olum_nedeni}</p>
            </div>
          </div>
        );

        const ozetBlok = (
          <>
            <BolgeSahnesi
              cag={karakter.cag}
              bolge={karakter.bolge}
              yerlesim={karakter.yerlesim}
              ulke={karakter.ulke}
              un={karakter.un}
            />
            <p className="olum-ozet">
              {bic(
                m.olumOzet,
                karakter.yil,
                karakter.yas,
                kt(karakter.rutbe),
                kt(karakter.meslek),
                kt(karakter.bolge),
                kt(karakter.aile_meslegi)
              )}
            </p>
            {GUNLUK_KOZMETIK_GOLD_GORUNUR && olumGoldKazanci !== null && (
              <p className="olum-gold-kazanc">🪙 {bic(m.olumGoldKazandi, olumGoldKazanci)}</p>
            )}
          </>
        );

        const kayitBlok = kaydedildi ? (
          <p>{m.skorKaydedildi}</p>
        ) : otoKayitBasarisiz ? (
          <div className="isim-form">
            <input value={isim} onChange={(e) => setIsim(e.target.value)} placeholder={m.isimGir} maxLength={40} />
            <button disabled={yukleniyor || !isim.trim()} onClick={skorunuKaydet}>
              {m.btnSkoruKaydet}
            </button>
          </div>
        ) : (
          <p className="olum-ozet">{m.skorKaydediliyor}</p>
        );

        const butonlar = (
          <div className="olum-butonlari">
            <button onClick={() => liderligiAc('genel')}>{m.btnLiderlikTablosu}</button>
            <button className="ikincil" onClick={bastanBasla}>
              {m.yenidenBasla}
            </button>
          </div>
        );

        const skorKirilimiBlok = (() => {
          const kirilim = hesaplaSkorKirilimi(karakter);
          const locale = dil === 'en' ? 'en-US' : 'tr-TR';
          const say = (n: number) => n.toLocaleString(locale);
          return (
            <div className="skor-kirilimi">
              <h3 className="skor-kirilimi-baslik">📊 {m.skorKirilimBaslik}</h3>
              <ul className="skor-kirilimi-liste">
                <li>
                  <span>{m.skorKirilimServet}</span>
                  <span>{say(kirilim.servetPuani)}</span>
                </li>
                <li>
                  <span>{m.skorKirilimSohret}</span>
                  <span>{say(kirilim.sohretPuani)}</span>
                </li>
                <li>
                  <span>{m.skorKirilimAhlak}</span>
                  <span>{say(kirilim.ahlakPuani)}</span>
                </li>
                <li>
                  <span>{m.skorKirilimMutluluk}</span>
                  <span>{say(kirilim.mutlulukPuani)}</span>
                </li>
                <li>
                  <span>{m.skorKirilimRutbe}</span>
                  <span>{say(kirilim.rutbePuani)}</span>
                </li>
                {kirilim.sarayda && (
                  <li className="skor-kirilimi-tik">
                    <span>{m.skorKirilimTikSaray}</span>
                    <span>+{say(3000)}</span>
                  </li>
                )}
                {kirilim.yolculukTamamlandi && (
                  <li className="skor-kirilimi-tik">
                    <span>{m.skorKirilimTikYolculuk}</span>
                    <span>+{say(3000)}</span>
                  </li>
                )}
                {kirilim.gizemliEsyaSahibi && (
                  <li className="skor-kirilimi-tik">
                    <span>{m.skorKirilimTikGizemli}</span>
                    <span>+{say(3000)}</span>
                  </li>
                )}
              </ul>
              <div className="skor-kirilimi-toplam">
                <span>{m.skorKirilimToplam}</span>
                <span>{say(kirilim.temelToplam)}</span>
              </div>
              <div className="skor-kirilimi-carpan">
                <span>× {m.skorKirilimAmac}</span>
                <span>×{kirilim.amacCarpani}</span>
              </div>
              <div className="skor-kirilimi-sonuc">
                <span>{m.skorKirilimSonuc}</span>
                <span>{say(kirilim.skor)}</span>
              </div>
            </div>
          );
        })();

        const amacBlok = <AmacPaneli durum={amaclar} varyant="olum" />;

        const grafikHikayeBlok = (
          <>
            <GecmisGrafik gecmis={karakter.gecmis} paraBirimi={karakter.para_birimi} />
            <HayatHikayesi hikaye={karakter.hayat_hikayesi} />
          </>
        );

        const kazanimBlok = (yeniBasarimlar.length > 0 || karakter.unvanlar.length > 0 || karakter.efsanevi_olum) && (
          <div className="olum-yeni-basarimlar olum-kazanim-alt">
            <h3 className="olum-kazanim-baslik">🏆 {m.olumKazanimBaslik}</h3>
            <div className="olum-kazanim-rozetler">
              {karakter.unvanlar.map((u) => (
                <span key={`u-${u}`} className="liderlik-rozet liderlik-rozet-unvan">
                  🏵️ {kt(u)}
                </span>
              ))}
              {karakter.efsanevi_olum && (
                <span className="liderlik-rozet liderlik-rozet-olum">💀 {karakter.efsanevi_olum}</span>
              )}
              {/* Sadece bu ölümde İLK KEZ açılan (daha önce hiç kazanılmamış) başarımlar gösterilir. */}
              {yeniBasarimlar.map((b) => (
                <span key={`b-${b.id}`} className="liderlik-rozet liderlik-rozet-unvan olum-rozet-yeni">
                  {b.ikon} {b.ad[dil]}
                  <em className="olum-rozet-yeni-etiket"> · {m.bgYeniRozet}</em>
                </span>
              ))}
            </div>
          </div>
        );

        if (mobil) {
          // Mobil sıra (kullanıcı isteği, PR #42'nin de amacıydı): ölüm metni →
          // özet → skor kırılımı → amaçlar → servet grafiği + hayat hikayesi →
          // kazanımlar → kayıt durumu → butonlar (en sonda — yanlışlıkla hemen
          // "Yeniden Başla"ya basılmasın).
          return (
            <div className="ekran ekran-olum ekran-tam-sayfa">
              {ustSerit}
              <div className="olum-mobil-govde">
                {ozetBlok}
                {skorKirilimiBlok}
                {amacBlok}
                {grafikHikayeBlok}
                {kazanimBlok}
                {kayitBlok}
                {butonlar}
              </div>
            </div>
          );
        }

        return (
          <div className="ekran ekran-olum ekran-tam-sayfa">
            {ustSerit}
            <div className="tam-govde-3col tam-govde-3col-olum">
              {/* Sol sütun: kimlik + özet + kaydet/butonlar */}
              <div className="tam-sutun olum-sutun-kimlik">
                {ozetBlok}
                {kayitBlok}
                {butonlar}
              </div>
              {/* Orta sütun: skor hesaplaması — her eksen + amaç çarpanı kırılımı */}
              <div className="tam-sutun olum-sutun-skor">
                {skorKirilimiBlok}
                {amacBlok}
              </div>
              {/* Sağ sütun: geçmiş önemli olaylar (hayat hikayesi), alt alta */}
              <div className="tam-sutun olum-sutun-hikaye">{grafikHikayeBlok}</div>
            </div>
            {/* En sonda: sadece bu hayatın kazanımları (kullanıcı isteği — daha
                büyük fontla, ekranın en altında ayrı bir bölüm olarak). */}
            {kazanimBlok}
          </div>
        );
      })()}

      {ekran === 'liderlik' && (
        <div className="ekran ekran-liderlik">
          <h2>{m.liderlikBaslik}</h2>
          <p className="liderlik-skor-ipucu">💡 {m.acilisSkorIpucu}</p>
          <div className="liderlik-donem-sekmeler">
            <button
              className={liderlikDonemi === 'tumZaman' ? 'aktif-sekme' : ''}
              onClick={() => liderligiAc(liderlikTuru, 'tumZaman')}
            >
              {m.donemTumZaman}
            </button>
            <button
              className={liderlikDonemi === 'hafta' ? 'aktif-sekme' : ''}
              onClick={() => liderligiAc(liderlikTuru, 'hafta')}
            >
              {m.donemBuHafta}
            </button>
          </div>
          {liderlikDonemi === 'hafta' && (
            <p className="liderlik-hafta-sayac">⏳ {m.haftaSifirlanma}: {haftaSonuKalan()}</p>
          )}
          <div className="liderlik-sekmeler">
            <button
              className={liderlikTuru === 'genel' ? 'aktif-sekme' : ''}
              onClick={() => liderligiAc('genel')}
            >
              {m.sekmeGenelLb}
            </button>
            <button
              className={liderlikTuru === 'en_zengin' ? 'aktif-sekme' : ''}
              onClick={() => liderligiAc('en_zengin')}
            >
              {m.sekmeEnZengin}
            </button>
            <button
              className={liderlikTuru === 'en_unlu' ? 'aktif-sekme' : ''}
              onClick={() => liderligiAc('en_unlu')}
            >
              {m.sekmeEnUnlu}
            </button>
            <button
              className={liderlikTuru === 'en_uzun_yasayan' ? 'aktif-sekme' : ''}
              onClick={() => liderligiAc('en_uzun_yasayan')}
            >
              {m.sekmeEnUzunYasayan}
            </button>
          </div>
          {liderlik.length === 0 ? (
            <p className="giris-panel-bos">{m.kayitYok}</p>
          ) : (
            <ol className="liderlik-liste">
              {liderlik.map((kayit) => (
                <li key={kayit.id}>
                  <div>
                    <strong>{kayit.isim}</strong>
                    {kayit.hayat_amaci_tamamlandi && (
                      <span className="liderlik-rozet liderlik-rozet-amac" title={m.amacTamamladiTitle}>
                        🎯{kayit.amac_carpani ? ` ×${kayit.amac_carpani % 1 === 0 ? kayit.amac_carpani : kayit.amac_carpani.toFixed(1)}` : ''}
                      </span>
                    )}
                    {' '}— {kayit.skor} {m.puan} ({kayit.rutbe ? `${kt(kayit.rutbe)}, ` : ''}
                    {kt(kayit.cag)}, {bic(m.yasSonek, kayit.yas)}, {kayit.olum_nedeni})
                  </div>
                  {(kayit.unvanlar || kayit.efsanevi_olum) && (
                    <div className="liderlik-detay">
                      {kayit.unvanlar &&
                        kayit.unvanlar.split(', ').map((unvan) => (
                          <span key={unvan} className="liderlik-rozet liderlik-rozet-unvan">
                            🏵️ {kt(unvan)}
                          </span>
                        ))}
                      {kayit.efsanevi_olum && (
                        <span className="liderlik-rozet liderlik-rozet-olum">💀 {kayit.efsanevi_olum}</span>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          )}
          <button className="ikincil" onClick={bastanBasla}>
            {m.anaMenu}
          </button>
        </div>
      )}
    </div>
    </DilContext.Provider>
  );
}

export default App;
