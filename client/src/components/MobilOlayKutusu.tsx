import { useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import type { SenaryoResponse, SonucEtkisi } from '../types';
import { useDil } from '../DilContext';
import { EtkiCipleri } from './EtkiCipleri';
import { SonucEfekti } from './SonucEfekti';
import { KoseTezhibi } from './Suslemeler';
import { OLAY_RESMI_BILINEN, olayResmiSrc, type OlayResmiDurumu } from '../olayResmi';

/** Seçim sonrası gösterilecek her şey — App.tsx `SonEtki`'den türetilir (`ozet` önceden birleştirilmiş). */
export interface MobilSonuc {
  etki: SonucEtkisi;
  basarili: boolean;
  kategori: string;
  paraBirimi: string;
  terfiOldu: boolean;
  /** Olay mesajı + (varsa) turun tek durumsal cümlesi. */
  ozet: string;
  /** Çerçevenin köşesindeki yuvarlak rozetin simgesi (başarı/başarısızlık/terfi). */
  ikon: string;
}

interface MobilOlayKutusuProps {
  cag: string;
  ulke?: { savasta: boolean; vebada: boolean; ekonomi: string };
  senaryo: SenaryoResponse;
  /** null → soru durumu (başlık + metin + şıklar); dolu → sonuç durumu (çipler + özet + Devam Et). */
  sonuc: MobilSonuc | null;
  tepkiModu: boolean;
  yukleniyor: boolean;
  sesKapali: boolean;
  onSecenek: (indeks: number) => void;
  onDevam: () => void;
}

/**
 * Parşömen metni kutuya sığmayıp kayıyorsa kenarında solma ipucu göstermek için `data-kayar`
 * ('yok' | 'asagi' | 'yukari' | 'ikisi') yazar; içerik değişince başa sarar.
 */
function useKaydirmaIpucu(ref: RefObject<HTMLElement | null>, icerikAnahtari: string) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollTop = 0;
    const guncelle = () => {
      const kayar = el.scrollHeight > el.clientHeight + 2;
      const ustte = el.scrollTop <= 1;
      const altta = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      el.dataset.kayar = !kayar ? 'yok' : ustte ? 'asagi' : altta ? 'yukari' : 'ikisi';
    };
    guncelle();
    el.addEventListener('scroll', guncelle, { passive: true });
    const ro = new ResizeObserver(guncelle);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', guncelle);
      ro.disconnect();
    };
  }, [ref, icerikAnahtari]);
}

/**
 * Mobil (≤767px) oyun ekranının olay kutusu — tam sayfa arka planın ÜSTÜNE oturan kadife panel:
 * üstte kutudan taşan çerçeveli olay resmi, altında parşömen (başlık + metin), en altta ahşap şıklar
 * (hep 2 sütun; tek kalan son şık tam genişlik). Şık altı ipuçları (💰❤️🙂) bilinçli olarak yok.
 *
 * Çerçeve kaydırma kapsayıcısının DIŞINDA durur (kutunun kendisi `overflow` taşımaz) — taşan kısmı
 * kırpılmasın diye. Masaüstü düzeni bu bileşeni KULLANMAZ (bkz. App.tsx `merkez-alt`).
 */
