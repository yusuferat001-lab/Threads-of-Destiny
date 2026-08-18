import type { YatirimConfig, YatirimTuru } from '../types';

interface YatirimEkraniProps {
  meslek: string;
  para: number;
  paraBirimi: string;
  config: YatirimConfig;
  guvenliYatirimGetirisi: number;
  yukleniyor: boolean;
  islemMesaji: string | null;
  onYatirimYap: (tur: YatirimTuru, tutar?: number) => void;
  onGeriDon: () => void;
}

const KENDI_ISI_ACIKLAMA: Record<string, string> = {
  Asker: 'karşılığında birliğinin teçhizatı ve saldırı gücü (ya da teçhizat dolduysa ordu mevcudun) kalıcı olarak artar.',
  Tüccar: 'karşılığında ticaret sermayen kalıcı olarak büyür — bir tezgah/çalışan daha demektir.',
  'Din Adamı': 'karşılığında cemaat içindeki nüfuzun kalıcı olarak büyür.',
};

function kendiIsiAsamaEtiketi(yatirimSayisi: number): string {
  if (yatirimSayisi === 0) return 'Henüz hiç yatırım yapmadın.';
  if (yatirimSayisi <= 2) return `Şimdiye kadar ${yatirimSayisi} kez yatırım yaptın; işin büyümeye başladı.`;
  if (yatirimSayisi <= 5) return `${yatirimSayisi} yatırımla artık köklü, tanınan bir isimsin.`;
  return `${yatirimSayisi} yatırımla küçük bir imparatorluk kurdun.`;
}

export function YatirimEkrani({
  meslek,
  para,
  paraBirimi,
  config,
  guvenliYatirimGetirisi,
  yukleniyor,
  islemMesaji,
  onYatirimYap,
  onGeriDon,
}: YatirimEkraniProps) {
  const paraYetersiz = para < config.kendiIsiMaliyeti;
  const kendiIsiAciklama = KENDI_ISI_ACIKLAMA[meslek] ?? 'karşılığında kazancın kalıcı olarak artar.';

  return (
    <div className="ekran ekran-yatirim">
      <h2>Yatırım</h2>
      <p className="giris-aciklama">
        Elindeki {para} {paraBirimi} ile hayatını şekillendirebilirsin. Bir tur harcamadan, istediğin an karar
        verebilirsin.
      </p>

      {islemMesaji && <p className="yatirim-islem-mesaji">{islemMesaji}</p>}

      <div className="yatirim-kartlari">
        <button
          className="yatirim-kart"
          disabled={yukleniyor || paraYetersiz}
          onClick={() => onYatirimYap('kendi_isi')}
        >
          <span className="meslek-simge">💼</span>
          <strong>Kendi İşine Yatırım Yap</strong>
          <span className="meslek-aciklama">
            {config.kendiIsiMaliyeti} {paraBirimi} {kendiIsiAciklama}
          </span>
          <span className="meslek-aciklama">
            {kendiIsiAsamaEtiketi(config.kendiIsiYatirimSayisi)} Her yeni yatırım bir öncekinden daha pahalıya
            gelir.
          </span>
        </button>
      </div>

      <h3 className="yatirim-guvenli-baslik">Güvenli Yatırım</h3>
      <p className="giris-aciklama">
        Dilediğin kadar tekrar yatırabilirsin; her kademe kalıcı bir pasif gelir ekler ve ortalama{' '}
        {config.guvenliGeriOdemeTur} tur (ortalama ~{config.guvenliGeriOdemeTur * 2} yıl) içinde kendini amorti
        eder.
        {guvenliYatirimGetirisi > 0 &&
          ` Şu an toplam pasif gelirin: +${guvenliYatirimGetirisi} ${paraBirimi}/tur.`}
      </p>
      <div className="yatirim-kartlari yatirim-guvenli-kademeleri">
        {config.guvenliKademeleri.map((tutar) => {
          const getiri = Math.max(1, Math.round(tutar / config.guvenliGeriOdemeTur));
          return (
            <button
              key={tutar}
              className="yatirim-kart"
              disabled={yukleniyor || para < tutar}
              onClick={() => onYatirimYap('guvenli', tutar)}
            >
              <span className="meslek-simge">🏦</span>
              <strong>
                {tutar} {paraBirimi}
              </strong>
              <span className="meslek-aciklama">
                +{getiri} {paraBirimi}/tur kalıcı pasif gelir kazanırsın.
              </span>
            </button>
          );
        })}
      </div>

      <h3 className="yatirim-guvenli-baslik">Riskli Yatırım</h3>
      <p className="giris-aciklama">
        Spekülatif bir yatırım: kazanırsan büyük kazanırsın, kaybedersen yatırdığın her kuruş buhar olur. Şansa
        bağlı, tekrar tekrar denenebilir.
      </p>
      <div className="yatirim-kartlari">
        <button
          className="yatirim-kart yatirim-kart-riskli"
          disabled={yukleniyor || para < config.riskliMaliyeti}
          onClick={() => onYatirimYap('riskli')}
        >
          <span className="meslek-simge">🎲</span>
          <strong>
            {config.riskliMaliyeti} {paraBirimi}
          </strong>
          <span className="meslek-aciklama">
            Kazanırsan {Math.round(config.riskliMaliyeti * config.riskliKazancCarpani)} {paraBirimi} olur,
            kaybedersen tamamı gider.
          </span>
        </button>
      </div>

      <button className="ikincil" onClick={onGeriDon}>
        Devam Et
      </button>
    </div>
  );
}
