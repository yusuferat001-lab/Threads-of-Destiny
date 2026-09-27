import { useState } from 'react';
import type { MagazaEsyaKarti, MagazaEsyaKategori, SahipOlunanEsya } from '../types';
import { formatPara } from '../format';
import { bic } from '../i18n';
import { useDil } from '../DilContext';
import { useMobilEkran } from '../hooks';
import { EnvanterPaneli } from './EnvanterPaneli';

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
  const { m, kt } = useDil();
  const mobil = useMobilEkran();
  const [sekme, setSekme] = useState<MagazaSekme>('sifa');
  const envanterSekmesiVar = mobil && !!envanterMagazaEnvanteri;
  const gosterilenler =
    sekme === 'envanter' ? [] : katalog.filter((esya) => esya.kategori === sekme);
  const kilitAciklamasi = gosterilenler.find((e) => e.kilitli)?.kilitAciklamasi;

  const sekmeBaslik = (kat: MagazaSekme) =>
    kat === 'sifa' ? m.mpSekmeSifa : kat === 'luks' ? m.mpSekmeLuks : m.enBaslikTam;
  const sekmeAciklama = sekme === 'sifa' ? m.mpSifaAciklama : sekme === 'luks' ? m.mpLuksAciklama : '';

  return (
    <div className="ekran ekran-tam-sayfa ekran-magaza">
      <h2>{m.mpBaslikTam}</h2>
      <p className="giris-aciklama">{bic(m.mpAciklama, formatPara(para), paraBirimi)}</p>

      <div className="magaza-sekmeleri">
        {(['sifa', 'luks', ...(envanterSekmesiVar ? (['envanter'] as const) : [])] as MagazaSekme[]).map(
          (kategori) => (
            <button
              key={kategori}
              className={`magaza-sekme${sekme === kategori ? ' magaza-sekme-aktif' : ''}`}
              disabled={yukleniyor}
              onClick={() => setSekme(kategori)}
            >
              {kategori === 'sifa' ? '🌿' : kategori === 'luks' ? '💎' : '🎒'} {sekmeBaslik(kategori)}
            </button>
          ),
        )}
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
        <div className="yatirim-kartlari yatirim-mulk-kartlari">
          {gosterilenler.map((esya) => {
            const satinAlinamaz = esya.kilitli || esya.sahipMi;
            return (
              <button
                key={esya.id}
                className={`yatirim-kart magaza-kart${esya.sahipMi ? ' mulk-kart-sahip' : ''}`}
                disabled={yukleniyor || satinAlinamaz || para < esya.fiyat}
                onClick={() => onSatinAl(esya.id)}
                title={`${kt(esya.aciklama)}${
                  esya.sifaFaydaAralik
                    ? `\n${bic(m.mpSifaSans, esya.sifaFaydaAralik.min, esya.sifaFaydaAralik.max)}`
                    : ''
                }`}
              >
                <span className="meslek-simge">{esya.simge}</span>
                <strong>
                  {kt(esya.ad)} {esya.sahipMi && m.mpSahipsinTam}
                </strong>
                <span className="meslek-aciklama magaza-etki-satiri">
                  {esya.saglikEtkisi ? `❤️ +${esya.saglikEtkisi} ` : ''}
                  {esya.mutlulukEtkisi ? `😊 +${esya.mutlulukEtkisi} ` : ''}
                  {esya.unEtkisi ? `⭐ +${esya.unEtkisi} ` : ''}
                  {esya.sifaFaydaAralik
                    ? `· %${esya.sifaFaydaAralik.min}-${esya.sifaFaydaAralik.max} ${m.mpFayda}`
                    : ''}
                  {esya.omurYil && !esya.sahipMi ? ` · ${bic(m.mpRafKisa, esya.omurYil)}` : ''}
                </span>
                {!esya.sahipMi && (
                  <span className="magaza-fiyat">
                    {formatPara(esya.fiyat)} {paraBirimi}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      )}

      <button className="ikincil tam-geri-buton" disabled={yukleniyor} onClick={onGeriDon}>
        {m.geriDon}
      </button>
    </div>
  );
}
