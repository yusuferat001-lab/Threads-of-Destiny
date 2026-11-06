import { useState, type ReactNode } from 'react';
import type { BirlikGorunumu, BirlikKararGirdisi, BirlikTur, IsletmeGorunumu, IsletmeUyari, PazarDurumu } from '../types';
import { useDil } from '../DilContext';
import { RenkliEtki } from './Renkli';
import { kt } from '../katalog';
import { PiyasaHaberleri } from './PiyasaHaberleri';
import { IsletmeOrtak } from './IsletmeOrtak';
import { isletmeUyariMetni } from './IsletmePaneli';
import { formatPara, formatMusteri, isaretSinifi } from '../format';

interface Props {
  durum: IsletmeGorunumu;
  pazar?: PazarDurumu | null;
  yukleniyor: boolean;
  onBirlikKarar: (k: BirlikKararGirdisi) => void;
  onTechizat: (seviye: 'dusuk' | 'orta' | 'yuksek') => void;
  onBirlikSec: (turler: BirlikTur[]) => void;
  onKusatma: (seviye: number) => void;
  onTerhis: (adet: number) => void;
  onKiralik?: () => void;
  onYatirim: (yatirimId: string) => void;
  onYatirimDusur?: (yatirimId: string) => void;
  onCalisanAl: (adayId: string) => void;
  onEkipCikar: (ekipId: string) => void;
  /** Strateji sayfası: hangi bölüm çizilir. */
  bolum: 'isletme' | 'yatirim' | 'calisan';
  /** Ordu sayfasında "durum" hücresinin üstüne konan blok (rütbe kademesi + ilerleme çubukları). */
  ustBlok?: ReactNode;
  /** Yatırım sayfasında üçüncü sütunun altına konan kart (Tefeci/Kredi). */
  yanKart?: ReactNode;
}

type D = { tr: string; en: string };

