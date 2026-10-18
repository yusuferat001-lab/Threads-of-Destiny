/**
 * server/src/data/rutbeler.ts (RUTBELER + TERFI_COOLDOWN) ile birebir aynı eşik
 * tablosunun elle senkronize edilen bir kopyası (§24 deseni) — Kariyer sayfasındaki
 * rütbe/tecrübe ilerleme çubuğu için. Motor mantığı (rutbeGuncelle/esikKarsilaniyorMu)
 * burada TEKRARLANMAZ; yalnız "bir sonraki kademeye ne kadar kaldı" salt-okunur
 * bir önizleme hesaplanır — gerçek terfi kararı her zaman sunucuda verilir.
 */

export type Cag = 'Orta Çağ' | 'Sanayi Devrimi';

interface RutbeEsigi {
  kariyer_puani: number;
  un?: number;
  ahlak?: number;
}

interface RutbeTanimi {
  unvanlar: [string, string, string, string, string];
  esikler: [RutbeEsigi, RutbeEsigi, RutbeEsigi, RutbeEsigi];
}

const TERFI_COOLDOWN: Record<number, number> = { 2: 0, 3: 0, 4: 0, 5: 0 }; // v8.6: bekleme yılı yok

const RUTBELER: Record<string, Record<string, RutbeTanimi>> = {
  Asker: {
    'Orta Çağ': {
      unvanlar: ['Er', 'Onbaşı', 'Silahşor', 'Kumandan', 'Serdar'],
      esikler: [
        { kariyer_puani: 10, un: 20 },
        { kariyer_puani: 32, un: 36 },
        { kariyer_puani: 64, un: 48 },
        { kariyer_puani: 260, un: 78 },
      ],
    },
    'Sanayi Devrimi': {
      unvanlar: ['Er', 'Onbaşı', 'Çavuş', 'Yüzbaşı', 'Binbaşı'],
      esikler: [
        { kariyer_puani: 10, un: 20 },
        { kariyer_puani: 32, un: 36 },
        { kariyer_puani: 64, un: 48 },
        { kariyer_puani: 260, un: 78 },
      ],
    },
  },
  Tüccar: {
    'Orta Çağ': {
      unvanlar: ['Çırak Tüccar', 'Seyyar Satıcı', 'Pazarcı', 'Lonca Ustası', 'Lonca Reisi'],
      esikler: [
        { kariyer_puani: 10, un: 10 },
        { kariyer_puani: 32, un: 19 },
        { kariyer_puani: 64, un: 28 },
        { kariyer_puani: 260, un: 54 },
      ],
    },
    'Sanayi Devrimi': {
      unvanlar: ['Kâtip Çırak', 'Tezgâhtar', 'Şirket Ortağı', 'Fabrika Patronu', 'Sanayi Baronu'],
      esikler: [
        { kariyer_puani: 10, un: 10 },
        { kariyer_puani: 32, un: 19 },
        { kariyer_puani: 64, un: 28 },
        { kariyer_puani: 260, un: 54 },
      ],
    },
  },
  'Din Adamı': {
    'Orta Çağ': {
      unvanlar: ['Acemi Rahip', 'Rahip', 'Vaiz', 'Başrahip', 'Piskopos'],
      esikler: [
        { kariyer_puani: 10, ahlak: 44 },
        { kariyer_puani: 32, ahlak: 52 },
        { kariyer_puani: 64, ahlak: 62 },
        { kariyer_puani: 260, ahlak: 80 },
      ],
    },
    'Sanayi Devrimi': {
      unvanlar: ['Papaz Yardımcısı', 'Papaz', 'Vaiz', 'Başpapaz', 'Piskopos'],
      esikler: [
        { kariyer_puani: 10, ahlak: 44 },
        { kariyer_puani: 32, ahlak: 52 },
        { kariyer_puani: 64, ahlak: 62 },
        { kariyer_puani: 260, ahlak: 80 },
      ],
    },
  },
  Zanaatkâr: {
    'Orta Çağ': {
      unvanlar: ['Çırak', 'Kalfa', 'Usta', 'Baş Usta', 'Loncabaşı'],
      esikler: [
        { kariyer_puani: 10, un: 8 },
        { kariyer_puani: 32, un: 16 },
        { kariyer_puani: 64, un: 22 },
        { kariyer_puani: 260, un: 44 },
      ],
    },
    'Sanayi Devrimi': {
      unvanlar: ['Amele', 'Vasıflı İşçi', 'Ustabaşı', 'Atölye Şefi', 'Fabrika Müdürü'],
      esikler: [
        { kariyer_puani: 10, un: 8 },
        { kariyer_puani: 32, un: 16 },
        { kariyer_puani: 64, un: 22 },
        { kariyer_puani: 260, un: 44 },
      ],
    },
  },
};

const DIN_ADAMI_UNVANLARI: Record<string, Record<string, [string, string, string, string, string]>> = {
  'Sünni İslam': {
    'Orta Çağ': ['Medrese Talebesi', 'Müezzin', 'Vaiz', 'İmam', 'Baş İmam'],
    'Sanayi Devrimi': ['Medrese Talebesi', 'Müezzin', 'Vaiz', 'İmam', 'Baş İmam'],
  },
};

