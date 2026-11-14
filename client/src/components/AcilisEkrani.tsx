import { useEffect, useRef, useState } from 'react';
import type { CharacterState } from '../types';
import type { GiyilenKozmetikler } from '../kozmetikDolabi';
import { useDil } from '../DilContext';
import { bic } from '../i18n';
import { aileKokAdi, enTanimlik } from '../aileAdi';
import { formatPara } from '../format';
import { MESLEK_KATEGORI, meslekYatkinlikOnizleme } from '../bolgeTema';
import { Banner } from './Banner';
import { KarakterAvatari } from './KarakterAvatari';
import { KisilikPaneli } from './KisilikPaneli';
import { MeslekAmblemi } from './Amblemler';
import { KoseTezhibi, KaderYollari } from './Suslemeler';

type Metinler = ReturnType<typeof useDil>['m'];

/** Meslek/çağ kısa açıklamaları — dile göre i18n sözlüğünden. */
function meslekAciklama(m: Metinler, meslek: string): string {
  if (meslek === 'Asker') return m.meslekAciklamaAsker;
  if (meslek === 'Tüccar') return m.meslekAciklamaTuccar;
  if (meslek === 'Din Adamı') return m.meslekAciklamaDinAdami;
  if (meslek === 'Zanaatkâr') return m.meslekAciklamaZanaatkar;
  return '';
}

/** Yatkınlık kademesi (bolgeTema.meslekYatkinlikOnizleme.seviye) → etiket + simge. Nötr (2): satır yok. */
function yatkinlikGoster(m: Metinler, seviye: 1 | 2 | 3 | 4 | 5): { simge: string; etiket: string } | null {
  if (seviye === 1) return { simge: '👎', etiket: m.acilisYatkinlik1 };
  if (seviye === 3) return { simge: '👍', etiket: m.acilisYatkinlik3 };
  if (seviye === 4) return { simge: '💪', etiket: m.acilisYatkinlik4 };
  if (seviye === 5) return { simge: '🔥', etiket: m.acilisYatkinlik5 };
  return null;
}

interface AcilisEkraniProps {
  karakter: CharacterState;
  meslekler: string[];
  yukleniyor: boolean;
  avatarKozmetikleri?: GiyilenKozmetikler;
  /** "Devam Et"e basılınca seçili meslekle çağrılır (geri dönüşsüz: sunucuya meslek atanır). */
  onMeslekSec: (meslek: string) => void;
}

/**
 * Açılış + meslek seçimi (ekran === 'acilis'). Kimlik şeridi, kısa anlatı, 4 meslek kartı ve
 * "Devam Et". Kart seçilir (vurgulanır), kesinleştirme alttaki "Devam Et" düğmesiyledir.
 * PC'de 4 kart tek satır; mobilde 2×2 ve sabit alt düğme (bkz. acilis.css).
 */
