# Брендбук StandartSoft Plus

## Цветовая палитра

### Основные цвета

```css
--color-primary: #3d1139    /* Темный сливовый - основной */
--color-secondary: #e51c27  /* Красный - акцент */
```

### Дополнительные цвета

```css
--color-accent-1: #751433   /* Промежуточный бордовый */
--color-accent-2: #ad182d   /* Промежуточный красный */
--color-bg: #fcfcfc         /* Светлый фон */
```

### Градиент бренда

```css
--gradient-brand: linear-gradient(
  90deg,
  #3d1139 0%,
  #3d1139 66%,
  #e51c27 67%,
  #e51c27 100%
);
```

## Типографика

### Шрифты

- **Заголовки**: Montserrat (Extra Light 200, Light 300, Regular 400, Semibold 600)
- **Основной текст**: Roboto Condensed (Regular 400, Bold 700)
- **Код**: JetBrains Mono / Fira Code

### Размеры

```css
--font-size-h1: 3.5rem      /* 56px */
--font-size-h2: 2.5rem      /* 40px */
--font-size-h3: 1.875rem    /* 30px */
--font-size-slogan: 1.125rem /* 18px */
```

### Межбуквенный интервал

- Заголовки: `letter-spacing: 0.03em` (3%)
- Слоган: `letter-spacing: 0.04em` (4%)

## Использование

### 1. CSS классы (глобальные стили)

```html
<!-- Заголовок с градиентом -->
<h1>StandartSoft +</h1>

<!-- Заголовок без градиента -->
<h1 class="no-gradient">StandartSoft +</h1>

<!-- Слоган -->
<p class="slogan">Innovate with Confidence, Code with Standards!</p>

<!-- Кнопки -->
<button class="btn btn-primary">Основная</button>
<button class="btn btn-secondary">Вторичная</button>

<!-- Карточка -->
<div class="card">
  <h3>Заголовок</h3>
  <p>Текст</p>
</div>
```

### 2. Tailwind классы

```html
<!-- Заголовок -->
<h1 class="font-heading font-extralight text-6xl tracking-brand">
  StandartSoft +
</h1>

<!-- Кнопка с градиентом -->
<button class="bg-brand-gradient text-white px-8 py-3 rounded-lg">
  Действие
</button>

<!-- Карточка -->
<div
  class="bg-white border border-brand-primary/10 rounded-xl p-6 hover:shadow-lg"
>
  <h3 class="text-brand-primary">Заголовок</h3>
  <p class="text-brand-primary/80">Текст</p>
</div>
```

### 3. CSS переменные

```css
.custom-element {
  color: var(--color-primary);
  background: var(--gradient-brand);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}
```

## Tailwind конфигурация

Добавьте `tailwind.config.ts` в корень проекта для использования кастомных классов:

```typescript
// Классы будут доступны:
bg - brand - primary; // #3d1139
text - brand - secondary; // #e51c27
bg - brand - gradient; // Градиент бренда
font - heading; // Montserrat
font - body; // Roboto Condensed
tracking - brand; // 0.03em
tracking - brand - wide; // 0.04em
```

## Компоненты

### Hero секция

```astro
<Hero
  title="StandartSoft +"
  slogan="Innovate with Confidence, Code with Standards!"
/>
```

### Навигация

Автоматически стилизована в `global.css` с градиентным фоном и анимацией подчеркивания.

## Рекомендации

1. **Используйте градиент** для H1 заголовков на главных страницах
2. **Цвет secondary (#e51c27)** — для CTA кнопок и акцентов
3. **Montserrat Extra Light (200)** — только для H1
4. **Roboto Condensed** — для слоганов (uppercase + letter-spacing)
5. **Hover эффекты** — всегда с `transition-all`

## Структура файлов

```
src/styles/
├── variables.css    # CSS переменные
├── typography.css   # Шрифты и типографика
└── global.css       # Базовые стили + импорты

tailwind.config.ts   # Конфигурация Tailwind
```

## Примеры страниц

- `index-branded.astro` — с глобальными CSS классами
- `index-tailwind.astro` — с Tailwind утилитами
- `Hero.astro` — компонент Hero секции
