- providing (google yandex)

## SEO для StandartSoft Plus — что нужно сделать

### 1. Установить `@astrojs/sitemap`

```bash
bunx astro add sitemap
```

### 2. `astro.config.mjs` — добавить sitemap

```js
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://standartsoftplus.com",
  base: "/",

  integrations: [react(), sitemap()],
  // ... остальное без изменений
});
```

Sitemap будет автогенерироваться при билде в `/sitemap-index.xml` и `/sitemap-0.xml`.

---

### 3. `public/robots.txt`

```txt
User-agent: *
Allow: /

Sitemap: https://standartsoftplus.com/sitemap-index.xml
```

---

### 4. `src/layouts/Layout.astro` — полноценный SEO-блок

Заменить весь файл:

```astro
---
// src/layouts/Layout.astro
import FloatingNav from '../components/FloatingNav.astro';

interface Props {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
}

const {
  title = 'StandartSoft Plus — Разработка мобильных приложений',
  description = 'Студия разработки мобильных приложений и веб-сервисов. Создаём iOS, Android и кросс-платформенные решения для вашего бизнеса.',
  ogImage = '/images/og-image.png',
  canonical,
} = Astro.props;

const base = import.meta.env.BASE_URL;
const siteUrl = 'https://standartsoftplus.com';
const canonicalUrl = canonical ?? `${siteUrl}${Astro.url.pathname}`;
---

<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Primary SEO -->
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalUrl} />

    <!-- Open Graph (соцсети, мессенджеры) -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={`${siteUrl}${ogImage}`} />
    <meta property="og:locale" content="ru_RU" />
    <meta property="og:site_name" content="StandartSoft Plus" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

    <!-- Favicons -->
    <link rel="icon" type="image/png" href={`${base}favicon.png`} />
    <link rel="alternate icon" href={`${base}favicon.ico`} />
    <link rel="apple-touch-icon" href={`${base}favicon.png`} />

    <!-- JSON-LD структурированные данные -->
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "StandartSoft Plus",
        "url": siteUrl,
        "logo": `${siteUrl}/icon-nav.png`,
        "description": description,
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": ["Russian", "English"]
        }
      })}
    </script>
  </head>
  <body>
    <FloatingNav />
    <main class="main-content">
      <slot />
    </main>
  </body>
</html>

<style is:global>
  @import '../styles/global.css';
  @import '../styles/markdown-images.css';

  .main-content {
    padding-top: 6rem;
  }

  @media (max-width: 768px) {
    .main-content {
      padding-top: 5rem;
    }
  }
</style>
```

---

### 5. Использование на страницах — передавать уникальные title/description

Пример для `index.astro`:

```astro
<Layout
  title="StandartSoft Plus — Разработка мобильных приложений"
  description="Разрабатываем мобильные приложения под iOS и Android. Быстро, надёжно, с поддержкой. Оставьте заявку."
>
```

Пример для `portfolio.astro`:

```astro
<Layout
  title="Портфолио — StandartSoft Plus"
  description="Примеры выполненных проектов: мобильные приложения, веб-сервисы, интеграции."
>
```

---

### 6. OG-изображение `public/images/og-image.png`

Нужно создать картинку **1200×630px** с логотипом и слоганом. Используй Figma или любой графический редактор. Это значительно влияет на CTR при расшаривании в соцсетях.

---

### Приоритет внедрения

| Шаг                                             | Влияние     | Сложность    |
| ----------------------------------------------- | ----------- | ------------ |
| robots.txt                                      | обязательно | 1 мин        |
| sitemap (@astrojs/sitemap)                      | высокое     | 5 мин        |
| Layout SEO-блок                                 | высокое     | 15 мин       |
| Уникальные title/description на каждой странице | высокое     | 30 мин       |
| OG-изображение                                  | среднее     | 1 час        |
| JSON-LD                                         | среднее     | уже в Layout |

После деплоя — зарегистрировать сайт в **Google Search Console** и **Яндекс.Вебмастер**, загрузить туда sitemap.

- resources (documents)
- statistics
