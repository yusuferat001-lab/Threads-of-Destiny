import type {
  CharacterState,
  SenaryoResponse,
  SecimSonucu,
  ScoreKaydi,
  SiralamaTuru,
  YerlesimTanimi,
  KonutTanimi,
  YasamSecenegiTanimi,
  FinansOzeti,
  YatirimSonucu,
  YatirimConfig,
  KonutSonucu,
  TepkiSonucu,
  MulkTuru,
  MulkKartBilgisi,
  MulkSatinAlSonucu,
  ZarSonucu,
  SosyallesmeYeri,
  SosyallesmeSonucu,
  MagazaEsyaKarti,
  MagazaSatinAlSonucu,
  EnvanterKullanSonucu,
  EvlilikAdayi,
  EvlilikTeklifSonucu,
} from './types';

async function istek<T>(url: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...init,
    });
  } catch {
    throw new Error('Sunucuya ulaşılamadı. İnternet bağlantını ve sunucunun çalıştığını kontrol et.');
  }
  let veri: any;
  try {
    veri = await res.json();
  } catch {
    throw new Error(`Sunucudan geçerli bir yanıt alınamadı (durum: ${res.status}). Lütfen tekrar dene.`);
  }
  if (!res.ok) {
    throw new Error(veri.hata ?? `İstek başarısız: ${res.status}`);
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
  dil?: string
) {
  return istek<{ state: CharacterState }>('/api/game/new', {
    method: 'POST',
    body: JSON.stringify({ cag, bolge, yerlesim, isim, dil }),
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

export function skorTablosuGetir(tur: SiralamaTuru = 'genel') {
  return istek<{ tablo: ScoreKaydi[] }>(`/api/scores?tur=${tur}`);
}

export function finansGetir(stateId: string) {
  return istek<{ finans: FinansOzeti }>(`/api/game/${stateId}/finans`);
}

export function yatirimYap(stateId: string) {
  return istek<YatirimSonucu>(`/api/game/${stateId}/yatirim`, {
    method: 'POST',
  });
}

export function yatirimConfigGetir(stateId: string) {
  return istek<{ config: YatirimConfig }>(`/api/game/${stateId}/yatirim-config`);
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

export function evlilikAdaylariGetir(stateId: string) {
  return istek<{ adaylar: EvlilikAdayi[] }>(`/api/game/${stateId}/evlilik-adaylari`);
}

export function evlilikTeklifEt(stateId: string, aday: EvlilikAdayi) {
  return istek<EvlilikTeklifSonucu>(`/api/game/${stateId}/evlilik-teklifi`, {
    method: 'POST',
    body: JSON.stringify({ aday }),
  });
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
