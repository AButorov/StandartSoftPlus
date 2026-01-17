# StandartSoft Plus

Сайт-визитка студии разработки мобильного программного обеспечения с функциями привлечения клиентов и интерактивного взаимодействия.

**Демо:** https://abutorov.github.io/StandartSoftPlus/

## Технологии

- **Framework:** Astro 5.16.6
- **UI:** React 19.2.3
- **Styling:** TailwindCSS 4.1.18
- **Forms:** Web3Forms API (контактная форма)
- **Runtime:** Bun 1.x
- **Deployment:** GitHub Pages + GitHub Actions
- **Dev Environment:** Docker + DevContainer (macOS Apple Silicon)

## Возможности

- ✅ Адаптивный дизайн с glassmorphism эффектами
- ✅ Интерактивная контактная форма с реальной отправкой email
- ✅ Портфолио проектов через Content Collections
- ✅ Автоматический деплой на GitHub Pages
- ✅ HMR (Hot Module Replacement) в разработке
- ✅ Плавающая навигация с auto-hide
- ✅ SEO оптимизация

## Требования

- macOS (Apple M1/M2/M3)
- Docker Desktop
- VSCode с расширением Dev Containers
- Git
- Web3Forms API ключ (для формы контактов)

## Установка и запуск

### Локальная разработка (DevContainer) — рекомендуется

1. Открыть проект в VSCode
2. Выполнить команду: `Dev Containers: Reopen in Container`
3. Создать `.env` файл с Web3Forms API ключом:
   ```bash
   echo "PUBLIC_WEB3FORMS_KEY=ваш_ключ_здесь" > .env
   ```
4. Дождаться автоматической установки зависимостей

Сервер запускается автоматически на `http://localhost:4321`

### Альтернативный запуск (Docker Compose)

```bash
# Создайте .env файл
echo "PUBLIC_WEB3FORMS_KEY=ваш_ключ_здесь" > .env

# Запустите контейнер
docker compose up
```

Сервер будет доступен на `http://localhost:4321`

### Запуск без Docker

```bash
# Установите зависимости
bun install

# Создайте .env файл
echo "PUBLIC_WEB3FORMS_KEY=ваш_ключ_здесь" > .env

# Запустите dev-сервер
bun dev
```

## Команды

| Команда       | Описание                                                   |
| ------------- | ---------------------------------------------------------- |
| `bun dev`     | Запуск dev-сервера с HMR (использует astro.config.dev.mjs) |
| `bun build`   | Сборка продакшн-версии (использует astro.config.mjs)       |
| `bun preview` | Предпросмотр собранной версии                              |

## Настройка Web3Forms (контактная форма)

### Получение API ключа

1. Зарегистрируйтесь на https://web3forms.com/
2. Создайте новую форму и получите Access Key
3. Укажите email, куда будут приходить заявки

### Локальная настройка

Создайте файл `.env` в корне проекта:

```bash
PUBLIC_WEB3FORMS_KEY=ваш_ключ_из_web3forms
```

**Важно:** `.env` файл добавлен в `.gitignore` и не должен попадать в Git.

### Production настройка (GitHub Pages)

1. Откройте настройки репозитория: https://github.com/abutorov/StandartSoftPlus/settings/secrets/actions
2. Нажмите **"New repository secret"**
3. Заполните:
   - **Name:** `WEB3FORMS_KEY`
   - **Value:** ваш ключ из Web3Forms
4. Сохраните

GitHub Actions автоматически использует этот ключ при сборке.

### Проверка работы

**Локально:**

1. Откройте http://localhost:4321/contacts/
2. Заполните и отправьте форму
3. Проверьте email - письмо должно прийти

**Production:**

1. Откройте https://abutorov.github.io/StandartSoftPlus/contacts/
2. Заполните и отправьте форму
3. Проверьте email - письмо должно прийти

## Структура проекта

