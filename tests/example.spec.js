// @ts-check
import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Тест 1: Открытие карточки игры', async ({ page }) => {
  // Переход на страницу с играми
  await page.goto('https://makarovartem.github.io/frontend-avito-tech-test-assignment/');

  // Поиск первой карточки игры и открытие
  const gameCard = page.locator('.ant-card-body').first();
  await gameCard.click();

  // Ожидание появления заголовка "Game Page"
  const gamePageTitle = page.locator('h1', { hasText: 'Game Page' });

  // Проверяем, что заголовок действительно содержит "Game Page"
  await expect(gamePageTitle).toHaveText('Game Page', { timeout: 10000 });
});


test('Тест 2: Отображение 10 карточек игр при выборе "10 / page"', async ({ page }) => {
  await page.goto('https://makarovartem.github.io/frontend-avito-tech-test-assignment/');

  // Клик по селектору для открытия списка выбора количества карточек
  await page.locator('span.ant-select-selection-item', { hasText: '10 / page' }).first().click();

  // Клик по нужному элементу в выпадающем списке
  await page.locator('div.ant-select-item-option-content', { hasText: '10 / page' }).click();

  // Ждём немного, чтобы карточки успели прогрузиться
  await page.waitForTimeout(1000);

  // Получаем список всех карточек
  const cards = page.locator('.ant-card-body');

  // Проверяем, что карточек ровно 10
  await expect(cards).toHaveCount(10);
});


test('Тест 3: Отображение 20 карточек игр при выборе "20 / page"', async ({ page }) => {
  await page.goto('https://makarovartem.github.io/frontend-avito-tech-test-assignment/');

  // Кликаем по выпадающему меню (селектор выбора количества карточек)
  await page.locator('span.ant-select-selection-item', { hasText: '10 / page' }).first().click();

  // Клик по нужному элементу в выпадающем списке
  await page.locator('div.ant-select-item-option-content', { hasText: '20 / page' }).click();

  // Ждём немного, чтобы карточки успели прогрузиться
  await page.waitForTimeout(1000);

  // Получаем список всех карточек
  const cards = page.locator('.ant-card-body');

  // Проверяем, что карточек ровно 20
  await expect(cards).toHaveCount(20);
});

test('Тест 4: Отображение 50 карточек игр при выборе "50 / page"', async ({ page }) => {
  const testCaseNumber = 4;
  const testCaseName = 'Отображение 50 карточек игр при выборе "50 / page"';

  await page.goto('https://makarovartem.github.io/frontend-avito-tech-test-assignment/');

  // Кликаем по выпадающему меню (селектор выбора количества карточек)
  await page.locator('span.ant-select-selection-item', { hasText: '10 / page' }).first().click();

  // Клик по нужному элементу в выпадающем списке
  await page.locator('div.ant-select-item-option-content', { hasText: '50 / page' }).click();

  // Ждём немного, чтобы карточки успели прогрузиться
  await page.waitForTimeout(1000);

  // Получаем список всех карточек
  const cards = page.locator('.ant-card-body');
  const count = await cards.count();

  // Ожидаем 50, но тест не падает при несовпадении
  if (count !== 50) {
    const bugMessage =
      `[${new Date().toISOString()}] ❌ BUG in Test Case #${testCaseNumber}: ${testCaseName}\n` +
      `Expected: 50 cards, but got: ${count}\n\n`;
    fs.appendFileSync('bug-report.txt', bugMessage);
    console.log(bugMessage);
  } else {
    console.log(`[${new Date().toISOString()}] ✅ Test #${testCaseNumber} passed: ${count} cards`);
  }

  
});

test('Тест 5: Отображение 100 карточек игр при выборе "100 / page"', async ({ page }) => {
  await page.goto('https://makarovartem.github.io/frontend-avito-tech-test-assignment/');

  // Кликаем по выпадающему меню (селектор выбора количества карточек)
  await page.locator('span.ant-select-selection-item', { hasText: '10 / page' }).first().click();

  // Клик по нужному элементу в выпадающем списке
  await page.locator('div.ant-select-item-option-content', { hasText: '100 / page' }).click();

  // Ждём немного, чтобы карточки успели прогрузиться
  await page.waitForTimeout(1000);

  // Получаем список всех карточек
  const cards = page.locator('.ant-card-body');

  // Проверяем, что карточек ровно 100
  await expect(cards).toHaveCount(100);
});


