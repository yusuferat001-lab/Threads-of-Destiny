import { useEffect, useState } from 'react';
import { useDil } from '../DilContext';
import { formatPara } from '../format';
import { yonetimDurumGetir } from '../api';
import type { YonetimTalep } from '../types';
import { kazancTamlama } from '../isletmeAdi';

type Karar = 'kabul' | 'ret' | 'yalan' | 'rusvet';

const M = {
  baslikVergi: { tr: 'Ekstra Vergi', en: 'Extra Tax' },
  vergiGovde: {
    tr: '{0} {3} kazancını fark etti ve senden ekstra vergi istiyor: {1} {2}.',
    en: '{0} has noticed {3} earnings and demands an extra tax: {1} {2}.',
  },
  bagis: { tr: '{kalem} — {1} {2} istiyor.', en: '{kalem} — demanded: {1} {2}.' },
  sadakat: { tr: '{kalem} bekliyor.', en: '{kalem} awaited.' },
  aciklama: { tr: 'Senden istiyor: {kalem}.', en: 'Asks you to {kalem}.' },
  dinUyari: {
    tr: 'Yaparsan: otorite +13–15, ahlak −7–8, inanan −%3. Yapmazsan: otorite −18–20, ahlak +2, şöhret −3, inanan +%2.',
    en: 'Do it: authority +13–15, morality −7–8, your flock −3%. Refuse: authority −18–20, morality +2, fame −3 and your flock +2%.',
  },
  zorunlu: { tr: 'Yanıt vermeden hayatına devam edemezsin.', en: 'You cannot carry on until you answer.' },
  paraYok: { tr: 'Paran yetmiyor — ödeyemezsin, ama reddedebilirsin.', en: "You can't afford it — but you may refuse." },
  ode: { tr: 'Öde', en: 'Pay' },
  kabul: { tr: 'Kabul et', en: 'Swear it' },
  yap: { tr: 'Yap', en: 'Do it' },
  yapma: { tr: 'Yapma', en: "Don't" },
  reddet: { tr: 'Reddet', en: 'Refuse' },
  kac: { tr: 'Kaç', en: 'Flee' },
  paramYok: { tr: '“Param yok” de', en: '“I’m broke”' },
  rusvet: { tr: 'Rüşvet ver', en: 'Offer a bribe' },
};

/**
 * Kapatılamaz tam ekran otorite talebi penceresi (bağış / sadakat / açıklama / ekstra vergi).
 * Yanıtlanmadan oyun ilerlemez (sunucu da /scenario, /choice ve /yil-gec'i reddeder).
 * Yerelleştirilmiş gerekçe ve yönetici adı için yönetim durumu bu pencere açılırken bir kez çekilir.
 */
export function OtoriteTalebi({
  stateId,
  talep,
  meslek,
  para,
  paraBirimi,
  yukleniyor,
  onKarar,
}: {
  stateId: string;
  talep: YonetimTalep;
  meslek?: string | null;
  para: number;
  paraBirimi: string;
  yukleniyor: boolean;
  onKarar: (karar: Karar) => void;
}) {
  const { dil } = useDil();
  const [yerel, setYerel] = useState<{ id: string; kimAdi: string; kalem: string; tekOtorite: boolean } | null>(null);

  useEffect(() => {
    let iptal = false;
    yonetimDurumGetir(stateId)
      .then((d) => {
        if (!iptal && d.talep?.id === talep.id) setYerel({ id: talep.id, kimAdi: d.talep.kimAdi, kalem: d.talep.kalem, tekOtorite: d.tekOtorite });
      })
      .catch(() => {
        /* yerelleştirme alınamazsa ham metin gösterilir */
      });
    return () => {
      iptal = true;
    };
  }, [stateId, talep.id]);

  const g = yerel && yerel.id === talep.id ? yerel : null;
  const kimAdi = g?.kimAdi ?? talep.kimAdi;
  const kalem = g?.kalem ?? talep.kalem;
  const dinMi = meslek === 'Din Adamı' && talep.kimden === 'yonetici';
  // Dört işletmeli meslekte tek otorite (şehir yöneticisi) vardır; yönetim durumu gelene dek bunu varsay.
  const tekOtorite = g?.tekOtorite ?? true;
  const hukumdar = talep.kimden === 'yonetici' && !tekOtorite;
  const paraYetmiyor = talep.tur === 'bagis' && talep.tutar > para;

  const rakam = (s: string) => s.replace('{1}', formatPara(talep.tutar)).replace('{2}', paraBirimi);
  let govde: string;
  if (talep.tur === 'vergi') {
    govde = M.vergiGovde[dil].replace('{0}', kimAdi).replace('{1}', formatPara(talep.tutar)).replace('{2}', paraBirimi).replace('{3}', kazancTamlama(meslek, dil));
  } else if (talep.tur === 'bagis') {
    govde = rakam(M.bagis[dil].replace('{kalem}', kalem));
  } else if (talep.tur === 'aciklama') {
    govde = M.aciklama[dil].replace('{kalem}', kalem);
  } else {
    govde = M.sadakat[dil].replace('{kalem}', kalem);
  }

  const dugme = (karar: Karar, etiket: string, pasif = false) => (
    <div className="ogreti-kart">
      <button disabled={yukleniyor || pasif} onClick={() => onKarar(karar)}>
        {etiket}
      </button>
    </div>
  );

  return (
    <div className="ogreti-katman zemin-koyu" role="alertdialog" aria-modal="true">
      <div className="ogreti-kutu">
        <h2>{hukumdar ? '👑' : '🏛️'} {talep.tur === 'vergi' ? M.baslikVergi[dil] : kimAdi}</h2>
        <p>{govde}</p>
        {dinMi && talep.tur === 'aciklama' && <p className="ogreti-seviye">{M.dinUyari[dil]}</p>}
        {paraYetmiyor && <p className="ogreti-seviye">{M.paraYok[dil]}</p>}
        <p className="ogreti-seviye">{M.zorunlu[dil]}</p>
        <div className="ogreti-kartlar">
          {talep.tur === 'vergi' ? (
            <>
              {dugme('kabul', M.ode[dil])}
              {dugme('rusvet', M.rusvet[dil])}
            </>
          ) : dinMi ? (
            <>
              {dugme('kabul', M.yap[dil], paraYetmiyor)}
              {dugme('ret', M.yapma[dil])}
            </>
          ) : (
            <>
              {dugme('kabul', talep.tur === 'bagis' ? M.ode[dil] : M.kabul[dil], paraYetmiyor)}
              {dugme('ret', hukumdar ? M.kac[dil] : M.reddet[dil])}
              {talep.tur === 'bagis' && !hukumdar && dugme('yalan', M.paramYok[dil])}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
