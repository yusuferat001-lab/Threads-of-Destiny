import type {
  CharacterState,
  SenaryoResponse,
  SecimSonucu,
  ScoreKaydi,
  SiralamaTuru,
  SiralamaDonemi,
  YerlesimTanimi,
  KonutTanimi,
  YasamSecenegiTanimi,
  FinansOzeti,
  GostergeStat,
  GostergeDetayi,
  DunyaGecmisi,
  YatirimSonucu,
  KotuIsKarti,
  KotuIsSonucu,
  KonutSonucu,
  TepkiSonucu,
  MulkTuru,
  MulkKartBilgisi,
  MulkSatinAlSonucu,
  ZarSonucu,
  UcKagitciSonucu,
  BilekGuresiSonucu,
  SosyallesmeYeri,
  SosyallesmeSonucu,
  SosyalAksiyonConfig,
  SosyalAksiyonSonucu,
  SosyalOlaySonucu,
  MagazaEsyaKarti,
  MagazaSatinAlSonucu,
  EnvanterKullanSonucu,
  MantikTeklifSonucu,
  TanismaDurumu,
  TanismaYaniti,
  SevgiliSonucu,
  CocukIseAlSonucu,
  TeklifHediyesi,
  DugunButcesi,
  AileDurumu,
  YonetimDurumu,
  RakipKarti,
  AmaclarDurumu,
  SalginKorunmaKarti,
  KrediConfig,
} from './types';
import { ayarlariGetir } from './ayarlar';

/** İstemcinin kendi ürettiği (sunucudan gelmeyen) hata mesajları — oyuncunun diline göre. */
function istemciHatasi(tr: string, en: string): Error {
  return new Error(ayarlariGetir().dil === 'en' ? en : tr);
}

/** Sunucudan gelen (HTTP durumu bilinen) hata; çağıran 404 gibi durumları ayırt edebilsin. */
export class ApiHatasi extends Error {
  durum: number;
  constructor(mesaj: string, durum: number) {
    super(mesaj);
    this.name = 'ApiHatasi';
    this.durum = durum;
  }
}

const ISTEK_ZAMAN_ASIMI_MS = 60_000;

async function istek<T>(url: string, init?: RequestInit): Promise<T> {
  let res: Response;
  // Zaman aşımı: askıda kalan istek arayüzü sonsuza dek kilitlemesin. Render uykudan uyanırken
  // ilk istek ~50 sn sürebildiği için süre cömert tutuldu.
  const kontrol = new AbortController();
  const zamanAsimi = setTimeout(() => kontrol.abort(), ISTEK_ZAMAN_ASIMI_MS);
  try {
    res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      signal: kontrol.signal,
      ...init,
    });
  } catch {
    throw istemciHatasi(
      'Sunucuya ulaşılamadı. İnternet bağlantını kontrol et; sunucu uykudan uyanıyor olabilir, birkaç saniye sonra tekrar dene.',
      "Couldn't reach the server. Check your connection; the server may be waking up — try again in a few seconds."
    );
  } finally {
    clearTimeout(zamanAsimi);
  }
  let veri: any;
  try {
    veri = await res.json();
  } catch {
    if (res.status === 429) {
      throw istemciHatasi('Çok hızlı işlem yapıyorsun; birkaç saniye bekleyip tekrar dene.', "You're going too fast; wait a few seconds and try again.");
    }
    if (res.status === 502 || res.status === 503 || res.status === 504) {
      throw istemciHatasi('Sunucu şu an uyanıyor; birkaç saniye sonra tekrar dene.', 'The server is waking up; try again in a few seconds.');
    }
    throw istemciHatasi(
      `Sunucudan geçerli bir yanıt alınamadı (durum: ${res.status}). Lütfen tekrar dene.`,
      `The server returned an invalid response (status: ${res.status}). Please try again.`
    );
  }
  if (!res.ok) {
    throw new ApiHatasi(
      veri.hata ?? (ayarlariGetir().dil === 'en' ? `Request failed: ${res.status}` : `İstek başarısız: ${res.status}`),
      res.status
    );
  }
  return veri;
}

