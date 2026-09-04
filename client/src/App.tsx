import { useEffect, useState } from 'react';
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
  YatirimConfig,
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
  senaryoGetir,
  secimYap,
  skorKaydet,
  skorTablosuGetir,
  isimOnerisiGetir,
  finansGetir,
  yatirimYap,
  yatirimConfigGetir,
  mulkConfigGetir,
  mulkSatinAl,
  dedikoduGetir,
  zarKademeleriGetir,
  zarAt,
  konutDegistir,
  yasamSecimiDegistir,
  ekipCikar,
  sosyallesmeYerleriGetir,
  sosyallesmeYerineGit,
  magazaKatalogGetir,
  magazadanSatinAl,
  envanterEsyasiKullan,
  geriBildirimGonder,
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
import { MagazaPaneli } from './components/MagazaPaneli';
import { IsYatirimEkrani } from './components/IsYatirimEkrani';
import { SonucEfekti } from './components/SonucEfekti';
import { AyarlarModal } from './components/AyarlarModal';
import { ayarlariGetir, ayarlariKaydet, type Dil } from './ayarlar';
import type { GeriBildirimGirdi } from './types';
import { sesKapaliMi, sesTercihiKaydet } from './ses';
import { aktifOturumIdGetir, aktifOturumIdKaydet, aktifOturumIdSil } from './oturum';
import { basarimlariKaydet, basarimlariGetir } from './basarimlar';
import { gecmisHayatKaydet, gecmisHayatlariGetir, gecmisHayatlariTemizle, type GecmisHayat } from './gecmisHayatlar';
import { sonucIkonuGetir, unUnvani, MESLEK_KATEGORI, yatkinlikEtiketi, etkiTahminiGetir } from './bolgeTema';
import { formatPara } from './format';
import { bic } from './i18n';
import { DilContext, dilCtxYap } from './DilContext';
import './App.css';

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
  | 'magaza';

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

