import { useEffect, useState } from 'react';
import type { BirlikGorunumu, BirlikKararGirdisi, BirlikTur, IsletmeGorunumu, IsletmeUyari, PazarDurumu } from '../types';
import { useDil } from '../DilContext';
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
  onKaliteYukselt: (hedef: 'orta' | 'yuksek', yuzde: number) => void;
  onBirlikSec: (seviye: number, turler: BirlikTur[]) => void;
  onKusatma: (seviye: number) => void;
  onTerhis: (adet: number) => void;
  onKiralik?: () => void;
  onYatirim: (yatirimId: string) => void;
  onYatirimDusur?: (yatirimId: string) => void;
  onCalisanAl: (adayId: string) => void;
  onEkipCikar: (ekipId: string) => void;
  /** Telefon ana ekranı sayfaları: yalnız bir bölümü çiz (varsayılan hepsi). */
  bolum?: 'hepsi' | 'isletme' | 'yatirim' | 'calisan';
}

type D = { tr: string; en: string };

/** Metinler bileşene gömülü (CemaatPaneli deseni): TR + EN aynı objede. */
const M = {
  baslik: { tr: '🛡️ Ordun', en: '🛡️ Your Army' },
  er: { tr: 'Erin', en: 'Men' },
  pay: { tr: 'Askerî payın', en: 'Military share' },
  guc: { tr: 'Askerî gücün', en: 'Military strength' },
  moral: { tr: 'Moral', en: 'Morale' },
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
    tr: 'Seviye arttıkça aynı anda seçili tür sayısı ve toplam pay artar. Birlikleri 5 yılda bir değiştirebilirsin; yalnız yenisini eklemek serbest.',
    en: 'A higher level means more unit types at once and a larger share. Units can be swapped once every 5 years; adding a new one is free.',
  },
  seviye: { tr: 'Seviye', en: 'Level' },
  toplamPay: { tr: 'toplam pay', en: 'total share' },
  uygula: { tr: 'Uygula', en: 'Apply' },
  kusatma: { tr: 'Kuşatma', en: 'Siege' },
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
  moral: { tr: 'Moral', en: 'Morale' },
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