```
├── .devcontainer/           # Конфигурация DevContainer
├── .github/workflows/       # GitHub Actions для CI/CD
│   └── deploy.yml           # Автоматический деплой на GitHub Pages
├── .env                     # Переменные окружения (НЕ коммитить!)
├── .env.example             # Пример .env файла
├── src/
│   ├── components/          # Astro/React компоненты
│   │   ├── FloatingNav.astro    # Плавающая навигация с glassmorphism
│   │   ├── ContactFormCard.tsx  # React форма контактов
│   │   ├── ProjectsList.astro   # Список проектов портфолио
│   │   └── hero.astro           # Hero секция главной страницы
│   ├── content/             # Astro Content Collections
│   │   ├── config.ts        # Схема валидации контента
│   │   └── jobs/            # Markdown файлы проектов
│   │       ├── job-1.md
│   │       └── job-2.md
│   ├── layouts/             # Шаблоны страниц
│   │   ├── Layout.astro     # Базовый layout
│   │   └── MarkdownLayout.astro # Layout для markdown страниц
│   ├── pages/               # Роутинг страниц
│   │   ├── index.astro      # Главная страница
│   │   ├── portfolio.astro  # Страница портфолио
│   │   ├── jobs/[slug].astro # Динамические страницы проектов
│   │   ├── contacts/        # Страница контактов с формой
│   │   ├── services/        # Страница услуг
│   │   ├── faq/             # Страница FAQ
│   │   ├── documents/       # Документы
│   │   └── resources/       # Ресурсы
│   └── styles/              # Глобальные стили
│       ├── global.css       # Основные стили + импорты
│       ├── variables.css    # CSS переменные бренда
│       ├── typography.css   # Типографика
│       └── markdown-images.css # Стили для изображений в markdown
├── public/                  # Статические файлы
│   ├── images/
│   │   └── projects/        # Изображения проектов
│   │       ├── job-1/       # Папка для каждого проекта
│   │       └── job-2/
│   ├── favicon.ico
│   ├── icon-nav.png         # Иконка для навигации
│   └── ...                  # Другие статические ресурсы
├── astro.config.mjs         # Продакшн конфигурация (base: /StandartSoftPlus/)
├── astro.config.dev.mjs     # Dev конфигурация (base: /)
├── compose.yaml             # Docker Compose конфигурация
├── brandbook.md             # Брендбук проекта
└── how_add_content.md       # Инструкция по добавлению контента
```

## Управление контентом

### Добавление проектов

Все проекты управляются через Astro Content Collections. Подробная инструкция: [how_add_content.md](./how_add_content.md)

**Быстрый старт:**

1. Создать файл `src/content/jobs/job-X.md`
2. Заполнить метаданные (title, description, tags, features, order)
3. Добавить изображения в `public/images/projects/job-X/`
4. Использовать HTML классы для продвинутых макетов изображений

**Поддерживаемые макеты изображений:**

- По центру: `class="img-center"`
- С обтеканием слева: `class="img-left"`
- С обтеканием справа: `class="img-right"`
- Два изображения рядом: `<div class="img-row-2">`
- Три изображения рядом: `<div class="img-row-3">`

### Брендинг

Цвета, шрифты, градиенты и CSS переменные описаны в [brandbook.md](./brandbook.md)

**Основные цвета:**

- Primary: `#3d1139` (темный сливовый)
- Secondary: `#e51c27` (красный)
- Градиент бренда: `linear-gradient(90deg, #3d1139 0%, #3d1139 66%, #e51c27 67%, #e51c27 100%)`

**Шрифты:**

- Заголовки: Montserrat (Extra Light 200)
- Основной текст: Roboto Condensed (Regular 400)

## Деплой

Проект автоматически публикуется на GitHub Pages при push в ветку `main`:

- **URL:** https://abutorov.github.io/StandartSoftPlus/
- **Base Path:** `/StandartSoftPlus/`
- **CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`)

### Процесс деплоя

1. Push изменений в ветку `main`
2. GitHub Actions автоматически:
   - Устанавливает Bun
   - Устанавливает зависимости
   - Собирает проект с Web3Forms API ключом (`bun run build`)
   - Публикует на GitHub Pages

### Требования для деплоя

**GitHub Secret должен быть настроен:**

Проверьте наличие секрета `WEB3FORMS_KEY`:
https://github.com/abutorov/StandartSoftPlus/settings/secrets/actions

Без этого секрета форма контактов будет работать в демо-режиме (без реальной отправки).

### Ручной деплой

```bash
# Локальная сборка
bun build

# Содержимое dist/ автоматически публикуется через GitHub Actions
```

## Особенности конфигурации

### Два конфига Astro

- **astro.config.dev.mjs** — для локальной разработки (base: `/`)
- **astro.config.mjs** — для продакшна (base: `/StandartSoftPlus/`)

Это решает проблему с путями к изображениям между локальной разработкой и GitHub Pages.

### Переменные окружения

**Локально:** `.env` файл

```bash
PUBLIC_WEB3FORMS_KEY=ваш_ключ_здесь
```

**Production:** GitHub Secrets

```yaml
# .github/workflows/deploy.yml
env:
  PUBLIC_WEB3FORMS_KEY: ${{ secrets.WEB3FORMS_KEY }}