/** Metinler bileşene gömülü (CemaatPaneli deseni): TR + EN aynı objede. */
const M = {
  baslik: { tr: '🛡️ Ordun', en: '🛡️ Your Army' },
  er: { tr: 'Erin', en: 'Men' },
  pay: { tr: 'Askerî payın', en: 'Military share' },
  guc: { tr: 'Askerî gücün', en: 'Military strength' },
  moral: { tr: 'Ordu morali', en: 'Army morale' },
  talim: { tr: 'Talim / Tecrübe', en: 'Drill / Experience' },
  limit: { tr: 'Komuta limiti', en: 'Command limit' },
  limitNot: { tr: 'kışlanın barındırabildiği er sayısı', en: 'how many men the barracks can house' },
  otorite: { tr: 'Şehir yöneticin', en: 'Your city governor' },
  iliski: { tr: 'ilişki', en: 'relation' },
  rakipBaslik: { tr: 'Rakip komutanlar', en: 'Rival commanders' },
  rakipGuc: { tr: 'askerî güç', en: 'strength' },
  gucBaslik: { tr: 'Askerî güç dökümü', en: 'Strength breakdown' },
  ham: { tr: 'Ham güç (kalite × er)', en: 'Raw strength (quality × men)' },
  birlikCarpani: { tr: 'Özel birlik çarpanı (saldırı / savunma)', en: 'Special-unit multiplier (attack / defence)' },
  toplamGuc: { tr: 'Toplam güç', en: 'Total strength' },
  gucNot: { tr: 'Pay = senin gücün / (senin gücün + rakipler + diğer ordular).', en: 'Share = your strength / (yours + rivals + other armies).' },
  gorevBaslik: { tr: 'Görevler', en: 'Duties' },
  gorevNot: {
    tr: 'Ordu açık görevlere eşit bölünür; her görev yıllık düzenli gelir getirir.',
    en: 'Your men are split evenly across open duties; each duty earns a steady yearly amount per man.',
  },
  slot: { tr: 'açık görev', en: 'open duties' },
  minEr: { tr: 'en az', en: 'min' },
  yalnizSavas: { tr: 'yalnız savaşta', en: 'wartime only' },
  gorevAc: { tr: 'Aç', en: 'Open' },
  gorevKapat: { tr: 'Kapat', en: 'Close' },
  gelir: { tr: 'gelir', en: 'income' },
  ganimet: { tr: 'ganimet', en: 'loot' },
  politikaBaslik: { tr: 'Politikalar', en: 'Policies' },
  ganimetPayi: { tr: 'Ganimet payı (erlere)', en: 'Loot share (to the men)' },
  talimPol: { tr: 'Talim', en: 'Drill' },
  tonPol: { tr: 'Komuta tonu', en: 'Command tone' },
  donatimBaslik: { tr: 'Teçhizat', en: 'Equipment' },
  donatimNot: {
    tr: 'Teçhizat kalitesi 5 yılda bir değiştirilebilir. Yeni erler hedef kaliteyle gelir (parası yoksa düşük kaliteyle).',
    en: 'Equipment quality can be changed once every 5 years. New men arrive at the target quality (low quality if you cannot pay).',
  },
  hedefKalite: { tr: 'Yeni erler için hedef', en: 'Target for new men' },
  yukselt: { tr: 'Yükselt', en: 'Upgrade' },
  kilit: { tr: 'Kilit: ~', en: 'Locked: ~' },
  yilKisa: { tr: 'yıl', en: 'yr' },
  birlikBaslik: { tr: 'Özel birlikler', en: 'Special units' },
  birlikNot: {
    tr: 'Açtığın her birlik ordunun %25\'i olur; yeni erler oransal katılır ve geçiş ücretini kendiliğinden öder. Birlikleri 5 yılda bir değiştirebilirsin; yalnız yenisini eklemek serbest.',
    en: 'Each unit you open takes 25% of the army; new men join proportionally and pay the transfer fee automatically. Units can be swapped once every 5 years; adding a new one is free.',
  },
  maliyetArti: { tr: 'yıllık maliyet', en: 'upkeep' },
  gucEsik: { tr: 'askeri güç', en: 'military strength' },
  toplamPay: { tr: 'toplam pay', en: 'total share' },
  uygula: { tr: 'Uygula', en: 'Apply' },
  kusatma: { tr: 'Kuşatma', en: 'Siege' },
  kusatmaNot: { tr: 'Kuşatma kolu yalnız KALE kuşatmasında saldırı bonusu verir (savaş meydanında etkisi yoktur); zaferden sonra kale alınıp alınamayacağını belirler.', en: 'A siege train adds an attack bonus only when besieging a FORT (no effect on the open battlefield); it decides whether a fort can be taken after a victory.' },
  terhisBaslik: { tr: 'Terhis', en: 'Discharge' },
  terhisNot: { tr: 'Savaşta terhis edemezsin. Savaş bitince seferberlikle gelenler kendiliğinden döner; diğer erleri sen terhis edersin.', en: 'You cannot discharge during a war. Wartime recruits go home on their own when it ends; you discharge the rest yourself.' },
  yarali: { tr: 'Yaralı', en: 'Wounded' },
  gYarali: { tr: 'Yaralı tedavisi', en: 'Wounded care' },
  gAsim: { tr: 'Limit üstü erlerin ek gideri', en: 'Extra cost of men over the limit' },
  fazla: { tr: 'fazla', en: 'over' },
  terhisEt: { tr: 'Terhis et', en: 'Discharge' },
  doktrinBaslik: { tr: 'Doktrinlerin', en: 'Your doctrines' },
  doktrinYok: { tr: 'Henüz doktrin seçmedin.', en: 'No doctrine chosen yet.' },
  savasBaslik: { tr: 'Savaş durumu', en: 'War status' },
  savasYok: { tr: 'Şu an savaş yok.', en: 'No war right now.' },
  emirBaslik: { tr: 'Komutan emri', en: 'Commander\'s order' },
  kale: { tr: 'Ele geçirilen kale', en: 'Castles held' },
  kiralikTut: { tr: 'Kiralık ordu tut', en: 'Hire mercenaries' },
  kiralikVar: { tr: 'Kiralık ordu', en: 'Hired troops' },
  gKiralik: { tr: 'Kiralık ordu', en: 'Hired troops' },
  gKale: { tr: 'Kale geliri', en: 'Castle income' },
  arazi: { tr: 'Arazi', en: 'Terrain' },
  araziIhtimali: { tr: 'arazi seçme ihtimalin', en: 'chance to pick the terrain' },
  kanat: { tr: 'Kanat sonuçları (zafer / yenilgi)', en: 'Wing results (wins / losses)' },
  dokumBaslik: { tr: 'Beklenen gelir ve giderler', en: 'Expected income & costs' },
  sold: { tr: 'Sold (devlet)', en: 'Pay (state)' },
  erBasi: { tr: 'Er başı gelir', en: 'Per-man income' },
  gorevGeliri: { tr: 'Görev kazancı', en: 'Duty earnings' },
  ganimetNet: { tr: 'Ganimet (net)', en: 'Loot (net)' },
  toplamGelir: { tr: 'Toplam gelir', en: 'Total income' },
  gErMasrafi: { tr: 'Er masrafı', en: 'Upkeep of men' },
  gErzak: { tr: 'Erzak', en: 'Provisions' },
  kazanc: { tr: 'Kazanç', en: 'Earnings' },
  toplamKazanc: { tr: 'Toplam kazanç', en: 'Total earnings' },
  gKisla: { tr: 'Kışla bakımı', en: 'Barracks upkeep' },
  gTechizat: { tr: 'Teçhizat bakımı', en: 'Equipment upkeep' },
  gKusatma: { tr: 'Kuşatma bakımı', en: 'Siege upkeep' },
  gTalim: { tr: 'Talim masrafı', en: 'Drill costs' },
  beklenenNet: { tr: 'Beklenen net', en: 'Expected net' },
  yil: { tr: '/yıl', en: '/yr' },
  ekipNot: { tr: 'Subay maaşları ayrıca giderinden düşer.', en: 'Officers\' wages come out of your expenses separately.' },
  barisTahmin: { tr: 'Bir çatışma zaferinde tahmini ganimetin', en: 'Estimated loot from a clash victory' },
  sonDokum: { tr: 'Geçen yıl', en: 'Last year' },
  firar: { tr: 'firar', en: 'deserted' },
  olen: { tr: 'kayıp', en: 'lost' },
  devletPayi: { tr: 'devlet payı', en: 'state share' },
  yatirimBaslik: { tr: 'Yatırımlar', en: 'Investments' },
  durumBaslik: { tr: 'Ordu durumu', en: 'Army status' },
  artilar: { tr: 'Artılar', en: 'Pros' },
  eksiler: { tr: 'Eksiler', en: 'Cons' },
  techUyari: { tr: '⚠ Seçtikten sonra 5 yıl boyunca değiştirilemez', en: '⚠ Once chosen, it cannot be changed for 5 years' },
  techKilitli: { tr: '🔒 Değiştirmek için beklemelisin:', en: '🔒 You must wait to change it:' },
  techGuc: { tr: 'Güç', en: 'Strength' },
  techTalim: { tr: 'talim', en: 'drill' },
  techBakim: { tr: 'bakım', en: 'upkeep' },
  techSec: { tr: 'Seç', en: 'Choose' },
  techSecili: { tr: '✓ Seçili', en: '✓ Chosen' },
  techNot: { tr: 'Tüm ordu aynı seviyede donatılır; yeni erler de bu seviyeyle gelir. Geçiş ücretsizdir, bedeli yıllık bakımdır.', en: 'The whole army is kitted out at one level; new men arrive at it too. Switching is free; the cost is yearly upkeep.' },
  yilSonra: { tr: 'yıl', en: 'yr' },
  ekle: { tr: 'Ekle', en: 'Add' },
  terhisBirlik: { tr: 'Terhis', en: 'Disband' },
  birlikHak: { tr: 'Özel birlik hakkın', en: 'Special-unit slots' },
  limitDolu: { tr: 'Rütben en fazla', en: 'Your rank allows only' },
  limitDoluSon: { tr: 'özel birliğe izin veriyor', en: 'special units' },
  kilitTerhis: { tr: '5 yıl kilidi sürüyor', en: '5-year lock is active' },
  birlikNotYeni: { tr: 'Açtığın her birlik ordunun %25\'i olur; geçiş ücretini yeni erler kendiliğinden öder. Yeni birlik açmak serbest, kapatmak 5 yılda bir.', en: 'Each unit you open takes 25% of the army; the transfer fee is paid as men join. Opening a unit is free any time; disbanding is once every 5 years.' },
  kur: { tr: 'Kur', en: 'Build' },
  yukseltKusatma: { tr: 'Yükselt', en: 'Upgrade' },
  sok: { tr: 'Sök', en: 'Dismantle' },
  kusatmaOzel: { tr: 'Özel durum: yalnız kale kuşatmasında saldırı bonusu verir; savaş ve çatışma gücüne girmez; ordudan pay almaz.', en: 'Special case: adds an attack bonus only when besieging a fort; it does not count in battles or clashes and takes no share of the army.' },
  seviye: { tr: 'seviye', en: 'level' },
};