export function BirlikPaneli({
  durum,
  pazar,
  yukleniyor,
  onBirlikKarar,
  onKaliteYukselt,
  onBirlikSec,
  onKusatma,
  onTerhis,
  onKiralik,
  onYatirim,
  onYatirimDusur,
  onCalisanAl,
  onEkipCikar,
  bolum = 'hepsi',
}: Props) {
  const { dil } = useDil();
  const t = (k: keyof typeof M) => M[k][dil];
  const d = (m: D) => m[dil];
  const b: BirlikGorunumu | null = durum.birlik;
  const pb = durum.paraBirimi;
  const erBirim = dil === 'en' ? '/man' : '/er';
  const [seviye, setSeviye] = useState(b?.birlik.seviye ?? 0);
  const [turler, setTurler] = useState<BirlikTur[]>(b?.birlik.seciliTurler ?? []);
  const [terhis, setTerhis] = useState(1);

  // Sunucudan gelen gerçek seçim değişince yerel seçimi eşitle.
  const seciliAnahtar = b ? `${b.birlik.seviye}|${b.birlik.seciliTurler.join(',')}` : '';
  useEffect(() => {
    if (!b) return;
    setSeviye(b.birlik.seviye);
    setTurler(b.birlik.seciliTurler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seciliAnahtar]);

  if (!durum.aktif || !b) return null;
  const dokum = durum.sonDokum;
  const uyariMetni = (u: IsletmeUyari): string => isletmeUyariMetni(u, durum, dil);
  const yuzdeMetni = (v: number, isaretli = true) => {
    const isaret = isaretli && v > 0 ? '+' : v < 0 ? '−' : '';
    return dil === 'en' ? `${isaret}${Math.abs(v)}%` : `${isaret}%${Math.abs(v)}`;
  };

  const politika = <T extends string>(
    baslik: string,
    secili: T,
    secenekler: { id: T; ad: D; ek?: string }[],
    onSec: (id: T) => void
  ) => (
    <div className="isletme-fiyat-satir">
      <span>{baslik}:</span>{' '}
      {secenekler.map((s) => (
        <button key={s.id} className={s.id === secili ? '' : 'ikincil'} disabled={yukleniyor || s.id === secili} onClick={() => onSec(s.id)} title={s.ek}>
          {d(s.ad)}
        </button>
      ))}
    </div>
  );

  const turSec = (id: BirlikTur) => {
    if (turler.includes(id)) setTurler(turler.filter((x) => x !== id));
    else if (seviye === 3) return;
    else if (turler.length < seviye) setTurler([...turler, id]);
    else setTurler([...turler.slice(1), id]);
  };
  const seviyeSec = (s: number) => {
    setSeviye(s);
    if (s === 3) setTurler(b.birlik.turler.map((x) => x.id));
    else setTurler(turler.slice(0, s));
  };
  const birlikDegisti = seviye !== b.birlik.seviye || turler.slice().sort().join() !== b.birlik.seciliTurler.slice().sort().join();
  const birlikGecerli = seviye === 0 || turler.length === seviye;
  const hedefKaliteler = (['dusuk', 'orta', 'yuksek'] as const).map((id) => ({ id, ad: b.kalite.adlar[id] }));
  const kilitli = b.kalite.kilitKalanYil > 0;

  return (
    <>
      {(bolum === 'hepsi' || bolum === 'isletme') && (
        <>
          <h4>{t('baslik')}</h4>
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
            {b.yarali.sayi > 0 && (
              <span>
                🩹 {t('yarali')}: <strong>{b.yarali.sayi}</strong>
              </span>
            )}
            <span>
              💪 {t('guc')}: <strong>{b.guc.toplam}</strong>
            </span>
            <span>
              🙂 {t('moral')}: <strong>{b.moral.deger}</strong> ({yuzdeMetni(b.moral.gucYuzde)})
            </span>
            <span>
              🎖️ {t('talim')}: <strong>{b.talim.seviye}</strong> ({yuzdeMetni(b.talim.gucYuzde)})
            </span>
            {durum.otorite && (
              <span>
                🏛️ {t('otorite')}: <strong>{kt(dil, durum.otorite)}</strong> · {t('iliski')} {durum.otoriteIliski}
              </span>
            )}
          </div>

          {b.rakipler.length > 0 && (
            <div className="isletme-imtiyazlar">
              <strong>{t('rakipBaslik')}:</strong>{' '}
              {b.rakipler.map((r) => `${r.ad} — ${t('rakipGuc')} ${r.guc}`).join(' · ')}
            </div>
          )}

          <h4>{t('gucBaslik')}</h4>
          <div className="isletme-dokum">
            <div>
              {t('ham')}: <strong>{b.guc.ham}</strong>
              <small>
                {' '}
                ({(['dusuk', 'orta', 'yuksek'] as const).map((k) => `${KALITE_SIMGE[k]} ${b.kalite.sayilar[k]}×${b.guc.kaliteCarpani[k]}`).join(' · ')})
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

          <h4>
            {t('gorevBaslik')} ({b.gorevler.slot.kullanilan}/{b.gorevler.slot.toplam} {t('slot')})
          </h4>
          <div className="isletme-fiyat-not">{t('gorevNot')}</div>
          <div className="isletme-hatlar">
            {b.gorevler.katalog.map((g) => {
              const secili = b.gorevler.secili.includes(g.id);
              const dolu = !secili && b.gorevler.secili.length >= b.gorevler.slot.toplam;
              return (
                <div key={g.id} className={`isletme-hat${secili ? ' isletme-hat-acik' : ''}${!g.kullanilabilir ? ' isletme-hat-kilitli' : ''}`}>
                  <div className="isletme-hat-baslik">
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
                  <div className="isletme-hat-artieksi">
                    <span>{d(g.aciklama)}</span>
                  </div>
                  <div className="isletme-hat-satir">
                    <span>
                      {t('minEr')} {g.minEr} · {t('kazanc')}: {formatPara(g.erBasi)} {pb}{erBirim}
                    </span>
                    {g.aktif && (
                      <span>
                        🪖 {g.erPayi} · {t('toplamKazanc')}: {formatPara(g.gelir)} {pb}
                        {g.ganimet > 0 ? ` · ${t('ganimet')} ${formatPara(g.ganimet)}` : ''}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <h4>{t('politikaBaslik')}</h4>
          {politika(
            t('ganimetPayi'),
            b.politikalar.ganimetPayi.secili,
            b.politikalar.ganimetPayi.secenekler.map((s) => ({ id: s.id, ad: s.ad, ek: `%${Math.round(s.oran * 100)}` })),
            (id) => onBirlikKarar({ ganimet_payi: id })
          )}
          {politika(
            t('talimPol'),
            b.talim.politika,
            b.talim.politikalar.map((s) => ({ id: s.id, ad: s.ad, ek: `${s.delta > 0 ? '+' : ''}${s.delta}/${t('yilKisa')} · ${formatPara(s.masraf)} ${pb}` })),
            (id) => onBirlikKarar({ talim: id })
          )}
          {politika(
            t('tonPol'),
            b.politikalar.ton.secili,
            b.politikalar.ton.secenekler.map((s) => ({ id: s.id, ad: s.ad, ek: d(s.aciklama) })),
            (id) => onBirlikKarar({ ton: id })
          )}

          <h4>{t('donatimBaslik')}: {d(b.kalite.techizat)}</h4>
          <div className="isletme-fiyat-not">{t('donatimNot')}</div>
          <div className="isletme-ozet">
            {(['dusuk', 'orta', 'yuksek'] as const).map((k) => (
              <span key={k}>
                {KALITE_SIMGE[k]} {d(b.kalite.adlar[k])}: <strong>{b.kalite.sayilar[k]}</strong>
              </span>
            ))}
          </div>
          {politika(
            t('hedefKalite'),
            b.kalite.hedef,
            hedefKaliteler.map((s) => ({ id: s.id, ad: s.ad })),
            (id) => onBirlikKarar({ hedef_kalite: id })
          )}
          <div className="isletme-fiyat-satir">
            {(['orta', 'yuksek'] as const).map((k) => (
              <span key={k}>
                {d(b.kalite.adlar[k])}:{' '}
                {[50, 100].map((y) => (
                  <button key={y} className="ikincil" disabled={yukleniyor || kilitli} onClick={() => onKaliteYukselt(k, y)} >
                    {t('yukselt')} %{y}
                  </button>
                ))}{' '}
              </span>
            ))}
            {kilitli && (
              <small>
                {t('kilit')}
                {b.kalite.kilitKalanYil} {t('yilKisa')}
              </small>
            )}
          </div>

          <h4>{t('birlikBaslik')}</h4>
          <div className="isletme-fiyat-not">{t('birlikNot')}</div>
          <div className="isletme-fiyat-satir">
            <span>{t('seviye')}:</span>{' '}
            {[0, 1, 2, 3].map((s) => (
              <button key={s} className={s === seviye ? '' : 'ikincil'} disabled={yukleniyor} onClick={() => seviyeSec(s)}>
                {s}
                {s > 0 ? ` (%${Math.round(b.birlik.seviyePaylari[s] * 100)})` : ''}
              </button>
            ))}
          </div>
          <div className="isletme-yatirimlar">
            {b.birlik.turler.map((tur) => {
              const secili = turler.includes(tur.id);
              return (
                <div key={tur.id} className="isletme-yatirim">
                  <strong>
                    {tur.simge} {d(tur.ad)}
                  </strong>
                  <span>
                    ⚔️ ×{tur.saldiri} · 🛡️ ×{tur.savunma} · {formatPara(tur.ucret)} {pb}{erBirim}
                  </span>
                  <small>
                    ＋ {d(tur.arti)} · － {d(tur.eksi)}
                  </small>
                  <button className={secili ? '' : 'ikincil'} disabled={yukleniyor || seviye === 0 || seviye === 3} onClick={() => turSec(tur.id)}>
                    {secili ? '✓' : '+'}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="isletme-fiyat-satir">
            <button disabled={yukleniyor || !birlikDegisti || !birlikGecerli || (b.birlik.kilitKalanYil > 0 && seviye < b.birlik.seviye)} onClick={() => onBirlikSec(seviye, turler)}>
              {t('uygula')}
            </button>
            {b.birlik.kilitKalanYil > 0 && (
              <small>
                {t('kilit')}
                {b.birlik.kilitKalanYil} {t('yilKisa')}
              </small>
            )}
            <small>
              {' '}
              {t('toplamPay')}: %{Math.round(b.birlik.toplamPay * 100)}
            </small>
          </div>
          <div className="isletme-fiyat-satir">
            <span>
              {t('kusatma')}: {d(b.birlik.kusatma.ad)}
            </span>{' '}
            {[0, 1, 2].map((s) => (
              <button
                key={s}
                className={s === b.birlik.kusatma.seviye ? '' : 'ikincil'}
                disabled={yukleniyor || s === b.birlik.kusatma.seviye}
                onClick={() => onKusatma(s)}
                title={s > 0 ? `${formatPara(b.birlik.kusatma.fiyatlar[s] ?? 0)} ${pb} · +%${Math.round((b.birlik.kusatma.bonuslar[s] ?? 0) * 100)}` : ''}
              >
                {s}
              </button>
            ))}
          </div>

          <h4>{t('terhisBaslik')}</h4>
          <div className="isletme-fiyat-not">{t('terhisNot')}</div>
          <div className="isletme-fiyat-satir">
            <input type="number" min={1} max={Math.max(1, b.er - 6)} value={terhis} onChange={(e) => setTerhis(Math.max(1, Math.floor(Number(e.target.value) || 1)))} style={{ width: 70 }} />{' '}
            <button className="ikincil" disabled={yukleniyor || b.savas.aktif || b.er - 6 < 1} onClick={() => onTerhis(terhis)}>
              {t('terhisEt')}
            </button>
          </div>

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
                  <small>{doktrinEtkiMetni(o.etki, dil).join(' · ')}</small>
                </div>
              ))}
            </div>
          )}

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

          <h4>{t('dokumBaslik')}</h4>
          <div className="isletme-dokum">
            <div>{d(b.hesap.soldAdi)}: <strong>+{formatPara(b.hesap.sold)}</strong></div>
            <div>{t('gorevGeliri')}: <strong>+{formatPara(b.hesap.gorevGeliri)}</strong></div>
            <div>{t('ganimetNet')}: <strong>+{formatPara(b.hesap.ganimetNet)}</strong></div>
            {b.hesap.kaleGeliri > 0 && <div>{t('gKale')}: <strong>+{formatPara(b.hesap.kaleGeliri)}</strong></div>}
            <div>{t('toplamGelir')}: <strong>+{formatPara(b.hesap.toplamGelir)}</strong></div>
            <div>{t('gErMasrafi')}: <strong>−{formatPara(b.hesap.erMasrafi)}</strong></div>
            <div>{t('gErzak')}: <strong>−{formatPara(b.hesap.erzak)}</strong></div>
            {b.hesap.kiralikMasrafi > 0 && <div>{t('gKiralik')}: <strong>−{formatPara(b.hesap.kiralikMasrafi)}</strong></div>}
            <div>{t('gKisla')}: <strong>−{formatPara(b.hesap.kislaBakim)}</strong></div>
            <div>{t('gTechizat')}: <strong>−{formatPara(b.hesap.techizatBakim)}</strong></div>
            {b.hesap.yaraliGideri > 0 && <div>{t('gYarali')}: <strong>−{formatPara(b.hesap.yaraliGideri)}</strong></div>}
            {b.hesap.limitAsimGideri > 0 && <div>{t('gAsim')}: <strong>−{formatPara(b.hesap.limitAsimGideri)}</strong></div>}
            {b.hesap.kusatmaBakim > 0 && <div>{t('gKusatma')}: <strong>−{formatPara(b.hesap.kusatmaBakim)}</strong></div>}
            <div>{t('gTalim')}: <strong>−{formatPara(b.hesap.talimMasrafi)}</strong></div>
            <div className="isletme-dokum-net">
              {t('beklenenNet')}: <strong>~{b.hesap.net >= 0 ? '+' : ''}{formatPara(b.hesap.net)} {pb}{t('yil')}</strong>
            </div>
            <small>{t('ekipNot')}</small>
          </div>

          {dokum && dokum.birlik && (
            <div className="isletme-dokum">
              <div>
                {t('sonDokum')} ({dokum.yil}): 🪖 {dokum.musteri} · {dokum.birlik.firar} {t('firar')} · {dokum.birlik.olen} {t('olen')} · {t('ganimetNet').split(' ')[0]} {formatPara(dokum.birlik.ganimetPara)}
              </div>
              {dokum.uyarilar.map((u, i) => {
                const s = uyariMetni(u);
                return s ? <div key={i}>{s}</div> : null;
              })}
            </div>
          )}

          {pazar && pazar.aktif && <PiyasaHaberleri pazar={pazar} sayilarGoster={false} />}
        </>
      )}

      <IsletmeOrtak
        goster={bolum === 'isletme' ? 'yok' : bolum}
        durum={durum}
        yukleniyor={yukleniyor}
        sadakatAdi={{ tr: 'Sadakat', en: 'Loyalty' }}
        riskliAciklama={{ tr: 'Sadakati düşük: sırlarını sızdırabilir, erleri ayartabilir, işi bırakabilir', en: 'Low loyalty: may leak secrets, lure men away or quit' }}
        onYatirim={onYatirim}
        onYatirimDusur={onYatirimDusur}
        onCalisanAl={onCalisanAl}
        onEkipCikar={onEkipCikar}
      />
    </>
  );
}
