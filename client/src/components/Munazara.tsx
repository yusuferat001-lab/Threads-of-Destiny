import { useEffect, useState } from 'react';
import type { CemaatMunazaraGorunumu, MunazaraSonucu } from '../types';
import { isletmeGetir } from '../api';
import { useDil } from '../DilContext';
import { KararKatman, KararOnay, KararSatiri } from './KararKabuk';

const M = {
  baslik: { tr: 'Münazara', en: 'Disputation' },
  alt: {
    bidat: { tr: 'seni bid\'atle suçlayıp kürsüde tartışmaya çağırdı. Cevap vermeden hayat devam etmez.', en: 'accuses you of heresy and calls you to dispute in public. Life waits for your answer.' },
    muridcalma: { tr: 'müritlerini çekmeye çalışıyor ve seni halkın önünde tartışmaya çağırdı. Cevap vermeden hayat devam etmez.', en: 'is luring your followers and calls you to dispute before the people. Life waits for your answer.' },
    aforoz: { tr: 'seni aforoza çağıran bir dava açtı; kürsüde cevap vermelisin. Cevap vermeden hayat devam etmez.', en: 'has brought a case to have you cast out; you must answer at the lectern. Life waits for your answer.' },
  },
  ilim: { tr: 'Delille cevap ver', en: 'Answer with scripture' },
  ilimDetay: { tr: 'Kitaptan ve ilimden delil getirirsin. Ahlak, okul ve âlimlerin güçlendirir; doktrin tartışmasında daha etkilidir.', en: 'You argue from scripture and learning. Morality, school and scholars strengthen you; best in doctrinal fights.' },
  halk: { tr: 'Halka seslen', en: 'Appeal to the people' },
  halkDetay: { tr: 'Kalabalığa seslenirsin. Şöhretin ve cemaatin güçlendirir; mürit çekişmesinde daha etkilidir. Kazanırsan daha çok inanan getirir ama fanatikliği yükseltir.', en: 'You rouse the crowd. Fame and flock strengthen you; best in a fight over followers. A win brings more believers but raises zealotry.' },
  cekil: { tr: 'Geri çekil', en: 'Withdraw' },
  cekilDetay: { tr: 'Tartışmaya girmezsin; zararın bir kısmını yersin ama kürsüde rezil olmazsın. Zafer serin sıfırlanır.', en: 'You decline the debate and take part of the damage without being shamed. Your winning streak resets.' },
  gucun: { tr: 'Gücün', en: 'Your strength' },
  rakipGuc: { tr: 'Rakip (tahmin)', en: 'Rival (estimate)' },
  hazirlikli: { tr: 'Rakip seni tanıyor; bu sefer hazırlıklı.', en: 'The rival knows you; this time they came prepared.' },
  sec: { tr: 'Bir yaklaşım seç.', en: 'Pick an approach.' },
  onayla: { tr: 'Bu yaklaşımla cevap ver', en: 'Answer this way' },
  yukleniyor: { tr: 'Yükleniyor…', en: 'Loading…' },
  kazandin: { tr: 'Münazarayı kazandın', en: 'You won the disputation' },
  kaybettin: { tr: 'Münazarayı kaybettin', en: 'You lost the disputation' },
  cekildin: { tr: 'Geri çekildin', en: 'You withdrew' },
  inanan: { tr: 'inanan', en: 'believers' },
  sohret: { tr: 'şöhret', en: 'fame' },
  ahlak: { tr: 'ahlak', en: 'morality' },
  otorite: { tr: 'otorite', en: 'authority' },
  devam: { tr: 'Devam', en: 'Continue' },
  degisimYok: { tr: 'Belirgin bir değişim olmadı.', en: 'Nothing changed noticeably.' },
};

function Cip({ metin, artı }: { metin: string; artı: boolean }) {
  return <span className={`kk-cip ${artı ? 's-arti' : 's-eksi'}`}>{metin}</span>;
}

