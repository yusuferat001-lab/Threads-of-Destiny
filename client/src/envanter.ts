/**
 * Karakterin oyun boyunca elde ettiği eşyalar, `etiketler` dizisinde
 * "envanter:" veya "esya:" önekiyle taşınır (bkz. server/src/data/olaylar.ts
 * içindeki etiket_ekle/etiket_sil kullanımları). Bu dosya o ham etiketleri
 * oyuncuya gösterilecek isim/ikon/açıklamaya çevirir.
 */
import type { Dil } from './ayarlar';

export interface EnvanterEsyasi {
  id: string;
  ad: string;
  simge: string;
  aciklama: string;
}

interface EnvanterEsyasiTanimi {
  ad: string;
  adEn: string;
  simge: string;
  aciklama: string;
  aciklamaEn: string;
}

const ENVANTER_ESYALARI: Record<string, EnvanterEsyasiTanimi> = {
  ejderha_tilsimi: {
    ad: 'Ejderha Tılsımı',
    adEn: 'Dragon Talisman',
    simge: '🐉',
    aciklama: 'Kadim rünlerle işli, kan kırmızısı bir tılsım. Taşıyana efsanevi bir güç verdiği söyleniyor.',
    aciklamaEn: 'A blood-red talisman worked with ancient runes. It is said to grant its bearer legendary power.',
  },
  kara_kilic: {
    ad: 'Kara Kılıç',
    adEn: 'Black Sword',
    simge: '🗡️',
    aciklama: 'Bir mezardan çıkarılan lanetli bir kılıç. Savaşta üstün bir güç verir ama içindeki fısıltılar hiç susmuyor.',
    aciklamaEn: 'A cursed sword taken from a grave. It grants superior power in battle, but the whispers within it never fall silent.',
  },
  melek_tuyu: {
    ad: 'Melek Tüyü',
    adEn: "Angel's Feather",
    simge: '🪽',
    aciklama: 'Ölmek üzere olan bir hacının emanet ettiği bembeyaz bir tüy. Kötülüğü kovduğuna inanılıyor.',
    aciklamaEn: 'A pure white feather entrusted by a dying pilgrim. It is believed to ward off evil.',
  },
  sirli_iksir: {
    ad: 'Mucize İksir',
    adEn: 'Miracle Elixir',
    simge: '🧪',
    aciklama: 'Gezici bir satıcıdan alınan, tuhaf bir şekilde ısınan mor bir sıvı. Gerçek gücü hâlâ bilinmiyor.',
    aciklamaEn: 'A purple liquid bought from a traveling peddler that grows strangely warm. Its true power is still unknown.',
  },
  olunun_yuzugu: {
    ad: 'Ölünün Yüzüğü',
    adEn: "Dead Man's Ring",
    simge: '💍',
    aciklama: 'Bir cenazenin karmaşasından fırsatla alınmış altın bir yüzük.',
    aciklamaEn: 'A gold ring lifted amid the confusion of a funeral.',
  },
  golge_sikke: {
    ad: 'Gölge Sikke',
    adEn: 'Shadow Coin',
    simge: '🌑',
    aciklama: 'Haritalarda olmayan bir sokakta, mutlu anılar karşılığında elde edilmiş soğuk, esrarengiz bir sikke.',
    aciklamaEn: 'A cold, uncanny coin obtained on a street that appears on no map, in exchange for happy memories.',
  },
  gizemli_harita: {
    ad: 'Gizemli Harita',
    adEn: 'Mysterious Map',
    simge: '📜',
    aciklama: 'Bir eskici tezgâhından çıkan, unutulmuş bir geçidi gösterdiği düşünülen restore edilmiş bir parşömen.',
    aciklamaEn: 'A restored parchment from a junk stall, thought to show a forgotten passage.',
  },
  hazine_haritasi: {
    ad: 'Hazine Haritası',
    adEn: 'Treasure Map',
    simge: '🗺️',
    aciklama: 'Şifreli işaretlerle dolu, henüz kazılmamış bir hazinenin yerini gösteren eski bir harita.',
    aciklamaEn: 'An old map full of coded marks, showing the site of a treasure not yet dug up.',
  },
  hazine_bulundu: {
    ad: 'Bulunmuş Hazine',
    adEn: 'Recovered Treasure',
    simge: '⛏️',
    aciklama: 'Haritanın işaret ettiği yerde ortaya çıkarılan hazinenin anısı.',
    aciklamaEn: 'The memory of the treasure unearthed at the spot the map pointed to.',
  },
  kutsal_kalinti: {
    ad: 'Kutsal Emanet',
    adEn: 'Holy Relic',
    simge: '✨',
    aciklama: 'Bilinmeyen bir azizeye ait olduğu söylenen bir emanet. Dokunanı ölümden bir kez döndürdüğüne inanılıyor.',
    aciklamaEn: 'A relic said to belong to an unknown saint. It is believed to bring the one who touches it back from death, once.',
  },
  lanetli_altin: {
    ad: 'Lanetli Altın',
    adEn: 'Cursed Gold',
    simge: '🪙',
    aciklama: 'Ucuza alınmış ama taşıyanın sağlığını yavaşça tükettiği söylenen bir altın kesesi.',
    aciklamaEn: 'A purse of gold bought cheap, but said to slowly drain its bearer’s health.',
  },
  veba_koruyucu_kedi: {
    ad: 'Manastırın Kara Kedisi',
    adEn: "The Monastery's Black Cat",
    simge: '🐈‍⬛',
    aciklama: 'Ambardaki fareleri —ve söylentiye göre vebayı— uzak tuttuğuna inanılan kutsanmış bir kara kedi.',
    aciklamaEn: 'A blessed black cat believed to keep the rats — and, rumor has it, the plague — away from the storehouse.',
  },
  atadan_kalma_kilic: {
    ad: 'Atadan Kalma Kılıç',
    adEn: 'Ancestral Sword',
    simge: '⚔️',
    aciklama: 'Kuşaklardır bir hizbin içinde elden ele geçen, ağır bir yeminle emanet edilmiş bir kılıç.',
    aciklamaEn: 'A sword passed hand to hand within a faction for generations, entrusted with a solemn oath.',
  },
  fisildayan_tas: {
    ad: 'Fısıldayan Taş',
    adEn: 'Whispering Stone',
    simge: '🪨',
    aciklama: 'Sıradan görünen gri bir taş. Bazen geceleri, kulağına gerçekten fısıldıyormuş gibi hissettiriyor.',
    aciklamaEn: 'An ordinary-looking grey stone. Some nights it feels as if it is truly whispering in your ear.',
  },
  eski_ayna: {
    ad: 'Eski Bir Ayna',
    adEn: 'An Old Mirror',
    simge: '🪞',
    aciklama: 'Terk edilmiş bir konaktan kalma, gümüş kaplamalı bir ayna. Yansıması bazen bir an geç geliyor.',
    aciklamaEn: 'A silver-backed mirror from an abandoned manor. Its reflection sometimes lags by a moment.',
  },
};

function baslikYap(id: string): string {
  return id
    .split('_')
    .map((parca) => parca.charAt(0).toLocaleUpperCase('tr') + parca.slice(1))
    .join(' ');
}

/** state.etiketler içinden envanter/eşya etiketlerini ayıklayıp gösterilecek listeye çevirir. */
export function envanterListesiCikar(etiketler: string[], dil: Dil = 'tr'): EnvanterEsyasi[] {
  const en = dil === 'en';
  return etiketler
    .filter((e) => e.startsWith('envanter:') || e.startsWith('esya:'))
    .map((e) => {
      const id = e.split(':')[1] ?? e;
      const bilinen = ENVANTER_ESYALARI[id];
      if (bilinen) {
        return {
          id,
          ad: en ? bilinen.adEn : bilinen.ad,
          simge: bilinen.simge,
          aciklama: en ? bilinen.aciklamaEn : bilinen.aciklama,
        };
      }
      return {
        id,
        ad: baslikYap(id),
        simge: '🎒',
        aciklama: en
          ? 'A mysterious item acquired during your journey.'
          : 'Yolculuğun sırasında edinilmiş gizemli bir eşya.',
      };
    });
}
