import { test, expect } from "@playwright/test";

test.describe("Главная страница", () => {
  test("загружается корректно", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/StandartSoft/i);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("навигация работает", async ({ page }) => {
    await page.goto("/");

    await page.click("text=Портфолио");
    await expect(page).toHaveURL("/portfolio");

    await page.click("text=Услуги");
    await expect(page).toHaveURL("/services");

    await page.click("text=Контакты");
    await expect(page).toHaveURL("/contacts");
  });

  test("плавающая навигация появляется при прокрутке", async ({ page }) => {
    await page.goto("/");

    const floatingNav = page.locator('[data-testid="floating-nav"]');

    // Навигация скрыта в начале
    await expect(floatingNav).not.toBeVisible();

    // Прокручиваем вниз
    await page.evaluate(() => window.scrollTo(0, 500));

    // Навигация появляется
    await expect(floatingNav).toBeVisible();
  });
});

test.describe("Страница контактов", () => {
  test("форма отправляет данные", async ({ page }) => {
    await page.goto("/contacts");

    await page.fill('input[name="name"]', "Иван Тестов");
    await page.fill('input[name="phone"]', "+79001234567");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('textarea[name="message"]', "Тестовое сообщение");

    // Мокируем API запрос
    await page.route("**/api/contact", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true }),
      });
    });

    await page.click('button[type="submit"]');

    // Проверяем успешное сообщение
    await expect(page.locator("text=Сообщение отправлено")).toBeVisible({
      timeout: 5000,
    });
  });

  test("WhatsApp кнопка работает", async ({ page }) => {
    await page.goto("/contacts");

    const whatsappLink = page.locator('a[href*="wa.me"]');
    await expect(whatsappLink).toBeVisible();
    await expect(whatsappLink).toHaveAttribute("target", "_blank");
  });
});

test.describe("Портфолио", () => {
  test("отображает проекты", async ({ page }) => {
    await page.goto("/portfolio");

    // Проверяем наличие карточек проектов
    const projectCards = page.locator('[data-testid="project-card"]');
    await expect(projectCards).toHaveCount(2, { timeout: 5000 });
  });

  test("переход на детальную страницу проекта", async ({ page }) => {
    await page.goto("/portfolio");

    await page.click('[data-testid="project-card"]:first-child');

    // Проверяем URL и контент
    await expect(page).toHaveURL(/\/jobs\/.+/);
    await expect(page.locator("article")).toBeVisible();
  });
});

test.describe("Адаптивность", () => {
  test("мобильная версия работает корректно", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Проверяем, что контент виден на мобильном
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("nav")).toBeVisible();
  });
});
