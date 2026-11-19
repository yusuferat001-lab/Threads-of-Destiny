import { useState } from 'react';
import type { MagazaEsyaKarti, MagazaEsyaKategori, SahipOlunanEsya } from '../types';
import { formatPara, formatYuzdeAralik } from '../format';
import { bic } from '../i18n';
import { useDil } from '../DilContext';
import { useMobilEkran } from '../hooks';
import { EnvanterPaneli } from './EnvanterPaneli';
import { KararOnay, KararSatiri } from './KararKabuk';

/** Şifa/Lüks sekmelerinin yanına, SADECE mobilde eklenen 3. sekme — sol panel
 * kaldırılınca EnvanterPaneli'nin (envanter/hediye) yeni evi (§4). Masaüstünde
 * bu sekme hiç render edilmez, EnvanterPaneli hâlâ sol panelde. */
type MagazaSekme = MagazaEsyaKategori | 'envanter';

interface MagazaPaneliProps {
  para: number;
  paraBirimi: string;
  katalog: MagazaEsyaKarti[];
  yukleniyor: boolean;
  islemMesaji: string | null;
  onSatinAl: (katalogId: string) => void;
  onGeriDon: () => void;
  // Mobilde 3. sekme olarak EnvanterPaneli'yi mount etmek için — hepsi opsiyonel,
  // verilmezse (masaüstünde onEnvanterKullan/onEnvanterHediye geçirilmez) sekme
  // hiç görünmez.
  envanterEtiketler?: string[];
  envanterMagazaEnvanteri?: SahipOlunanEsya[];
  envanterEvli?: boolean;
  envanterYasayanCocuklar?: string[];
  envanterEkip?: { id: string; isim: string; rol: string }[];
  envanterDostAdi?: string;
  onEnvanterKullan?: (esyaId: string) => void;
  onEnvanterHediye?: (
    esyaId: string,
    hedef: 'es' | 'cocuk' | 'ekip' | 'dost',
    opts?: { cocukIndex?: number; ekipId?: string },
  ) => void;
}

