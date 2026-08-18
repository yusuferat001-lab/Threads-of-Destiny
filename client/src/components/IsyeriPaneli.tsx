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

const BASLIK: Record<string, string> = {
  Asker: 'Birliğin',
  Tüccar: 'İşletmen',
  'Din Adamı': 'Cemaatin',
};

const KISI_IKON: Record<string, string> = {
  Asker: '🧍',
  Tüccar: '📦',
  'Din Adamı': '🧎',
};

const ACIKLAMALAR: Record<string, [string, string, string]> = {
  Asker: [
    'Yalnız savaşan bir erdersin.',
    'Küçük bir müfreze seni takip ediyor.',
    'Koca bir birlik senin emrinde.',
  ],
  Tüccar: [
    'Küçük bir pazar tezgahın var.',
    'Bir dükkanın ve müşteri ağın var.',
    'Koca bir ticarethanenin sahibisin.',
  ],
  'Din Adamı': [
    'Küçük bir cemaate vaaz veriyorsun.',
    'Cemaatin büyüdü, sözün dinleniyor.',
    'Koca bir cemaatin ruhani lideri oldun.',
  ],
};

export function IsyeriPaneli({
  meslek,
  rutbeSeviye,
  dinKultur,
  ticaretSermaye,
  nufuz,
  orduTechizatSeviyesi,
}: IsyeriPaneliProps) {
  if (!meslek) return null;

  const yatirimBonusu = yatirimKademeBonusuHesapla(meslek, ticaretSermaye, nufuz, orduTechizatSeviyesi);
  const seviyeIndex = Math.min(Math.max(rutbeSeviye + yatirimBonusu, 1), 3) - 1;
  const bina =
    meslek === 'Din Adamı' ? dinBinasiGetir(dinKultur) : BINA_IKONLARI[meslek]?.[seviyeIndex] ?? '🏠';
  const kisiIkon = KISI_IKON[meslek] ?? '🧍';
  const sayi = KISI_SAYISI[seviyeIndex];
  const baslik = BASLIK[meslek] ?? 'İşyerin';
  const aciklama = ACIKLAMALAR[meslek]?.[seviyeIndex] ?? '';

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
