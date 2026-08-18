import type { Ast, EkipUyesi, EvcilHayvan } from '../types';

interface KomutaSeridiProps {
  meslek: string;
  amirAdi: string | null;
  amirRutbe: string | null;
  esAdi: string | null;
  esMeslek: string | null;
  esRutbe: string | null;
  astlar: Ast[];
  ekip: EkipUyesi[];
  orduMevcudu: number;
  orduTechizatSeviyesi: number;
  ticaretSermaye: number;
  nufuz: number;
  evcilHayvan: EvcilHayvan | null;
  hapiste: boolean;
}

const HAYVAN_SIMGESI: Record<string, string> = {
  Kedi: '🐈',
  Köpek: '🐕',
  Kurt: '🐺',
  Şahin: '🦅',
  Papağan: '🦜',
};

export function KomutaSeridi({
  meslek,
  amirAdi,
  amirRutbe,
  esAdi,
  esMeslek,
  esRutbe,
  astlar,
  ekip,
  orduMevcudu,
  orduTechizatSeviyesi,
  ticaretSermaye,
  nufuz,
  evcilHayvan,
  hapiste,
}: KomutaSeridiProps) {
  const meslekRozetGoster =
    (meslek === 'Asker' && orduMevcudu > 0) ||
    (meslek === 'Tüccar' && ticaretSermaye > 0) ||
    (meslek === 'Din Adamı' && nufuz > 0);

  if (
    !amirAdi &&
    !esAdi &&
    astlar.length === 0 &&
    ekip.length === 0 &&
    !meslekRozetGoster &&
    !evcilHayvan &&
    !hapiste
  )
    return null;

  return (
    <div className="komuta-seridi" aria-label="Amirin, eşin, ekibin ve işinin özeti">
      {hapiste && <span className="komuta-rozet komuta-hapis">⛓️ Hapiste</span>}
      {meslek === 'Asker' && orduMevcudu > 0 && (
        <span className="komuta-rozet komuta-meslek">
          ⚔️ {orduMevcudu} asker · 🛡️ %{orduTechizatSeviyesi} teçhizat
        </span>
      )}
      {meslek === 'Tüccar' && ticaretSermaye > 0 && (
        <span className="komuta-rozet komuta-meslek">📈 {ticaretSermaye} sermaye</span>
      )}
      {meslek === 'Din Adamı' && nufuz > 0 && (
        <span className="komuta-rozet komuta-meslek">🕊️ {nufuz} nüfuz</span>
      )}
      {amirAdi && (
        <span className="komuta-rozet komuta-amir">
          🎖️ {amirRutbe} {amirAdi}
        </span>
      )}
      {astlar.map((ast) => (
        <span key={ast.isim} className="komuta-rozet komuta-ast">
          🎗️ {ast.rutbe} {ast.isim}
        </span>
      ))}
      {esAdi && (
        <span className="komuta-rozet komuta-es">
          💍 {esAdi}
          {esRutbe && esMeslek ? ` — ${esRutbe} (${esMeslek})` : ''}
        </span>
      )}
      {ekip.map((uye) => (
        <span
          key={uye.id}
          className="komuta-rozet komuta-ekip"
          title={`${uye.kisilik} · Sadakat %${uye.sadakat}`}
        >
          🧑 {uye.isim} <span className="komuta-ekip-rol">({uye.rol})</span>
        </span>
      ))}
      {evcilHayvan && (
        <span className="komuta-rozet komuta-hayvan">
          {HAYVAN_SIMGESI[evcilHayvan.tur] ?? '🐾'} {evcilHayvan.isim}
        </span>
      )}
    </div>
  );
}