export function mesleklerGetir() {
  return istek<{ meslekler: string[] }>('/api/game/meslekler');
}

export function bolgelerGetir() {
  return istek<{ bolgeler: Record<string, string[]> }>('/api/game/bolgeler');
}

export function yerlesimlerGetir() {
  return istek<{ yerlesimler: YerlesimTanimi[] }>('/api/game/yerlesimler');
}

export function konutlarGetir() {
  return istek<{ konutlar: KonutTanimi[]; tasinmaMaliyeti: number }>('/api/game/konutlar');
}

export function yasamSecenekleriGetir() {
  return istek<{ yasamSecenekleri: YasamSecenegiTanimi[] }>('/api/game/yasam-secenekleri');
}

export function yeniOyunBaslat(
  cag: string,
  bolge: string,
  yerlesim: string,
  isim?: string,
  dil?: string,
  istemciId?: string
) {
  return istek<{ state: CharacterState }>('/api/game/new', {
    method: 'POST',
    body: JSON.stringify({ cag, bolge, yerlesim, isim, dil, istemciId }),
  });
}

export function isimOnerisiGetir(cag: string, bolge: string) {
  return istek<{ isim: string }>(
    `/api/game/isim-onerisi?cag=${encodeURIComponent(cag)}&bolge=${encodeURIComponent(bolge)}`
  );
}

export function meslekAta(stateId: string, meslek: string) {
  return istek<{ state: CharacterState }>(`/api/game/${stateId}/meslek`, {
    method: 'POST',
    body: JSON.stringify({ meslek }),
  });
}

export function stateGetir(stateId: string) {
  return istek<{ state: CharacterState }>(`/api/game/${stateId}/state`);
}

/** Oyun sürerken dili değiştir — sonraki senaryodan itibaren olay/anlatı metinleri de bu dile geçer. */
export function oyunDiliAyarla(stateId: string, dil: string) {
  return istek<{ state: CharacterState }>(`/api/game/${stateId}/dil`, {
    method: 'POST',
    body: JSON.stringify({ dil }),
  });
}

export function senaryoGetir(stateId: string) {
  return istek<{ senaryo: SenaryoResponse }>(`/api/game/${stateId}/scenario`, {
    method: 'POST',
  });
}

export function secimYap(stateId: string, secenekIndex: number) {
  return istek<SecimSonucu | TepkiSonucu>(`/api/game/${stateId}/choice`, {
    method: 'POST',
    body: JSON.stringify({ secenekIndex }),
  });
}

export function skorKaydet(stateId: string, isim: string) {
  return istek<{ kayit: ScoreKaydi }>('/api/scores', {
    method: 'POST',
    body: JSON.stringify({ stateId, isim }),
  });
}

export function skorTablosuGetir(tur: SiralamaTuru = 'genel', donem: SiralamaDonemi = 'tumZaman') {
  return istek<{ tablo: ScoreKaydi[] }>(`/api/scores?tur=${tur}&donem=${donem}`);
}

export function finansGetir(stateId: string) {
  return istek<{ finans: FinansOzeti }>(`/api/game/${stateId}/finans`);
}

export function gostergeGetir(stateId: string, stat: GostergeStat) {
  return istek<{ gosterge: GostergeDetayi }>(`/api/game/${stateId}/gosterge/${stat}`);
}

export function dunyaGecmisiGetir(stateId: string) {
  return istek<{ dunyaGecmisi: DunyaGecmisi }>(`/api/game/${stateId}/dunya-gecmisi`);
}

export function kotuIsConfigGetir(stateId: string) {
  return istek<{ config: KotuIsKarti[] }>(`/api/game/${stateId}/kotu-is-config`);
}

