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

/* İçerik doğrudan bileşende (i18n.ts'i 60+ anahtarla şişirmemek için — basarimSistemi.ts deseni).
   Bölümler kabaca "önce ne yaşarsın → sonra hangi sistemler var → ipuçları" sırasında. */
const BOLUMLER: Bolum[] = [
  {
    ikon: '🎯',
    baslik: { tr: 'Amaç', en: 'Goal' },
    metin: {
      tr: 'Bir çağ, ülke ve yerleşim seçersin; ailen, kişiliğin ve dinin rastgele belirlenir. 15 yaşında bir meslek seçer, her turda karşına çıkan olaylarda karar vererek bir ömür yaşarsın. Ölüm kalıcıdır — yeniden başlamak yeni bir karakter demektir.',
      en: 'You pick an era, a country and a settlement; your family, personality and faith are set at random. At 15 you choose a profession, then live a whole life by deciding on the events you face each turn. Death is permanent — starting over means a new character.',
    },
    maddeler: {
      tr: [
        'Doğuşta sana gizli bir hayat amacı verilir (en zengin / efsanevi şöhret / kutsal / kalabalık aile). Ölümde tamamlandıysa skorun ×5 olur.',
        'Kişilik özelliklerin bazı seçenekleri açar ya da gizler; yatkınlıkların ilgili olaylarda başarı şansını ±30 değiştirir.',
      ],
      en: [
        'At birth you get a hidden life goal (richest / legendary fame / holy / large family). If completed at death your score is multiplied by 5.',
        'Your personality traits open or hide some options; your aptitudes shift success chance by up to ±30 in related events.',
      ],
    },
  },
  {
    ikon: '🎲',
    baslik: { tr: 'Her Tur', en: 'Each Turn' },
    metin: {
      tr: 'Bir olay ve 2-4 seçenek görürsün. Seçtiğinde bir zar atılır (görünen başarı şansı yaklaşıktır), sonuç uygulanır ve 1-2 yıl ilerler.',
      en: 'You see an event and 2-4 options. When you choose, a die is rolled (the shown success chance is approximate), the outcome applies and 1-2 years pass.',
    },
    maddeler: {
      tr: [
        'Gösterilen başarı yüzdesi bir aralıktır; yaş ilerledikçe aralık daralır, "gözlemci" ve istihbarat bunu netleştirir.',
        '"Bir an duraksadın" seçenekleri zar atmaz — geri çekil / ısrar et arasında ikinci bir kesin seçim yaptırır, zaman o seçimde ilerler.',
        'Borçluyken (paran eksi) cebinden para çıkaran seçenekler kilitlenir.',
        'Bazı seçenekler para, şöhret ya da bir ahlak eşiği ister; karşılamıyorsan kilitli görünür.',
      ],
      en: [
        'The shown success percentage is a range; it narrows as you age, and an observer or intel makes it exact.',
        '"You paused for a moment" options roll no die — they ask a second, certain choice between backing off and pressing on; time passes on that choice.',
        'While in debt (negative money) options that cost you money are locked.',
        'Some options need money, fame or a morality threshold; if you fall short they show as locked.',
      ],
    },
  },
  {
    ikon: '📊',
    baslik: { tr: 'İstatistikler', en: 'Stats' },
    metin: {
      tr: 'Sağlık 0’a inince ölürsün. Mutluluk ve Sağlık birbirini besler (biri çok düşükse öbürünü de aşağı çeker). Para sınırsızdır, borca girebilirsin.',
      en: 'If Health hits 0 you die. Happiness and Health feed each other (if one is very low it drags the other down). Money is unlimited — you can go into debt.',
    },
    maddeler: {
      tr: [
        'Sağlık: 30’un altında ölüm riski büyür; 55+ yaşta doğal olarak azalır.',
        'Şöhret: seni tanınır kılar, maaşını ve elit olayları etkiler; 8 kademeli bir ünvana çevrilir.',
        'Ahlak: seçenekleri ve din adamı rütbesini belirler.',
        'Aranma: suç işledikçe artar, zamanla DÜŞMEZ; 20/40/60/80 kademeleri hapse ve kaçaklığa götürür.',
        'Dost / Rakip / Eş puanı: ilişki olaylarının tonunu belirler.',
      ],
      en: [
        'Health: below 30 the death risk grows; it naturally declines from age 55+.',
        'Fame: makes you known, affects income and elite events; shown as an 8-tier title.',
        'Morality: gates options and clergy rank.',
        'Wanted level: rises as you commit crimes and does NOT fall over time; tiers 20/40/60/80 lead to prison and outlawry.',
        'Friend / Rival / Spouse score: sets the tone of relationship events.',
      ],
    },
  },
  {
    ikon: '🎖️',
    baslik: { tr: 'Meslek & Rütbe', en: 'Profession & Rank' },
    metin: {
      tr: 'Asker, Tüccar ya da Din Adamı. Rütbe 5 kademelidir ve ASLA düşmez.',
      en: 'Soldier, Merchant or Clergy. Rank has 5 tiers and NEVER drops.',
    },
    maddeler: {
      tr: [
        'Kariyer puanı yükseltir: her yıl kıdem (+2), kendi alanındaki başarılı olaylar (+3), kendi işine yatırım (+8).',
        'Her kademe ayrıca mesleğe özgü bir stat ister: Asker/Tüccar şöhret, Din Adamı ahlak.',
        'Terfiler arası bir bekleme (cooldown) vardır; bir çağrıda en fazla bir kademe yükselirsin.',
        'Rütbe maaşı bileşik büyütür (her kademe bir öncekinin ~%15 üstü).',
        '4. kademede "şehir yönetimi" ikinci bir ilerleme ekseni açılır (sabit +%8 maaş, gerisi prestij).',
      ],
      en: [
        'Career points raise it: yearly seniority (+2), successful events in your own field (+3), investing in your own business (+8).',
        'Each tier also needs a profession stat: Soldier/Merchant fame, Clergy morality.',
        'There is a cooldown between promotions; you rise at most one tier per resolution.',
        'Rank multiplies salary compound (each tier ~15% above the previous).',
        'At tier 4 a second track, "city governance", opens (flat +8% salary, the rest is prestige).',
      ],
    },
  },
  {
    ikon: '💰',
    baslik: { tr: 'Ekonomi', en: 'Economy' },
    metin: {
      tr: 'Her yıl maaş alır, konut ve yaşam tarzı gideri ödersin; enflasyon zamanla artar ve giderleri gelirden biraz daha hızlı büyütür.',
      en: 'Each year you earn a salary and pay housing and lifestyle costs; inflation grows over time and pushes costs up a little faster than income.',
    },
    maddeler: {
      tr: [
        'Maaş çarpanları: rütbe, itibar bandı (mutluluk+şöhret+ahlak), kıdem, dünya durumu (savaş/salgın/ekonomi).',
        'İtibarın üçü birden dipteyse maaş −%12’ye kadar iner, üçü zirvedeyse +%12’ye çıkar.',
        'Borçtayken her yıl faiz işler; ömürde BİR kez kilise/dost borcunun bir kısmını kapatır.',
        'Mülk ve kendi işine yatırım uzun vadeli gelirdir ama mülkler 7-11 yılda bir bakım/vergi masrafı çıkarır (~güncel değerinin üçte biri).',
        'Sahnedeki ikonlardan açılan İş & Yatırım, Gelir & Gider, Mağaza ve Sosyalleşme ekranları tur HARCAMAZ.',
      ],
      en: [
        'Salary multipliers: rank, reputation band (happiness+fame+morality), seniority, world state (war/plague/economy).',
        'If all three reputation stats are low, salary drops up to −12%; if all three are high, up to +12%.',
        'While in debt, interest accrues yearly; ONCE per life the church/friends clear part of the debt.',
        'Property and investing in your own trade are long-term income, but property triggers upkeep/tax every 7-11 years (~a third of its current value).',
        'The Work & Investment, Income & Expenses, Shop and Socialise screens (opened from the scene icons) cost NO turn.',
      ],
    },
  },
  {
    ikon: '⛓️',
    baslik: { tr: 'Aranma & Hapis', en: 'Wanted & Prison' },
    metin: {
      tr: 'Ahlaki taviz verip para kazandıran seçimler aranma seviyeni hızla yükseltir ve o kazancı büyütür — en hızlı zenginlik yolu ama en hızlı hapis yolu da.',
      en: 'Choices that pay you by compromising your morals raise your wanted level fast and boost that gain — the quickest path to wealth, but also to prison.',
    },
    maddeler: {
      tr: [
        'Aranma zamanla kendiliğinden düşmez; tek düşüş yolu kefaret/rüşvet şıkları ve büyük baskın sonuçlarıdır.',
        'Kademeler: 0-19 temiz · 20-39 · 40-59 · 60-79 · 80-100. Her kademe kendi olay havuzunu açar.',
        'Hapse düşünce normal olaylar kapanır; bir ceza yılı sayacı işler, 0’a inince otomatik tahliye olursun.',
        'Rüşvet/af ile erken çıkabilir ya da parasız riskli kaçış deneyebilirsin — başarısız kaçış cezayı uzatır.',
        'Aranma ≥60 iken başarılı bir kaçış seni "kaçak" yapar: şehir havuzu kapanır, dağda hayatta kalma zinciri açılır.',
      ],
      en: [
        'Wanted never falls on its own; the only way down is atonement/bribe options and big-raid outcomes.',
        'Tiers: 0-19 clean · 20-39 · 40-59 · 60-79 · 80-100. Each tier opens its own event pool.',
        'In prison normal events close; a sentence-year counter runs and you are released automatically at 0.',
        'You can leave early via bribe/pardon, or attempt a free risky escape — a failed escape lengthens the sentence.',
        'At wanted ≥60 a successful escape makes you an "outlaw": the city pool closes and a wilderness survival chain opens.',
      ],
    },
  },
  {
    ikon: '🍺',
    baslik: { tr: 'Sosyalleşme & Mağaza', en: 'Socialise & Shop' },
    metin: {
      tr: 'Sahnedeki ikonlardan açılırlar, tur harcamazlar. Sosyalleşme küçük bir giriş ücreti ister ama moral verir.',
      en: 'Opened from the scene icons, they cost no turn. Socialising asks a small entry fee but grants morale.',
    },
    maddeler: {
      tr: [
        'Bir mekâna "gitmek" turu tüketmez; oradaki olayı sonraki turda çözersin (o tur ilerler).',
        'Alkollü mekâna 3. kez gidince kalıcı "ayyaş" damgası: ahlak/şöhret düşer, maaş −%5, her yıl küçük ceza. Tek çıkış meyhanede bir "ayılma" olayıdır.',
        'Mağaza — Şifa: dönem ilacı/erzağı, kullanınca zarlı (çoğu zaman iyi, bazen ters teper). Bir şifa alımı tüm şifa kategorisini 3 yıl kilitler; kullanılmazsa raf ömrü dolunca çürür.',
        'Mağaza — Lüks: şöhret verir, çürümez ama ~8-10 yılda bir bakım masrafı çıkarır; türünden en fazla 1 alınır.',
      ],
      en: [
        '"Going" somewhere costs no turn; you resolve its event next turn (that turn advances).',
        'On the 3rd visit to an alcohol venue you get a permanent "drunkard" mark: morality/fame drop, salary −5%, a small yearly penalty. The only way out is a "sobering up" event at the tavern.',
        'Shop — Healing: period medicine/supplies; using one is a die roll (usually good, sometimes backfires). Buying one locks the whole healing tab for 3 years; if unused it rots when its shelf life ends.',
        'Shop — Luxury: grants fame, never rots but costs upkeep every ~8-10 years; at most 1 of each kind.',
      ],
    },
  },
  {
    ikon: '🧭',
    baslik: { tr: 'Yolculuk & Dünya Olayları', en: 'Journeys & World Events' },
    metin: {
      tr: 'Ömürde bir kez büyük bir yolculuk teklif edilir (Haçlı Seferi, Hac, Keşif...). Kabul edersen her adım tam 1 yıl sürer ve orada kazandığın para ×1.2 değerlenir.',
      en: 'Once per life a great journey is offered (a Crusade, a pilgrimage, an expedition...). If you accept, each step takes a full year and money earned there is worth ×1.2.',
    },
    maddeler: {
      tr: [
        'Yolculuk sürerken normal olaylar kapanır; bitince bir daha teklif edilmez.',
        'Büyük savaş: arka planda periyodik başlar — maaş −%15, yemek gideri artar, ayrı bir savaş vergisi kesilir.',
        'Veba: yıllık oran artık ÖLÜM değil hastalığı KAPMA. Kapınca ölüm riski ~%70 başlar; hekim/ilaç/dinlenme seçimleri riski düşürür, ihmal artırır. Para harcamak hayatta kalmayı ciddi artırır.',
        'Kıtlık / isyan / altın çağ: birkaç yıl süren küçük krizler; sağlık/para/moral üzerinde sürekli etki.',
        'Zorunlu bağış: servetin (nakit+mülk) bir eşiği aşarsa kral birkaç yılda bir servetinin ~%20’sini alabilir.',
      ],
      en: [
        'During a journey normal events close; once done it is never offered again.',
        'Great war: starts periodically in the background — salary −15%, food costs rise, a separate war tax is levied.',
        'Plague: the yearly rate is now CATCHING it, not DEATH. Once caught, death risk starts ~70%; physician/medicine/rest choices lower it, neglect raises it. Spending money markedly improves survival.',
        'Famine / revolt / golden age: small crises lasting a few years with a steady effect on health/money/morale.',
        'Forced donation: if your wealth (cash+property) passes a threshold, every few years the king may take ~20% of it.',
      ],
    },
  },
  {
    ikon: '👪',
    baslik: { tr: 'İlişkiler & Aile', en: 'Relationships & Family' },
    metin: {
      tr: 'Evlilik hem olaylarla hem de sol panelden aday seçerek (olay dışı) yapılabilir. Çocuklar, ekip üyeleri, evcil hayvan ve hizip zamanla kendi takip olaylarını açar.',
      en: 'Marriage happens both via events and by picking a candidate from the side panel (outside events). Children, crew members, a pet and a faction each open their own follow-up events over time.',
    },
    maddeler: {
      tr: [
        'Olay dışı evlilik: 18+ yaş, bekârken 2 aday + uyum yüzdesi gösterilir; paylaşılan kişilik özelliği uyumu artırır. Turu tüketmez.',
        'Ekip üyelerinin gizli bir "kalite"si, sadakati ve maaşı vardır; Görev ekranından kovabilirsin.',
        'Eş puanı yüksekse başarı belirsizlik aralığın da daralır.',
      ],
      en: [
        'Outside-event marriage: age 18+, while single you see 2 candidates + a compatibility %; shared personality traits raise it. Costs no turn.',
        'Crew members have a hidden "quality", loyalty and a salary; you can dismiss them from the Duty screen.',
        'A high spouse score also narrows your success uncertainty range.',
      ],
    },
  },
  {
    ikon: '🏆',
    baslik: { tr: 'Ölüm & Skor', en: 'Death & Score' },
    metin: {
      tr: 'Öldüğünde yaşın, şöhretin ve servetinden bir skor hesaplanır; doğuşta verilen hayat amacını tamamladıysan ×5 olur. Skorunu liderlik tablosuna yazabilirsin.',
      en: 'On death a score is computed from your age, fame and wealth; it is multiplied by 5 if you completed the life goal set at birth. You can submit your score to the leaderboard.',
    },
    maddeler: {
      tr: [
        'Servet log ölçeğinde sayılır — tek zengin ömür tabloyu ezmez, borçlu bitiş küçük ama gerçek bir cezadır.',
        'Kazandığın ünvanlar, efsanevi ölümler ve başarımlar cihazında kalıcı olarak birikir; giriş ekranından görülür.',
        'Kutsal Emanet taşıyorsan ömürde bir kez ölümü iptal eder (etiket harcanır).',
      ],
      en: [
        'Wealth is counted on a log scale — one rich life does not dominate the board, a debt-ridden end is a small but real penalty.',
        'Titles, legendary deaths and achievements you earn accumulate permanently on your device; viewable from the intro screen.',
        'If you carry the Holy Relic it cancels death once per life (the tag is consumed).',
      ],
    },
  },
  {
    ikon: '💡',
    baslik: { tr: 'İpuçları', en: 'Tips' },
    metin: {
      tr: 'Sağlığın düşükken (≤45) özel "toparlanma" olayları çıkar — bedelli ama yüksek şansla belirgin sağlık verirler.',
      en: 'While your health is low (≤45) special "recovery" events appear — they cost something but reliably restore a good chunk of health.',
    },
    maddeler: {
      tr: [
        'Nötr varsayılan ev/sofra (normal_ev / normal_ye) sağlık ve şöhret açısından bedava; en ucuz kademeler yılda küçük ceza yazar.',
        'Kendi işine yatırım hem uzun vadeli maaş (+%5, tavanlı) hem hızlı rütbe kazandırır — ama her yatırım pahalılaşır.',
        'Aranmayı biriktirmeden ara ara kefaret/rüşvet şıklarıyla düşürmek uzun ömürde daha ucuza gelir.',
        'Zar masası ve karaborsa hızlı para ama aranmayı ve (karaborsada) yıllık ahlak kaybını hızla büyütür.',
      ],
      en: [
        'The neutral default home/meal (normal home / normal meal) are free in health and fame terms; the cheapest tiers cost a small yearly penalty.',
        'Investing in your own business gives both long-term salary (+5%, capped) and fast rank — but each investment gets pricier.',
        'Lowering wanted level with atonement/bribe options before it piles up is cheaper over a long life.',
        'The dice table and black market are fast money but quickly raise your wanted level and (black market) yearly morality loss.',
      ],
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
