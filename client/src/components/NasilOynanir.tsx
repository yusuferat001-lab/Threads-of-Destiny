import { useEffect, useRef } from 'react';
import type { Dil } from '../ayarlar';
import { metinler } from '../i18n';

interface Props {
  dil: Dil;
  onKapat: () => void;
}

interface Bolum {
  ikon: string;
  baslik: { tr: string; en: string };
  metin: { tr: string; en: string };
  /** Kısa madde listesi — ana paragrafı boğmadan detay verir (opsiyonel). */
  maddeler?: { tr: string[]; en: string[] };
}

/* Oyuncuya dönük KISA tanıtım — kasıtlı olarak yüzey seviyesinde.
   Formül / iç sabit / eşik sayıları BURAYA yazılmaz; oyuncu keşfetsin. */
const BOLUMLER: Bolum[] = [
  {
    ikon: '🎯',
    baslik: { tr: 'Amaç', en: 'Goal' },
    metin: {
      tr: 'Bir çağ ve ülke seçip adını koyarsın; ailen, kişiliğin ve dinin rastgele gelir. 15 yaşında bir meslek seçer, sonra her turda karşına çıkan olaylarda karar vererek bir ömür yaşarsın. Ölüm kalıcıdır.',
      en: 'You pick an era and a country and choose your name; your family, personality and faith come at random. At 15 you choose a profession, then live out a life by deciding on the events you meet each turn. Death is permanent.',
    },
    maddeler: {
      tr: [
        '15 yaşında meslek seçince, biri zor olmak üzere 3 kişisel hayat amacın belirlenir; gizli değildir, sağ panelden ilerlemeni her an takip edebilirsin. Tamamladıkça skorun katlanarak artar.',
        'Olay bankası 1500\'ü aşkın olaydan oluşur ve düzenli olarak yenileri eklenir.',
      ],
      en: [
        'When you pick a profession at 15, you get three personal life goals (one of them hard) — they are not hidden, you can track your progress in the side panel at any time. Completing them multiplies your score.',
        'The event bank has over 1,500 events, and new ones are added regularly.',
      ],
    },
  },
  {
    ikon: '🎲',
    baslik: { tr: 'Her Tur', en: 'Each Turn' },
    metin: {
      tr: 'Bir olay ve 2-4 seçenek görürsün. Her seçenekte kabaca bir başarı şansı ve olası sonuç ipucu yazar. Seçince sonuç uygulanır ve birkaç yıl geçer.',
      en: 'You see an event and 2-4 options. Each option shows a rough success chance and a hint of the outcome. Once you pick, the result applies and a few years pass.',
    },
    maddeler: {
      tr: [
        'Bazı seçenekler para, şöhret ya da belli bir ahlak ister; şartı tutmuyorsan kilitli görünür.',
        'Borçtayken cebinden para çıkaracak seçeneklere giremezsin.',
      ],
      en: [
        'Some options need money, fame or a certain morality; if you fall short they show as locked.',
        'While in debt you cannot take options that would cost you money.',
      ],
    },
  },
  {
    ikon: '❤️',
    baslik: { tr: 'Durumun', en: 'Your Stats' },
    metin: {
      tr: 'Sağlık, Mutluluk, Para, Şöhret ve Ahlak üst şeritte durur. Sağlık biterse ölürsün. Mutluluk ile Sağlık birbirini etkiler; para eksiye düşebilir ama borç canını yakar.',
      en: 'Health, Happiness, Money, Fame and Morality sit in the top bar. If Health runs out you die. Happiness and Health affect each other; money can go negative but debt hurts you.',
    },
    maddeler: {
      tr: ['Şöhret ve Ahlak, bazı olayların ve seçeneklerin önünü açar ya da kapatır.'],
      en: ['Fame and Morality open or close certain events and options.'],
    },
  },
  {
    ikon: '🎖️',
    baslik: { tr: 'Meslek & İlerleme', en: 'Profession & Progress' },
    metin: {
      tr: 'Asker, Tüccar, Din Adamı ya da Zanaatkâr olursun — dördü de kendi kariyer yoluna ve olaylarına sahip. Kendi alanında başarılı oldukça ve kıdem kazandıkça rütben yükselir. Rütbe bir daha düşmez; ileride şehir yönetimi gibi ek bir yol da açılır.',
      en: 'You become a Soldier, Merchant, Clergyman or Artisan — all four with their own career path and events. Your rank rises as you succeed in your field and gain seniority. Rank never drops; later an extra track like city governance opens.',
    },
    maddeler: {
      tr: ['Zanaatkâr çırak\'lıktan loncabaşına uzanan yeni bir zanaat kariyeri sunar.'],
      en: ['Artisan offers a brand-new craft career, from apprentice to guild master.'],
    },
  },
  {
    ikon: '⛓️',
    baslik: { tr: 'Suç & Aranma', en: 'Crime & Wanted' },
    metin: {
      tr: 'Ahlaktan ödün verip para kazandıran seçimler seni daha hızlı zengin eder ama aranma seviyeni yükseltir. Aranma kendiliğinden geçmez; yükselirse hapse ya da kaçak hayatına sürükler. Rüşvet ve kefaret şıklarıyla düşürebilirsin.',
      en: 'Choices that earn money by bending your morals make you rich faster but raise your wanted level. It does not fade on its own; if it climbs it drags you into prison or a life on the run. Bribe and atonement options bring it back down.',
    },
  },
  {
    ikon: '🌍',
    baslik: { tr: 'Dünya & Ekonomi', en: 'World & Economy' },
    metin: {
      tr: 'Her yıl maaş alır, ev ve yemek gideri ödersin. Savaş, veba, kıtlık gibi dünya olayları gelirini ve sağlığını etkiler. Mülkler yavaş ama uzun vadeli bir gelir sağlar.',
      en: 'Each year you earn a salary and pay for housing and food. World events like war, plague and famine hit your income and health. Property brings slow but long-term income.',
    },
    maddeler: {
      tr: ['Sahnedeki Kariyer, Yatırım, Gelir & Gider ve Sosyalleş ekranları ile sol paneldeki Mağaza tur harcamaz.'],
      en: ['The Career, Investments, Income & Expenses and Socialise screens on the scene, and the Shop in the side panel, cost no turn.'],
    },
  },
  {
    ikon: '👪',
    baslik: { tr: 'İlişkiler & Aile', en: 'Relationships & Family' },
    metin: {
      tr: 'Evlenmek için 22 yaşından sonra "İlişkiler" ekranından bir adaya teklif edip düğün bütçesini seçersin; eşinle vakit geçirip hediye vererek bağını sıcak tutmazsan seni terk edebilir. Eş, çocuklar, ekip üyelerin, evcil hayvanın ve katıldığın hizip zamanla kendi olaylarını getirir.',
      en: 'After age 22 you can propose to a candidate on the "Relationships" screen and pick a wedding budget; if you do not keep the bond warm with time and gifts, your spouse may leave. A spouse, children, crew members, a pet and the faction you join each bring their own events over time.',
    },
  },
  {
    ikon: '🏆',
    baslik: { tr: 'Ölüm & Skor', en: 'Death & Score' },
    metin: {
      tr: 'Öldüğünde servetin, şöhretin, ahlakın, mutluluğun ve rütbenin toplamından bir skor çıkar; hayat amaçlarını tamamladıkça katlanır. Ölüm ekranında skorunun eksen eksen nasıl hesaplandığını görebilirsin; skorun liderlik tablosuna otomatik kaydedilir. Kazandığın ünvanlar ve başarımlar cihazında kalır.',
      en: 'On death a score is built from the sum of your wealth, fame, morality, happiness and rank; it multiplies with every life goal you complete. The death screen shows you exactly how each axis added up, and your score is recorded on the leaderboard automatically. Titles and achievements you earn stay on your device.',
    },
  },
  {
    ikon: '💡',
    baslik: { tr: 'İpucu', en: 'Tip' },
    metin: {
      tr: 'Sağlık ve mutluluğu çok düşürme; aranmayı biriktirme; en ucuz ev/yemek uzun vadede sessizce yıpratır; zar masası ve karaborsa hızlı para ama bedeli ağır.',
      en: 'Do not let health and happiness fall too far; do not let your wanted level pile up; the cheapest home/food quietly wears you down over time; the dice table and black market are fast money at a steep price.',
    },
  },
];

export function NasilOynanir({ dil, onKapat }: Props) {
  const M = metinler(dil);
  const kapatRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    kapatRef.current?.focus();
    function esc(e: KeyboardEvent) {
      if (e.key === 'Escape') onKapat();
    }
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onKapat]);

  return (
    <div className="ayarlar-katman" onClick={onKapat}>
      <div
        className="ayarlar-modal nasil-oynanir-modal"
        role="dialog"
        aria-modal="true"
        aria-label={M.nasilOynanirBaslik}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ayarlar-modal-ust">
          <h2>📖 {M.nasilOynanirBaslik}</h2>
          <button ref={kapatRef} className="ikincil ayarlar-kapat" onClick={onKapat}>
            ✕ {M.kapat}
          </button>
        </div>

        <div className="ayarlar-govde nasil-govde">
          {BOLUMLER.map((b) => (
            <div key={b.baslik.en} className="nasil-bolum">
              <h3>
                <span aria-hidden="true">{b.ikon}</span> {b.baslik[dil]}
              </h3>
              <p>{b.metin[dil]}</p>
              {b.maddeler && (
                <ul>
                  {b.maddeler[dil].map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
