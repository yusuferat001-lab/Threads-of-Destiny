import type { SonucEtkisi } from '../types';
import { formatPara } from '../format';

interface EtkiCipleriProps {
  /** Bu seçimin uygulanan etkisi (jitter + meslek/suç çarpanları sonrası). */
  etki: SonucEtkisi;
  paraBirimi: string;
}

interface Cip {
  simge: string;
  metin: string;
  pozitif: boolean;
}

/**
 * Sonuç ekranında, YALNIZCA seçilen olay seçeneğinin doğrudan etkisini küçük
 * "çip" rozetleri olarak gösterir (maaş/gider/yaşlanma/kriz gibi tur-sonu pasif
 * etkiler burada YER ALMAZ — onlar zaman anlatımında ve üst şeritteki delta
 * efektinde görünür).
 */
export function EtkiCipleri({ etki, paraBirimi }: EtkiCipleriProps) {
  const cipler: Cip[] = [];

  const statCip = (simge: string, ad: string, deger: number | undefined, birim?: string) => {
    if (!deger || Math.abs(deger) < 0.01) return;
    const pozitif = deger > 0;
    cipler.push({
      simge,
      metin: `${ad} ${pozitif ? '+' : '−'}${formatPara(Math.abs(deger))}${birim ? ` ${birim}` : ''}`,
      pozitif,
    });
  };

  statCip('💰', 'Para', etki.para, paraBirimi);
  statCip('❤️', 'Sağlık', etki.saglik);
  statCip('🙂', 'Mutluluk', etki.mutluluk);
  statCip('⚖️', 'Ahlak', etki.ahlak);
  statCip('🏅', 'Şöhret', etki.un);

  if (etki.es_ata) cipler.push({ simge: '💍', metin: 'Evlendin', pozitif: true });
  if (etki.es_kaybet) cipler.push({ simge: '💔', metin: 'Eşini kaybettin', pozitif: false });
  if (etki.cocuk_ekle) cipler.push({ simge: '👶', metin: `+${etki.cocuk_ekle} çocuk`, pozitif: true });
  if (etki.cocuk_kaybet) cipler.push({ simge: '🕯️', metin: 'Bir çocuğunu kaybettin', pozitif: false });
  if (etki.yeni_meslek) cipler.push({ simge: '🧭', metin: `Yeni meslek: ${etki.yeni_meslek}`, pozitif: true });

  if (cipler.length === 0) {
    return <p className="etki-yok-notu">Bu seçim ölçülebilir bir değişim getirmedi.</p>;
  }

  return (
    <div className="etki-cipleri">
      {cipler.map((c, i) => (
        <span
          key={i}
          className={`etki-cip ${c.pozitif ? 'etki-pozitif' : 'etki-negatif'}`}
          style={{ animationDelay: `${i * 0.08}s` }}
        >
          {c.simge} {c.metin}
        </span>
      ))}
    </div>
  );
}
