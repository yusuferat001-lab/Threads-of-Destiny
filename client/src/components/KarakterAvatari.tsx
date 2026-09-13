import { useDil } from '../DilContext';
import type { GiyilenKozmetikler } from '../kozmetikDolabi';
import { kozmetikTanimGetir } from '../kozmetikKatalog';

interface KarakterAvatariProps {
  meslek?: string;
  kisilik: [string, string];
  rutbeSeviye?: number;
  /** Kalıcı kozmetik dolaptan (§ Gold) giyilen eşyalar — tamamen kozmetik, stat etkisi yok. */
  giyilenKozmetikler?: GiyilenKozmetikler;
}

const MESLEK_RENK: Record<string, string> = {
  Asker: '#5a6672',
  Tüccar: '#8a6a2a',
  'Din Adamı': '#3a3a52',
};

const MESLEK_AKSESUAR: Record<string, string> = {
  Asker: '⚔️',
  Tüccar: '💰',
  'Din Adamı': '🙏',
};

const MUTLU_OZELLIKLER = ['Umutlu', 'Sosyal', 'Cesur', 'Yumuşak Başlı', 'Vicdanlı'];
const UZGUN_OZELLIKLER = ['Depresif', 'Umutsuz', 'Hüzünlü', 'Sinirli'];

function ifadeCikar(kisilik: [string, string]): 'mutlu' | 'uzgun' | 'notr' {
  const mutlu = kisilik.some((k) => MUTLU_OZELLIKLER.includes(k));
  const uzgun = kisilik.some((k) => UZGUN_OZELLIKLER.includes(k));
  if (mutlu && !uzgun) return 'mutlu';
  if (uzgun && !mutlu) return 'uzgun';
  return 'notr';
}

export function KarakterAvatari({ meslek, kisilik, rutbeSeviye = 1, giyilenKozmetikler }: KarakterAvatariProps) {
  const { m, kt, dil } = useDil();
  const govdeRengi = (meslek && MESLEK_RENK[meslek]) || '#5a4632';
  // Meslek seçilmeden önce köşedeki "👤" (mavi insan silueti gibi görünüyordu) hiç gösterilmez.
  const aksesuar = meslek ? MESLEK_AKSESUAR[meslek] : null;
  const ifade = ifadeCikar(kisilik);

  const basEsyasi = giyilenKozmetikler?.bas ? kozmetikTanimGetir(giyilenKozmetikler.bas) : undefined;
  const sirtEsyasi = giyilenKozmetikler?.sirt ? kozmetikTanimGetir(giyilenKozmetikler.sirt) : undefined;
  const cerceveEsyasi = giyilenKozmetikler?.cerceve ? kozmetikTanimGetir(giyilenKozmetikler.cerceve) : undefined;

  return (
    <div className="karakter-avatari" role="img" aria-label={`${m.kaAria}${meslek ? `, ${kt(meslek)}` : ''}`}>
      {/* viewBox kare (120x120) — çevresindeki .karakter-avatari çemberiyle tam örtüşsün diye;
          eskiden kare olmayan bir viewBox (120x130) `overflow:visible` bir kutuya oturuyordu ve
          köşeleri altın çerçevenin dışına taşıp arkasındaki paneli çirkin bir şekilde açığa çıkarıyordu. */}
      <svg viewBox="0 0 120 120" className="karakter-avatari-svg" aria-hidden="true">
        {/* madalyon zemini — karakterin arkasında kasıtlı, temayla uyumlu koyu bir zemin bırakır */}
        <circle cx="60" cy="60" r="60" fill="#3a2b1c" />
        {/* kozmetik çerçeve — kalıcı dolaptan giyilen halka, tamamen görsel */}
        {cerceveEsyasi?.renk && (
          <circle cx="60" cy="60" r="57" fill="none" stroke={cerceveEsyasi.renk} strokeWidth="4" />
        )}
        {/* gövde */}
        <rect x="30" y="65" width="60" height="50" rx="18" fill={govdeRengi} />
        {/* rütbe rozetleri */}
        {Array.from({ length: rutbeSeviye }).map((_, i) => (
          <circle key={i} cx={44 + i * 16} cy={75} r={4} fill="#e0c789" />
        ))}
        {/* boyun */}
        <rect x="52" y="50" width="16" height="18" fill="#d9b38c" />
        {/* kafa */}
        <circle cx="60" cy="33" r="26" fill="#d9b38c" />
        {/* saç */}
        <path d="M 34 29 A 26 26 0 0 1 86 29 L 86 19 A 26 20 0 0 0 34 19 Z" fill="#3a2a1c" />
        {/* gözler */}
        <circle cx="50" cy="33" r="2.5" fill="#241a12" />
        <circle cx="70" cy="33" r="2.5" fill="#241a12" />
        {/* ağız: ifadeye göre */}
        {ifade === 'mutlu' && (
          <path d="M 48 43 Q 60 53 72 43" stroke="#241a12" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
        {ifade === 'uzgun' && (
          <path d="M 48 47 Q 60 39 72 47" stroke="#241a12" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
        {ifade === 'notr' && <line x1="49" y1="44" x2="71" y2="44" stroke="#241a12" strokeWidth="2.5" strokeLinecap="round" />}
      </svg>
      {aksesuar && (
        <span className="karakter-avatari-aksesuar" aria-hidden>
          {aksesuar}
        </span>
      )}
      {basEsyasi?.emoji && (
        <span className="karakter-avatari-kozmetik-bas" aria-hidden title={basEsyasi.ad[dil]}>
          {basEsyasi.emoji}
        </span>
      )}
      {sirtEsyasi?.emoji && (
        <span className="karakter-avatari-kozmetik-sirt" aria-hidden>
          {sirtEsyasi.emoji}
        </span>
      )}
    </div>
  );
}