const CAG_SIMGE: Record<string, string> = {
  'Orta Çağ': '🏰',
  'Sanayi Devrimi': '🏭',
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
const TAM_EKRAN_GRUBU: Ekran[] = ['oyun', 'sonuc', 'yatirim', 'finans', 'sosyallesme', 'magaza'];

/** Geri bildirim mesajlarına eklenen uygulama sürümü — bir hata raporunun hangi build'e
 * ait olduğunu ayırt etmek için. Yeni bir sürüm çıkınca elle güncelle. */
const APP_SURUM = '1.0.0';

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

  const [liderlikTuru, setLiderlikTuru] = useState<SiralamaTuru>('genel');
  const [liderlik, setLiderlik] = useState<ScoreKaydi[]>([]);

  const [finans, setFinans] = useState<FinansOzeti | null>(null);
  const [yatirimConfig, setYatirimConfig] = useState<YatirimConfig | null>(null);
  const [dedikodular, setDedikodular] = useState<string[]>([]);
  const [mulkler, setMulkler] = useState<MulkKartBilgisi[]>([]);
  const [zarKademeleri, setZarKademeleri] = useState<number[]>([]);
  const [islemMesaji, setIslemMesaji] = useState<string | null>(null);
  const [sosyallesmeYerleri, setSosyallesmeYerleri] = useState<SosyallesmeYeri[]>([]);
  const [magazaKatalogu, setMagazaKatalogu] = useState<MagazaEsyaKarti[]>([]);

  const [sesKapali, setSesKapali] = useState(() => sesKapaliMi());
  const [ayarlarAcik, setAyarlarAcik] = useState(false);
  const [dil, setDil] = useState<Dil>(() => ayarlariGetir().dil);
  const [basarimlar, setBasarimlar] = useState(() => basarimlariGetir());
  const [basarimlarAcik, setBasarimlarAcik] = useState(false);
  const [gecmisHayatlar, setGecmisHayatlar] = useState<GecmisHayat[]>(() => gecmisHayatlariGetir());
  const [secilenGecmisHayat, setSecilenGecmisHayat] = useState<GecmisHayat | null>(null);
  const [liderlikOnizleme, setLiderlikOnizleme] = useState<ScoreKaydi[]>([]);
  const [bolgeBilgiAcik, setBolgeBilgiAcik] = useState(false);

  const dilCtx = dilCtxYap(dil);
  const { m, kt } = dilCtx;

  function sesToggle() {
    setSesKapali((onceki) => {
      const yeni = !onceki;
      sesTercihiKaydet(yeni);
      return yeni;
    });
  }

  function dilDegistir(yeni: Dil) {
    setDil(yeni);
    ayarlariKaydet({ dil: yeni });
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

  // Karakter öldüğünde kazandığı ünvanları/efsanevi ölümü tarayıcının kalıcı başarım koleksiyonuna ekler.
  useEffect(() => {
    if (ekran === 'olum' && karakter) {
      basarimlariKaydet(karakter.unvanlar, karakter.efsanevi_olum);
      setBasarimlar(basarimlariGetir());
      gecmisHayatKaydet(karakter);
      setGecmisHayatlar(gecmisHayatlariGetir());
      setIsim((mevcut) => mevcut || karakter.isim || '');
    }
  }, [ekran, karakter]);

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
        dil
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
        yatirimConfigGetir(karakter.id),
        dedikoduGetir(karakter.id),
        mulkConfigGetir(karakter.id),
        zarKademeleriGetir(karakter.id),
      ]);
      setYatirimConfig(config);
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
      yatirimConfigGetir(stateId),
      mulkConfigGetir(stateId),
    ]);
    setYatirimConfig(config);
    setMulkler(mulkConfig);
  }

  async function yatirimYapHandler() {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await yatirimYap(karakter.id);
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
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await zarAt(karakter.id, tutar);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function sosyallesmeEkraniniAc() {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const { yerler } = await sosyallesmeYerleriGetir(karakter.id);
      setSosyallesmeYerleri(yerler);
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
    setSecilenCag(null);
    setSecilenBolge(null);
    setSecilenYerlesim(null);
    setOyuncuIsmi('');
    setSecilenGecmisHayat(null);
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
          onDilDegistir={dilDegistir}
          onSesToggle={sesToggle}
          onGeriBildirimGonder={geriBildirimGonderHandler}
          onKapat={() => setAyarlarAcik(false)}
        />
      )}

      {ekran === 'giris' && (
        <div className="ekran ekran-giris">
          <div className="giris-hero">
            <span className="giris-cark" aria-hidden="true">⚙️</span>
            <h1>{m.oyunAdi}</h1>
            <p className="giris-aciklama">{m.girisAciklama}</p>
            <div className="giris-hero-butonlar">
              <button disabled={yukleniyor} onClick={() => setEkran('cag_sec')}>
                {m.btnYeniHayat}
              </button>
              <button className="ikincil" disabled={yukleniyor} onClick={() => liderligiAc('genel')}>
                {m.btnLiderlik}
              </button>
              <button className="ikincil" disabled={yukleniyor} onClick={() => setAyarlarAcik(true)}>
                {m.btnAyarlar}
              </button>
            </div>
          </div>

          <div className="giris-paneller">
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
        <div className="ekran ekran-meslek">
          <h2>{m.cagSecBaslik}</h2>
          <p className="giris-aciklama">{m.cagSecAlt}</p>
          <div className="meslek-kartlari">
            {Object.keys(bolgeler).map((cag) => (
              <button key={cag} className="meslek-kart" disabled={yukleniyor} onClick={() => cagSecildi(cag)}>
                <span className="meslek-simge">{CAG_SIMGE[cag] ?? '📜'}</span>
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
        <div className="ekran ekran-meslek">
          <h2>{m.bolgeSecBaslik}</h2>
          <p className="giris-aciklama">{bic(m.bolgeSecAlt, kt(secilenCag))}</p>
          <div className="meslek-kartlari">
            {(bolgeler[secilenCag] ?? []).map((bolge) => (
              <button
                key={bolge}
                className="meslek-kart"
                disabled={yukleniyor}
                onClick={() => bolgeSecildi(bolge)}
              >
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
        <div className="ekran ekran-meslek">
          <h2>{m.yerlesimSecBaslik}</h2>
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
        <div className="ekran ekran-isim">
          <h2>{m.isimSecBaslik}</h2>
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
        <div className="ekran ekran-meslek">
          {karakter && (
            <BolgeSahnesi cag={karakter.cag} bolge={karakter.bolge} yerlesim={karakter.yerlesim} ulke={karakter.ulke} un={karakter.un} />
          )}
          <h2>{m.meslekSecBaslik}</h2>
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
          <Banner
            cag={karakter.cag}
            bolge={karakter.bolge}
            yil={karakter.yil}
            ulke={karakter.ulke}
            hukumdar={karakter.hukumdar}
          />
          <BolgeSahnesi cag={karakter.cag} bolge={karakter.bolge} yerlesim={karakter.yerlesim} ulke={karakter.ulke} un={karakter.un} />
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
            <div className="sol-panel panel-parsomen">
              <div className="panel-parsomen-baslik">{m.panelKisiselHayat}</div>

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
            </div>

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
              </div>

              <div className="merkez-alt">
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
                      // Tek metin: olay sonucu + turun pasif özeti (kazanç/dünya olayları/terfi).
                      // sonucAnlatimi (çoğunlukla mesaj'ın tekrarı) yalnız zamanAnlatimi yoksa yedek.
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
                            <span className="secenek-sans">
                              {bic(m.sansEki, secenek.belirsiz_aralik.min, secenek.belirsiz_aralik.max)}
                            </span>
                          )}
                          {!secenek.kilitli && !tepkiModu && tahminler.length > 0 && (
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
                          {secenek.kilitli && <span className="secenek-kilit">{secenek.kilit_nedeni}</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="sag-panel panel-parsomen">
              <div className="panel-parsomen-baslik">{m.panelDunyaSiyaset}</div>
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
              </div>

              <IliskilerPaneli
                dostAdi={karakter.dost_adi}
                rakipAdi={karakter.rakip_adi}
                dostPuani={karakter.dost_puani}
                rakipPuani={karakter.rakip_puani}
              />
              <DurumPaneli durumlar={karakter.durumlar} />
            </div>
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

      {ekran === 'yatirim' && karakter && yatirimConfig && (
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
          config={yatirimConfig}
          dedikodular={dedikodular}
          mulkler={mulkler}
          zarKademeleri={zarKademeleri}
          sucSeviyesi={karakter.suc_seviyesi}
          yukleniyor={yukleniyor}
          islemMesaji={islemMesaji}
          onYatirimYap={yatirimYapHandler}
          onMulkSatinAl={mulkSatinAlHandler}
          onZarAt={zarAtHandler}
          onGeriDon={() => {
            setIslemMesaji(null);
            setEkran('oyun');
          }}
        />
      )}

      {ekran === 'sosyallesme' && (
        <SosyallesmePaneli
          yerler={sosyallesmeYerleri}
          yukleniyor={yukleniyor}
          onGit={sosyallesmeYerineGitHandler}
          onGeriDon={() => setEkran('oyun')}
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

          <GecmisGrafik gecmis={karakter.gecmis} paraBirimi={karakter.para_birimi} />
          <HayatHikayesi hikaye={karakter.hayat_hikayesi} />

          {!kaydedildi ? (
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
            <p>{m.skorKaydedildi}</p>
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