function rutbeTanimiGetir(meslek: string, cag: string, dinKultur?: string | null): RutbeTanimi | undefined {
  if (meslek === 'Din Adamı') {
    const temel = RUTBELER['Din Adamı']?.[cag];
    if (!temel) return undefined;
    const dineOzgu = dinKultur ? DIN_ADAMI_UNVANLARI[dinKultur]?.[cag] : undefined;
    return dineOzgu ? { ...temel, unvanlar: dineOzgu } : temel;
  }
  return RUTBELER[meslek]?.[cag];
}

export interface RutbeIlerlemeDurumu {
  /** false ise bu meslek/çağ kombinasyonu için tablo bulunamadı (bilinmeyen meslek). */
  gecerli: boolean;
  seviye: number;
  enUstMu: boolean;
  /** En üst kademedeyken null. */
  sonrakiUnvan: string | null;
  kariyerPuaniMevcut: number;
  /** En üst kademedeyken null. */
  kariyerPuaniGerekli: number | null;
  kariyerPuaniYuzde: number;
  /** Asker/Tüccar/Zanaatkâr için "un", Din Adamı için "ahlak"; en üst kademedeyken null. */
  statAdi: 'un' | 'ahlak' | null;
  statMevcut: number;
  statGerekli: number | null;
  statYuzde: number;
  /** İkisi (kariyer puanı + stat) de karşılanmış ama terfi hâlâ cooldown'da bekliyorsa true. */
  cooldownBekliyor: boolean;
  cooldownKalanYil: number;
}

/**
 * "Bir sonraki kademeye ne kadar kaldı" salt-okunur önizlemesi. Gerçek terfi
 * kuralı (rutbeGuncelle, RATCHET + cooldown + çağrı başına en fazla +1 kademe)
 * yalnız sunucuda çalışır; bu yalnız bir ilerleme çubuğu için tahmini yüzdeyi hesaplar.
 */
export function rutbeIlerlemeHesapla(
  meslek: string,
  cag: string,
  dinKultur: string | null | undefined,
  rutbeSeviye: number,
  kariyerPuani: number,
  un: number,
  ahlak: number,
  yil: number,
  sonTerfiYili: number
): RutbeIlerlemeDurumu {
  const tanim = rutbeTanimiGetir(meslek, cag, dinKultur);
  const seviye = Math.max(1, Math.min(5, rutbeSeviye || 1));
  if (!tanim) {
    return {
      gecerli: false,
      seviye,
      enUstMu: seviye >= 5,
      sonrakiUnvan: null,
      kariyerPuaniMevcut: Math.floor(kariyerPuani),
      kariyerPuaniGerekli: null,
      kariyerPuaniYuzde: 0,
      statAdi: null,
      statMevcut: 0,
      statGerekli: null,
      statYuzde: 0,
      cooldownBekliyor: false,
      cooldownKalanYil: 0,
    };
  }
  if (seviye >= 5) {
    return {
      gecerli: true,
      seviye,
      enUstMu: true,
      sonrakiUnvan: null,
      kariyerPuaniMevcut: Math.floor(kariyerPuani),
      kariyerPuaniGerekli: null,
      kariyerPuaniYuzde: 100,
      statAdi: null,
      statMevcut: 0,
      statGerekli: null,
      statYuzde: 100,
      cooldownBekliyor: false,
      cooldownKalanYil: 0,
    };
  }
  const esik = tanim.esikler[seviye - 1]; // seviye 1 → esikler[0] (S2 eşiği)
  const statAdi: 'un' | 'ahlak' | null = esik.ahlak !== undefined ? 'ahlak' : esik.un !== undefined ? 'un' : null;
  const statGerekli = esik.ahlak ?? esik.un ?? null;
  const statMevcut = statAdi === 'ahlak' ? ahlak : un;
  const kariyerPuaniYuzde = Math.max(0, Math.min(100, Math.round((kariyerPuani / esik.kariyer_puani) * 100)));
  const statYuzde = statGerekli ? Math.max(0, Math.min(100, Math.round((statMevcut / statGerekli) * 100))) : 100;
  const esikKarsilandi = kariyerPuani >= esik.kariyer_puani && (statGerekli === null || statMevcut >= statGerekli);
  const cooldown = TERFI_COOLDOWN[seviye + 1] ?? 0;
  const kalanYil = Math.max(0, cooldown - (yil - sonTerfiYili));
  return {
    gecerli: true,
    seviye,
    enUstMu: false,
    sonrakiUnvan: tanim.unvanlar[seviye],
    // kariyer_puani tecrübe hızı çarpanıyla kesirli birikir (28.050000000000004) — aşağı yuvarla
    // ki çubuk "32/32" gösterip hâlâ eşiğin altında kalmasın.
    kariyerPuaniMevcut: Math.floor(kariyerPuani),
    kariyerPuaniGerekli: esik.kariyer_puani,
    kariyerPuaniYuzde,
    statAdi,
    statMevcut,
    statGerekli,
    statYuzde,
    cooldownBekliyor: esikKarsilandi && kalanYil > 0,
    cooldownKalanYil: kalanYil,
  };
}
