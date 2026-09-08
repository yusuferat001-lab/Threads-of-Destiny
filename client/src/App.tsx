import { useEffect, useRef, useState, type ReactNode } from 'react';
import type {
  CharacterState,
  SenaryoResponse,
  SonucEtkisi,
  ScoreKaydi,
  SiralamaTuru,
  YerlesimTanimi,
  KonutTanimi,
  YasamSecenegiTanimi,
  FinansOzeti,
  KotuIsKarti,
  MulkKartBilgisi,
  MulkTuru,
  TepkiSonucu,
  SosyallesmeYeri,
  MagazaEsyaKarti,
} from './types';
import {
  mesleklerGetir,
  bolgelerGetir,
  yerlesimlerGetir,
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
  magazaKatalogGetir,
  magazadanSatinAl,
  envanterEsyasiKullan,
  geriBildirimGonder,
  evlilikAdaylariGetir,
  evlilikTeklifEt,
} from './api';
import { Banner } from './components/Banner';
import { UstSerit } from './components/UstSerit';
import { AileOzetPaneli } from './components/AileOzetPaneli';
import { SiyasetPaneli } from './components/SiyasetPaneli';
import { DurumPaneli } from './components/DurumPaneli';
import { EtkiCipleri } from './components/EtkiCipleri';
import { KisilikPaneli } from './components/KisilikPaneli';
import { BolgeSahnesi } from './components/BolgeSahnesi';
import { KarakterAvatari } from './components/KarakterAvatari';
import { IsyeriPaneli } from './components/IsyeriPaneli';
import { IliskilerPaneli } from './components/IliskilerPaneli';
import { GecmisGrafik } from './components/GecmisGrafik';
import { HayatHikayesi } from './components/HayatHikayesi';
import { HaberlerPaneli } from './components/HaberlerPaneli';
import { BolgeBilgisiPaneli } from './components/BolgeBilgisiPaneli';
import { AileEkrani } from './components/AileEkrani';
import { GorevEkrani } from './components/GorevEkrani';
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
import type { GeriBildirimGirdi, EvlilikAdayi } from './types';
import { sesKapaliMi, sesTercihiKaydet } from './ses';
import { muzikModunuAyarla, muzikDurdur, muzikSessizAyarla, type MuzikModu } from './muzik';
import { aktifOturumIdGetir, aktifOturumIdKaydet, aktifOturumIdSil } from './oturum';
import { basarimlariKaydet, basarimlariGetir } from './basarimlar';
import { gecmisHayatKaydet, gecmisHayatlariGetir, gecmisHayatlariTemizle, type GecmisHayat } from './gecmisHayatlar';
import { YAPIMCI } from './yapimci';
import { basarimlariDegerlendir, type BasarimTanimi } from './basarimSistemi';
import { BasarimGaleri } from './components/BasarimGaleri';
import { NasilOynanir } from './components/NasilOynanir';
import { istemciId, ziyaretBildir } from './istemci';
import { sonucIkonuGetir, unUnvani, MESLEK_KATEGORI, yatkinlikEtiketi, etkiTahminiGetir } from './bolgeTema';
import { formatPara } from './format';
import { bic } from './i18n';
import { DilContext, dilCtxYap } from './DilContext';
import { CarkLogo, KoseTezhibi, MuhurAyrac, AdimGostergesi, KaderYollari } from './components/Suslemeler';
import { CagAmblemi, BolgeAmblemi } from './components/Amblemler';
import './App.css';
import './giris.css';

type Ekran =
  | 'giris'
  | 'cag_sec'
  | 'bolge_sec'
  | 'yerlesim_sec'
  | 'isim_sec'
  | 'acilis'
  | 'meslek'
  | 'oyun'
  | 'sonuc'
  | 'olum'
  | 'liderlik'
  | 'aile'
  | 'gorev'
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
};

