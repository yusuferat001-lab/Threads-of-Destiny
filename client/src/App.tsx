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
  soyuSurdur,
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
import { KomutaSeridi } from './components/KomutaSeridi';
import { FinansOzetPaneli } from './components/FinansOzetPaneli';
import { SahneHotspotlari } from './components/SahneHotspotlari';
import { EnvanterPaneli } from './components/EnvanterPaneli';
import { FinansEkrani } from './components/FinansEkrani';
import { SosyallesmePaneli } from './components/SosyallesmePaneli';
import { MagazaPaneli } from './components/MagazaPaneli';
import { IsYatirimEkrani } from './components/IsYatirimEkrani';
import { SonucEfekti } from './components/SonucEfekti';
import { sesKapaliMi, sesTercihiKaydet } from './ses';
import { aktifOturumIdGetir, aktifOturumIdKaydet, aktifOturumIdSil } from './oturum';
import { basarimlariKaydet, basarimlariGetir } from './basarimlar';
import { sonucIkonuGetir, unUnvani, MESLEK_KATEGORI, yatkinlikEtiketi, etkiTahminiGetir } from './bolgeTema';
import { formatPara } from './format';
import './App.css';

type Ekran =
  | 'giris'
  | 'cag_sec'
  | 'bolge_sec'
  | 'yerlesim_sec'
  | 'acilis'
  | 'meslek'
  | 'oyun'
  | 'sonuc'
  | 'olum'
  | 'liderlik'
  | 'aile'
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
  oncekiAhlak: number;
  oncekiUn: number;
  paraBirimi: string;
  terfiOldu: boolean;
}

const MESLEK_ACIKLAMA: Record<string, string> = {
  Asker: 'Savaş, sadakat ve rütbe. Yüksek risk, hızlı ün.',
  Tüccar: 'Kâr, pazarlık ve ağ kurma. Yüksek kazanç potansiyeli.',
  'Din Adamı': 'Cemaat, vicdan ve nüfuz. İstikrarlı saygınlık.',
};

const MESLEK_SIMGE: Record<string, string> = {
  Asker: '⚔️',
  Tüccar: '💰',
  'Din Adamı': '🙏',
};

const CAG_ACIKLAMA: Record<string, string> = {
  'Orta Çağ': 'Haçlı seferleri, veba, şövalyeler, kervanlar. 11.-13. yüzyıl.',
  'Sanayi Devrimi': 'Fabrikalaşma, sömürgecilik, yeni icatlar. 19. yüzyıl.',
};

const CAG_SIMGE: Record<string, string> = {
  'Orta Çağ': '🏰',
  'Sanayi Devrimi': '🏭',
};

/** Gelir/Sosyalleş/Mağaza artık sahne üzerindeki tıklama noktalarından açılır ama tam
 * sayfa olarak (oyun HUD'unun yerini alarak) açılır — hepsi ana oyun ekranıyla aynı "sayfa
 * hiç kaymaz, sadece sütun/ızgara kendi içinde kayar" modelini kullanır (bkz.
 * .oyun-kapsayici-tam) — `aile` (sol panelden "Aileni Gör →" ile açılır, hotspot değil) bu
 * gruba dahil DEĞİL, o hâlâ dar/ortalanmış, doğal yükseklikte basit bir liste ekranı. */