```

### Docker окружение

- Включен polling для HMR на macOS (`CHOKIDAR_USEPOLLING=true`)
- Порт 4321 пробрасывается на хост
- SSH ключи монтируются для работы с Git (в DevContainer)
- Автоматическая установка зависимостей при старте
- Поддержка `.env` файлов для переменных окружения

### VSCode расширения

- Astro Language Support
- Prettier
- TailwindCSS IntelliSense

### Навигация

Реализована плавающая навигация с эффектами:

- Glassmorphism дизайн (backdrop-filter: blur)
- Три отдельных "острова": лого, навигация, контакты
- Auto-hide при прокрутке вниз
- Burger menu на мобильных устройствах
- Плавные анимации

### Контактная форма

Реализована полнофункциональная форма с:

- Автофокусом на первое поле
- Валидацией полей (email, телефон, telegram)
- Динамической сменой типа контакта
- Floating labels анимацией
- Демо-режимом (без API ключа)
- Реальной отправкой email через Web3Forms
- Уведомлениями об успехе/ошибке

## Работа с Content Collections

Проекты портфолио управляются через Astro Content Collections с TypeScript схемой валидации:

```typescript
// src/content/config.ts
const jobsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    details: z.string(),
    tags: z.array(z.string()),
    client: z.string(),
    stack: z.string(),
    status: z.string(),
    features: z.array(z.string()),
    order: z.number(),
    pubDate: z.string().optional(),
  }),
});
```

**Преимущества:**

- Валидация данных на этапе сборки
- Автоматическое TypeScript типизирование
- Централизованное управление контентом
- Легкое добавление/удаление проектов

## Решение проблем

### Изображения не отображаются

1. Проверьте путь: должен начинаться с `/images/projects/`
2. Проверьте расширение файла (регистр важен: `.jpg` vs `.JPG`)
3. Убедитесь, что файл находится в `public/images/projects/job-X/`
4. Перезапустите сервер разработки

### HMR не работает на macOS

Убедитесь, что переменная окружения `CHOKIDAR_USEPOLLING=true` установлена (уже настроено в Docker).

### Стили не применяются

1. Проверьте импорт глобальных стилей в `Layout.astro`
2. Убедитесь, что Tailwind конфигурация загружена
3. Перезапустите dev сервер

### Форма контактов не работает

**Локально:**

1. Проверьте `.env` файл:
   ```bash
   cat .env
   # Должно быть: PUBLIC_WEB3FORMS_KEY=ваш_ключ
   ```
2. Перезапустите dev сервер: `bun run dev`
3. Проверьте консоль браузера на ошибки

**Production:**

1. Проверьте GitHub Secret: https://github.com/abutorov/StandartSoftPlus/settings/secrets/actions
2. Убедитесь, что секрет называется `WEB3FORMS_KEY`
3. Проверьте, что `.github/workflows/deploy.yml` содержит:
   ```yaml
   env:
     PUBLIC_WEB3FORMS_KEY: ${{ secrets.WEB3FORMS_KEY }}
   ```
4. Пересоберите проект: пуш в main или ручной запуск workflow

### Форма в демо-режиме

Если в консоли браузера сообщение: `"Web3Forms API ключ не настроен. Форма работает в демо-режиме."`

Это значит API ключ не найден:

- Локально: создайте `.env` файл
- Production: добавьте GitHub Secret

### React гидратация ошибка

Если форма исчезает после загрузки:

```bash
# Очистите кеш Vite
rm -rf node_modules/.vite .astro dist

# Перезапустите
bun run dev
```

## Безопасность

- ✅ API ключи хранятся в `.env` (локально) и GitHub Secrets (production)
- ✅ `.env` файл в `.gitignore` - не попадает в репозиторий
- ✅ Форма валидирует все поля перед отправкой
- ✅ Web3Forms защищает от спама и ботов

## Лицензия

Проприетарный проект StandartSoft Plus

---

## Полезные ссылки

- [Инструкция по добавлению контента](./how_add_content.md)
- [Брендбук проекта](./brandbook.md)
- [Astro Documentation](https://docs.astro.build)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Web3Forms Documentation](https://docs.web3forms.com)
- [Bun Documentation](https://bun.sh/docs)