/** Meslek/çağ kısa açıklamaları — dile göre i18n sözlüğünden. */
function meslekAciklama(m: ReturnType<typeof dilCtxYap>['m'], meslek: string): string {
  if (meslek === 'Asker') return m.meslekAciklamaAsker;
  if (meslek === 'Tüccar') return m.meslekAciklamaTuccar;
  if (meslek === 'Din Adamı') return m.meslekAciklamaDinAdami;
  return '';
}
function cagAciklama(m: ReturnType<typeof dilCtxYap>['m'], cag: string): string {
  if (cag === 'Orta Çağ') return m.cagAciklamaOrtacag;
  if (cag === 'Sanayi Devrimi') return m.cagAciklamaSanayi;
  return '';
}

/** Gelir/Sosyalleş/Mağaza artık sahne üzerindeki tıklama noktalarından açılır ama tam
 * sayfa olarak (oyun HUD'unun yerini alarak) açılır — hepsi ana oyun ekranıyla aynı "sayfa
 * hiç kaymaz, sadece sütun/ızgara kendi içinde kayar" modelini kullanır (bkz.
 * .oyun-kapsayici-tam) — `aile` (sol panelden "Aileni Gör →" ile açılır, hotspot değil) bu
 * gruba dahil DEĞİL, o hâlâ dar/ortalanmış, doğal yükseklikte basit bir liste ekranı. */
const TAM_EKRAN_GRUBU: Ekran[] = [
  'giris',
  'cag_sec',
  'bolge_sec',
  'yerlesim_sec',
  'isim_sec',
  'acilis',
  'meslek',
  'oyun',
  'sonuc',
  'yatirim',
  'finans',
  'sosyallesme',
  'magaza',
  'evlilik',
];

/** Geri bildirim mesajlarına eklenen uygulama sürümü — bir hata raporunun hangi build'e
 * ait olduğunu ayırt etmek için. Yeni bir sürüm çıkınca elle güncelle. */
