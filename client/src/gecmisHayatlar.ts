/**
 * Bu cihazda oynanıp ölümle biten karakterlerin özetini tarayıcıda (localStorage) biriktirir.
 * Sunucuya kaydedilmez; sadece giriş ekranındaki "Geçmiş Hayatların" listesini besler.
 * `basarimlar.ts` ile aynı sessiz try/catch deseni kullanılır.
 */
import type { CharacterState, HayatOlayi, GecmisNoktasi } from './types';

const ANAHTAR = 'kader_carki_gecmis_hayatlar';
const MAKS_KAYIT = 20;

export interface GecmisHayat {
  id: string;
  tarih: number;
  isim: string | null;
  meslek: string;
  cag: string;
  bolge: string;
  yerlesim: string;
  rutbe: string;
  yas: number;
  yil: number;
  para: number;
  paraBirimi: string;
  un: number;
  olumNedeni: string;
  efsaneviOlum: string | null;
  unvanlar: string[];
  amacTamamlandi: boolean;
  skor: number;
  hayatHikayesi: HayatOlayi[];
  gecmis: GecmisNoktasi[];
}

function oku(): GecmisHayat[] {
  try {
    const ham = localStorage.getItem(ANAHTAR);
    const veri = ham ? JSON.parse(ham) : [];
    return Array.isArray(veri) ? veri : [];
  } catch {
    return [];
  }
}

function yaz(liste: GecmisHayat[]) {
  try {
    localStorage.setItem(ANAHTAR, JSON.stringify(liste));
  } catch {
    // localStorage kullanılamıyorsa (gizli sekme vb.) sessizce yok say.
  }
}

/**
 * hesaplaSkor (sunucu, yama #1) ile hizalı: yas × max(un,1) × servetFaktoru (LOG-ölçekli),
 * amaç tamamlandıysa ×5. İstemcide gayrimenkul değeri elde olmadığı için servet ≈ nakit
 * (basarimSistemi.ts'teki kopyayla aynı yaklaşım). Eski `× max(para,1)` çarpanı tek zengin
 * ömrü milyonlara fırlatıyordu.
 */
function amacCarpani(state: CharacterState): number {
  const t = (state.hayat_amaclari ?? [])
    .filter((a) => a.tamamlandi)
    .reduce((s, a) => s + (a.bonus ?? 0), 0);
  if (t > 0) return Math.max(1, t);
  return state.hayat_amaci?.tamamlandi ? 5 : 1; // eski kayıt fallback
}

function skorHesapla(state: CharacterState): number {
  const servet = state.para;
  const servetFaktoru = servet > 0 ? 1 + Math.log10(1 + servet) : Math.max(0.15, 1 + servet / 400);
  const taban = Math.round(state.yas * Math.max(state.un, 1) * servetFaktoru);
  return Math.round(taban * amacCarpani(state));
}

/** Bir karakter öldüğünde çağrılır; aynı id zaten kayıtlıysa hiçbir şey yapmaz. */
export function gecmisHayatKaydet(state: CharacterState): void {
  if (state.aktif) return;
  const mevcut = oku();
  if (mevcut.some((h) => h.id === state.id)) return;

  const kayit: GecmisHayat = {
    id: state.id,
    tarih: Date.now(),
    isim: state.isim,
    meslek: state.meslek,
    cag: state.cag,
    bolge: state.bolge,
    yerlesim: state.yerlesim,
    rutbe: state.rutbe,
    yas: state.yas,
    yil: state.yil,
    para: Math.round(state.para),
    paraBirimi: state.para_birimi,
    un: state.un,
    olumNedeni: state.olum_nedeni ?? 'Bilinmiyor',
    efsaneviOlum: state.efsanevi_olum,
    unvanlar: state.unvanlar,
    amacTamamlandi:
      (state.hayat_amaclari ?? []).some((a) => a.tamamlandi) || (state.hayat_amaci?.tamamlandi ?? false),
    skor: skorHesapla(state),
    hayatHikayesi: state.hayat_hikayesi,
    gecmis: state.gecmis,
  };

  yaz([kayit, ...mevcut].slice(0, MAKS_KAYIT));
}

export function gecmisHayatlariGetir(): GecmisHayat[] {
  return oku();
}

export function gecmisHayatlariTemizle(): void {
  yaz([]);
}

/** Tek bir geçmiş hayat kaydını listeden çıkarır (id ile). */
export function gecmisHayatSil(id: string): void {
  yaz(oku().filter((h) => h.id !== id));
}
