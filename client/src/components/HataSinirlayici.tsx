import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ayarlariGetir } from '../ayarlar';

interface Props {
  children: ReactNode;
}

interface State {
  hataVarMi: boolean;
}

const METIN = {
  tr: {
    baslik: 'Bir şeyler ters gitti',
    aciklama:
      'Oyun beklenmedik bir hatayla karşılaştı. Kaydın tarayıcında saklı — "Devam Et" ile burada kalmayı dene, işe yaramazsa ana sayfaya dön (oyunun kaybolmaz).',
    devam: 'Devam Et',
    anaSayfa: 'Ana Sayfaya Dön',
  },
  en: {
    baslik: 'Something went wrong',
    aciklama:
      'The game hit an unexpected error. Your save is stored in your browser — try "Continue" to stay here, or go back home if that doesn\'t help (your run isn\'t lost).',
    devam: 'Continue',
    anaSayfa: 'Back to Home',
  },
} as const;

/**
 * Uygulama genelindeki tek ErrorBoundary. Bir render hatası App ağacının HERHANGİ bir
 * yerinde patlarsa (React'ta ErrorBoundary olmadan bu, tüm arayüzü boş/kırık bir sayfaya
 * indirip elle sayfa yenilemeyi zorunlu kılar) burada yakalanır — oyuncu kaydı zaten
 * `oturum.ts` ile localStorage'da durduğu için "Devam Et"/"Ana Sayfaya Dön" oyunu
 * kaybettirmez, yalnızca App'i (ya da sayfayı) yeniden mount eder.
 */
export class HataSinirlayici extends Component<Props, State> {
  state: State = { hataVarMi: false };

  static getDerivedStateFromError(): State {
    return { hataVarMi: true };
  }

  componentDidCatch(hata: unknown, bilgi: ErrorInfo): void {
    console.error('[HataSinirlayici] yakalanan hata:', hata, bilgi.componentStack);
  }

  render() {
    if (!this.state.hataVarMi) return this.props.children;
    let dil: 'tr' | 'en' = 'tr';
    try {
      dil = ayarlariGetir().dil;
    } catch {
      /* varsayılan tr kalır */
    }
    const t = METIN[dil];
    return (
      <div className="hata-sinirlayici-katman">
        <div className="hata-sinirlayici-kutu">
          <h2>⚠️ {t.baslik}</h2>
          <p>{t.aciklama}</p>
          <div className="hata-sinirlayici-butonlar">
            <button onClick={() => this.setState({ hataVarMi: false })}>{t.devam}</button>
            <button
              className="ikincil"
              onClick={() => {
                window.location.href = '/';
              }}
            >
              {t.anaSayfa}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