const APP_SURUM = '1.0.0';

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
  if (mobil) {
    return (
      <details className={`${className} panel-katla`}>
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
  const [meslekler, setMeslekler] = useState<string[]>([]);
  const [bolgeler, setBolgeler] = useState<Record<string, string[]>>({});
  const [yerlesimler, setYerlesimler] = useState<YerlesimTanimi[]>([]);
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
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState<string | null>(null);

  const [isim, setIsim] = useState('');
  const [kaydedildi, setKaydedildi] = useState(false);
  // Otomatik skor kaydı denendi ve başarısız oldu → ölüm ekranında elle kayıt formunu yedek olarak göster.
  const [otoKayitBasarisiz, setOtoKayitBasarisiz] = useState(false);

  const [liderlikTuru, setLiderlikTuru] = useState<SiralamaTuru>('genel');
  const [liderlik, setLiderlik] = useState<ScoreKaydi[]>([]);

  const [finans, setFinans] = useState<FinansOzeti | null>(null);
  const [kotuIsler, setKotuIsler] = useState<KotuIsKarti[]>([]);
  const [dedikodular, setDedikodular] = useState<string[]>([]);
  const [mulkler, setMulkler] = useState<MulkKartBilgisi[]>([]);
  const [zarKademeleri, setZarKademeleri] = useState<number[]>([]);
  const [islemMesaji, setIslemMesaji] = useState<string | null>(null);
  const [sosyallesmeYerleri, setSosyallesmeYerleri] = useState<SosyallesmeYeri[]>([]);
  const [magazaKatalogu, setMagazaKatalogu] = useState<MagazaEsyaKarti[]>([]);
  const [evlilikAdaylari, setEvlilikAdaylari] = useState<EvlilikAdayi[]>([]);

  const [sesKapali, setSesKapali] = useState(() => sesKapaliMi());
  const [muzikAcik, setMuzikAcik] = useState(() => ayarlariGetir().muzik);
  const [ayarlarAcik, setAyarlarAcik] = useState(false);
  const [ayarlarSekme, setAyarlarSekme] = useState<'genel' | 'geri_bildirim'>('genel');
  const [basarimGaleriAcik, setBasarimGaleriAcik] = useState(false);
  const [nasilOynanirAcik, setNasilOynanirAcik] = useState(false);
  const [yeniBasarimlar, setYeniBasarimlar] = useState<BasarimTanimi[]>([]);
  const [dil, setDil] = useState<Dil>(() => ayarlariGetir().dil);
  const [basarimlar, setBasarimlar] = useState(() => basarimlariGetir());
  const [basarimlarAcik, setBasarimlarAcik] = useState(false);
  const [gecmisHayatlar, setGecmisHayatlar] = useState<GecmisHayat[]>(() => gecmisHayatlariGetir());
  const [secilenGecmisHayat, setSecilenGecmisHayat] = useState<GecmisHayat | null>(null);
  const [liderlikOnizleme, setLiderlikOnizleme] = useState<ScoreKaydi[]>([]);
  const [bolgeBilgiAcik, setBolgeBilgiAcik] = useState(false);

  const dilCtx = dilCtxYap(dil);
  const { m, kt } = dilCtx;

  // Mobilde: her tur / her sonuç ekranında merkez paneli (olay + seçenekler) görünür alana
  // kaydırır — oyuncu üst şeridi/sol paneli geçip aramak zorunda kalmasın.
  const merkezAltRef = useRef<HTMLDivElement | null>(null);
  // Ölümde skorun otomatik kaydedilmesi denendi mi (oturum id başına tek sefer) —
  // StrictMode çift-render'ında ve tekrar render'larda ikinci bir POST /api/scores atmamak için.
  const otoSkorKaydiRef = useRef<string | null>(null);
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
      ekran === 'gorev' ||
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
  }, []);

  useEffect(() => {
    mesleklerGetir()
      .then(({ meslekler }) => setMeslekler(meslekler))
      .catch(() => setMeslekler(['Asker', 'Tüccar', 'Din Adamı']));
    bolgelerGetir()
      .then(({ bolgeler }) => setBolgeler(bolgeler))
      .catch(() =>
        setBolgeler({
          'Orta Çağ': ['Fransa', 'Kutsal Roma', 'Bizans', 'Selçuklu', 'Eyyubiler'],
          'Sanayi Devrimi': ['İngiltere', 'Fransa', 'Osmanlı', 'Rusya'],
        })
      );
    yerlesimlerGetir()
      .then(({ yerlesimler }) => setYerlesimler(yerlesimler))
      .catch(() =>
        setYerlesimler([
          {
            id: 'sehir_merkezi',
            ad: 'Şehir Merkezi',
            simge: '🏙️',
            artilar: ['Ticaret ve sosyal fırsatlar bol', 'Yıllık kazancın %10 daha yüksek'],
            eksiler: ['Kalabalık ve salgın riski yüksek', 'Başlangıç sağlığın daha düşük'],
          },
          {
            id: 'sinir_bolgesi',
            ad: 'Sınır Bölgesi',
            simge: '🛡️',
            artilar: ['Toprağın bereketli, vergiler hafif', 'Askeri fırsatlar ve ganimet bol'],
            eksiler: ['Baskın ve savaş riski yüksek', 'Ticaret ağın zayıf, yıllık kazancın %5 daha düşük'],
          },
          {
            id: 'dag_basi',
            ad: 'Dağ Başı',
            simge: '⛰️',
            artilar: ['Yalnız ve özgürsün, vergi baskısı az', 'Başlangıç sağlığın daha yüksek'],
            eksiler: ['Vahşi hayvanlar ve zorlu kışlarla karşılaşabilirsin', 'Pazardan uzak, yıllık kazancın %10 daha düşük'],
          },
        ])
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
      const { yeniAcilanlar } = basarimlariDegerlendir(karakter);
      setYeniBasarimlar(yeniAcilanlar);
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
          setEkran('meslek');
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
    setSecilenCag(cag);
    setEkran('bolge_sec');
  }

  function bolgeSecildi(bolge: string) {
    setSecilenBolge(bolge);
    setEkran('yerlesim_sec');
  }

  function yerlesimSecildi(yerlesimId: string) {
    if (!secilenCag || !secilenBolge) return;
    setSecilenYerlesim(yerlesimId);
    setOyuncuIsmi('');
    setHata(null);
    setEkran('isim_sec');
    // Her oyun başında ülkeye/çağa uygun rastgele bir isim öner (kutuya ön-doldur).
    void rastgeleIsimGetir();
  }

  async function rastgeleIsimGetir() {
    if (!secilenCag || !secilenBolge) return;
    try {
      const { isim } = await isimOnerisiGetir(secilenCag, secilenBolge);
      setOyuncuIsmi(isim);
    } catch (err) {
      setHata(String(err));
    }
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

  async function liderligiAc(tur: SiralamaTuru = liderlikTuru) {
    setLiderlikTuru(tur);
    setHata(null);
    setYukleniyor(true);
    try {
      const { tablo } = await skorTablosuGetir(tur);
      setLiderlik(tablo);
      setEkran('liderlik');
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
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

  async function yatirimEkraniniAc() {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const [{ config }, { dedikodular }, { config: mulkConfig }, { kademeler }] = await Promise.all([
        kotuIsConfigGetir(karakter.id),
        dedikoduGetir(karakter.id),
        mulkConfigGetir(karakter.id),
        zarKademeleriGetir(karakter.id),
      ]);
      setKotuIsler(config);
      setDedikodular(dedikodular);
      setMulkler(mulkConfig);
      setZarKademeleri(kademeler);
      setIslemMesaji(null);
      setEkran('yatirim');
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function yatirimEkraniniYenile(stateId: string) {
    const [{ config }, { config: mulkConfig }] = await Promise.all([
      kotuIsConfigGetir(stateId),
      mulkConfigGetir(stateId),
    ]);
    setKotuIsler(config);
    setMulkler(mulkConfig);
  }

  async function kotuIsHandler(tur: string) {
    if (!karakter) return;
    if (!window.confirm(m.iyKaranlikOnay)) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await kotuIsYap(karakter.id, tur);
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
      const [{ yerler }, { kademeler }] = await Promise.all([
        sosyallesmeYerleriGetir(karakter.id),
        zarKademeleriGetir(karakter.id),
      ]);
      setSosyallesmeYerleri(yerler);
      setZarKademeleri(kademeler);
      setEkran('sosyallesme');
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function sosyallesmeYerineGitHandler(yerId: string) {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await sosyallesmeYerineGit(karakter.id, yerId);
      setKarakter(sonuc.state);
      const { senaryo } = await senaryoGetir(sonuc.state.id);
      setSenaryo(senaryo);
      setTepkiModu(false);
      setEkran('oyun');
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
      className={TAM_EKRAN_GRUBU.includes(ekran) ? 'oyun-kapsayici oyun-kapsayici-tam' : 'oyun-kapsayici'}
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

      {basarimGaleriAcik && <BasarimGaleri dil={dil} onKapat={() => setBasarimGaleriAcik(false)} />}

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
            <CarkLogo boyut={132} />
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
                    <li key={h.id}>
                      <button className="gecmis-hayat-satiri" onClick={() => setSecilenGecmisHayat(h)}>
                        <span className="gecmis-hayat-ust">
                          <strong>💀 {h.isim ?? m.isimsiz}</strong>
                          <span className="gecmis-hayat-skor">{h.skor.toLocaleString(dil === 'en' ? 'en-US' : 'tr-TR')} {m.puan}</span>
                        </span>
                        <span className="gecmis-hayat-alt">
                          {h.yas} {m.yasinda} · {kt(h.meslek)} · {kt(h.bolge)} · {h.olumNedeni}
                        </span>
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

          <div className="giris-gizem-kutu">
            <span className="giris-gizem-baslik">{m.gizemBaslik}</span>
            <span className="giris-gizem-ana">{m.gizemYeniMeslek}</span>
            <span className="giris-gizem-tarih">{m.gizemTarih}</span>
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
          <AdimGostergesi adim={1} toplam={4} etiket={bic(m.adimEtiketi, 1, 4)} />
          <h2>{m.cagSecBaslik}</h2>
          <MuhurAyrac />
          <p className="giris-aciklama">{m.cagSecAlt}</p>
          <div className="meslek-kartlari">
            {Object.keys(bolgeler).map((cag) => (
              <button key={cag} className="meslek-kart" disabled={yukleniyor} onClick={() => cagSecildi(cag)}>
                <CagAmblemi cag={cag} />
                <strong>{kt(cag)}</strong>
                <span className="meslek-aciklama">{cagAciklama(m, cag)}</span>
              </button>
            ))}
          </div>
          <button className="ikincil" onClick={() => setEkran('giris')}>
            {m.geri}
          </button>
        </div>
      )}

      {ekran === 'bolge_sec' && secilenCag && (
        <div className="ekran ekran-meslek ekran-kurulum ekran-adim-bolge">
          <KoseTezhibi />
          <div className="giris-yollar" aria-hidden="true">
            <KaderYollari />
          </div>
          <AdimGostergesi adim={2} toplam={4} etiket={bic(m.adimEtiketi, 2, 4)} />
          <h2>{m.bolgeSecBaslik}</h2>
          <MuhurAyrac />
          <p className="giris-aciklama">{bic(m.bolgeSecAlt, kt(secilenCag))}</p>
          <div className="meslek-kartlari">
            {(bolgeler[secilenCag] ?? []).map((bolge) => (
              <button
                key={bolge}
                className="meslek-kart"
                disabled={yukleniyor}
                onClick={() => bolgeSecildi(bolge)}
              >
                <BolgeAmblemi bolge={bolge} cag={secilenCag ?? undefined} />
                <strong>{kt(bolge)}</strong>
              </button>
            ))}
          </div>
          <button className="ikincil" onClick={() => setEkran('cag_sec')}>
            {m.geri}
          </button>
        </div>
      )}

      {ekran === 'yerlesim_sec' && secilenBolge && (
        <div className="ekran ekran-meslek ekran-kurulum ekran-adim-yerlesim">
          <KoseTezhibi />
          <div className="giris-yollar" aria-hidden="true">
            <KaderYollari />
          </div>
          <AdimGostergesi adim={3} toplam={4} etiket={bic(m.adimEtiketi, 3, 4)} />
          <h2>{m.yerlesimSecBaslik}</h2>
          <MuhurAyrac />
          <p className="giris-aciklama">{bic(m.yerlesimSecAlt, kt(secilenBolge))}</p>
          <div className="yerlesim-kartlari">
            {yerlesimler.map((yerlesim) => (
              <button
                key={yerlesim.id}
                className="yerlesim-kart"
                disabled={yukleniyor}
                onClick={() => yerlesimSecildi(yerlesim.id)}
              >
                <span className="meslek-simge">{yerlesim.simge}</span>
                <strong>{kt(yerlesim.ad)}</strong>
                <div className="yerlesim-artilar">
                  {yerlesim.artilar.map((artı) => (
                    <span key={artı} className="yerlesim-arti">
                      ✓ {kt(artı)}
                    </span>
                  ))}
                </div>
                <div className="yerlesim-eksiler">
                  {yerlesim.eksiler.map((eksi) => (
                    <span key={eksi} className="yerlesim-eksi">
                      ✕ {kt(eksi)}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
          <button className="ikincil" onClick={() => setEkran('bolge_sec')}>
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
          <AdimGostergesi adim={4} toplam={4} etiket={bic(m.adimEtiketi, 4, 4)} />
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
          <button className="ikincil" disabled={yukleniyor} onClick={() => setEkran('yerlesim_sec')}>
            {m.geri}
          </button>
        </div>
      )}

      {ekran === 'meslek' && (
        <div className="ekran ekran-meslek ekran-kurulum ekran-adim-meslek">
          <KoseTezhibi />
          {karakter && (
            <BolgeSahnesi cag={karakter.cag} bolge={karakter.bolge} yerlesim={karakter.yerlesim} ulke={karakter.ulke} un={karakter.un} />
          )}
          <h2>{m.meslekSecBaslik}</h2>
          <MuhurAyrac />
          <p className="giris-aciklama">{m.meslekSecAlt}</p>
          <div className="meslek-kartlari">
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
                  {karakter && (
                    <span className="meslek-yatkinlik">
                      {simge} {etiket} ({puan > 0 ? '+' : ''}
                      {puan})
                    </span>
                  )}
                  {karakter?.aile_meslegi === meslek && (
                    <span className="meslek-miras-ipucu">{m.meslekMirasIpucu}</span>
                  )}
                </button>
              );
            })}
          </div>
          {karakter && (
            <KisilikPaneli
              kisilik={karakter.kisilik}
              aileMeslegi={karakter.aile_meslegi}
              kaynaklar={karakter.yatkinlik_kaynaklari}
              eksenler={karakter.kisilik_eksenleri}
            />
          )}
        </div>
      )}

      {ekran === 'acilis' && karakter && (
        <div className="ekran ekran-acilis">
          <KoseTezhibi />
          {/* Mobilde tek kompakt satır: prosedürel sahne solda küçük, "Fransa" başlığı sağında.
             Masaüstünde .acilis-ust normal blok akışında kalır (Banner üstte, sahne altında). */}
          <div className="acilis-ust">
            <Banner
              cag={karakter.cag}
              bolge={karakter.bolge}
              yil={karakter.yil}
              ulke={karakter.ulke}
              hukumdar={karakter.hukumdar}
            />
            <BolgeSahnesi cag={karakter.cag} bolge={karakter.bolge} yerlesim={karakter.yerlesim} ulke={karakter.ulke} un={karakter.un} />
          </div>
          <KarakterAvatari kisilik={karakter.kisilik} />
          <h2>
            {karakter.isim ? `${karakter.isim} — ` : ''}
            {bic(m.acilisAileCocugu, kt(karakter.aile_meslegi))}
          </h2>
          <p className="acilis-metni">{karakter.acilis_anlatimi}</p>

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

          <button disabled={yukleniyor} onClick={() => setEkran('meslek')}>
            {yukleniyor ? m.yukleniyor : m.devamEt}
          </button>
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
            <YanPanel className="sol-panel panel-parsomen" baslik={m.panelKisiselHayat} mobil={mobil}>
              <div className="sol-panel-kimlik">
                <KarakterAvatari
                  meslek={karakter.meslek}
                  kisilik={karakter.kisilik}
                  rutbeSeviye={karakter.rutbe_seviye}
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
              </div>

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
                <button className="ikincil gorev-gor-buton" onClick={() => setEkran('gorev')}>
                  {m.geGorevGor}
                </button>
              </div>

              <EnvanterPaneli
                etiketler={karakter.etiketler}
                magazaEnvanteri={karakter.magaza_envanteri}
                yukleniyor={yukleniyor}
                onKullan={envanterKullanHandler}
              />

              <KisilikPaneli
                kisilik={karakter.kisilik}
                aileMeslegi={karakter.aile_meslegi}
                kaynaklar={karakter.yatkinlik_kaynaklari}
                eksenler={karakter.kisilik_eksenleri}
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
                  onMagaza={magazaEkraniniAc}
                  onSosyallesme={sosyallesmeEkraniniAc}
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
                    <span
                      className={`olay-gorseli${yukleniyor ? ' olay-gorseli-yukleniyor' : ''}`}
                      aria-hidden="true"
                    >
                      {senaryo.gorsel}
                    </span>
                    <h2>{senaryo.olay_basligi}</h2>
                    {tepkiModu && <p className="tepki-notu">{m.tepkiNotu}</p>}
                    <p className="olay-metni">{senaryo.olay_metni}</p>
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
                              <span className="secenek-sans">
                                {bic(m.sansEki, secenek.belirsiz_aralik.min, secenek.belirsiz_aralik.max)}
                              </span>
                              {tahminler.length > 0 && (
                                <span className="secenek-tahminler">
                                  {tahminler.map((t, ti) => (
                                    <span
                                      key={ti}
                                      className={`secenek-tahmin ${t.pozitif ? 'tahmin-pozitif' : 'tahmin-negatif'}`}
                                    >
                                      {t.simge} {t.metin}
                                    </span>
                                  ))}
                                </span>
                              )}
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

            <YanPanel className="sag-panel panel-parsomen" baslik={m.panelDunyaSiyaset} mobil={mobil}>
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
                <button className="ikincil aile-gor-buton" onClick={() => setEkran('aile')}>
                  {m.btnAileniGor}
                </button>
                {!karakter.es_adi && karakter.yas >= 18 && (
                  <button className="ikincil aile-gor-buton" onClick={evlilikEkraniniAc}>
                    💍 {m.evBaslik}
                  </button>
                )}
              </div>

              <IliskilerPaneli
                dostAdi={karakter.dost_adi}
                rakipAdi={karakter.rakip_adi}
                dostPuani={karakter.dost_puani}
                rakipPuani={karakter.rakip_puani}
              />
              <DurumPaneli durumlar={karakter.durumlar} />
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
          rutbeSeviye={karakter.rutbe_seviye}
          amirAdi={karakter.amir_adi}
          amirRutbe={karakter.amir_rutbe}
          maasYillik={karakter.maas_yillik}
          paraBirimi={karakter.para_birimi}
          orduMevcudu={karakter.ordu_mevcudu}
          orduTechizatSeviyesi={karakter.ordu_techizat_seviyesi}
          ticaretSermaye={karakter.ticaret_sermaye}
          nufuz={karakter.nufuz}
          sehirYonetimSeviyesi={karakter.sehir_yonetim_seviyesi}
          sehirYonetimUnvan={karakter.sehir_yonetim_unvan}
          para={karakter.para}
          kotuIsler={kotuIsler}
          dedikodular={dedikodular}
          mulkler={mulkler}
          sucSeviyesi={karakter.suc_seviyesi}
          yukleniyor={yukleniyor}
          islemMesaji={islemMesaji}
          onKotuIs={kotuIsHandler}
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
          onGit={sosyallesmeYerineGitHandler}
          onZarAt={zarAtHandler}
          onUcKagitci={ucKagitciHandler}
          onBilekGuresi={bilekGuresiHandler}
          onGeriDon={() => {
            setIslemMesaji(null);
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
          esAdi={karakter.es_adi}
          esMeslek={karakter.es_meslek}
          esRutbe={karakter.es_rutbe}
          esPuani={karakter.es_puani}
          cocuklar={karakter.cocuklar}
          guncelYil={karakter.yil}
          onGeriDon={() => setEkran('oyun')}
        />
      )}

      {ekran === 'gorev' && karakter && (
        <GorevEkrani
          meslek={karakter.meslek}
          amirAdi={karakter.amir_adi}
          amirRutbe={karakter.amir_rutbe}
          astlar={karakter.astlar}
          ekip={karakter.ekip}
          orduMevcudu={karakter.ordu_mevcudu}
          orduTechizatSeviyesi={karakter.ordu_techizat_seviyesi}
          ticaretSermaye={karakter.ticaret_sermaye}
          nufuz={karakter.nufuz}
          hapiste={karakter.etiketler.includes('hapiste')}
          hapisCezaKalan={karakter.hapis_ceza_kalan}
          vebaHastasi={karakter.etiketler.includes('veba_hastasi')}
          vebaOlumRiski={karakter.veba_olum_riski}
          paraBirimi={karakter.para_birimi}
          yukleniyor={yukleniyor}
          onEkipCikar={ekipCikarHandler}
          onGeriDon={() => setEkran('oyun')}
        />
      )}

      {ekran === 'olum' && karakter && (
        <div className="ekran ekran-olum buyuk-an-olum">
          <BolgeSahnesi cag={karakter.cag} bolge={karakter.bolge} yerlesim={karakter.yerlesim} ulke={karakter.ulke} un={karakter.un} />
          <span className="sonuc-ikon">💀</span>
          <h2>{m.oldun}</h2>
          <p className="sonuc-hikaye">{karakter.olum_nedeni}</p>
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
          <p className="olum-ozet">
            {formatPara(karakter.para)} {karakter.para_birimi} · {m.sohret}: {unUnvani(karakter.un, dil)}
          </p>

          {yeniBasarimlar.length > 0 && (
            <div className="olum-yeni-basarimlar">
              {yeniBasarimlar.map((b) => (
                <span key={b.id} className="liderlik-rozet liderlik-rozet-unvan">
                  {bic(m.bgYeniBasarim, `${b.ikon} ${b.ad[dil]}`)}
                </span>
              ))}
            </div>
          )}

          <GecmisGrafik gecmis={karakter.gecmis} paraBirimi={karakter.para_birimi} />
          <HayatHikayesi hikaye={karakter.hayat_hikayesi} />

          {kaydedildi ? (
            <p>{m.skorKaydedildi}</p>
          ) : otoKayitBasarisiz ? (
            <div className="isim-form">
              <input
                value={isim}
                onChange={(e) => setIsim(e.target.value)}
                placeholder={m.isimGir}
                maxLength={40}
              />
              <button disabled={yukleniyor || !isim.trim()} onClick={skorunuKaydet}>
                {m.btnSkoruKaydet}
              </button>
            </div>
          ) : (
            <p className="olum-ozet">{m.skorKaydediliyor}</p>
          )}

          <div className="olum-butonlari">
            <button onClick={() => liderligiAc('genel')}>{m.btnLiderlikTablosu}</button>
            <button className="ikincil" onClick={bastanBasla}>
              {m.yenidenBasla}
            </button>
          </div>
        </div>
      )}

      {ekran === 'liderlik' && (
        <div className="ekran ekran-liderlik">
          <h2>{m.liderlikBaslik}</h2>
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
          </div>
          <ol className="liderlik-liste">
            {liderlik.map((kayit) => (
              <li key={kayit.id}>
                <div>
                  <strong>{kayit.isim}</strong>
                  {kayit.hayat_amaci_tamamlandi && (
                    <span className="liderlik-rozet liderlik-rozet-amac" title={m.amacTamamladiTitle}>
                      🎯 x5
                    </span>
                  )}
                  {' '}— {kayit.skor} {m.puan} ({kayit.rutbe ? `${kt(kayit.rutbe)}, ` : ''}
                  {kt(kayit.meslek)}, {kt(kayit.cag)}, {bic(m.yasSonek, kayit.yas)}, {kayit.olum_nedeni})
                </div>
                {(kayit.yerlesim || kayit.kisilik || kayit.unvanlar || kayit.efsanevi_olum) && (
                  <div className="liderlik-detay">
                    {kayit.yerlesim && <span>📍 {kt(kayit.yerlesim)}</span>}
                    {kayit.kisilik && <span>🎭 {kayit.kisilik.split(', ').map((k) => kt(k.trim())).join(' · ')}</span>}
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
            {liderlik.length === 0 && <li>{m.kayitYok}</li>}
          </ol>
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
