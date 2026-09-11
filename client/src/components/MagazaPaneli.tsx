import { useState } from 'react';
import type { MagazaEsyaKarti, MagazaEsyaKategori } from '../types';
import { formatPara } from '../format';
import { bic } from '../i18n';
import { useDil } from '../DilContext';

interface MagazaPaneliProps {
  para: number;
  paraBirimi: string;
  katalog: MagazaEsyaKarti[];
  yukleniyor: boolean;
  islemMesaji: string | null;
  onSatinAl: (katalogId: string) => void;
  onGeriDon: () => void;
}

export function MagazaPaneli({ para, paraBirimi, katalog, yukleniyor, islemMesaji, onSatinAl, onGeriDon }: MagazaPaneliProps) {
  const { m, kt } = useDil();
  const [sekme, setSekme] = useState<MagazaEsyaKategori>('sifa');
  const gosterilenler = katalog.filter((esya) => esya.kategori === sekme);
  const kilitAciklamasi = gosterilenler.find((e) => e.kilitli)?.kilitAciklamasi;

  const sekmeBaslik = (kat: MagazaEsyaKategori) => (kat === 'sifa' ? m.mpSekmeSifa : m.mpSekmeLuks);
  const sekmeAciklama = sekme === 'sifa' ? m.mpSifaAciklama : m.mpLuksAciklama;

  return (
    <div className="ekran ekran-tam-sayfa ekran-magaza">
      <h2>{m.mpBaslikTam}</h2>
      <p className="giris-aciklama">{bic(m.mpAciklama, formatPara(para), paraBirimi)}</p>

      <div className="magaza-sekmeleri">
        {(['sifa', 'luks'] as MagazaEsyaKategori[]).map((kategori) => (
          <button
            key={kategori}
            className={`magaza-sekme${sekme === kategori ? ' magaza-sekme-aktif' : ''}`}
            disabled={yukleniyor}
            onClick={() => setSekme(kategori)}
          >
            {kategori === 'sifa' ? '🌿' : '💎'} {sekmeBaslik(kategori)}
          </button>
        ))}
      </div>
      <p className="giris-aciklama magaza-sekme-aciklama tam-yardimci-metin">{sekmeAciklama}</p>

      {islemMesaji && <p className="yatirim-islem-mesaji">{islemMesaji}</p>}
      {kilitAciklamasi && <p className="yatirim-islem-mesaji magaza-kilit-mesaji">{bic(m.mpKilitli, kilitAciklamasi)}</p>}

      {gosterilenler.length === 0 && (
        <p className="yatirim-islem-mesaji">{m.mpKategoriBos}</p>
      )}

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

      <button className="ikincil tam-geri-buton" disabled={yukleniyor} onClick={onGeriDon}>
        {m.geriDon}
      </button>
    </div>
  );
}
