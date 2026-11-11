/** Mesleğe göre "işletmen" adı (Asker ordu, Tüccar dükkân, Zanaatkâr atölye, Din Adamı cemaat). Bildirim ve pencere metinlerinde tek kaynak. */
export type IsletmeTuru = 'Asker' | 'Tüccar' | 'Zanaatkâr' | 'Din Adamı';

const AD: Record<IsletmeTuru, { tr: { yalin: string; bulunma: string; tamlayan: string }; en: { yalin: string; konum: string } }> = {
  Asker: { tr: { yalin: 'ordun', bulunma: 'ordunda', tamlayan: 'ordunun' }, en: { yalin: 'army', konum: 'in your army' } },
  Tüccar: { tr: { yalin: 'dükkânın', bulunma: 'dükkânında', tamlayan: 'dükkânının' }, en: { yalin: 'shop', konum: 'at your shop' } },
  Zanaatkâr: { tr: { yalin: 'atölyen', bulunma: 'atölyende', tamlayan: 'atölyenin' }, en: { yalin: 'workshop', konum: 'at your workshop' } },
  'Din Adamı': { tr: { yalin: 'cemaatin', bulunma: 'cemaatinde', tamlayan: 'cemaatinin' }, en: { yalin: 'parish', konum: 'in your parish' } },
};

export function isletmeTuru(meslek: string | null | undefined): IsletmeTuru {
  return meslek === 'Asker' || meslek === 'Zanaatkâr' || meslek === 'Din Adamı' ? meslek : 'Tüccar';
}

/** "Geçen yıl {ordunda} olanlar" / "What happened {in your army} last year". */
export function gecenYilBaslik(meslek: string | null | undefined, dil: 'tr' | 'en'): string {
  const a = AD[isletmeTuru(meslek)];
  return dil === 'en' ? `What happened ${a.en.konum} last year` : `Geçen yıl ${a.tr.bulunma} olanlar`;
}

/** Ekstra vergi metni için "{ordunun} kazancı" / "your army's earnings". */
export function kazancTamlama(meslek: string | null | undefined, dil: 'tr' | 'en'): string {
  const a = AD[isletmeTuru(meslek)];
  return dil === 'en' ? `your ${a.en.yalin}'s` : a.tr.tamlayan;
}