export function kotuIsYap(
  stateId: string,
  tur: string,
  opts?: { hedefRakipAd?: string; vekil?: boolean },
) {
  return istek<KotuIsSonucu>(`/api/game/${stateId}/kotu-is`, {
    method: 'POST',
    body: JSON.stringify({ tur, ...opts }),
  });
}

export function rakiplerGetir(stateId: string) {
  return istek<{ rakipler: RakipKarti[] }>(`/api/game/${stateId}/rakipler`);
}

export function amaclarGetir(stateId: string) {
  return istek<AmaclarDurumu>(`/api/game/${stateId}/amaclar`);
}

export function hediyeEt(
  stateId: string,
  esyaId: string,
  hedef: 'es' | 'cocuk' | 'ekip' | 'dost',
  opts?: { cocukIndex?: number; ekipId?: string },
) {
  return istek<{ state: CharacterState; mesaj: string }>(
    `/api/game/${stateId}/envanter/${esyaId}/hediye`,
    { method: 'POST', body: JSON.stringify({ hedef, ...opts }) },
  );
}

export function salginKorunmaGetir(stateId: string) {
  return istek<{ kartlar: SalginKorunmaKarti[]; aktifKademe: number; vebaVar: boolean }>(
    `/api/game/${stateId}/salgin-korunma`,
  );
}

export function salginKorunmaYatirimiYap(stateId: string, kademe: 1 | 2) {
  return istek<{ state: CharacterState; mesaj: string }>(`/api/game/${stateId}/salgin-korunma`, {
    method: 'POST',
    body: JSON.stringify({ kademe }),
  });
}

export function krediGetir(stateId: string) {
  return istek<KrediConfig>(`/api/game/${stateId}/kredi`);
}

export function krediAl(stateId: string, tutar: number) {
  return istek<{ state: CharacterState; mesaj: string }>(`/api/game/${stateId}/kredi/al`, {
    method: 'POST',
    body: JSON.stringify({ tutar }),
  });
}

export function krediPazarlik(stateId: string) {
  return istek<{ state: CharacterState; mesaj: string }>(`/api/game/${stateId}/kredi/pazarlik`, {
    method: 'POST',
  });
}

export function mulkConfigGetir(stateId: string) {
  return istek<{ config: MulkKartBilgisi[] }>(`/api/game/${stateId}/mulk-config`);
}

export function mulkSatinAl(stateId: string, tur: MulkTuru) {
  return istek<MulkSatinAlSonucu>(`/api/game/${stateId}/mulk`, {
    method: 'POST',
    body: JSON.stringify({ tur }),
  });
}

export function dedikoduGetir(stateId: string) {
  return istek<{ dedikodular: string[] }>(`/api/game/${stateId}/dedikodu`);
}

export function zarKademeleriGetir(stateId: string) {
  return istek<{ kademeler: number[] }>(`/api/game/${stateId}/zar-kademeleri`);
}

export function zarAt(stateId: string, tutar: number) {
  return istek<ZarSonucu>(`/api/game/${stateId}/zar`, {
    method: 'POST',
    body: JSON.stringify({ tutar }),
  });
}

export function ucKagitciOyna(stateId: string, tutar: number, secim: number) {
  return istek<UcKagitciSonucu>(`/api/game/${stateId}/uc-kagitci`, {
    method: 'POST',
    body: JSON.stringify({ tutar, secim }),
  });
}

export function bilekGuresiSonuc(stateId: string, basarili: boolean) {
  return istek<BilekGuresiSonucu>(`/api/game/${stateId}/bilek-guresi`, {
    method: 'POST',
    body: JSON.stringify({ basarili }),
  });
}

export function konutDegistir(stateId: string, konutId: string) {
  return istek<KonutSonucu>(`/api/game/${stateId}/konut`, {
    method: 'POST',
    body: JSON.stringify({ konutId }),
  });
}

