/**
 * Karakterin oyun boyunca elde ettiği eşyalar, `etiketler` dizisinde
 * "envanter:" veya "esya:" önekiyle taşınır (bkz. server/src/data/olaylar.ts
 * içindeki etiket_ekle/etiket_sil kullanımları). Bu dosya o ham etiketleri
 * oyuncuya gösterilecek isim/ikon/açıklamaya çevirir.
 */
export interface EnvanterEsyasi {
  id: string;
  ad: string;
  simge: string;
  aciklama: string;
}

const ENVANTER_ESYALARI: Record<string, Omit<EnvanterEsyasi, 'id'>> = {
  ejderha_tilsimi: {
    ad: 'Ejderha Tılsımı',
    simge: '🐉',
    aciklama: 'Kadim rünlerle işli, kan kırmızısı bir tılsım. Taşıyana efsanevi bir güç verdiği söyleniyor.',
  },
  kara_kilic: {
    ad: 'Kara Kılıç',
    simge: '🗡️',
    aciklama: 'Bir mezardan çıkarılan lanetli bir kılıç. Savaşta üstün bir güç verir ama içindeki fısıltılar hiç susmuyor.',
  },
  melek_tuyu: {
    ad: 'Melek Tüyü',
    simge: '🪽',
    aciklama: 'Ölmek üzere olan bir hacının emanet ettiği bembeyaz bir tüy. Kötülüğü kovduğuna inanılıyor.',
  },
  sirli_iksir: {
    ad: 'Mucize İksir',
    simge: '🧪',
    aciklama: 'Gezici bir satıcıdan alınan, tuhaf bir şekilde ısınan mor bir sıvı. Gerçek gücü hâlâ bilinmiyor.',
  },
  olunun_yuzugu: {
    ad: 'Ölünün Yüzüğü',
    simge: '💍',
    aciklama: 'Bir cenazenin karmaşasından fırsatla alınmış altın bir yüzük.',
  },
  golge_sikke: {
    ad: 'Gölge Sikke',
    simge: '🌑',
    aciklama: 'Haritalarda olmayan bir sokakta, mutlu anılar karşılığında elde edilmiş soğuk, esrarengiz bir sikke.',
  },
  gizemli_harita: {
    ad: 'Gizemli Harita',
    simge: '📜',
    aciklama: 'Bir eskici tezgâhından çıkan, unutulmuş bir geçidi gösterdiği düşünülen restore edilmiş bir parşömen.',
  },
  hazine_haritasi: {
    ad: 'Hazine Haritası',
    simge: '🗺️',
    aciklama: 'Şifreli işaretlerle dolu, henüz kazılmamış bir hazinenin yerini gösteren eski bir harita.',
  },
  hazine_bulundu: {
    ad: 'Bulunmuş Hazine',
    simge: '⛏️',
    aciklama: 'Haritanın işaret ettiği yerde ortaya çıkarılan hazinenin anısı.',
  },
  kutsal_kalinti: {
    ad: 'Kutsal Emanet',
    simge: '✨',
    aciklama: 'Bilinmeyen bir azizeye ait olduğu söylenen bir emanet. Dokunanı ölümden bir kez döndürdüğüne inanılıyor.',
  },
  lanetli_altin: {
    ad: 'Lanetli Altın',
    simge: '🪙',
    aciklama: 'Ucuza alınmış ama taşıyanın sağlığını yavaşça tükettiği söylenen bir altın kesesi.',
  },
  veba_koruyucu_kedi: {
    ad: 'Manastırın Kara Kedisi',
    simge: '🐈‍⬛',
    aciklama: 'Ambardaki fareleri —ve söylentiye göre vebayı— uzak tuttuğuna inanılan kutsanmış bir kara kedi.',
  },
  atadan_kalma_kilic: {
    ad: 'Atadan Kalma Kılıç',
    simge: '⚔️',
    aciklama: 'Kuşaklardır bir hizbin içinde elden ele geçen, ağır bir yeminle emanet edilmiş bir kılıç.',
  },
  fisildayan_tas: {
    ad: 'Fısıldayan Taş',
    simge: '🪨',
    aciklama: 'Sıradan görünen gri bir taş. Bazen geceleri, kulağına gerçekten fısıldıyormuş gibi hissettiriyor.',
  },
  eski_ayna: {
    ad: 'Eski Bir Ayna',
    simge: '🪞',
    aciklama: 'Terk edilmiş bir konaktan kalma, gümüş kaplamalı bir ayna. Yansıması bazen bir an geç geliyor.',
  },
};

function baslikYap(id: string): string {
  return id
    .split('_')
    .map((parca) => parca.charAt(0).toLocaleUpperCase('tr') + parca.slice(1))
    .join(' ');
}

/** state.etiketler içinden envanter/eşya etiketlerini ayıklayıp gösterilecek listeye çevirir. */
export function envanterListesiCikar(etiketler: string[]): EnvanterEsyasi[] {
  return etiketler
    .filter((e) => e.startsWith('envanter:') || e.startsWith('esya:'))
    .map((e) => {
      const id = e.split(':')[1] ?? e;
      const bilinen = ENVANTER_ESYALARI[id];
      return bilinen
        ? { id, ...bilinen }
        : { id, ad: baslikYap(id), simge: '🎒', aciklama: 'Yolculuğun sırasında edinilmiş gizemli bir eşya.' };
    });
}
