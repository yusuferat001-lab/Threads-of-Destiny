import { useDil } from '../DilContext';
import type { Metinler } from '../i18n';

interface IsyeriPaneliProps {
  meslek?: string;
  rutbeSeviye: number;
  dinKultur?: string;
  ticaretSermaye?: number;
  nufuz?: number;
  orduTechizatSeviyesi?: number;
}

/** Yatırımla derinleşen meslek metriğinin (sermaye/nüfuz/teçhizat) işyeri kademesine kattığı bonus; rütbeden bağımsız olarak işletmeni büyütür. */
function yatirimKademeBonusuHesapla(meslek: string | undefined, ticaretSermaye = 0, nufuz = 0, orduTechizatSeviyesi = 0): number {
  const deger = meslek === 'Tüccar' ? ticaretSermaye : meslek === 'Din Adamı' ? nufuz : orduTechizatSeviyesi;
  if (deger >= 60) return 2;
  if (deger >= 25) return 1;
  return 0;
}

const BINA_IKONLARI: Record<string, [string, string, string]> = {
  Asker: ['🏕️', '🏯', '🏰'],
  Tüccar: ['🏪', '🏬', '🏛️'],
};

function dinBinasiGetir(dinKultur?: string): string {
  return dinKultur === 'Sünni İslam' ? '🕌' : '⛪';
}

const KISI_SAYISI: [number, number, number] = [1, 4, 9];

const KISI_IKON: Record<string, string> = {
  Asker: '🧍',
  Tüccar: '📦',
  'Din Adamı': '🧎',
};

function baslikGetir(m: Metinler, meslek: string): string {
  if (meslek === 'Asker') return m.ipBirligin;
  if (meslek === 'Tüccar') return m.ipIsletmen;
  if (meslek === 'Din Adamı') return m.ipCemaatin;
  return m.ipIsyerin;
}

function aciklamaGetir(m: Metinler, meslek: string, i: number): string {
  const tablo: Record<string, [string, string, string]> = {
    Asker: [m.ipAsker1, m.ipAsker2, m.ipAsker3],
    Tüccar: [m.ipTuccar1, m.ipTuccar2, m.ipTuccar3],
    'Din Adamı': [m.ipDin1, m.ipDin2, m.ipDin3],
  };
  return tablo[meslek]?.[i] ?? '';
}

export function IsyeriPaneli({
  meslek,
  rutbeSeviye,
  dinKultur,
  ticaretSermaye,
  nufuz,
  orduTechizatSeviyesi,
}: IsyeriPaneliProps) {
  const { m } = useDil();
  if (!meslek) return null;

  const yatirimBonusu = yatirimKademeBonusuHesapla(meslek, ticaretSermaye, nufuz, orduTechizatSeviyesi);
  const seviyeIndex = Math.min(Math.max(rutbeSeviye + yatirimBonusu, 1), 3) - 1;
  const bina =
    meslek === 'Din Adamı' ? dinBinasiGetir(dinKultur) : BINA_IKONLARI[meslek]?.[seviyeIndex] ?? '🏠';
  const kisiIkon = KISI_IKON[meslek] ?? '🧍';
  const sayi = KISI_SAYISI[seviyeIndex];
  const baslik = baslikGetir(m, meslek);
  const aciklama = aciklamaGetir(m, meslek, seviyeIndex);

  return (
    <div className="isyeri-paneli">
      <h3>{baslik}</h3>
      <div className="isyeri-gorsel" aria-hidden="true">
        <span className="isyeri-bina">{bina}</span>
        <div className="isyeri-kisiler">
          {Array.from({ length: sayi }).map((_, i) => (
            <span key={i}>{kisiIkon}</span>
          ))}
        </div>
      </div>
      <p className="isyeri-aciklama">{aciklama}</p>
    </div>
  );
}