export function yasamSecimiDegistir(stateId: string, secimId: string) {
  return istek<KonutSonucu>(`/api/game/${stateId}/yasam`, {
    method: 'POST',
    body: JSON.stringify({ secimId }),
  });
}

export function ekipCikar(stateId: string, ekipId: string) {
  return istek<YatirimSonucu>(`/api/game/${stateId}/ekip/${ekipId}/cikar`, {
    method: 'POST',
  });
}

export function sosyallesmeYerleriGetir(stateId: string) {
  return istek<{ yerler: SosyallesmeYeri[] }>(`/api/game/${stateId}/sosyallesme-yerleri`);
}

export function sosyallesmeYerineGit(stateId: string, yerId: string) {
  return istek<SosyallesmeSonucu>(`/api/game/${stateId}/sosyallesme`, {
    method: 'POST',
    body: JSON.stringify({ yerId }),
  });
}

export function sosyallesmeAksiyonConfigGetir(stateId: string) {
  return istek<SosyalAksiyonConfig>(`/api/game/${stateId}/sosyallesme-aksiyonlar`);
}

export function sosyallesmeAksiyonYap(stateId: string, aksiyonId: string, varyant?: string) {
  return istek<SosyalAksiyonSonucu>(`/api/game/${stateId}/sosyallesme-aksiyon`, {
    method: 'POST',
    body: JSON.stringify({ aksiyonId, varyant }),
  });
}

export function sosyallesmeOlayCoz(stateId: string, secenekIndex: number) {
  return istek<SosyalOlaySonucu>(`/api/game/${stateId}/sosyallesme-olay`, {
    method: 'POST',
    body: JSON.stringify({ secenekIndex }),
  });
}

export function mantikTeklifEt(stateId: string, adayIndex: number, hediye: TeklifHediyesi) {
  return istek<MantikTeklifSonucu>(`/api/game/${stateId}/mantik/teklif`, {
    method: 'POST',
    body: JSON.stringify({ adayIndex, hediye }),
  });
}

export function dugunYap(stateId: string, butce: DugunButcesi) {
  return istek<{ state: CharacterState; mesaj: string }>(`/api/game/${stateId}/dugun`, {
    method: 'POST',
    body: JSON.stringify({ butce }),
  });
}

export function esEylemYap(stateId: string, eylem: 'zaman_gecir' | 'hediye_ver', hediye?: 'ucuz' | 'pahali') {
  return istek<{ state: CharacterState; mesaj: string }>(`/api/game/${stateId}/es/eylem`, {
    method: 'POST',
    body: JSON.stringify({ eylem, hediye }),
  });
}

export function cocukIseAl(stateId: string, cocukIndex: number) {
  return istek<CocukIseAlSonucu>(`/api/game/${stateId}/cocuk/ise-al`, {
    method: 'POST',
    body: JSON.stringify({ cocukIndex }),
  });
}

export function cocukRedTepkisi(stateId: string, cocukIndex: number, tepki: 'ofke' | 'sakin') {
  return istek<CocukIseAlSonucu>(`/api/game/${stateId}/cocuk/red-tepkisi`, {
    method: 'POST',
    body: JSON.stringify({ cocukIndex, tepki }),
  });
}

export function tanismaGetir(stateId: string) {
  return istek<TanismaDurumu>(`/api/game/${stateId}/tanisma`);
}

export function tanismaYaklas(stateId: string) {
  return istek<TanismaYaniti>(`/api/game/${stateId}/tanisma/yaklas`, { method: 'POST' });
}

export function tanismaVazgec(stateId: string) {
  return istek<TanismaYaniti>(`/api/game/${stateId}/tanisma/vazgec`, { method: 'POST' });
}

export function tanismaSec(stateId: string, secenek: number) {
  return istek<TanismaYaniti>(`/api/game/${stateId}/tanisma/secim`, {
    method: 'POST',
    body: JSON.stringify({ secenek }),
  });
}