const KALITE_SIMGE: Record<string, string> = { dusuk: '🪓', orta: '⚔️', yuksek: '🗡️' };
const ETKI_ETIKET: Record<string, D> = {
  guc: { tr: 'Güç', en: 'Strength' },
  saldiri: { tr: 'Saldırı', en: 'Attack' },
  savunma: { tr: 'Savunma', en: 'Defence' },
  gelir: { tr: 'Gelir', en: 'Income' },
  ganimet: { tr: 'Ganimet', en: 'Loot' },
  kayip: { tr: 'Kayıp', en: 'Losses' },
  masraf: { tr: 'Masraf', en: 'Costs' },
  moral: { tr: 'Ordu morali', en: 'Army morale' },
  sertlik: { tr: 'Sertlik', en: 'Harshness' },
  ahlak: { tr: 'Ahlak', en: 'Morality' },
  sold: { tr: 'Sold', en: 'Pay' },
  otorite: { tr: 'Otorite', en: 'Authority' },
  devsirme: { tr: 'Devşirme', en: 'Recruits' },
  firar: { tr: 'Firar', en: 'Desertion' },
};
/** Doktrin etkilerini kısa çiplere çevirir (kesirler yüzde, moral/sertlik/ahlak/otorite/devşirme düz sayı). */
export function doktrinEtkiMetni(etki: Record<string, number>, dil: 'tr' | 'en'): string[] {
  const duz = new Set(['moral', 'sertlik', 'ahlak', 'otorite', 'devsirme']);
  return Object.entries(etki)
    .filter(([, v]) => v)
    .map(([k, v]) => {
      const ad = (ETKI_ETIKET[k] ?? { tr: k, en: k })[dil];
      const sayi = duz.has(k) ? `${v > 0 ? '+' : '−'}${Math.abs(Math.round(v * 10) / 10)}` : `${v > 0 ? '+' : '−'}${Math.abs(Math.round(v * 100))}%`;
      return `${ad} ${sayi}`;
    });
}