const TAM_EKRAN_GRUBU: Ekran[] = ['oyun', 'sonuc', 'yatirim', 'finans', 'sosyallesme', 'magaza'];

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
  const [basarimlar, setBasarimlar] = useState(() => basarimlariGetir());
  const [basarimlarAcik, setBasarimlarAcik] = useState(false);

  function sesToggle() {
    setSesKapali((onceki) => {
      const yeni = !onceki;
      sesTercihiKaydet(yeni);
      return yeni;
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
            artilar: ['Ticaret ve sosyal fırsatlar bol', 'Yıllık kazancın %20 daha yüksek'],
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
            eksiler: ['Vahşi hayvanlar ve zorlu kışlarla karşılaşabilirsin', 'Pazardan uzak, yıllık kazancın %20 daha düşük'],
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

  async function yerlesimSecildi(yerlesimId: string) {
    if (!secilenCag || !secilenBolge) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const { state } = await yeniOyunBaslat(secilenCag, secilenBolge, yerlesimId);
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
    const oncekiAhlak = karakter.ahlak;
    const oncekiUn = karakter.un;
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
        oncekiAhlak,
        oncekiUn,
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

  async function soyunuSurdur() {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const { state } = await soyuSurdur(karakter.id);
      setKarakter(state);
      aktifOturumIdKaydet(state.id);
      setSonEtki(null);
      setIsim('');
      setKaydedildi(false);
      setEkran('acilis');
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
    setEkran('giris');
  }

  return (
    <div
      className={TAM_EKRAN_GRUBU.includes(ekran) ? 'oyun-kapsayici oyun-kapsayici-tam' : 'oyun-kapsayici'}
    >
      <button
        className="ses-toggle-buton"
        onClick={sesToggle}
        aria-label={sesKapali ? 'Sesi aç' : 'Sesi kapat'}
        title={sesKapali ? 'Sesi aç' : 'Sesi kapat'}
      >
        {sesKapali ? '🔇' : '🔊'}
      </button>
      {hata && <div className="hata-kutusu">{hata}</div>}

      {ekran === 'giris' && (
        <div className="ekran ekran-giris">
          <h1>Kader Çarkı</h1>
          <p className="giris-aciklama">
            Çağını, ülkeni ve mesleğini sen seç; ailen ve kişiliğin rastgele belirlensin. Gerisini
            kaderin ve kararların belirlesin. Ölüm kalıcıdır.
          </p>
          <button disabled={yukleniyor} onClick={() => setEkran('cag_sec')}>
            Yeni Hayata Başla
          </button>
          <button className="ikincil" disabled={yukleniyor} onClick={() => liderligiAc('genel')}>
            Liderlik Tablosu
          </button>

          {(basarimlar.unvanlar.length > 0 || basarimlar.olumler.length > 0) && (
            <div className="basarimlar-paneli">
              <button className="ikincil basarimlar-baslik-buton" onClick={() => setBasarimlarAcik((a) => !a)}>
                🏆 Başarımların ({basarimlar.unvanlar.length + basarimlar.olumler.length}) {basarimlarAcik ? '▲' : '▼'}
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
      )}

      {ekran === 'cag_sec' && (
        <div className="ekran ekran-meslek">
          <h2>Çağını Seç</h2>
          <p className="giris-aciklama">Hangi tarihi dönemde yaşamak istersin?</p>
          <div className="meslek-kartlari">
            {Object.keys(bolgeler).map((cag) => (
              <button key={cag} className="meslek-kart" disabled={yukleniyor} onClick={() => cagSecildi(cag)}>
                <span className="meslek-simge">{CAG_SIMGE[cag] ?? '📜'}</span>
                <strong>{cag}</strong>
                <span className="meslek-aciklama">{CAG_ACIKLAMA[cag] ?? ''}</span>
              </button>
            ))}
          </div>
          <button className="ikincil" onClick={() => setEkran('giris')}>
            Geri
          </button>
        </div>
      )}

      {ekran === 'bolge_sec' && secilenCag && (
        <div className="ekran ekran-meslek">
          <h2>Ülkeni Seç</h2>
          <p className="giris-aciklama">{secilenCag} döneminde hangi topraklarda doğmak istersin?</p>
          <div className="meslek-kartlari">
            {(bolgeler[secilenCag] ?? []).map((bolge) => (
              <button
                key={bolge}
                className="meslek-kart"
                disabled={yukleniyor}
                onClick={() => bolgeSecildi(bolge)}
              >
                <strong>{bolge}</strong>
              </button>
            ))}
          </div>
          <button className="ikincil" onClick={() => setEkran('cag_sec')}>
            Geri
          </button>
        </div>
      )}

      {ekran === 'yerlesim_sec' && secilenBolge && (
        <div className="ekran ekran-meslek">
          <h2>Nerede Yaşayacaksın?</h2>
          <p className="giris-aciklama">
            {secilenBolge} toprakları geniş; şehir merkezi, sınır bölgesi ve dağ başı çok farklı bir hayat
            sunar. Artı ve eksileri iyi tart.
          </p>
          <div className="yerlesim-kartlari">
            {yerlesimler.map((yerlesim) => (
              <button
                key={yerlesim.id}
                className="yerlesim-kart"
                disabled={yukleniyor}
                onClick={() => yerlesimSecildi(yerlesim.id)}
              >
                <span className="meslek-simge">{yerlesim.simge}</span>
                <strong>{yerlesim.ad}</strong>
                <div className="yerlesim-artilar">
                  {yerlesim.artilar.map((artı) => (
                    <span key={artı} className="yerlesim-arti">
                      ✓ {artı}
                    </span>
                  ))}
                </div>
                <div className="yerlesim-eksiler">
                  {yerlesim.eksiler.map((eksi) => (
                    <span key={eksi} className="yerlesim-eksi">
                      ✕ {eksi}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
          <button className="ikincil" onClick={() => setEkran('bolge_sec')}>
            Geri
          </button>
        </div>
      )}

      {ekran === 'meslek' && (
        <div className="ekran ekran-meslek">
          {karakter && (
            <BolgeSahnesi cag={karakter.cag} bolge={karakter.bolge} yerlesim={karakter.yerlesim} ulke={karakter.ulke} un={karakter.un} />
          )}
          <h2>Mesleğini Seç</h2>
          <p className="giris-aciklama">
            Ailenin mesleğini sürdürürsen hazır bir müşteri ve tanıdık ağı devralırsın.
          </p>
          <div className="meslek-kartlari">
            {meslekler.map((meslek) => {
              const kategori = MESLEK_KATEGORI[meslek];
              const puan = kategori ? karakter?.yatkinliklar[kategori] ?? 0 : 0;
              const { etiket, simge } = yatkinlikEtiketi(puan);
              return (
                <button
                  key={meslek}
                  className="meslek-kart"
                  disabled={yukleniyor}
                  onClick={() => meslekSecildi(meslek)}
                >
                  <span className="meslek-simge">{MESLEK_SIMGE[meslek] ?? '📜'}</span>
                  <strong>{meslek}</strong>
                  <span className="meslek-aciklama">{MESLEK_ACIKLAMA[meslek] ?? ''}</span>
                  {karakter && (
                    <span className="meslek-yatkinlik">
                      {simge} {etiket} ({puan > 0 ? '+' : ''}
                      {puan})
                    </span>
                  )}
                  {karakter?.aile_meslegi === meslek && (
                    <span className="meslek-miras-ipucu">✓ Aile mesleğin — bonus kazanırsın</span>
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
          <h2>{karakter.aile_meslegi} Ailesinin Çocuğu</h2>
          <p className="acilis-metni">{karakter.acilis_anlatimi}</p>

          <div className="acilis-ozet">
            <span>
              💰 {formatPara(karakter.para)} {karakter.para_birimi}
            </span>
            <span>❤️ Sağlık {karakter.saglik}</span>
            <span>🙂 Mutluluk {karakter.mutluluk}</span>
            <span>🏅 {unUnvani(karakter.un)}</span>
            <span>🎭 {karakter.kisilik.join(' · ')}</span>
          </div>

          {karakter.durumlar.length > 0 && (
            <p className="acilis-durum">
              Doğuştan gelen durumun: {karakter.durumlar.map((d) => d.ad).join(', ')}
            </p>
          )}

          <KisilikPaneli
            kisilik={karakter.kisilik}
            aileMeslegi={karakter.aile_meslegi}
            kaynaklar={karakter.yatkinlik_kaynaklari}
            eksenler={karakter.kisilik_eksenleri}
          />

          <button disabled={yukleniyor} onClick={() => setEkran('meslek')}>
            {yukleniyor ? 'Yükleniyor...' : 'Devam Et'}
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
          />
          <div className="oyun-govde">
            <div className="sol-panel panel-parsomen">
              <div className="panel-parsomen-baslik">Kişisel Hayat</div>

              <div className="sol-panel-kimlik">
                <KarakterAvatari
                  meslek={karakter.meslek}
                  kisilik={karakter.kisilik}
                  rutbeSeviye={karakter.rutbe_seviye}
                />
                <div className="sol-panel-baslik">
                  <strong>
                    {karakter.rutbe}
                    {karakter.unvanlar.length > 0 && ` "${karakter.unvanlar[karakter.unvanlar.length - 1]}"`}
                  </strong>
                  <span>
                    {karakter.meslek} · {karakter.yas} yaşında
                  </span>
                </div>
              </div>

              <div className="sol-panel-mini-barlar">
                <div className="un-rozeti">
                  <span className="un-rozeti-ikon" aria-hidden="true">
                    🏅
                  </span>
                  <div className="un-rozeti-metin">
                    <span className="un-rozeti-etiket">Ün</span>
                    <strong>{unUnvani(karakter.un)}</strong>
                  </div>
                </div>
              </div>

              <FinansOzetPaneli finans={finans} maasYillikYedek={karakter.maas_yillik} paraBirimi={karakter.para_birimi} />

              <KomutaSeridi
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
              />

              <AileOzetPaneli
                esAdi={karakter.es_adi}
                esMeslek={karakter.es_meslek}
                esRutbe={karakter.es_rutbe}
                cocuklar={karakter.cocuklar}
                evcilHayvan={karakter.evcil_hayvan}
              />
              <button className="ikincil aile-gor-buton" onClick={() => setEkran('aile')}>
                Aileni Gör →
              </button>

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
                    <p className="sonuc-hikaye">{sonEtki.etki.mesaj}</p>
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
                    {tepkiModu && <p className="tepki-notu">⏳ Tarih henüz ilerlemedi — bu senin son sözün.</p>}
                    <p className="olay-metni">{senaryo.olay_metni}</p>
                  </div>
                )}

                {ekran === 'sonuc' && sonEtki ? (
                  <div className="secenekler sonuc-detay-panel">
                    <EtkiCipleri
                      etki={sonEtki.etki}
                      paraBirimi={sonEtki.paraBirimi}
                      oncekiAhlak={sonEtki.oncekiAhlak}
                      sonrakiAhlak={karakter.ahlak}
                      oncekiUn={sonEtki.oncekiUn}
                      sonrakiUn={karakter.un}
                    />
                    <p className="sonuc-detay">{sonEtki.sonucAnlatimi}</p>
                    {sonEtki.zamanAnlatimi && (
                      <div className="zaman-blogu">
                        <span className="zaman-basligi">— {sonEtki.yasArtisi} yıl sonra —</span>
                        <p className="zaman-anlatimi">{sonEtki.zamanAnlatimi}</p>
                      </div>
                    )}
                    <button disabled={yukleniyor} onClick={devamEt}>
                      {yukleniyor ? 'Yükleniyor...' : 'Devam Et'}
                    </button>
                  </div>
                ) : (
                  <div className="secenekler">
                    {yukleniyor && (
                      <p className="secenek-yukleniyor-metni" aria-live="polite">
                        Kaderin şekilleniyor…
                      </p>
                    )}
                    {senaryo.secenekler.map((secenek, i) => {
                      const tahminler =
                        !secenek.kilitli && !tepkiModu
                          ? etkiTahminiGetir(secenek.basarili_sonuc, secenek.basarisiz_sonuc)
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
                              %{secenek.belirsiz_aralik.min}-{secenek.belirsiz_aralik.max} şans
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
              <div className="panel-parsomen-baslik">Dünya &amp; Siyaset</div>
              <SiyasetPaneli
                cag={karakter.cag}
                hizip={karakter.hizip}
                devletTakibinde={karakter.etiketler.includes('devlet_takibinde')}
              />
              <HaberlerPaneli haberler={karakter.haberler} />
              <BolgeBilgisiPaneli bolge={karakter.bolge} bilgi={karakter.bolge_bilgi} />
              <IsyeriPaneli
                meslek={karakter.meslek}
                rutbeSeviye={karakter.rutbe_seviye}
                dinKultur={karakter.din_kultur}
                ticaretSermaye={karakter.ticaret_sermaye}
                nufuz={karakter.nufuz}
                orduTechizatSeviyesi={karakter.ordu_techizat_seviyesi}
              />
              <IliskilerPaneli
                dostAdi={karakter.dost_adi}
                rakipAdi={karakter.rakip_adi}
                dostPuani={karakter.dost_puani}
                rakipPuani={karakter.rakip_puani}
              />
              <DurumPaneli durumlar={karakter.durumlar} />
            </div>
          </div>
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
          ekip={karakter.ekip}
          mulkler={mulkler}
          yukleniyor={yukleniyor}
          islemMesaji={islemMesaji}
          onKonutDegistir={konutDegistirHandler}
          onYasamSecimiDegistir={yasamSecimiDegistirHandler}
          onEkipCikar={ekipCikarHandler}
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

      {ekran === 'olum' && karakter && (
        <div className="ekran ekran-olum buyuk-an-olum">
          <BolgeSahnesi cag={karakter.cag} bolge={karakter.bolge} yerlesim={karakter.yerlesim} ulke={karakter.ulke} un={karakter.un} />
          <span className="sonuc-ikon">💀</span>
          <h2>Öldün.</h2>
          <p className="sonuc-hikaye">{karakter.olum_nedeni}</p>
          <p className="olum-ozet">
            {karakter.yil} yılı. {karakter.yas} yaşında, {karakter.rutbe} ({karakter.meslek}) olarak,{' '}
            {karakter.bolge} topraklarında hayatını kaybetti. {karakter.aile_meslegi} ailesinin çocuğuydu.
          </p>
          <p className="olum-ozet">
            {formatPara(karakter.para)} {karakter.para_birimi} · Ün: {unUnvani(karakter.un)}
          </p>

          <GecmisGrafik gecmis={karakter.gecmis} paraBirimi={karakter.para_birimi} />
          <HayatHikayesi hikaye={karakter.hayat_hikayesi} />

          {!kaydedildi ? (
            <div className="isim-form">
              <input
                value={isim}
                onChange={(e) => setIsim(e.target.value)}
                placeholder="İsmini gir"
                maxLength={40}
              />
              <button disabled={yukleniyor || !isim.trim()} onClick={skorunuKaydet}>
                Skoru Kaydet
              </button>
            </div>
          ) : (
            <p>Skorun kaydedildi.</p>
          )}

          {karakter.cocuklar.some((c) => c.yasiyor) && (
            <button className="soy-surdur-buton" disabled={yukleniyor} onClick={soyunuSurdur}>
              🏰 Soyunu {
                karakter.cocuklar
                  .filter((c) => c.yasiyor)
                  .reduce((en, c) => (c.dogum_yili < en.dogum_yili ? c : en)).isim
              } ile Sürdür
            </button>
          )}

          <div className="olum-butonlari">
            <button onClick={() => liderligiAc('genel')}>Liderlik Tablosu</button>
            <button className="ikincil" onClick={bastanBasla}>
              Yeniden Başla
            </button>
          </div>
        </div>
      )}

      {ekran === 'liderlik' && (
        <div className="ekran ekran-liderlik">
          <h2>Liderlik Tablosu</h2>
          <div className="liderlik-sekmeler">
            <button
              className={liderlikTuru === 'genel' ? 'aktif-sekme' : ''}
              onClick={() => liderligiAc('genel')}
            >
              Genel
            </button>
            <button
              className={liderlikTuru === 'en_zengin' ? 'aktif-sekme' : ''}
              onClick={() => liderligiAc('en_zengin')}
            >
              En Zenginler
            </button>
            <button
              className={liderlikTuru === 'en_unlu' ? 'aktif-sekme' : ''}
              onClick={() => liderligiAc('en_unlu')}
            >
              En Çok Tanınanlar
            </button>
          </div>
          <ol className="liderlik-liste">
            {liderlik.map((kayit) => (
              <li key={kayit.id}>
                <div>
                  <strong>{kayit.isim}</strong>
                  {kayit.hayat_amaci_tamamlandi && (
                    <span className="liderlik-rozet liderlik-rozet-amac" title="Hayat amacını tamamladı (x5 skor)">
                      🎯 x5
                    </span>
                  )}
                  {' '}— {kayit.skor} puan ({kayit.rutbe ? `${kayit.rutbe}, ` : ''}
                  {kayit.meslek}, {kayit.cag}, {kayit.yas} yaşında, {kayit.olum_nedeni})
                </div>
                {(kayit.yerlesim || kayit.kisilik || kayit.unvanlar || kayit.efsanevi_olum) && (
                  <div className="liderlik-detay">
                    {kayit.yerlesim && <span>📍 {kayit.yerlesim}</span>}
                    {kayit.kisilik && <span>🎭 {kayit.kisilik}</span>}
                    {kayit.unvanlar &&
                      kayit.unvanlar.split(', ').map((unvan) => (
                        <span key={unvan} className="liderlik-rozet liderlik-rozet-unvan">
                          🏵️ {unvan}
                        </span>
                      ))}
                    {kayit.efsanevi_olum && (
                      <span className="liderlik-rozet liderlik-rozet-olum">💀 {kayit.efsanevi_olum}</span>
                    )}
                  </div>
                )}
              </li>
            ))}
            {liderlik.length === 0 && <li>Henüz kayıt yok.</li>}
          </ol>
          <button className="ikincil" onClick={bastanBasla}>
            Ana Menü
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
