interface IsDetayEkraniProps {
  meslek: string;
  rutbe: string;
  rutbeSeviye: number;
  amirAdi: string | null;
  amirRutbe: string | null;
  maasYillik: number;
  paraBirimi: string;
  orduMevcudu: number;
  orduTechizatSeviyesi: number;
  ticaretSermaye: number;
  nufuz: number;
  sehirYonetimSeviyesi: number;
  sehirYonetimUnvan: string | null;
  onYatirimEkranina: () => void;
  onGeriDon: () => void;
}

export function IsDetayEkrani({
  meslek,
  rutbe,
  rutbeSeviye,
  amirAdi,
  amirRutbe,
  maasYillik,
  paraBirimi,
  orduMevcudu,
  orduTechizatSeviyesi,
  ticaretSermaye,
  nufuz,
  sehirYonetimSeviyesi,
  sehirYonetimUnvan,
  onYatirimEkranina,
  onGeriDon,
}: IsDetayEkraniProps) {
  const saldiriGucu = Math.round(orduMevcudu * (1 + orduTechizatSeviyesi / 100));

  return (
    <div className="ekran ekran-is-detay">
      <h2>İşin</h2>

      <div className="is-detay-karti">
        <div className="finans-satiri">
          <span>Unvan</span>
          <span>
            {rutbe} ({meslek})
          </span>
        </div>
        <div className="finans-satiri">
          <span>Kademe</span>
          <span className="kademe-gostergesi" aria-label={`Kademe ${rutbeSeviye} / 3`}>
            {[1, 2, 3].map((seviye) => (
              <span key={seviye} className={`kademe-nokta${seviye <= rutbeSeviye ? ' kademe-nokta-dolu' : ''}`} />
            ))}
          </span>
        </div>
        <div className="finans-satiri">
          <span>Yıllık kazanç</span>
          <span>
            ~{maasYillik} {paraBirimi}
          </span>
        </div>
        {amirAdi && (
          <div className="finans-satiri">
            <span>Amirin</span>
            <span>
              {amirRutbe} {amirAdi}
            </span>
          </div>
        )}
        {sehirYonetimSeviyesi > 0 && (
          <div className="finans-satiri sehir-yonetim-satiri">
            <span>🏛️ Şehir Yönetimi</span>
            <span>
              {sehirYonetimUnvan} · Seviye {sehirYonetimSeviyesi}
            </span>
          </div>
        )}

        {meslek === 'Asker' && (
          <>
            <h3>Ordun</h3>
            <div className="finans-satiri">
              <span>⚔️ Ordu mevcudu</span>
              <span>{orduMevcudu} asker</span>
            </div>
            <div className="finans-satiri">
              <span>🛡️ Teçhizat seviyesi</span>
              <span>%{orduTechizatSeviyesi}</span>
            </div>
            <div className="finans-satiri">
              <span>💥 Saldırı gücü</span>
              <span>{saldiriGucu}</span>
            </div>
          </>
        )}

        {meslek === 'Tüccar' && (
          <>
            <h3>Ticaretin</h3>
            <div className="finans-satiri">
              <span>📈 Ticaret sermayesi</span>
              <span>
                {ticaretSermaye} {paraBirimi}
              </span>
            </div>
          </>
        )}

        {meslek === 'Din Adamı' && (
          <>
            <h3>Nüfuzun</h3>
            <div className="finans-satiri">
              <span>🕊️ Nüfuz</span>
              <span>{nufuz}</span>
            </div>
          </>
        )}
      </div>

      <button onClick={onYatirimEkranina}>Yatırım Yap →</button>
      <button className="ikincil" onClick={onGeriDon}>
        Devam Et
      </button>
    </div>
  );
}
