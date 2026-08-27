import { useState } from 'react';
import type { MagazaEsyaKarti, MagazaEsyaKategori } from '../types';
import { formatPara } from '../format';

interface MagazaPaneliProps {
  para: number;
  paraBirimi: string;
  katalog: MagazaEsyaKarti[];
  yukleniyor: boolean;
  islemMesaji: string | null;
  onSatinAl: (katalogId: string) => void;
  onGeriDon: () => void;
}

const SEKME_BASLIK: Record<MagazaEsyaKategori, string> = {
  sifa: 'Temel Tüketim & Şifa',
  luks: 'Lüks Tüketim',
};

const SEKME_ACIKLAMA: Record<MagazaEsyaKategori, string> = {
  sifa: 'Sağlık ve mutluluk verir; kullanılmazsa bir süre sonra çürüyüp envanterden silinir. Bir sifa ürünü almak, kategorinin tamamını bir süreliğine kilitler.',
  luks: 'Satın alınca hemen ün/statü kazandırır; çürümez ama her türden en fazla bir tane sahiplenilir, ve arada bir bakım/vergi masrafı çıkarır.',
};

export function MagazaPaneli({ para, paraBirimi, katalog, yukleniyor, islemMesaji, onSatinAl, onGeriDon }: MagazaPaneliProps) {
  const [sekme, setSekme] = useState<MagazaEsyaKategori>('sifa');
  const gosterilenler = katalog.filter((esya) => esya.kategori === sekme);
  const kilitAciklamasi = gosterilenler.find((e) => e.kilitli)?.kilitAciklamasi;

  return (
    <div className="ekran ekran-tam-sayfa ekran-magaza">
      <h2>Mağaza</h2>
      <p className="giris-aciklama">
        Elindeki {formatPara(para)} {paraBirimi} ile alışveriş yapabilirsin. Fiyatlar sabit değil — savaş, kıtlık, veba ve
        bolluk gibi durumlara göre anlık değişir.
      </p>

      <div className="magaza-sekmeleri">
        {(['sifa', 'luks'] as MagazaEsyaKategori[]).map((kategori) => (
          <button
            key={kategori}
            className={`magaza-sekme${sekme === kategori ? ' magaza-sekme-aktif' : ''}`}
            disabled={yukleniyor}
            onClick={() => setSekme(kategori)}
          >
            {kategori === 'sifa' ? '🌿' : '💎'} {SEKME_BASLIK[kategori]}
          </button>
        ))}
      </div>
      <p className="giris-aciklama magaza-sekme-aciklama">{SEKME_ACIKLAMA[sekme]}</p>

      {islemMesaji && <p className="yatirim-islem-mesaji">{islemMesaji}</p>}
      {kilitAciklamasi && <p className="yatirim-islem-mesaji magaza-kilit-mesaji">🔒 {kilitAciklamasi}</p>}

      {gosterilenler.length === 0 && (
        <p className="yatirim-islem-mesaji">Bu kategoride şu an çağına uygun bir eşya yok.</p>
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
              >
                <span className="meslek-simge">{esya.simge}</span>
                <strong>
                  {esya.ad} {esya.sahipMi && '· Sahipsin'}
                </strong>
                <span className="meslek-aciklama">{esya.aciklama}</span>
                <span className="meslek-aciklama magaza-etki-satiri">
                  {esya.saglikEtkisi ? `❤️ +${esya.saglikEtkisi} sağlık ` : ''}
                  {esya.mutlulukEtkisi ? `😊 +${esya.mutlulukEtkisi} mutluluk ` : ''}
                  {esya.unEtkisi ? `⭐ +${esya.unEtkisi} ün ` : ''}
                </span>
                {esya.omurYil && !esya.sahipMi && (
                  <span className="magaza-omur-uyarisi">⏳ {esya.omurYil} yıl içinde kullanılmazsa çürür</span>
                )}
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
        Geri Dön
      </button>
    </div>
  );
}
