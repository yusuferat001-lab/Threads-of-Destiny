const SES_TERCIH_ANAHTARI = 'kader_carki_ses_kapali';

export function sesKapaliMi(): boolean {
  try {
    return localStorage.getItem(SES_TERCIH_ANAHTARI) === '1';
  } catch {
    return false;
  }
}

export function sesTercihiKaydet(kapali: boolean): void {
  try {
    localStorage.setItem(SES_TERCIH_ANAHTARI, kapali ? '1' : '0');
  } catch {
    // localStorage yoksa sessizce yoksay
  }
}

let audioCtx: AudioContext | null = null;

function baglamGetir(): AudioContext | null {
  try {
    const AudioCtor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return null;
    if (!audioCtx) audioCtx = new AudioCtor();
    if (audioCtx.state === 'suspended') void audioCtx.resume();
    return audioCtx;
  } catch {
    return null;
  }
}

function ton(
  ctx: AudioContext,
  frekans: number,
  sure: number,
  gecikme = 0,
  tip: OscillatorType = 'sine',
  kazanc = 0.12
): void {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  osc.type = tip;
  osc.frequency.value = frekans;
  const baslangic = ctx.currentTime + gecikme;
  gainNode.gain.setValueAtTime(kazanc, baslangic);
  gainNode.gain.exponentialRampToValueAtTime(0.001, baslangic + sure);
  osc.connect(gainNode).connect(ctx.destination);
  osc.start(baslangic);
  osc.stop(baslangic + sure);
}

export type SesTipi = 'basari_ticaret' | 'basari_savas' | 'basari_din' | 'basari_genel' | 'basarisiz' | 'terfi';

/** Kısa, sentezlenmiş bir geri bildirim sesi çalar; gerçek ses dosyası kullanmaz. */
export function sesCal(tip: SesTipi, sessiz: boolean): void {
  if (sessiz) return;
  const ctx = baglamGetir();
  if (!ctx) return;
  try {
    switch (tip) {
      case 'basari_ticaret': // "cha-ching" hissi: iki yükselen ton
        ton(ctx, 1200, 0.12, 0, 'triangle', 0.12);
        ton(ctx, 1600, 0.16, 0.08, 'triangle', 0.12);
        break;
      case 'basari_savas': // metalik çarpışma hissi
        ton(ctx, 320, 0.08, 0, 'sawtooth', 0.1);
        ton(ctx, 180, 0.18, 0.05, 'square', 0.08);
        break;
      case 'basari_din': // yumuşak, uzayan bir çınlama
        ton(ctx, 660, 0.45, 0, 'sine', 0.09);
        ton(ctx, 880, 0.55, 0.12, 'sine', 0.07);
        break;
      case 'basari_genel': // basit "ding"
        ton(ctx, 880, 0.22, 0, 'sine', 0.1);
        break;
      case 'basarisiz': // kısa, alçalan ton
        ton(ctx, 260, 0.28, 0, 'sine', 0.09);
        ton(ctx, 180, 0.3, 0.05, 'sine', 0.06);
        break;
      case 'terfi': // yükselen üç notalı fanfar hissi
        ton(ctx, 523, 0.16, 0, 'triangle', 0.13);
        ton(ctx, 659, 0.16, 0.14, 'triangle', 0.13);
        ton(ctx, 784, 0.35, 0.28, 'triangle', 0.14);
        break;
    }
  } catch {
    // Web Audio bu ortamda kullanılamıyor olabilir; sessizce yoksay.
  }
}