/** Doktrin etkilerini yeşil/kırmızı rozetlere çevirir (kayıp, masraf, firar, sertlik artarsa kötüdür). */
export function DoktrinEtkiSatiri({ etki, dil }: { etki: Record<string, number>; dil: 'tr' | 'en' }) {
  const tersi = new Set(['kayip', 'masraf', 'firar', 'sertlik']);
  const metinler = doktrinEtkiMetni(etki, dil);
  const anahtarlar = Object.entries(etki).filter(([, v]) => v).map(([k, v]) => ({ k, iyi: tersi.has(k) ? v < 0 : v > 0 }));
  return (
    <>
      {metinler.map((m, i) => (
        <span key={i} className={anahtarlar[i]?.iyi ? 's-arti' : 's-eksi'}>
          {i > 0 ? ' · ' : ''}
          {m}
        </span>
      ))}
    </>
  );
}

export function BirlikPaneli({
  durum,
  pazar,
  yukleniyor,
  onBirlikKarar,
  onTechizat,
  onBirlikSec,
  onKusatma,
  onTerhis,
  onKiralik,
  onYatirim,
  onYatirimDusur,
  onCalisanAl,
  onEkipCikar,
  bolum,
  ustBlok,
  yanKart,
}: Props) {
  const { dil } = useDil();
  const t = (k: keyof typeof M) => M[k][dil];
  const d = (m: D) => m[dil];
  const b: BirlikGorunumu | null = durum.birlik;
  const pb = durum.paraBirimi;
  const erBirim = dil === 'en' ? '/man' : '/er';
  const [terhis, setTerhis] = useState(1);
  // Politika ayrıntısı: üzerine gelinen (ya da seçili) seçeneğin artı/eksileri gösterilir.
  const [onizle, setOnizle] = useState<Record<string, string | null>>({});

  if (!durum.aktif || !b) return null;
  const dokum = durum.sonDokum;
  const uyariMetni = (u: IsletmeUyari): string => isletmeUyariMetni(u, durum, dil);
  const yuzdeMetni = (v: number, isaretli = true) => {
    const isaret = isaretli && v > 0 ? '+' : v < 0 ? '−' : '';
    return dil === 'en' ? `${isaret}${Math.abs(v)}%` : `${isaret}%${Math.abs(v)}`;
  };
  const sayi = (x: number) => (dil === 'en' ? String(x) : String(x).replace('.', ','));
  const isaretliSayi = (x: number) => `${x > 0 ? '+' : x < 0 ? '−' : ''}${sayi(Math.abs(x))}`;

  /** Üç seçenekli politika: seçici düğmeler + seçili/üzerine gelinen seçeneğin ✓ artı / ✗ eksi listesi. */
  const politika = <T extends string>(
    anahtar: string,
    baslik: string,
    secili: T,
    secenekler: { id: T; ad: D; arti: D[]; eksi: D[] }[],
    onSec: (id: T) => void
  ) => {
    const gosterilen = secenekler.find((s) => s.id === (onizle[anahtar] ?? secili)) ?? secenekler[0];
    return (
      <div className="ordu-politika">
        <div className="ordu-politika-baslik">{baslik}</div>
        <div className="ordu-politika-secici" onMouseLeave={() => setOnizle({ ...onizle, [anahtar]: null })}>
          {secenekler.map((s) => (
            <button
              key={s.id}
              type="button"
              className={s.id === secili ? 'ordu-politika-secili' : 'ikincil'}
              disabled={yukleniyor || s.id === secili}
              onClick={() => onSec(s.id)}
              onMouseEnter={() => setOnizle({ ...onizle, [anahtar]: s.id })}
              onFocus={() => setOnizle({ ...onizle, [anahtar]: s.id })}
            >
              {d(s.ad)}
            </button>
          ))}
        </div>
        <div className="ordu-politika-detay">
          <ul className="ordu-arti" aria-label={t('artilar')}>
            {gosterilen.arti.map((x, i) => (
              <li key={i}>{d(x)}</li>
            ))}
          </ul>
          <ul className="ordu-eksi" aria-label={t('eksiler')}>
            {gosterilen.eksi.map((x, i) => (
              <li key={i}>{d(x)}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const seciliTurler = b.birlik.seciliTurler;
  const birlikKilitli = b.birlik.kilitKalanYil > 0;
  const limitDolu = seciliTurler.length >= b.birlik.limit;
  const kilitli = b.kalite.kilitKalanYil > 0;
  const kusatma = b.birlik.kusatma;

  // ── Görevler (Ordu sayfasında, sağ sütun) ──
  const gorevlerBlok = (
    <div className="sayfa-blok blok-gorev-liste">
      <h4>
        {t('gorevBaslik')} ({b.gorevler.slot.kullanilan}/{b.gorevler.slot.toplam} {t('slot')})
      </h4>
      <div className="gorev-liste">
        {b.gorevler.katalog.map((g) => {
          const secili = b.gorevler.secili.includes(g.id);
          const dolu = !secili && b.gorevler.secili.length >= b.gorevler.slot.toplam;
          return (
            <div key={g.id} className={`gorev-kart${secili ? ' gorev-kart-acik' : ''}${!g.kullanilabilir ? ' gorev-kart-kilitli' : ''}`} title={d(g.aciklama)}>
              <div className="gorev-kart-ust">
                <strong>
                  {g.simge} {d(g.ad)}
                </strong>
                {!g.kullanilabilir ? (
                  <span className="isletme-etiket">⚔️ {t('yalnizSavas')}</span>
                ) : (
                  <button
                    className={secili ? '' : 'ikincil'}
                    disabled={yukleniyor || (dolu && !secili)}
                    onClick={() => onBirlikKarar({ gorevler: secili ? b.gorevler.secili.filter((x) => x !== g.id) : [...b.gorevler.secili, g.id] })}
                  >
                    {secili ? t('gorevKapat') : t('gorevAc')}
                  </button>
                )}
              </div>
              <small>
                <span className="s-esik">{t('minEr')} {g.minGuc} {t('gucEsik')}</span> · <span className="s-gelir">{formatPara(g.erBasi)} {pb}{erBirim}</span>
                {g.aktif ? <span className="s-gelir"> · {formatPara(g.gelir)} {pb}{g.ganimet > 0 ? ` + ${t('ganimet')} ${formatPara(g.ganimet)}` : ''}</span> : null}
              </small>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── Ordu sayfası ──
  const orduSayfasi = (
    <div className="sayfa-izgara ordu-izgara">
      <div className="sayfa-sutun ordu-kol">
        <div className="sayfa-blok blok-durum">
          {ustBlok}
          <h4>{t('durumBaslik')}</h4>
          <div className="isletme-ozet">
            <span>
              ⚖️ {t('pay')}: <strong>{dil === 'en' ? `${formatMusteri(dil, b.pay)}%` : `%${formatMusteri(dil, b.pay)}`}</strong>
            </span>
            <span>
              🪖 {t('er')}: <strong>{b.er}</strong>
              {dokum && dokum.musteriDegisim !== 0 ? <em className={isaretSinifi(dokum.musteriDegisim)}> ({dokum.musteriDegisim > 0 ? '+' : ''}{dokum.musteriDegisim})</em> : null}
            </span>
            <span title={t('limitNot')}>
              📏 {t('limit')}: <strong>{b.limit.komuta}</strong>
              {b.limit.asim > 0 ? <em className="negatif"> (+{b.limit.asim} {t('fazla')})</em> : null}
            </span>
            <span>
              💪 {t('guc')}: <strong>{b.guc.toplam}</strong>
            </span>
            <span>
              🙂 {t('moral')}: <strong>{b.moral.deger}</strong> ({yuzdeMetni(b.moral.gucYuzde)})
            </span>
            <span>
              🎖️ {t('talim')}: <strong>{b.talim.seviye}</strong> ({yuzdeMetni(b.talim.gucYuzde)})
            </span>
            {b.yarali.sayi > 0 && (
              <span>
                🩹 {t('yarali')}: <strong>{b.yarali.sayi}</strong>
              </span>
            )}
            {durum.otorite && (
              <span>
                🏛️ {t('otorite')}: <strong>{kt(dil, durum.otorite)}</strong> · {t('iliski')} {durum.otoriteIliski}
              </span>
            )}
          </div>
          {b.rakipler.length > 0 && (
            <div className="isletme-imtiyazlar">
              <strong>{t('rakipBaslik')}:</strong> {b.rakipler.map((r) => `${r.ad} — ${t('rakipGuc')} ${r.guc}`).join(' · ')}
            </div>
          )}
        </div>
        <div className="sayfa-sutun blok-yan1">
          <div className="sayfa-blok blok-guc">
            <h4>{t('gucBaslik')}</h4>
            <div className="isletme-dokum">
              <div>
                {t('ham')}: <strong>{b.guc.ham}</strong>
                <small>
                  {' '}
                  ({(['dusuk', 'orta', 'yuksek'] as const).filter((k) => b.kalite.sayilar[k] > 0).map((k) => `${KALITE_SIMGE[k]} ${b.kalite.sayilar[k]}×${b.guc.kaliteCarpani[k]}`).join(' · ')})
                </small>
              </div>
              <div>
                {t('birlikCarpani')}: <strong>×{b.guc.saldiriCarpani} / ×{b.guc.savunmaCarpani}</strong>
              </div>
              {b.guc.bonuslar.map((x) => (
                <div key={x.kod + x.taraf} className={x.yuzde >= 0 ? 'cemaat-arti' : 'cemaat-eksi'}>
                  {d(x.ad)}: <strong>{yuzdeMetni(x.yuzde)}</strong>
                </div>
              ))}
              <div className="isletme-dokum-net">
                {t('toplamGuc')}: <strong>{b.guc.toplam}</strong> <small>(⚔️ {b.guc.saldiri} · 🛡️ {b.guc.savunma})</small>
              </div>
              <small>{t('gucNot')}</small>
            </div>
          </div>
          <div className="sayfa-blok blok-doktrin">
            <h4>{t('doktrinBaslik')}</h4>
            {b.doktrin.secilen.length === 0 ? (
              <p className="isletme-bos">{t('doktrinYok')}</p>
            ) : (
              <div className="isletme-yatirimlar">
                {b.doktrin.secilen.map((o) => (
                  <div key={o.id} className="isletme-yatirim">
                    <strong>
                      {o.simge} {d(o.ad)} {o.acimasiz ? '⚡' : ''}
                    </strong>
                    <span>{dil === 'en' ? `Level ${o.seviye}` : `Seviye ${o.seviye}`}</span>
                    <small><DoktrinEtkiSatiri etki={o.etki} dil={dil} /></small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>


      </div>
      <div className="sayfa-sutun ordu-kol">

        <div className="sayfa-blok blok-pol">
          <h4>{t('politikaBaslik')}</h4>
          {politika(
            'ganimet',
            t('ganimetPayi'),
            b.politikalar.ganimetPayi.secili,
            b.politikalar.ganimetPayi.secenekler,
            (id) => onBirlikKarar({ ganimet_payi: id })
          )}
          {politika('talim', t('talimPol'), b.talim.politika, b.talim.politikalar, (id) => onBirlikKarar({ talim: id }))}
          {politika('ton', t('tonPol'), b.politikalar.ton.secili, b.politikalar.ton.secenekler, (id) => onBirlikKarar({ ton: id }))}
        </div>
        <div className="sayfa-blok blok-butce">
          <h4>{t('dokumBaslik')}</h4>
          <div className="isletme-dokum">
            <div>{d(b.hesap.soldAdi)}: <strong className="s-gelir">+{formatPara(b.hesap.sold)}</strong></div>
            <div>{t('gorevGeliri')}: <strong className="s-gelir">+{formatPara(b.hesap.gorevGeliri)}</strong></div>
            <div>{t('ganimetNet')}: <strong className="s-gelir">+{formatPara(b.hesap.ganimetNet)}</strong></div>
            {b.hesap.kaleGeliri > 0 && <div>{t('gKale')}: <strong className="s-gelir">+{formatPara(b.hesap.kaleGeliri)}</strong></div>}
            <div>{t('toplamGelir')}: <strong className="s-gelir">+{formatPara(b.hesap.toplamGelir)}</strong></div>
            <div>{t('gErMasrafi')}: <strong className="s-gider">−{formatPara(b.hesap.erMasrafi)}</strong></div>
            <div>{t('gErzak')}: <strong className="s-gider">−{formatPara(b.hesap.erzak)}</strong></div>
            {b.hesap.kiralikMasrafi > 0 && <div>{t('gKiralik')}: <strong className="s-gider">−{formatPara(b.hesap.kiralikMasrafi)}</strong></div>}
            <div>{t('gKisla')}: <strong className="s-gider">−{formatPara(b.hesap.kislaBakim)}</strong></div>
            <div>{t('gTechizat')}: <strong className="s-gider">−{formatPara(b.hesap.techizatBakim)}</strong></div>
            {b.hesap.yaraliGideri > 0 && <div>{t('gYarali')}: <strong className="s-gider">−{formatPara(b.hesap.yaraliGideri)}</strong></div>}
            {b.hesap.limitAsimGideri > 0 && <div>{t('gAsim')}: <strong className="s-gider">−{formatPara(b.hesap.limitAsimGideri)}</strong></div>}
            {b.hesap.kusatmaBakim > 0 && <div>{t('gKusatma')}: <strong className="s-gider">−{formatPara(b.hesap.kusatmaBakim)}</strong></div>}
            <div>{t('gTalim')}: <strong className="s-gider">−{formatPara(b.hesap.talimMasrafi)}</strong></div>
            <div className="isletme-dokum-net">
              {t('beklenenNet')}: <strong className={b.hesap.net >= 0 ? 's-gelir' : 's-gider'}>~{b.hesap.net >= 0 ? '+' : ''}{formatPara(b.hesap.net)} {pb}{t('yil')}</strong>
            </div>
            <small>{t('ekipNot')}</small>
          </div>
          {dokum && dokum.birlik && (
            <div className="isletme-dokum">
              <div>
                {t('sonDokum')} ({dokum.yil}): 🪖 {dokum.musteri} · {dokum.birlik.firar} {t('firar')} · {dokum.birlik.olen} {t('olen')} · {t('ganimetNet').split(' ')[0]} {formatPara(dokum.birlik.ganimetPara)}
              </div>
              {dokum.uyarilar.map((u, i) => {
                const sm = uyariMetni(u);
                return sm ? <div key={i}><RenkliEtki metin={sm} /></div> : null;
              })}
            </div>
          )}
        </div>

      </div>
      <div className="sayfa-sutun ordu-kol">
        <div className="sayfa-sutun blok-gorev">
          {gorevlerBlok}
          <div className="sayfa-blok blok-savas">
            <h4>{t('savasBaslik')}</h4>
            {!b.savas.aktif ? (
              <p className="isletme-bos">{t('savasYok')}</p>
            ) : (
              <div className="isletme-ozet">
                {b.savas.araziAd && (
                  <span>
                    🏞️ {t('arazi')}: <strong>{d(b.savas.araziAd)}</strong>
                  </span>
                )}
                <span>
                  ⚔️ {t('kanat')}: <strong>{b.savas.kanatZafer} / {b.savas.kanatYenilgi}</strong>
                </span>
                {b.emir && (
                  <span title={d(b.emir.aciklama)}>
                    {b.emir.simge} {t('emirBaslik')}: <strong>{d(b.emir.ad)}</strong>
                  </span>
                )}
                {b.kiralik.aktif && (
                  <span>
                    🗡️ {t('kiralikVar')}: <strong>{b.kiralik.er}</strong>
                  </span>
                )}
                {onKiralik && b.kiralik.mumkun && (
                  <button className="ikincil" disabled={yukleniyor} onClick={onKiralik}>
                    {t('kiralikTut')} · {formatPara(b.kiralik.ucret)} {pb}
                  </button>
                )}
              </div>
            )}
            {b.kale > 0 && (
              <div className="isletme-ozet">
                <span>
                  🏰 {t('kale')}: <strong>{b.kale}</strong>
                </span>
              </div>
            )}
            {pazar && pazar.aktif && <PiyasaHaberleri pazar={pazar} sayilarGoster={false} />}
          </div>
        </div>

      </div>
    </div>
  );

  // ── Yatırım sayfası: Teçhizat · Özel birlikler + Kuşatma · Yatırımlar + Kredi ──
  const techizatBlok = (
    <div className="sayfa-blok blok-techizat">
      <h4>{t('donatimBaslik')}: {d(b.kalite.techizat)}</h4>
      <div className={`techizat-uyari${kilitli ? ' techizat-uyari-kilit' : ''}`}>
        {kilitli ? `${t('techKilitli')} ${b.kalite.kilitKalanYil} ${t('yilSonra')}` : t('techUyari')}
      </div>
      <div className="techizat-kartlar">
        {b.kalite.seviyeler.map((sv) => {
          const secili = b.kalite.hedef === sv.id;
          return (
            <div key={sv.id} className={`techizat-kart${secili ? ' techizat-kart-secili' : ''}`}>
              <div className="techizat-kart-ust">
                <strong>
                  {KALITE_SIMGE[sv.id]} {d(b.kalite.adlar[sv.id])}
                </strong>
                <button type="button" className={secili ? '' : 'ikincil'} disabled={yukleniyor || kilitli || secili} onClick={() => onTechizat(sv.id)}>
                  {secili ? t('techSecili') : t('techSec')}
                </button>
              </div>
              <div className="techizat-kart-etki">
                <span>
                  {t('techGuc')} <b>×{sayi(sv.carpan)}</b>
                </span>
                <span>
                  {t('moral')} <b className={sv.moral > 0 ? 's-arti' : sv.moral < 0 ? 's-eksi' : ''}>{isaretliSayi(sv.moral)}{dil === 'en' ? '/yr' : '/yıl'}</b>
                </span>
                <span>
                  {t('techTalim')} <b>×{sayi(sv.talim)}</b>
                </span>
              </div>
              <div className="techizat-kart-masraf">
                {t('techBakim')}: {formatPara(sv.bakim)} {pb}
                {erBirim} · <b>{formatPara(sv.bakimToplam)} {pb}{t('yil')}</b>
              </div>
            </div>
          );
        })}
      </div>
      <div className="isletme-fiyat-not">{t('techNot')}</div>
    </div>
  );

  const birlikBlok = (
    <div className="sayfa-blok blok-birlik">
      <h4>{t('birlikBaslik')}</h4>
      <div className="birlik-hak">
        {t('birlikHak')}: <strong className="s-esik">{seciliTurler.length}/{b.birlik.limit}</strong>
        {birlikKilitli && <small> · 🔒 {b.birlik.kilitKalanYil} {t('yilSonra')}</small>}
      </div>
      <div className="birlik-kartlar">
        {b.birlik.turler.map((tur) => {
          const acik = seciliTurler.includes(tur.id);
          return (
            <div key={tur.id} className={`birlik-kart${acik ? ' birlik-kart-acik' : ''}`}>
              <div className="birlik-kart-ust">
                <strong>
                  {tur.simge} {d(tur.ad)}
                </strong>
                {acik ? (
                  <button type="button" className="ikincil" disabled={yukleniyor || birlikKilitli} title={birlikKilitli ? t('kilitTerhis') : ''} onClick={() => onBirlikSec(seciliTurler.filter((x) => x !== tur.id))}>
                    {t('terhisBirlik')}
                  </button>
                ) : (
                  <button type="button" disabled={yukleniyor || limitDolu} title={limitDolu ? `${t('limitDolu')} ${b.birlik.limit} ${t('limitDoluSon')}` : ''} onClick={() => onBirlikSec([...seciliTurler, tur.id])}>
                    {t('ekle')}
                  </button>
                )}
              </div>
              <div className="birlik-kart-etki">
                ⚔️ ×{tur.saldiri} · 🛡️ ×{tur.savunma} · <span className="s-gider">{formatPara(tur.ucret)} {pb}{erBirim}</span> · {t('maliyetArti')} <span className="s-gider">+%{Math.round(tur.bakim * 100)}</span>
              </div>
              <small>
                ＋ {d(tur.arti)} · － {d(tur.eksi)}
              </small>
            </div>
          );
        })}
        <div className={`birlik-kart birlik-kart-kusatma${kusatma.seviye > 0 ? ' birlik-kart-acik' : ''}`}>
          <div className="birlik-kart-ust">
            <strong>
              🏰 {d(kusatma.ad)}
            </strong>
            <span className="birlik-kusatma-dugmeler">
              {kusatma.seviye < 2 && (
                <button type="button" disabled={yukleniyor} onClick={() => onKusatma(kusatma.seviye + 1)} title={`${formatPara(kusatma.fiyatlar[kusatma.seviye + 1] ?? 0)} ${pb}`}>
                  {kusatma.seviye === 0 ? t('kur') : t('yukseltKusatma')}
                </button>
              )}
              {kusatma.seviye > 0 && (
                <button type="button" className="ikincil" disabled={yukleniyor} onClick={() => onKusatma(0)}>
                  {t('sok')}
                </button>
              )}
            </span>
          </div>
          <div className="birlik-kart-etki">
            {t('seviye')} {kusatma.seviye}/2 · +%{Math.round((kusatma.bonuslar[kusatma.seviye] ?? 0) * 100)}
            {kusatma.seviye < 2 ? <> → +%{Math.round((kusatma.bonuslar[kusatma.seviye + 1] ?? 0) * 100)} (<span className="s-gider">{formatPara(kusatma.fiyatlar[kusatma.seviye + 1] ?? 0)} {pb}</span>)</> : ''}
          </div>
          <small>{t('kusatmaOzel')}</small>
        </div>
      </div>
      <div className="isletme-fiyat-not">{t('birlikNotYeni')}</div>
    </div>
  );

  const terhisBlok = (
    <div className="sayfa-blok blok-terhis">
      <h4>{t('terhisBaslik')}</h4>
      <div className="isletme-fiyat-not terhis-not" title={t('terhisNot')}>{t('terhisNot')}</div>
      <div className="isletme-fiyat-satir">
        <input type="number" min={1} max={Math.max(1, b.er - 6)} value={terhis} onChange={(e) => setTerhis(Math.max(1, Math.floor(Number(e.target.value) || 1)))} className="isletme-sayi-giris" />{' '}
        <button className="ikincil" disabled={yukleniyor || b.savas.aktif || b.er - 6 < 1} onClick={() => onTerhis(terhis)}>
          {t('terhisEt')}
        </button>
      </div>
    </div>
  );

  const yatirimSayfasi = (
    <div className="sayfa-izgara asker-yatirim-izgara">
      <div className="sayfa-sutun sutun-techizat">
        {techizatBlok}
        {terhisBlok}
        {yanKart}
      </div>
      <div className="sayfa-sutun sutun-birlik">{birlikBlok}</div>
      <div className="sayfa-sutun sutun-yatirim">
        <IsletmeOrtak
          goster="yatirim"
          durum={durum}
          yukleniyor={yukleniyor}
          sadakatAdi={{ tr: 'Sadakat', en: 'Loyalty' }}
          riskliAciklama={{ tr: 'Sadakati düşük: sırlarını sızdırabilir, erleri ayartabilir, işi bırakabilir', en: 'Low loyalty: may leak secrets, lure men away or quit' }}
          onYatirim={onYatirim}
          onYatirimDusur={onYatirimDusur}
          onCalisanAl={onCalisanAl}
          onEkipCikar={onEkipCikar}
        />
      </div>
    </div>
  );

  return (
    <section className="isletme-paneli birlik-paneli">
      {bolum === 'isletme' && orduSayfasi}
      {bolum === 'yatirim' && yatirimSayfasi}
      {bolum === 'calisan' && (
        <IsletmeOrtak
          goster="calisan"
          durum={durum}
          yukleniyor={yukleniyor}
          sadakatAdi={{ tr: 'Sadakat', en: 'Loyalty' }}
          riskliAciklama={{ tr: 'Sadakati düşük: sırlarını sızdırabilir, erleri ayartabilir, işi bırakabilir', en: 'Low loyalty: may leak secrets, lure men away or quit' }}
          onYatirim={onYatirim}
          onYatirimDusur={onYatirimDusur}
          onCalisanAl={onCalisanAl}
          onEkipCikar={onEkipCikar}
        />
      )}
    </section>
  );
}
