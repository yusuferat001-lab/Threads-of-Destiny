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
  YatirimTuru,
  YatirimConfig,
  TepkiSonucu,
} from './types';
import {
  mesleklerGetir,
  bolgelerGetir,
  yerlesimlerGetir,
  konutlarGetir,
  yasamSecenekleriGetir,
  yeniOyunBaslat,
  meslekAta,
  senaryoGetir,
  secimYap,
  skorKaydet,
  skorTablosuGetir,
  soyuSurdur,
  finansGetir,
  yatirimYap,
  yatirimConfigGetir,
  konutDegistir,
  yasamSecimiDegistir,
  ekipCikar,
} from './api';
import { Banner } from './components/Banner';
import { DikeyBar } from './components/DikeyBar';
import { YildizBar } from './components/YildizBar';
import { AhlakRozeti } from './components/AhlakRozeti';
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
import { EnvanterPaneli } from './components/EnvanterPaneli';
import { FinansEkrani } from './components/FinansEkrani';
import { YatirimEkrani } from './components/YatirimEkrani';
import { IsDetayEkrani } from './components/IsDetayEkrani';
import { SonucEfekti } from './components/SonucEfekti';
import { sesKapaliMi, sesTercihiKaydet } from './ses';
import { basarimlariKaydet, basarimlariGetir } from './basarimlar';
import { sonucIkonuGetir, unYildiz, MESLEK_KATEGORI, yatkinlikEtiketi, etkiTahminiGetir } from './bolgeTema';
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
  | 'is_detay';

interface SonEtki {
  basarili: boolean;
  etki: SonucEtkisi;
  yasArtisi: number;
  kategori: string;
  sonucAnlatimi: string;
  zamanAnlatimi: string | null;
  oncekiAhlak: number;
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
  const [islemMesaji, setIslemMesaji] = useState<string | null>(null);

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

