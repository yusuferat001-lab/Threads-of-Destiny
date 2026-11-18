import { useDil } from '../DilContext';
import { formatPara } from '../format';
import { BilgiNotu } from './BilgiNotu';
import './butce-iki-sutun.css';

/**
 * Ganimet dökümü (v67 Madde 8), üç satır: toplam (brüt) · askerlere pay (oran ile, kırmızı) · size kalan (yeşil, kalın).
 * Size kalan ganimet o yılın Kazanç'ına eklenir; hazine payı yıl sonunda Kazanç'tan kesilir.
 */
export function GanimetDokumu({ brut, erPayi, oran, net, paraBirimi, esirPara = 0, baslik }: { brut: number; erPayi: number; oran: number; net: number; paraBirimi: string; esirPara?: number; baslik?: string }) {
  const { dil } = useDil();
  const tr = dil !== 'en';
  return (
    <div className="ganimet-dokum">
      {baslik && <strong>{baslik}</strong>}
      <div className="butce2-satir">
        <span>{tr ? 'Ganimet (toplam)' : 'Loot (total)'}</span>
        <strong className="s-gelir">+{formatPara(brut)} {paraBirimi}</strong>
      </div>
      <div className="butce2-satir">
        <span>{tr ? `Askerlere %${oran}` : `Men's share ${oran}%`}</span>
        <strong className="s-gider">−{formatPara(erPayi)}</strong>
      </div>
      <div className="butce2-satir ganimet-dokum-net">
        <span>
          {tr ? 'Size kalan ganimet' : 'Your share of the loot'}
          <BilgiNotu
            etiket={tr ? 'Bilgi' : 'Info'}
            metin={tr ? 'Bu yılın Kazanç\'ına eklenir; hazine payı yıl sonunda Kazanç\'tan kesilir.' : "Added to this year's earnings; the treasury share is taken from earnings at year end."}
          />
        </span>
        <strong className="s-gelir">+{formatPara(net)}</strong>
      </div>
      {esirPara > 0 && (
        <div className="butce2-satir">
          <span>{tr ? 'Esir geliri' : 'Prisoner income'}</span>
          <strong className="s-gelir">+{formatPara(esirPara)}</strong>
        </div>
      )}
    </div>
  );
}
