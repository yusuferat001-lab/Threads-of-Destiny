import type { Ast, EkipUyesi } from '../types';

interface KomutaSeridiProps {
  meslek: string;
  amirAdi: string | null;
  amirRutbe: string | null;
  astlar: Ast[];
  ekip: EkipUyesi[];
  orduMevcudu: number;
  orduTechizatSeviyesi: number;
  ticaretSermaye: number;
  nufuz: number;
  hapiste: boolean;
  paraBirimi: string;
  yukleniyor: boolean;
  onEkipCikar: (ekipId: string) => void;
}

const MESLEK_SIMGESI: Record<string, string> = {
  Asker: '⚔️',
  Tüccar: '📈',
  'Din Adamı': '🕊️',
};

export function KomutaSeridi({
  meslek,
  amirAdi,
  amirRutbe,
  astlar,
  ekip,
  orduMevcudu,
  orduTechizatSeviyesi,
  ticaretSermaye,
  nufuz,
  hapiste,
  paraBirimi,
  yukleniyor,
  onEkipCikar,
}: KomutaSeridiProps) {
  const meslekOzeti =
    meslek === 'Asker' && orduMevcudu > 0
      ? `${orduMevcudu} asker · %${orduTechizatSeviyesi} teçhizat`
      : meslek === 'Tüccar' && ticaretSermaye > 0
        ? `${ticaretSermaye} sermaye`
        : meslek === 'Din Adamı' && nufuz > 0
          ? `${nufuz} nüfuz`
          : null;

  if (!amirAdi && astlar.length === 0 && ekip.length === 0 && !meslekOzeti && !hapiste) return null;

  return (
    <div className="komuta-seridi" aria-label="Görevin ve emrindekilerin özeti">
      <h3>Görev</h3>

      {hapiste && (
        <div className="komuta-satir komuta-satir-hapis">
          <span className="komuta-simge" aria-hidden="true">
            ⛓️
          </span>
          <div className="komuta-metin">
            <span className="komuta-ad">Hapiste</span>
          </div>
        </div>
      )}

      {meslekOzeti && (
        <div className="komuta-satir">
          <span className="komuta-simge" aria-hidden="true">
            {MESLEK_SIMGESI[meslek] ?? '🎯'}
          </span>
          <div className="komuta-metin">
            <span className="komuta-ad">{meslekOzeti}</span>
            <span className="komuta-rol">{meslek}</span>
          </div>
        </div>
      )}

      {amirAdi && (
        <div className="komuta-satir">
          <span className="komuta-simge" aria-hidden="true">
            🎖️
          </span>
          <div className="komuta-metin">
            <span className="komuta-ad">{amirAdi}</span>
            <span className="komuta-rol">Amirin{amirRutbe ? ` · ${amirRutbe}` : ''}</span>
          </div>
        </div>
      )}

      {astlar.map((ast) => (
        <div key={ast.isim} className="komuta-satir">
          <span className="komuta-simge" aria-hidden="true">
            🎗️
          </span>
          <div className="komuta-metin">
            <span className="komuta-ad">{ast.isim}</span>
            <span className="komuta-rol">Astın · {ast.rutbe}</span>
          </div>
        </div>
      ))}

      {ekip.map((uye) => (
        <div key={uye.id} className="komuta-satir komuta-satir-ekip">
          <span className="komuta-simge" aria-hidden="true">
            🧑
          </span>
          <div className="komuta-metin">
            <span className="komuta-ad">{uye.isim}</span>
            <span className="komuta-rol">
              {uye.rol} · {uye.maas} {paraBirimi}/yıl
            </span>
            <span className="komuta-ekip-detay">
              🎭 {uye.kisilik} · 🤝 %{uye.sadakat} · kalite %{uye.tahminiMin}-{uye.tahminiMax}
            </span>
          </div>
          <button
            className="ikincil komuta-ekip-kov"
            disabled={yukleniyor}
            onClick={() => onEkipCikar(uye.id)}
          >
            Kov
          </button>
        </div>
      ))}
    </div>
  );
}
