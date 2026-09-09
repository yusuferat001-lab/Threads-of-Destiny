import { useEffect, useRef, useState } from 'react';
import type { ZarSonucu, UcKagitciSonucu, BilekGuresiSonucu } from '../types';
import { formatPara } from '../format';
import { bic } from '../i18n';
import { useDil } from '../DilContext';

const ZAR_YUZLERI = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

interface OrtakProps {
  para: number;
  paraBirimi: string;
  kademeler: number[];
  yukleniyor: boolean;
}

// ---------------------------------------------------------------------------
// Hazard — iki kemik zar, "Zar At"
// ---------------------------------------------------------------------------

export function HazardWidget({
  para,
  paraBirimi,
  kademeler,
  yukleniyor,
  onZarAt,
}: OrtakProps & { onZarAt: (tutar: number) => Promise<ZarSonucu | null> }) {
  const { m } = useDil();
  const [bahis, setBahis] = useState<number>(kademeler[0] ?? 10);
  const [donuyor, setDonuyor] = useState(false);
  const [sonuc, setSonuc] = useState<ZarSonucu | null>(null);
  const [sahteZar, setSahteZar] = useState<[number, number]>([5, 3]);
  const [sahteRakipZar, setSahteRakipZar] = useState<[number, number]>([2, 6]);

  useEffect(() => {
    if (!donuyor) return;
    const t = setInterval(() => {
      setSahteZar([1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 6)]);
      setSahteRakipZar([1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 6)]);
    }, 90);
    return () => clearInterval(t);
  }, [donuyor]);

  useEffect(() => {
    if (kademeler.length && !kademeler.includes(bahis)) setBahis(kademeler[0]);
  }, [kademeler, bahis]);

  async function at() {
    if (donuyor || yukleniyor) return;
    setSonuc(null);
    setDonuyor(true);
    const r = await onZarAt(bahis);
    setTimeout(() => {
      setDonuyor(false);
      setSonuc(r);
    }, 2000);
  }

  const bitti = !!sonuc && !donuyor;
  const senZar = bitti ? sonuc!.senZar : sahteZar;
  const rakipZar = bitti ? sonuc!.rakipZar : sahteRakipZar;

  return (
    <div className="mini-oyun mini-oyun-hazard" title={m.moHazardAciklama}>
      <h4 className="mini-oyun-baslik">{m.moHazardBaslik}</h4>

      <div className={`hazard-masa${donuyor ? ' hazard-donuyor' : ''}`} aria-hidden="true">
        <div className={`hazard-taraf${bitti && sonuc!.kazandi ? ' hazard-taraf-kazanan' : ''}`}>
          <span className="hazard-taraf-etiket">{m.moSen}</span>
          <div className="hazard-zarlar">
            <span className="hazard-zar">{ZAR_YUZLERI[senZar[0] - 1]}</span>
            <span className="hazard-zar">{ZAR_YUZLERI[senZar[1] - 1]}</span>
          </div>
        </div>
        <div className={`hazard-taraf${bitti && !sonuc!.kazandi ? ' hazard-taraf-kazanan' : ''}`}>
          <span className="hazard-taraf-etiket">{m.moRakip}</span>
          <div className="hazard-zarlar">
            <span className="hazard-zar">{ZAR_YUZLERI[rakipZar[0] - 1]}</span>
            <span className="hazard-zar">{ZAR_YUZLERI[rakipZar[1] - 1]}</span>
          </div>
        </div>
      </div>

      {bitti && (
        <p className={`mini-oyun-sonuc ${sonuc!.kazandi ? 'mini-oyun-kazanc' : 'mini-oyun-kayip'}`}>
          {sonuc!.mesaj}
        </p>
      )}

      <div className="mini-oyun-bahisler">
        {kademeler.map((k) => (
          <button
            key={k}
            className={`mini-bahis-cip${bahis === k ? ' mini-bahis-aktif' : ''}`}
            disabled={donuyor || yukleniyor || para < k}
            onClick={() => setBahis(k)}
          >
            {formatPara(k)}
          </button>
        ))}
      </div>

      <button className="mini-oyun-buton" disabled={donuyor || yukleniyor || para < bahis} onClick={at}>
        {donuyor ? m.moZarDonuyor : bic(m.moZarAt, formatPara(bahis), paraBirimi)}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Üç Kağıtçı — 3 bardak, bul karayı al parayı
// ---------------------------------------------------------------------------

type UcAsama = 'hazir' | 'karisiyor' | 'sec' | 'sonuc';

export function UcKagitciWidget({
  para,
  paraBirimi,
  kademeler,
  yukleniyor,
  onUcKagitci,
}: OrtakProps & { onUcKagitci: (tutar: number, secim: number) => Promise<UcKagitciSonucu | null> }) {
  const { m } = useDil();
  const [bahis, setBahis] = useState<number>(kademeler[0] ?? 10);
  const [asama, setAsama] = useState<UcAsama>('hazir');
  const [sonuc, setSonuc] = useState<UcKagitciSonucu | null>(null);
  const [secim, setSecim] = useState<number | null>(null);

  useEffect(() => {
    if (kademeler.length && !kademeler.includes(bahis)) setBahis(kademeler[0]);
  }, [kademeler, bahis]);

  function basla() {
    if (yukleniyor || para < bahis) return;
    setSonuc(null);
    setSecim(null);
    setAsama('karisiyor');
    setTimeout(() => setAsama('sec'), 1200);
  }

  async function bardakSec(i: number) {
    if (asama !== 'sec') return;
    setSecim(i);
    const r = await onUcKagitci(bahis, i);
    setSonuc(r);
    setAsama('sonuc');
  }

  return (
    <div className="mini-oyun mini-oyun-uckagit" title={m.moUcKagitAciklama}>
      <h4 className="mini-oyun-baslik">{m.moUcKagitBaslik}</h4>

      <div className={`uc-bardaklar uc-asama-${asama}`}>
        {[0, 1, 2].map((i) => {
          const kazananBardak = sonuc && i === sonuc.dogruBardak;
          const secilen = secim === i;
          return (
            <button
              key={i}
              className={`uc-bardak${secilen ? ' uc-bardak-secilen' : ''}${
                asama === 'sonuc' && kazananBardak ? ' uc-bardak-kazanan' : ''
              }`}
              disabled={asama !== 'sec'}
              onClick={() => bardakSec(i)}
            >
              <span className="uc-bardak-govde">🥃</span>
              {asama === 'sonuc' && kazananBardak && <span className="uc-para">🪙</span>}
            </button>
          );
        })}
      </div>

      {asama === 'sonuc' && sonuc && (
        <p className={`mini-oyun-sonuc ${sonuc.kazandi ? 'mini-oyun-kazanc' : 'mini-oyun-kayip'}`}>{sonuc.mesaj}</p>
      )}

      <div className="mini-oyun-bahisler">
        {kademeler.map((k) => (
          <button
            key={k}
            className={`mini-bahis-cip${bahis === k ? ' mini-bahis-aktif' : ''}`}
            disabled={asama === 'karisiyor' || asama === 'sec' || yukleniyor || para < k}
            onClick={() => setBahis(k)}
          >
            {formatPara(k)}
          </button>
        ))}
      </div>

      {asama === 'sec' ? (
        <p className="mini-oyun-ipucu">{m.moUcKagitSec}</p>
      ) : (
        <button
          className="mini-oyun-buton"
          disabled={asama === 'karisiyor' || yukleniyor || para < bahis}
          onClick={basla}
        >
          {asama === 'karisiyor'
            ? m.moUcKagitKarisiyor
            : asama === 'sonuc'
              ? m.moTekrar
              : bic(m.moUcKagitBasla, formatPara(bahis), paraBirimi)}
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bilek Güreşi — 5 saniyede 30 dokunuş
// ---------------------------------------------------------------------------

const BILEK_HEDEF = 30;
const BILEK_SURE_MS = 5000;
type BilekAsama = 'hazir' | 'oynaniyor' | 'sonuc';

export function BilekGuresiWidget({
  yukleniyor,
  onBilekGuresi,
}: {
  yukleniyor: boolean;
  onBilekGuresi: (basarili: boolean) => Promise<BilekGuresiSonucu | null>;
}) {
  const { m } = useDil();
  const [asama, setAsama] = useState<BilekAsama>('hazir');
  const [tik, setTik] = useState(0);
  const [kalanMs, setKalanMs] = useState(BILEK_SURE_MS);
  const [sonuc, setSonuc] = useState<BilekGuresiSonucu | null>(null);
  const tikRef = useRef(0);
  const bitisRef = useRef(0);

  useEffect(() => {
    if (asama !== 'oynaniyor') return;
    bitisRef.current = Date.now() + BILEK_SURE_MS;
    const t = setInterval(async () => {
      const kalan = Math.max(0, bitisRef.current - Date.now());
      setKalanMs(kalan);
      if (kalan <= 0) {
        clearInterval(t);
        const basardi = tikRef.current >= BILEK_HEDEF;
        const r = await onBilekGuresi(basardi);
        setSonuc(r);
        setAsama('sonuc');
      }
    }, 100);
    return () => clearInterval(t);
  }, [asama, onBilekGuresi]);

  function basla() {
    if (yukleniyor) return;
    tikRef.current = 0;
    setTik(0);
    setKalanMs(BILEK_SURE_MS);
    setSonuc(null);
    setAsama('oynaniyor');
  }

  function it() {
    if (asama !== 'oynaniyor') return;
    tikRef.current += 1;
    setTik(tikRef.current);
  }

  const oran = Math.min(1, tik / BILEK_HEDEF);

  return (
    <div className="mini-oyun mini-oyun-bilek" title={m.moBilekAciklama}>
      <h4 className="mini-oyun-baslik">{m.moBilekBaslik}</h4>

      <div className="bilek-bar">
        <div className="bilek-bar-dolgu" style={{ width: `${oran * 100}%` }} />
        <span className="bilek-bar-etiket">
          {tik} / {BILEK_HEDEF}
        </span>
      </div>

      {asama === 'oynaniyor' && (
        <p className="mini-oyun-ipucu">{bic(m.moBilekKalan, (kalanMs / 1000).toFixed(1))}</p>
      )}
      {asama === 'sonuc' && sonuc && (
        <p className={`mini-oyun-sonuc ${tik >= BILEK_HEDEF ? 'mini-oyun-kazanc' : 'mini-oyun-kayip'}`}>{sonuc.mesaj}</p>
      )}

      {asama === 'oynaniyor' ? (
        <button className="mini-oyun-buton bilek-it-buton" onClick={it}>
          {m.moBilekIt}
        </button>
      ) : (
        <button className="mini-oyun-buton" disabled={yukleniyor} onClick={basla}>
          {asama === 'sonuc' ? m.moTekrar : m.moBilekBasla}
        </button>
      )}
    </div>
  );
}