/** Kapatılamaz münazara penceresi (rakip saldırısı): iki yaklaşım + geri çekilme; sonra sonuç özeti. */
export function Munazara({
  stateId,
  sonuc,
  yukleniyor,
  onVer,
  onKapat,
}: {
  stateId: string;
  sonuc: MunazaraSonucu | null;
  yukleniyor: boolean;
  onVer: (secim: 'ilim' | 'halk' | 'cekil') => void;
  onKapat: () => void;
}) {
  const { dil } = useDil();
  const [d, setD] = useState<CemaatMunazaraGorunumu | null>(null);
  const [secim, setSecim] = useState<'ilim' | 'halk' | 'cekil' | null>(null);
  useEffect(() => {
    if (sonuc) return;
    let iptal = false;
    setSecim(null);
    isletmeGetir(stateId)
      .then((g) => {
        if (!iptal) setD(g.cemaat?.munazara ?? null);
      })
      .catch(() => {});
    return () => {
      iptal = true;
    };
  }, [stateId, sonuc]);

  if (sonuc) {
    const satirlar: { metin: string; artı: boolean }[] = [];
    const ekle = (n: number, ad: string) => n !== 0 && satirlar.push({ metin: `${n > 0 ? '+' : ''}${n} ${ad}`, artı: n > 0 });
    ekle(sonuc.musteriDegisim, M.inanan[dil]);
    ekle(sonuc.sohretDegisim, M.sohret[dil]);
    ekle(sonuc.ahlakDegisim, M.ahlak[dil]);
    ekle(sonuc.otoriteDegisim, M.otorite[dil]);
    const baslik = sonuc.zafer === null ? M.cekildin : sonuc.zafer ? M.kazandin : M.kaybettin;
    return (
      <KararKatman simge={sonuc.zafer ? '🏆' : sonuc.zafer === null ? '🕊️' : '📉'} baslik={baslik[dil]} alt={sonuc.rakip}>
        <div className="kk-liste kk-secimler">
          {satirlar.length === 0 ? <p className="kk-alt">{M.degisimYok[dil]}</p> : satirlar.map((s) => <Cip key={s.metin} metin={s.metin} artı={s.artı} />)}
        </div>
        <KararOnay not="" etiket={M.devam[dil]} disabled={yukleniyor} onClick={onKapat} />
      </KararKatman>
    );
  }

  return (
    <KararKatman simge="🎙️" baslik={M.baslik[dil]} alt={d ? `${d.rakip} ${M.alt[d.saldiri][dil]}` : ''}>
      {d === null ? (
        <p className="kk-alt">{M.yukleniyor[dil]}</p>
      ) : (
        <>
          <div className="kk-liste kk-secimler">
            <KararSatiri
              kol="evrensel"
              simge="📖"
              ad={M[`ilim`][dil]}
              cipler={<Cip metin={`${M.gucun[dil]}: ${d.oyuncu.ilim}`} artı />}
              detay={M.ilimDetay[dil]}
              secili={secim === 'ilim'}
              disabled={yukleniyor}
              onClick={() => setSecim('ilim')}
            />
            <KararSatiri
              kol="sert"
              simge="🗣️"
              ad={M.halk[dil]}
              cipler={<Cip metin={`${M.gucun[dil]}: ${d.oyuncu.halk}`} artı />}
              detay={M.halkDetay[dil]}
              secili={secim === 'halk'}
              disabled={yukleniyor}
              onClick={() => setSecim('halk')}
            />
            <KararSatiri
              kol="sadik"
              simge="🕊️"
              ad={M.cekil[dil]}
              detay={M.cekilDetay[dil]}
              secili={secim === 'cekil'}
              disabled={yukleniyor}
              onClick={() => setSecim('cekil')}
            />
          </div>
          <p className="kk-alt">
            {M.rakipGuc[dil]}: {d.rakipAralik[0]}–{d.rakipAralik[1]}
            {d.hazirlikli ? ` · ${M.hazirlikli[dil]}` : ''}
          </p>
          <KararOnay not={secim ? '' : M.sec[dil]} etiket={M.onayla[dil]} disabled={yukleniyor || !secim} onClick={() => secim && onVer(secim)} />
        </>
      )}
    </KararKatman>
  );
}