export function AcilisEkrani({ karakter, meslekler, yukleniyor, avatarKozmetikleri, onMeslekSec }: AcilisEkraniProps) {
  const { m, kt } = useDil();
  const [secili, setSecili] = useState<string | null>(null);
  const [hikayeAcik, setHikayeAcik] = useState(false);
  const [hikayeKisaltildi, setHikayeKisaltildi] = useState(true);
  const hikayeRef = useRef<HTMLSpanElement>(null);
  const aileAdi = aileKokAdi(kt(karakter.aile_meslegi));

  // "Devamını oku" yalnız metin gerçekten kırpılıyorsa görünür (kısa metinde anlamsız).
  useEffect(() => {
    const olc = () => {
      const el = hikayeRef.current;
      if (el && !hikayeAcik) setHikayeKisaltildi(el.scrollHeight > el.clientHeight + 1);
    };
    olc();
    window.addEventListener('resize', olc);
    return () => window.removeEventListener('resize', olc);
  }, [karakter.acilis_anlatimi, hikayeAcik]);

  return (
    <div className="ekran acilis-ekran">
      <KoseTezhibi />
      <div className="giris-yollar" aria-hidden="true">
        <KaderYollari />
      </div>
      <main className="acilis-govde">
        <header className="acilis-kimlik">
          <KarakterAvatari kisilik={karakter.kisilik} giyilenKozmetikler={avatarKozmetikleri} />
          <div className="acilis-ad-blok">
            <h2 className="acilis-ad">{karakter.isim}</h2>
            <p className="acilis-aile">{bic(m.acilisAileCocugu, aileAdi, enTanimlik(aileAdi))}</p>
          </div>
          <Banner cag={karakter.cag} bolge={karakter.bolge} yil={karakter.yil} ulke={karakter.ulke} hukumdar={karakter.hukumdar} />
          <div className="acilis-ozet">
            <span>
              💰 {formatPara(karakter.para)} {karakter.para_birimi}
            </span>
            <span>
              ❤️ {m.statSaglik} {karakter.saglik}
            </span>
            <span>
              🙂 {m.statMutluluk} {karakter.mutluluk}
            </span>
          </div>
        </header>

        {karakter.durumlar.length > 0 && (
          <p className="acilis-durum">{bic(m.acilisDurum, karakter.durumlar.map((d) => kt(d.ad)).join(', '))}</p>
        )}

        <section className="acilis-hikaye">
          <p className={`acilis-metni${hikayeAcik ? ' acik' : ''}`}>
            <span className="acilis-metni-ic" ref={hikayeRef}>
              {karakter.acilis_anlatimi}
            </span>
          </p>
          {(hikayeKisaltildi || hikayeAcik) && (
            <button type="button" className="acilis-hikaye-dugme" aria-expanded={hikayeAcik} onClick={() => setHikayeAcik((a) => !a)}>
              {hikayeAcik ? m.acilisHikayeDaralt : m.acilisHikayeDevam}
            </button>
          )}
        </section>

        <section className="acilis-meslek" aria-labelledby="acilis-meslek-baslik">
          <h3 id="acilis-meslek-baslik" className="acilis-meslek-baslik">
            {m.meslekSecBaslik}
          </h3>
          <p className="acilis-meslek-alt">{m.meslekSecAlt}</p>
          <div className="meslek-secim-izgara" role="group" aria-labelledby="acilis-meslek-baslik">
            {meslekler.map((meslek) => {
              const kategori = MESLEK_KATEGORI[meslek];
              const puan = kategori ? karakter.yatkinliklar[kategori] ?? 0 : 0;
              const onizleme = meslekYatkinlikOnizleme(puan);
              const yat = yatkinlikGoster(m, onizleme.seviye);
              const secildi = secili === meslek;
              return (
                <button
                  key={meslek}
                  type="button"
                  className={`meslek-secim-kart${secildi ? ' secili' : ''}`}
                  aria-pressed={secildi}
                  disabled={yukleniyor}
                  onClick={() => setSecili(meslek)}
                >
                  <MeslekAmblemi meslek={meslek} />
                  <strong className="meslek-secim-ad">{kt(meslek)}</strong>
                  <span className="meslek-secim-aciklama">{meslekAciklama(m, meslek)}</span>
                  {yat && (
                    <span className={`meslek-secim-yatkinlik ${onizleme.seviye === 1 ? 'eksi' : 'arti'}`}>
                      <b>
                        {yat.simge} {yat.etiket}
                      </b>
                      <small>
                        {onizleme.seviye === 1 ? m.acilisYatkinlikEksi : m.acilisYatkinlikArti}
                        {onizleme.sohret > 0 ? ` ${m.acilisYatkinlikSohret}` : ''}
                      </small>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <div className="acilis-eylem">
          <button
            type="button"
            className="acilis-devam"
            disabled={!secili || yukleniyor}
            onClick={() => secili && onMeslekSec(secili)}
          >
            {yukleniyor ? m.yukleniyor : m.devamEt}
          </button>
        </div>

        <details className="acilis-detay">
          <summary>{m.kpBaslikTam}</summary>
          <KisilikPaneli
            kisilik={karakter.kisilik}
            aileMeslegi={karakter.aile_meslegi}
            bolge={karakter.bolge}
            kaynaklar={karakter.yatkinlik_kaynaklari}
            eksenler={karakter.kisilik_eksenleri}
            meslekYatkinlikUnvani={karakter.meslek_yatkinlik_unvani}
            meslekYatkinlikSeviyesi={karakter.meslek_yatkinlik_seviyesi}
            meslek={karakter.meslek}
            meslekZarBonusu={karakter.meslek_zar_bonusu}
            meslekMaasCarpani={karakter.meslek_maas_carpani}
            meslekTecrubeHizi={karakter.meslek_tecrube_hizi}
          />
        </details>
      </main>
    </div>
  );
}
