import { expect, type Page } from '@playwright/test';

export type Dil = 'tr' | 'en';

const METIN = {
  tr: { yenilik: /Anladım/, yeni: /Yeni Hayata/, cag: /Orta Çağ/, bolge: /Fransa/, isimBasla: /Bu İsimle/ },
  en: { yenilik: /Got it/, yeni: /Begin a New Life/, cag: /Middle Ages/, bolge: /France/, isimBasla: /Start With This Name/i },
};

/** Ana sayfayı açar, varsa "Neler Yeni" penceresini kapatır. */
export async function ac(page: Page, dil: Dil = 'tr') {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const tamam = page.getByRole('button', { name: METIN[dil].yenilik });
  if (await tamam.isVisible().catch(() => false)) await tamam.click();
}

/** Giriş → çağ → bölge → isim; meslek (açılış) ekranında durur. */
export async function acilisEkranina(page: Page, dil: Dil = 'tr') {
  const m = METIN[dil];
  await ac(page, dil);
  await page.getByRole('button', { name: m.yeni }).first().click();
  await page.getByRole('button', { name: m.cag }).first().click();
  await page.getByRole('button', { name: m.bolge }).first().click();
  await page.locator('input:visible').first().fill('Test');
  await page.getByRole('button', { name: m.isimBasla }).first().click();
  await expect(page.locator('.acilis-ekran')).toBeVisible();
}

/** Meslek seç (varsayılan Tüccar) + Devam Et; ilk olay kutusu görünene dek bekler (ürün/öğreti modallarını geçer). */
export async function oyunaBasla(page: Page, meslekIndeks = 1, dil: Dil = 'tr') {
  await acilisEkranina(page, dil);
  await page.locator('.meslek-secim-kart').nth(meslekIndeks).click();
  await page.locator('.acilis-devam').click();
  // Tüccar/Zanaatkâr: ana ürün modalı; Din Adamı/Asker: öğreti/doktrin. Hepsi ilk seçeneği alır.
  for (let i = 0; i < 6; i++) {
    if (await page.locator('.olay-kutusu').isVisible().catch(() => false)) break;
    const modal = page.locator('.ogreti-katman');
    if (await modal.isVisible().catch(() => false)) {
      await modal.locator('button:not([disabled])').first().click();
    }
    await page.waitForTimeout(400);
  }
  await expect(page.locator('.olay-kutusu')).toBeVisible();
}

/** Ekrandaki olayı (şık + Devam) çözer. */
export async function olayiCoz(page: Page) {
  await page.locator('.olay-kutusu .secenek:not([disabled])').first().click();
  await page.locator('.olay-devam').click();
}

/** Bekleyen (zincirleme dahil) olaylar bitip ana ekran/İLERLE açılana dek olayları çözer. */
export async function anaEkranaGec(page: Page) {
  for (let i = 0; i < 8; i++) {
    if (await page.locator('.ana-ekran').isVisible().catch(() => false)) return;
    if (await page.locator('.olay-devam').isVisible().catch(() => false)) {
      await page.locator('.olay-devam').click();
    } else if (await page.locator('.olay-kutusu .secenek:not([disabled])').first().isVisible().catch(() => false)) {
      await page.locator('.olay-kutusu .secenek:not([disabled])').first().click();
    }
    await page.waitForTimeout(500);
  }
  await expect(page.locator('.ana-ekran')).toBeVisible();
}

export interface Olcum {
  kucukHedef: string[];
  kucukYazi: string[];
  yatayTasma: boolean;
  mainSayisi: number;
  h1Sayisi: number;
}

/**
 * Görünen ekranı ölçer: dokunma hedefi (mobilde ::after ile genişletilen alan dahil), en küçük yazı boyutu,
 * yatay taşma, landmark sayısı. `minHedef`/`minYazi` 0 ise ilgili ölçüm atlanır.
 */
export async function olc(page: Page, minHedef: number, minYazi: number): Promise<Olcum> {
  return page.evaluate(
    ([minHedef, minYazi]) => {
      const gorunur = (e: Element) => {
        const r = e.getBoundingClientRect();
        const cs = getComputedStyle(e);
        return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight && cs.visibility !== 'hidden';
      };
      const ad = (e: Element) => `${(String((e as HTMLElement).className).split(' ')[0] || e.tagName)}:${(e.textContent ?? '').trim().slice(0, 14)}`;
      const kucukHedef: string[] = [];
      if (minHedef > 0) {
        for (const e of document.querySelectorAll('button, a[href], input, select, [role=button]')) {
          if (!gorunur(e)) continue;
          const r = e.getBoundingClientRect();
          let w = r.width;
          let h = r.height;
          const a = getComputedStyle(e, '::after');
          if (a.content && a.content !== 'none' && a.position === 'absolute') {
            const n = (s: string) => parseFloat(s) || 0;
            h += -n(a.top) - n(a.bottom);
            w += -n(a.left) - n(a.right);
          }
          if (w < minHedef - 0.6 || h < minHedef - 0.6) kucukHedef.push(`${ad(e)} ${Math.round(w)}x${Math.round(h)}`);
        }
      }
      const kucukYazi: string[] = [];
      if (minYazi > 0) {
        for (const e of document.querySelectorAll('body *')) {
          if (!gorunur(e)) continue;
          if (e.closest('.sr-only')) continue;
          const kendi = [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent ?? '').join('').trim();
          if (kendi.length < 2) continue;
          const f = parseFloat(getComputedStyle(e).fontSize);
          if (f < minYazi) kucukYazi.push(`${ad(e)} ${f.toFixed(1)}px`);
        }
      }
      return {
        kucukHedef,
        kucukYazi,
        yatayTasma: document.documentElement.scrollWidth > innerWidth + 1,
        mainSayisi: document.querySelectorAll('main').length,
        h1Sayisi: document.querySelectorAll('h1').length,
      };
    },
    [minHedef, minYazi] as [number, number],
  );
}
