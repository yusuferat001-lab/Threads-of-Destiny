import type { CharacterState } from '../types';
import { useDil } from '../DilContext';
import { hesaplaSkorKirilimi } from '../skor';

/**
 * Skorun eksen eksen dökümü (servet/şöhret/ahlak/mutluluk/rütbe + tik'ler + amaç çarpanı).
 * Ölüm ekranında ve mobildeki canlı skor penceresinde aynı bileşen kullanılır —
 * formül skor.ts'teki sunucu aynasından gelir.
 */
export function SkorKirilimiPaneli({ karakter, baslikGoster = true }: { karakter: CharacterState; baslikGoster?: boolean }) {
  const { m, dil } = useDil();
  const kirilim = hesaplaSkorKirilimi(karakter);
  const locale = dil === 'en' ? 'en-US' : 'tr-TR';
  const say = (n: number) => n.toLocaleString(locale);
  return (
    <div className="skor-kirilimi">
      {baslikGoster && <h3 className="skor-kirilimi-baslik">📊 {m.skorKirilimBaslik}</h3>}
      <ul className="skor-kirilimi-liste">
        <li>
          <span>{m.skorKirilimServet}</span>
          <span>{say(kirilim.servetPuani)}</span>
        </li>
        <li>
          <span>{m.skorKirilimSohret}</span>
          <span>{say(kirilim.sohretPuani)}</span>
        </li>
        <li>
          <span>{m.skorKirilimAhlak}</span>
          <span>{say(kirilim.ahlakPuani)}</span>
        </li>
        <li>
          <span>{m.skorKirilimMutluluk}</span>
          <span>{say(kirilim.mutlulukPuani)}</span>
        </li>
        <li>
          <span>{m.skorKirilimRutbe}</span>
          <span>{say(kirilim.rutbePuani)}</span>
        </li>
        {kirilim.isletmePuani > 0 && (
          <li>
            <span>{m.skorKirilimIsletme}</span>
            <span>{say(kirilim.isletmePuani)}</span>
          </li>
        )}
        {kirilim.sarayda && (
          <li className="skor-kirilimi-tik">
            <span>{m.skorKirilimTikSaray}</span>
            <span>+{say(3000)}</span>
          </li>
        )}
        {kirilim.gizemliEsyaSahibi && (
          <li className="skor-kirilimi-tik">
            <span>{m.skorKirilimTikGizemli}</span>
            <span>+{say(3000)}</span>
          </li>
        )}
        {karakter.komik_olum_basarili_risk && (
          <li className="skor-kirilimi-tik">
            <span>{m.skorKirilimTikKomikRisk}</span>
            <span>+{say(3000)}</span>
          </li>
        )}
        {!karakter.komik_olum_basarili_risk && karakter.komik_olum_ile_oldu && (
          <li className="skor-kirilimi-tik">
            <span>{m.skorKirilimTikKomikOlum}</span>
            <span>+{say(2000)}</span>
          </li>
        )}
        {kirilim.yolculukTamamlandi && (
          <li className="skor-kirilimi-tik">
            <span>{m.skorKirilimTikYolculukBonus}</span>
            <span>+{say(2000)}</span>
          </li>
        )}
        {karakter.veba_hayatta_kaldi && (
          <li className="skor-kirilimi-tik">
            <span>{m.skorKirilimTikVeba}</span>
            <span>+{say(2000)}</span>
          </li>
        )}
        {karakter.hapis_basarili_kacis && (
          <li className="skor-kirilimi-tik">
            <span>{m.skorKirilimTikHapisKacis}</span>
            <span>+{say(2000)}</span>
          </li>
        )}
      </ul>
      <div className="skor-kirilimi-toplam">
        <span>{m.skorKirilimToplam}</span>
        <span>{say(kirilim.temelToplam)}</span>
      </div>
      <div className="skor-kirilimi-carpan">
        <span>× {m.skorKirilimAmac}</span>
        <span>×{say(kirilim.amacCarpani)}</span>
      </div>
      <div className="skor-kirilimi-sonuc">
        <span>{m.skorKirilimSonuc}</span>
        <span>{say(kirilim.skor)}</span>
      </div>
    </div>
  );
}