  // Karakter öldüğünde kazandığı ünvanları/efsanevi ölümü tarayıcının kalıcı başarım koleksiyonuna ekler.
  useEffect(() => {
    if (ekran === 'olum' && karakter) {
      basarimlariKaydet(karakter.unvanlar, karakter.efsanevi_olum);
      setBasarimlar(basarimlariGetir());
    }
  }, [ekran, karakter]);

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
      const { finans } = await finansGetir(karakter.id);
      setFinans(finans);
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
      const { config } = await yatirimConfigGetir(karakter.id);
      setYatirimConfig(config);
      setIslemMesaji(null);
      setEkran('yatirim');
    } catch (err) {
      setHata(String(err));
    } finally {
      setYukleniyor(false);
    }
  }

  async function yatirimYapHandler(tur: YatirimTuru, tutar?: number) {
    if (!karakter) return;
    setHata(null);
    setYukleniyor(true);
    try {
      const sonuc = await yatirimYap(karakter.id, tur, tutar);
      setKarakter(sonuc.state);
      setIslemMesaji(sonuc.mesaj);
      const { finans } = await finansGetir(sonuc.state.id);
      setFinans(finans);
      const { config } = await yatirimConfigGetir(sonuc.state.id);
      setYatirimConfig(config);
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
    <div className="oyun-kapsayici">
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
            <BolgeSahnesi bolge={karakter.bolge} yerlesim={karakter.yerlesim} ulke={karakter.ulke} un={karakter.un} />
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
          <BolgeSahnesi bolge={karakter.bolge} yerlesim={karakter.yerlesim} ulke={karakter.ulke} un={karakter.un} />
          <KarakterAvatari kisilik={karakter.kisilik} />
          <h2>{karakter.aile_meslegi} Ailesinin Çocuğu</h2>
          <p className="acilis-metni">{karakter.acilis_anlatimi}</p>

          <div className="acilis-ozet">
            <span>
              💰 {karakter.para} {karakter.para_birimi}
            </span>
            <span>❤️ Sağlık {karakter.saglik}</span>
            <span>🙂 Mutluluk {karakter.mutluluk}</span>
            <span>⭐ {unYildiz(karakter.un).toFixed(1)} yıldız</span>
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

      {ekran === 'oyun' && karakter && senaryo && (
        <div className="oyun-ekrani">
          <Banner
            cag={karakter.cag}
            bolge={karakter.bolge}
            yil={karakter.yil}
            ulke={karakter.ulke}
            hukumdar={karakter.hukumdar}
          />
          <KomutaSeridi
            meslek={karakter.meslek}
            amirAdi={karakter.amir_adi}
            amirRutbe={karakter.amir_rutbe}
            esAdi={karakter.es_adi}
            esMeslek={karakter.es_meslek}
            esRutbe={karakter.es_rutbe}
            astlar={karakter.astlar}
            ekip={karakter.ekip}
            orduMevcudu={karakter.ordu_mevcudu}
            orduTechizatSeviyesi={karakter.ordu_techizat_seviyesi}
            ticaretSermaye={karakter.ticaret_sermaye}
            nufuz={karakter.nufuz}
            evcilHayvan={karakter.evcil_hayvan}
            hapiste={karakter.etiketler.includes('hapiste')}
          />
          <div className="hizli-erisim-satiri">
            <button className="ikincil" disabled={yukleniyor} onClick={finansEkraniniAc}>
              💰 Gelir &amp; Gider
            </button>
            <button className="ikincil" disabled={yukleniyor} onClick={() => setEkran('is_detay')}>
              💼 İşin
            </button>
          </div>
          <BolgeSahnesi bolge={karakter.bolge} yerlesim={karakter.yerlesim} ulke={karakter.ulke} un={karakter.un} />

          <div className="oyun-govde">
            <div className="sol-panel">
              <KarakterAvatari
                meslek={karakter.meslek}
                kisilik={karakter.kisilik}
                rutbeSeviye={karakter.rutbe_seviye}
              />
              <DikeyBar
                label="Sağlık"
                value={karakter.saglik}
                renk="#c0392b"
                simge="❤️"
                renkEsikleri={[
                  [39, '#c0392b'],
                  [69, '#d68910'],
                  [100, '#2e7d32'],
                ]}
              />
              <DikeyBar
                label="Mutluluk"
                value={karakter.mutluluk}
                renk="#8a6a2a"
                simge="🙂"
                renkEsikleri={[
                  [29, '#5a4a6a'],
                  [59, '#8a6a2a'],
                  [100, '#e8b84b'],
                ]}
              />
              <YildizBar yildiz={unYildiz(karakter.un)} etiket="Ün" />
              <AhlakRozeti ahlak={karakter.ahlak} />
              <DikeyBar
                label="Kültür"
                value={karakter.kultur}
                renk="#2a7a8a"
                simge="🌍"
                renkEsikleri={[
                  [29, '#4a4a5a'],
                  [59, '#2a7a8a'],
                  [100, '#3ab0c9'],
                ]}
              />
            </div>

            <div className="merkez-panel">
              <div className="karakter-satiri">
                <span>
                  <span className="rutbe-etiketi">
                    {karakter.rutbe}
                    {karakter.unvanlar.length > 0 && (
                      <span className="unvan-etiketi"> "{karakter.unvanlar[karakter.unvanlar.length - 1]}"</span>
                    )}{' '}
                    ({karakter.meslek})
                  </span>{' '}
                  · {karakter.yas} yaşında
                  <span className="aile-etiketi"> · {karakter.aile_meslegi} ailesi</span>
                  {karakter.hizip && <span className="hizip-etiketi"> · 🏴 {karakter.hizip}</span>}
                </span>
                <div className="para-blogu">
                  <span className={`para-goster ${karakter.para < 0 ? 'para-borc' : ''}`}>
                    💰 {karakter.para} {karakter.para_birimi}
                  </span>
                  <span className="gelir-goster">
                    Yıllık gelir: ~{karakter.maas_yillik} {karakter.para_birimi}
                  </span>
                </div>
              </div>

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
                          {tahminler.length > 0 &&
                            ` · ${tahminler.map((t) => `${t.simge}${t.pozitif ? '+' : '−'}`).join(' ')}`}
                        </span>
                      )}
                      {secenek.kilitli && <span className="secenek-kilit">{secenek.kilit_nedeni}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="sag-panel">
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
              <button className="ikincil aile-gor-buton" onClick={() => setEkran('aile')}>
                Aileni Gör →
              </button>
              <DurumPaneli durumlar={karakter.durumlar} />
              <EnvanterPaneli etiketler={karakter.etiketler} />
              <KisilikPaneli
                kisilik={karakter.kisilik}
                aileMeslegi={karakter.aile_meslegi}
                kaynaklar={karakter.yatkinlik_kaynaklari}
                eksenler={karakter.kisilik_eksenleri}
              />
            </div>
          </div>
        </div>
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
        <YatirimEkrani
          meslek={karakter.meslek}
          para={karakter.para}
          paraBirimi={karakter.para_birimi}
          config={yatirimConfig}
          guvenliYatirimGetirisi={
            karakter.durumlar.find((d) => d.id === 'yatirim_guvenli_pasif')?.tur_basi_para ?? 0
          }
          yukleniyor={yukleniyor}
          islemMesaji={islemMesaji}
          onYatirimYap={yatirimYapHandler}
          onGeriDon={() => {
            setIslemMesaji(null);
            setEkran('is_detay');
          }}
        />
      )}

      {ekran === 'is_detay' && karakter && (
        <IsDetayEkrani
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
          onYatirimEkranina={yatirimEkraniniAc}
          onGeriDon={() => setEkran('oyun')}
        />
      )}

      {ekran === 'sonuc' && karakter && sonEtki && (
        <div className={`ekran ekran-sonuc${sonEtki.terfiOldu ? ' buyuk-an-terfi' : ''}`}>
          <BolgeSahnesi bolge={karakter.bolge} yerlesim={karakter.yerlesim} ulke={karakter.ulke} un={karakter.un} />
          <div className="sonuc-efekti-kapsayici">
            <SonucEfekti
              kategori={sonEtki.kategori}
              basarili={sonEtki.basarili}
              sessiz={sesKapali}
              terfiOldu={sonEtki.terfiOldu}
            />
            <span className="sonuc-ikon">{sonEtki.terfiOldu ? '🎖️' : sonucIkonuGetir(sonEtki.basarili, false, sonEtki.kategori)}</span>
          </div>
          <p className="sonuc-hikaye">{sonEtki.etki.mesaj}</p>

          <EtkiCipleri
            etki={sonEtki.etki}
            paraBirimi={sonEtki.paraBirimi}
            oncekiAhlak={sonEtki.oncekiAhlak}
            sonrakiAhlak={karakter.ahlak}
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
      )}

      {ekran === 'olum' && karakter && (
        <div className="ekran ekran-olum buyuk-an-olum">
          <BolgeSahnesi bolge={karakter.bolge} yerlesim={karakter.yerlesim} ulke={karakter.ulke} un={karakter.un} />
          <span className="sonuc-ikon">💀</span>
          <h2>Öldün.</h2>
          <p className="sonuc-hikaye">{karakter.olum_nedeni}</p>
          <p className="olum-ozet">
            {karakter.yil} yılı. {karakter.yas} yaşında, {karakter.rutbe} ({karakter.meslek}) olarak,{' '}
            {karakter.bolge} topraklarında hayatını kaybetti. {karakter.aile_meslegi} ailesinin çocuğuydu.
          </p>
          <p className="olum-ozet">
            {karakter.para} {karakter.para_birimi} · {unYildiz(karakter.un).toFixed(1)} yıldız ün
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