export function sevgiliTeklifEt(stateId: string) {
  return istek<SevgiliSonucu>(`/api/game/${stateId}/sevgili/teklif`, { method: 'POST' });
}

export function sevgiliGonulAl(stateId: string) {
  return istek<SevgiliSonucu>(`/api/game/${stateId}/sevgili/gonul-al`, { method: 'POST' });
}

export function sevgiliAyril(stateId: string) {
  return istek<SevgiliSonucu>(`/api/game/${stateId}/sevgili/ayril`, { method: 'POST' });
}

export function aileDurumGetir(stateId: string) {
  return istek<AileDurumu>(`/api/game/${stateId}/aile`);
}

export function aileEtkilesimYap(stateId: string, etkilesimId: string, cocukIndex?: number) {
  return istek<{ state: CharacterState; tam: boolean; mesaj: string }>(
    `/api/game/${stateId}/aile/etkilesim`,
    {
      method: 'POST',
      body: JSON.stringify({ etkilesimId, cocukIndex }),
    },
  );
}

export function aileTalebiKararlastir(stateId: string, karar: 'kabul' | 'ret') {
  return istek<{ state: CharacterState; kabul: boolean; mesaj: string }>(
    `/api/game/${stateId}/aile/talep`,
    {
      method: 'POST',
      body: JSON.stringify({ karar }),
    },
  );
}

// ===== Kariyer sayfası: Yönetimle Bağlar (§35) =====
export function yonetimDurumGetir(stateId: string) {
  return istek<YonetimDurumu>(`/api/game/${stateId}/yonetim`);
}

export function yonetimEtkilesimYap(stateId: string, etkilesimId: string, kademe?: number) {
  return istek<{ state: CharacterState; tam: boolean; mesaj: string }>(
    `/api/game/${stateId}/yonetim/etkilesim`,
    { method: 'POST', body: JSON.stringify({ etkilesimId, kademe }) },
  );
}

export function yonetimIstekYap(stateId: string, istekId: string) {
  return istek<{ state: CharacterState; basarili: boolean; mesaj: string }>(
    `/api/game/${stateId}/yonetim/istek`,
    { method: 'POST', body: JSON.stringify({ istekId }) },
  );
}

export function yonetimTalebiKararlastir(stateId: string, karar: 'kabul' | 'ret' | 'yalan') {
  return istek<{ state: CharacterState; kabul: boolean; mesaj: string }>(
    `/api/game/${stateId}/yonetim/talep`,
    { method: 'POST', body: JSON.stringify({ karar }) },
  );
}

export function magazaKatalogGetir(stateId: string) {
  return istek<{ katalog: MagazaEsyaKarti[] }>(`/api/game/${stateId}/magaza`);
}

export function magazadanSatinAl(stateId: string, katalogId: string) {
  return istek<MagazaSatinAlSonucu>(`/api/game/${stateId}/magaza/satin-al`, {
    method: 'POST',
    body: JSON.stringify({ katalogId }),
  });
}

export function envanterEsyasiKullan(stateId: string, esyaId: string) {
  return istek<EnvanterKullanSonucu>(`/api/game/${stateId}/envanter/${esyaId}/kullan`, {
    method: 'POST',
  });
}

export function geriBildirimGonder(govde: {
  kategori: string;
  mesaj: string;
  iletisim?: string;
  baglam?: Record<string, unknown>;
}) {
  return istek<{ ok: true }>('/api/geri-bildirim', {
    method: 'POST',
    body: JSON.stringify(govde),
  });
}

/**
 * İstatistik olayı bildir (§32) — şimdilik yalnız "ziyaret". Ateşle-unut:
 * çağıran hatayı yutar, oyun akışını etkilemez.
 */
export function istatistikOlayBildir(govde: { tur: 'ziyaret'; istemci_id: string }) {
  return fetch('/api/istatistik/olay', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(govde),
  });
}