export function MobilOlayKutusu({
  cag,
  ulke,
  senaryo,
  sonuc,
  tepkiModu,
  yukleniyor,
  sesKapali,
  onSecenek,
  onDevam,
}: MobilOlayKutusuProps) {
  const { m } = useDil();
  const src = olayResmiSrc(senaryo.kategori, cag);
  const govdeRef = useRef<HTMLDivElement>(null);
  useKaydirmaIpucu(govdeRef, `${sonuc ? 's' : 'q'}|${tepkiModu ? 't' : ''}|${senaryo.olay_basligi}|${sonuc?.ozet ?? ''}`);
  // Yoğun içerik: dar 2 sütunlu hücrelerde ~17 karakter/satır sığar. 4 şık ya da uzun şık metni
  // (3 şıkta >44, 2 şıkta >70 karakter; kilit nedeni de yer tutar) varsa çerçeve küçülür, punto iner.
  const enUzunSecenek = Math.max(
    0,
    ...senaryo.secenekler.map((s) => s.metin.length + (s.kilitli && s.kilit_nedeni ? 18 : 0)),
  );
  const yogun =
    !sonuc &&
    (senaryo.secenekler.length >= 4 ||
      (senaryo.secenekler.length === 3 && enUzunSecenek > 44) ||
      enUzunSecenek > 70);

  return (
    <section className={`olay-kutusu${sonuc ? ' olay-kutusu-sonuc' : ''}${yogun ? ' olay-kutusu-yogun' : ''}`}>
      <div className="olay-kutusu-etiketler">
        {ulke?.savasta && <span className="bolge-sahnesi-etiket bolge-sahnesi-tehlike">{m.usSavasta}</span>}
        {ulke?.vebada && <span className="bolge-sahnesi-etiket bolge-sahnesi-tehlike">{m.usSalgin}</span>}
      </div>

      <OlayCercevesi key={src} src={src} emoji={senaryo.gorsel} yukleniyor={yukleniyor}>
        {sonuc && (
          <>
            <div className="sonuc-efekti-kapsayici olay-cercevesi-efekt">
              <SonucEfekti
                kategori={sonuc.kategori}
                basarili={sonuc.basarili}
                sessiz={sesKapali}
                terfiOldu={sonuc.terfiOldu}
              />
            </div>
            <span className="olay-cercevesi-rozet" aria-hidden="true">
              {sonuc.ikon}
            </span>
          </>
        )}
      </OlayCercevesi>

      <KoseTezhibi />

      <div className="olay-kutusu-ic">
        <div className="olay-parsomeni">
          {sonuc ? (
            <div className="olay-metni-govde" ref={govdeRef}>
              <div className="olay-metin-grubu">
                <EtkiCipleri etki={sonuc.etki} paraBirimi={sonuc.paraBirimi} />
                {sonuc.ozet && (
                  <p className="tur-ozeti" title={sonuc.ozet}>
                    {sonuc.ozet}
                  </p>
                )}
              </div>
            </div>
          ) : (
            // Başlık + metin tek grup: kısa metinde birlikte dikeyde ortalanır, uzunsa birlikte kayar.
            <div className="olay-metni-govde" ref={govdeRef}>
              <div className="olay-metin-grubu">
                <h2>{senaryo.olay_basligi}</h2>
                {tepkiModu && <p className="tepki-notu">{m.tepkiNotu}</p>}
                <p className="olay-metni">{senaryo.olay_metni}</p>
              </div>
            </div>
          )}
        </div>

        {sonuc ? (
          <div className="olay-kutusu-eylem">
            <button type="button" className="olay-devam" disabled={yukleniyor} onClick={onDevam}>
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
            {senaryo.secenekler.map((secenek, i) => (
              <button
                key={i}
                type="button"
                className={[
                  'secenek',
                  secenek.kilitli ? 'kilitli' : null,
                  secenek.hafif && !secenek.kilitli ? 'secenek-hafif' : null,
                ]
                  .filter(Boolean)
                  .join(' ')}
                disabled={yukleniyor || secenek.kilitli}
                onClick={() => onSecenek(i)}
              >
                <span className="secenek-metin">
                  {secenek.kilitli ? '🔒 ' : ''}
                  {secenek.metin}
                </span>
                {secenek.kilitli && secenek.kilit_nedeni && <span className="secenek-kilit">{secenek.kilit_nedeni}</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Kutunun üst kenarından taşan altın çerçeve. Boyutu HER durumda aynıdır: resim yüklenene kadar
 * ya da hiç yoksa (Sanayi Devrimi'nin olay resimleri henüz yok) aynı çerçevede büyük emoji plakası
 * gösterilir — böylece resim gelip gidince ya da kategori değişince düzen hiç oynamaz.
 */
function OlayCercevesi({
  src,
  emoji,
  yukleniyor,
  children,
}: {
  src: string;
  emoji: string;
  yukleniyor: boolean;
  children?: ReactNode;
}) {
  const [durum, setDurumState] = useState<OlayResmiDurumu>(OLAY_RESMI_BILINEN.get(src) ?? 'bekliyor');
  const setDurum = (d: OlayResmiDurumu) => {
    OLAY_RESMI_BILINEN.set(src, d);
    setDurumState(d);
  };
  const hazir = durum === 'hazir';
  return (
    <div className="olay-cercevesi">
      <div className="olay-cercevesi-ic">
        {!hazir && (
          <span className={`olay-cercevesi-emoji${yukleniyor ? ' olay-gorseli-yukleniyor' : ''}`} aria-hidden="true">
            {emoji}
          </span>
        )}
        {durum !== 'yok' && (
          <img
            className={`olay-cercevesi-resim${hazir ? ' olay-cercevesi-resim-hazir' : ''}`}
            src={src}
            alt=""
            aria-hidden="true"
            decoding="async"
            draggable={false}
            onLoad={() => setDurum('hazir')}
            onError={() => setDurum('yok')}
          />
        )}
      </div>
      {children}
    </div>
  );
}
