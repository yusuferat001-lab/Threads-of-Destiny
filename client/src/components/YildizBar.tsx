function YildizSlotu({ doluluk }: { doluluk: number }) {
  return (
    <span className="yildiz-slotu">
      <span className="yildiz-arka">★</span>
      <span className="yildiz-on" style={{ width: `${doluluk * 100}%` }}>
        ★
      </span>
    </span>
  );
}

export function YildizBar({ yildiz, etiket }: { yildiz: number; etiket: string }) {
  const slotSayisi = Math.max(1, Math.ceil(yildiz));
  const slotlar = Array.from({ length: slotSayisi }, (_, i) => Math.max(0, Math.min(1, yildiz - i)));
  return (
    <div className="yildiz-bar">
      <div className="yildiz-slotlari" role="img" aria-label={`${yildiz.toFixed(1)} yıldız`}>
        {slotlar.map((d, i) => (
          <span key={i} aria-hidden="true">
            <YildizSlotu doluluk={d} />
          </span>
        ))}
      </div>
      <span className="dikey-bar-etiket">{etiket}</span>
    </div>
  );
}
