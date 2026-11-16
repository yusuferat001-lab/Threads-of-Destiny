import { test, expect } from '@playwright/test';
import { ac, acilisEkranina, oyunaBasla, olayiCoz, anaEkranaGec, olc } from './yardimci';

/*
 * Duman testleri — mobil + PC (playwright.config.ts projeleri). Bu turda düzeltilen UX/erişilebilirlik
 * maddelerini de korur: meslek ekranı yerleşimi, 44px hedef, okunur yazı, tek <main> + <h1>, klavye odağı,
 * alt gezinme ipucu, "Neler Yeni" penceresi. Oyun olayları rastgele olduğundan yardımcılar şık/olay seçer.
 */

const mobilMi = () => test.info().project.name === 'mobil';
// Eşikler ölçülen mevcut durumun biraz altında: gerileme (ör. 8,6px etiket, 34px düğme) yakalanır.
const MIN_HEDEF = () => (mobilMi() ? 44 : 0);
const MIN_YAZI = () => (mobilMi() ? 10.5 : 11);

test.describe('kurulum ve meslek seçimi', () => {
  test('meslek ekranı: 4 kart ve Devam Et ilk ekranda; seçmeden pasif, seçince etkin', async ({ page }) => {
    await acilisEkranina(page);
    const vh = page.viewportSize()!.height;
    const kartlar = page.locator('.meslek-secim-kart');
    await expect(kartlar).toHaveCount(4);
    for (let i = 0; i < 4; i++) {
      const kutu = (await kartlar.nth(i).boundingBox())!;
      expect(kutu.y, `kart ${i} ilk ekranda`).toBeLessThan(vh);
      expect(kutu.y + kutu.height, `kart ${i} ilk ekranda`).toBeLessThanOrEqual(vh);
    }
    if (!mobilMi()) {
      // PC: dört kart tek satır, Devam Et de kaydırmadan görünür.
      const y0 = (await kartlar.nth(0).boundingBox())!.y;
      for (let i = 1; i < 4; i++) expect(Math.abs((await kartlar.nth(i).boundingBox())!.y - y0)).toBeLessThan(2);
      const devam = (await page.locator('.acilis-devam').boundingBox())!;
      expect(devam.y + devam.height).toBeLessThanOrEqual(vh);
    }
    await expect(page.locator('.acilis-devam')).toBeDisabled();
    await kartlar.nth(1).click();
    await expect(kartlar.nth(1)).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.acilis-devam')).toBeEnabled();
    const o = await olc(page, MIN_HEDEF(), MIN_YAZI());
    expect(o.yatayTasma, 'yatay taşma').toBe(false);
    expect(o.mainSayisi).toBe(1);
  });

  test('"Neler Yeni" penceresi mobilde ortalanmış kart (altta boş siyah yok)', async ({ page }) => {
    test.skip(!mobilMi(), 'yalnız mobil düzeltmesi');
    await page.goto('/');
    const modal = page.locator('.yenilik-modal');
    await expect(modal).toBeVisible();
    const vh = page.viewportSize()!.height;
    const k = (await modal.boundingBox())!;
    expect(k.y).toBeGreaterThan(30);
    expect(k.y + k.height).toBeLessThan(vh - 30);
  });
});

test.describe('İngilizce', () => {
  test.use({ locale: 'en-US' });

  test('meslek ekranı çevrilmiş', async ({ page }) => {
    await acilisEkranina(page, 'en');
    await expect(page.getByRole('heading', { name: /Choose Your Profession/i })).toBeVisible();
    await expect(page.locator('.acilis-devam')).toHaveText(/Continue/i);
    await expect(page.locator('.acilis-devam')).toBeDisabled();
  });
});

