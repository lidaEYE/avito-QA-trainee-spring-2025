const { test, expect } = require('@playwright/test');

test('Открытие карточки игры', async ({ page }) => {
  await page.goto('https://makarovartem.github.io/frontend-avito-tech-test-assignment/');
  await page.locator('.ant-card-body').first().click(); // заменяй селекторы под себя
  await expect(page.locator('text=Game Page')).toBeVisible(); // пример проверки
});