interface KarakterAvatariProps {
  meslek?: string;
  kisilik: [string, string];
  rutbeSeviye?: number;
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

export function KarakterAvatari({ meslek, kisilik, rutbeSeviye = 1 }: KarakterAvatariProps) {
  const govdeRengi = (meslek && MESLEK_RENK[meslek]) || '#5a4632';
  const aksesuar = (meslek && MESLEK_AKSESUAR[meslek]) || '👤';
  const ifade = ifadeCikar(kisilik);

  return (
    <div className="karakter-avatari" role="img" aria-label={`Karakter avatarı${meslek ? `, ${meslek}` : ''}`}>
      <svg viewBox="0 0 120 130" className="karakter-avatari-svg" aria-hidden="true">
        {/* gövde */}
        <rect x="30" y="70" width="60" height="55" rx="18" fill={govdeRengi} />
        {/* rütbe rozetleri */}
        {Array.from({ length: rutbeSeviye }).map((_, i) => (
          <circle key={i} cx={44 + i * 16} cy={80} r={4} fill="#e0c789" />
        ))}
        {/* boyun */}
        <rect x="52" y="55" width="16" height="18" fill="#d9b38c" />
        {/* kafa */}
        <circle cx="60" cy="38" r="26" fill="#d9b38c" />
        {/* saç */}
        <path d="M 34 34 A 26 26 0 0 1 86 34 L 86 24 A 26 20 0 0 0 34 24 Z" fill="#3a2a1c" />
        {/* gözler */}
        <circle cx="50" cy="38" r="2.5" fill="#241a12" />
        <circle cx="70" cy="38" r="2.5" fill="#241a12" />
        {/* ağız: ifadeye göre */}
        {ifade === 'mutlu' && (
          <path d="M 48 48 Q 60 58 72 48" stroke="#241a12" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
        {ifade === 'uzgun' && (
          <path d="M 48 52 Q 60 44 72 52" stroke="#241a12" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
        {ifade === 'notr' && <line x1="49" y1="49" x2="71" y2="49" stroke="#241a12" strokeWidth="2.5" strokeLinecap="round" />}
      </svg>
      <span className="karakter-avatari-aksesuar" aria-hidden>
        {aksesuar}
      </span>
    </div>
  );
}