test.describe('oyun ekranı', () => {
  test('meslek seçilince ilk olay açılır; tek <main> + <h1>; ölçümler', async ({ page }) => {
    await oyunaBasla(page);
    const o = await olc(page, MIN_HEDEF(), MIN_YAZI());
    expect(o.mainSayisi, '<main> sayısı').toBe(1);
    expect(o.h1Sayisi, '<h1> sayısı').toBe(1);
    expect(o.yatayTasma, 'yatay taşma').toBe(false);
    expect(o.kucukHedef, 'dokunma hedefi < 44px').toEqual([]);
    expect(o.kucukYazi, `yazı < ${MIN_YAZI()}px`).toEqual([]);
    if (mobilMi()) {
      // Üstteki 3'lü amaç çiplerinin başlığı yatayda kırpılmamalı ("Meyha|ne Müdavimi" hatası).
      const kirpilan = await page.locator('.amac-serit-baslik').evaluateAll((l) =>
        l.filter((e) => e.scrollWidth > e.clientWidth + 2).map((e) => e.textContent),
      );
      expect(kirpilan, 'amaç çipi başlığı yatay kırpılıyor').toEqual([]);
      // Deterministik karşılık (başlık adları rastgele): oran (0/3) başlığın ALTINDA durmalı, yanında değil.
      const yanYana = await page.locator('.amac-serit-ust').evaluateAll(
        (l) =>
          l.filter((u) => {
            const b = u.querySelector('.amac-serit-baslik');
            const o = u.querySelector('.amac-serit-oran');
            return !!b && !!o && o.getBoundingClientRect().top < b.getBoundingClientRect().bottom - 2;
          }).length,
      );
      expect(yanYana, 'amaç oranı başlığın yanında').toBe(0);
    }
  });

  test('klavye (PC): ilk Tab ilk şıka iner, rakam şık seçer, sonra Devam Et odakta', async ({ page }) => {
    test.skip(mobilMi(), 'klavye kısayolları yalnız PC');
    await oyunaBasla(page);
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.activeElement?.closest('.olay-kutusu') !== null), 'odak olay kutusunda').toBe(true);
    const idx = await page.locator('.olay-kutusu .secenek').evaluateAll((l) => l.findIndex((e) => !(e as HTMLButtonElement).disabled));
    await page.keyboard.press(`Digit${idx + 1}`);
    await expect(page.locator('.olay-devam')).toBeFocused();
  });

  test('mobil: olay beklerken alt gezinme kapalı, dokununca "Önce kararını ver" çıkar', async ({ page }) => {
    test.skip(!mobilMi(), 'alt gezinme yalnız mobil');
    await oyunaBasla(page);
    const nav = (await page.locator('.alt-gezinme-buton').first().boundingBox())!;
    await page.touchscreen.tap(nav.x + nav.width / 2, nav.y + nav.height / 2);
    await expect(page.locator('.alt-gezinme-ipucu')).toHaveText(/Önce kararını ver/);
  });

  test('ana ekran ve Mağaza yan ekranı: aç / ölç / kapat', async ({ page }) => {
    await oyunaBasla(page);
    await olayiCoz(page);
    await anaEkranaGec(page);
    const ana = await olc(page, MIN_HEDEF(), MIN_YAZI());
    expect(ana.kucukHedef, 'ana ekran hedef').toEqual([]);
    expect(ana.kucukYazi, 'ana ekran yazı').toEqual([]);

    if (mobilMi()) await page.locator('.alt-gezinme-buton').filter({ hasText: 'Mağaza' }).click();
    else await page.locator('.kisayol-karti-magaza').click();
    await expect(page.getByRole('heading', { name: /Mağaza/ }).first()).toBeVisible();
    const yan = await olc(page, MIN_HEDEF(), MIN_YAZI());
    expect(yan.yatayTasma).toBe(false);
    expect(yan.kucukHedef, 'yan ekran hedef').toEqual([]);
    expect(yan.kucukYazi, 'yan ekran yazı').toEqual([]);

    await page.locator('.ekran-kapat-buton, .strateji-kapat').first().click(); // mobil ✕ / PC panel ×
    await expect(page.locator('.ana-ekran')).toBeVisible();
  });

  test('Kariyer/Yatırım ekranları (Dükkân, Yatırım, Çalışan, Çevre): aç / ölç / kapat', async ({ page }) => {
    await oyunaBasla(page); // Tüccar: dört ana düğme
    await olayiCoz(page);
    await anaEkranaGec(page);
    const n = await page.locator('.ana-tus').count();
    expect(n, 'ana düğme sayısı').toBe(4);
    for (let i = 0; i < n; i++) {
      await page.locator('.ana-tus').nth(i).click();
      await expect(page.locator('.strateji-sayfa').first()).toBeVisible();
      const o = await olc(page, MIN_HEDEF(), MIN_YAZI());
      expect(o.yatayTasma, `ekran ${i} yatay taşma`).toBe(false);
      expect(o.kucukHedef, `ekran ${i} dokunma hedefi`).toEqual([]);
      expect(o.kucukYazi, `ekran ${i} yazı`).toEqual([]);
      await page.locator('.ekran-kapat-buton, .strateji-kapat').first().click();
      await expect(page.locator('.ana-ekran')).toBeVisible();
    }
  });
});