test('Тест 6: Проверка, что первые 5 карточек с фильтром "Browser" действительно относятся к browser-платформе', async ({ page }) => {
  await page.goto('https://makarovartem.github.io/frontend-avito-tech-test-assignment/');

  for (let i = 0; i < 5; i++) {
    // Открываем фильтр платформы
    await page.locator('span.ant-select-selection-item', { hasText: 'not chosen' }).nth(0).click();

    // Выбираем "Browser"
    await page.locator('div.ant-select-item-option-content', { hasText: 'browser' }).click();

    // Ждём прогрузки отфильтрованных карточек
    await page.waitForTimeout(1000);
    
    // Получаем список карточек
    const cards = page.locator('.ant-card-body');
    const count = await cards.count();
    
    // Открываем карточку
    await cards.nth(i).click();

    // Проверяем наличие текста "browser" на странице карточки
    await expect(page.locator('text=Web Browser')).toBeVisible({ timeout: 10000 });

    // Возвращаемся на главную страницу
    await page.goBack();

    // Обновляем локаторы после возврата
    await page.waitForTimeout(500); // небольшая задержка
  }
});



test('Тест 7: переход на вторую страницу результатов', async ({ page }) => {
  await page.goto('https://makarovartem.github.io/frontend-avito-tech-test-assignment/');

  // Получаем название первой карточки на странице 1
  const firstCardPage1 = await page.locator('._title_vlg32_45').first().textContent();

  // Кликаем на "2" в пагинации
  await page.locator('.ant-pagination-item-2').first().click();

  // Ждём загрузку новой страницы
  await page.waitForTimeout(1000);

  // Получаем название первой карточки на странице 2
  const firstCardPage2 = await page.locator('._title_vlg32_45').first().textContent();

  // Проверяем, что карточки разные
  expect(firstCardPage1).not.toEqual(firstCardPage2);
});


test('Тест 8: переход на последнюю страницу результатов', async ({ page }) => {
  const testCaseNumber = 8;
  const testCaseName = 'переход на последнюю страницу результатов';

  await page.goto('https://makarovartem.github.io/frontend-avito-tech-test-assignment/');

  // Получаем название первой карточки на странице 1
  const firstCardPage1 = await page.locator('._title_vlg32_45').first().textContent();

  // Кликаем на "2" в пагинации
  await page.locator('.ant-pagination-item-41').first().click();

  // Ждём загрузку новой страницы
  await page.waitForTimeout(1000);

  // Получаем название первой карточки на странице 2
  const firstCardPage2 = await page.locator('._title_vlg32_45').first().textContent();

  // Проверяем, что карточки разные
  if (firstCardPage1 == firstCardPage2) {
    const bugMessage =
      `[${new Date().toISOString()}] ❌ BUG in Test Case #${testCaseNumber}: ${testCaseName}\n` +
      `Ожидание: переход на последнюю страницу с помощью пагинации. Реальность: остались на странице №1\n\n`;
    fs.appendFileSync('bug-report.txt', bugMessage);
    console.log(bugMessage);
  } else {
    console.log(`[${new Date().toISOString()}] ✅ Test #${testCaseNumber} passed`);
  }
});


test('Тест 9: Установка и сброс фильтрации каталога игр', async ({ page }) => {
  const testCaseNumber = 9;
  const testCaseName = 'Установка и сброс фильтрации каталога игр';

  await page.goto('https://makarovartem.github.io/frontend-avito-tech-test-assignment/');

  // Сохраняем карточки на первой (исходной) странице
  const initialCards = await page.locator('.ant-card-body').allTextContents();

  // Открываем первый фильтр "Filter by platform"
  await page.locator('span.ant-select-selection-item', { hasText: 'not chosen' }).nth(0).click();

  // Выбираем платформу "Browser"
  await page.locator('.ant-select-item-option-content', { hasText: 'Browser' }).click();

  // Немного подождать загрузки новых карточек
  await page.waitForTimeout(1000);

  // Снова открываем тот же фильтр
  await page.locator('span.ant-select-selection-item', { hasText: 'Browser' }).nth(0).click();

  // Сбрасываем фильтр, выбирая "not chosen"
  await page.locator('.ant-select-item-option-content', { hasText: 'not chosen' }).click();

  // Немного подождать возврата к исходному состоянию
  await page.waitForTimeout(1000);

  // Получаем карточки после сброса фильтра
  const resetCards = await page.locator('.ant-card-body').allTextContents();

  // Проверяем, что карточки одинаковые
  if (initialCards !== resetCards) {
    const bugMessage =
      `[${new Date().toISOString()}] ❌ BUG in Test Case #${testCaseNumber}: ${testCaseName}\n` +
      `Ожидание: возвращаемся к первоначальным карточкам игр. Реальность: Страница ошибки\n\n`;
    fs.appendFileSync('bug-report.txt', bugMessage);
    console.log(bugMessage);
  } else {
    console.log(`[${new Date().toISOString()}] ✅ Test #${testCaseNumber} passed`);
  }
});