export function MagazaPaneli({
  para,
  paraBirimi,
  katalog,
  yukleniyor,
  islemMesaji,
  onSatinAl,
  onGeriDon,
  envanterEtiketler,
  envanterMagazaEnvanteri,
  envanterEvli,
  envanterYasayanCocuklar,
  envanterEkip,
  envanterDostAdi,
  onEnvanterKullan,
  onEnvanterHediye,
}: MagazaPaneliProps) {
  const { m, kt, dil } = useDil();
  const mobil = useMobilEkran();
  const [sekme, setSekme] = useState<MagazaSekme>('sifa');
  const [secim, setSecim] = useState<string | null>(null);
  const envanterSekmesiVar = mobil && !!envanterMagazaEnvanteri;
  // Sanat ve Binek artık "Lüks Tüketim" sekmesinin içinde (v70): aynı anda en çok 5 ürün, 3 yılda bir değişir.
  const LUKS_GRUBU: MagazaEsyaKategori[] = ['luks', 'sanat', 'binek'];
  const gosterilenler =
    sekme === 'envanter' ? [] : katalog.filter((esya) => (sekme === 'luks' ? LUKS_GRUBU.includes(esya.kategori) : esya.kategori === sekme));
  const kilitAciklamasi = gosterilenler.find((e) => e.kilitli)?.kilitAciklamasi;
  const seciliEsya = gosterilenler.find((e) => e.id === secim) ?? null;

  const SEKME_BASLIK: Record<MagazaSekme, string> = {
    sifa: m.mpSekmeSifa,
    luks: m.mpSekmeLuks,
    sanat: m.mpSekmeSanat,
    binek: m.mpSekmeBinek,
    envanter: m.enBaslikTam,
  };
  const SEKME_SIMGE: Record<MagazaSekme, string> = { sifa: '🌿', luks: '💎', sanat: '🖼️', binek: '🐎', envanter: '🎒' };
  const SEKME_ACIKLAMA: Record<MagazaSekme, string> = {
    sifa: m.mpSifaAciklama,
    luks: m.mpLuksAciklama,
    sanat: m.mpSanatAciklama,
    binek: m.mpBinekAciklama,
    envanter: '',
  };
  const sekmeAciklama = SEKME_ACIKLAMA[sekme];
  const sekmeDegistir = (k: MagazaSekme) => {
    setSekme(k);
    setSecim(null);
  };

  return (
    <div className="ekran ekran-tam-sayfa ekran-yan ekran-magaza">
      <h2>{m.mpBaslikTam}</h2>
      <p className="giris-aciklama">{bic(m.mpAciklama, formatPara(para), paraBirimi)}</p>

      <div className="magaza-sekmeleri">
        {(['sifa', 'luks', ...(envanterSekmesiVar ? (['envanter'] as const) : [])] as MagazaSekme[]).map((kategori) => (
          <button
            key={kategori}
            className={`magaza-sekme${sekme === kategori ? ' magaza-sekme-aktif' : ''}`}
            disabled={yukleniyor}
            onClick={() => sekmeDegistir(kategori)}
          >
            {SEKME_SIMGE[kategori]} {SEKME_BASLIK[kategori]}
          </button>
        ))}
      </div>
      {sekme !== 'envanter' && (
        <p className="giris-aciklama magaza-sekme-aciklama tam-yardimci-metin">{sekmeAciklama}</p>
      )}

      {islemMesaji && <p className="yatirim-islem-mesaji">{islemMesaji}</p>}
      {sekme !== 'envanter' && kilitAciklamasi && (
        <p className="yatirim-islem-mesaji magaza-kilit-mesaji">{bic(m.mpKilitli, kilitAciklamasi)}</p>
      )}

      {sekme !== 'envanter' && gosterilenler.length === 0 && (
        <p className="yatirim-islem-mesaji">{m.mpKategoriBos}</p>
      )}

      {sekme === 'envanter' ? (
        <div className="tam-kaydirilan">
          <EnvanterPaneli
            etiketler={envanterEtiketler ?? []}
            magazaEnvanteri={envanterMagazaEnvanteri ?? []}
            evli={envanterEvli}
            yasayanCocuklar={envanterYasayanCocuklar}
            ekip={envanterEkip}
            dostAdi={envanterDostAdi}
            yukleniyor={yukleniyor}
            onKullan={onEnvanterKullan}
            onHediye={onEnvanterHediye}
          />
        </div>
      ) : (
        <div className="tam-kaydirilan">
          <div className="kk-liste kk-ikili">
            {gosterilenler.map((esya) => {
              const satinAlinamaz = esya.kilitli || esya.sahipMi;
              const dalAdi = esya.sahipMi ? m.mpSahipsinTam.replace(/[()·]/g, '').trim() : esya.kategori === 'sifa' ? m.mpSekmeSifa.split(' & ')[0] : SEKME_BASLIK[esya.kategori];
              return (
                <KararSatiri
                  key={esya.id}
                  kol={esya.kategori === 'sifa' ? 'evrensel' : 'sadik'}
                  simge={esya.simge}
                  dal={dalAdi}
                  ad={kt(esya.ad)}
                  cipler={
                    <>
                      {esya.saglikEtkisi ? <span className="kk-cip s-arti">❤️ +{esya.saglikEtkisi}</span> : null}
                      {esya.mutlulukEtkisi ? <span className="kk-cip s-arti">😊 +{esya.mutlulukEtkisi}</span> : null}
                      {esya.unEtkisi ? <span className="kk-cip s-arti">⭐ +{esya.unEtkisi}</span> : null}
                      {esya.sifaFaydaAralik ? <span className="kk-cip">{formatYuzdeAralik(dil, esya.sifaFaydaAralik.min, esya.sifaFaydaAralik.max)} {m.mpFayda}</span> : null}
                      {esya.omurYil && !esya.sahipMi ? <span className="kk-cip">{bic(m.mpRafKisa, esya.omurYil)}</span> : null}
                      {!esya.sahipMi && <span className="kk-cip s-gider">{formatPara(esya.fiyat)} {paraBirimi}</span>}
                    </>
                  }
                  detay={kt(esya.aciklama)}
                  secili={secim === esya.id}
                  disabled={yukleniyor || satinAlinamaz || para < esya.fiyat}
                  onClick={() => setSecim(esya.id)}
                />
              );
            })}
          </div>
          <KararOnay
            not={seciliEsya ? (seciliEsya.sifaFaydaAralik ? bic(m.mpSifaSans, seciliEsya.sifaFaydaAralik.min, seciliEsya.sifaFaydaAralik.max) : '') : dil === 'en' ? 'Pick an item.' : 'Bir ürün seç.'}
            etiket={dil === 'en' ? 'Buy' : 'Satın al'}
            disabled={yukleniyor || !seciliEsya}
            onClick={() => {
              if (!seciliEsya) return;
              onSatinAl(seciliEsya.id);
              setSecim(null);
            }}
          />
        </div>
      )}

      <button className="ikincil tam-geri-buton" disabled={yukleniyor} onClick={onGeriDon}>
        {m.geriDon}
      </button>
    </div>
  );
}
