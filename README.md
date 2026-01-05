# StandartSoft Plus

Сайт-визитка студии разработки мобильного программного обеспечения с функциями привлечения клиентов и интерактивного взаимодействия.

## Технологии

- **Framework:** Astro 5.16.6
- **UI:** React 19.2.3
- **Styling:** TailwindCSS 4.1.18
- **Runtime:** Bun 1.x
- **Dev Environment:** Docker + DevContainer

## Требования

- macOS (Apple M1/M2)
- Docker Desktop
- VSCode с расширением Dev Containers
- Git

## Установка и запуск

### Локальная разработка (DevContainer)

1. Открыть проект в VSCode
2. Выполнить команду: `Dev Containers: Reopen in Container`
3. Дождаться автоматической установки зависимостей

Сервер запускается автоматически на `http://localhost:4321`

### Альтернативный запуск (Docker Compose)

```bash
docker compose up
```

### Запуск без Docker

```bash
bun install
bun dev
```

## Команды

| Команда       | Описание                      |
| ------------- | ----------------------------- |
| `bun dev`     | Запуск dev-сервера с HMR      |
| `bun build`   | Сборка продакшн-версии        |
| `bun preview` | Предпросмотр собранной версии |

## Структура проекта

```
├── .devcontainer/          # Конфигурация DevContainer
├── src/
│   ├── components/         # Astro/React компоненты
│   ├── layouts/            # Шаблоны страниц
│   ├── pages/              # Роутинг страниц
│   └── styles/             # Глобальные стили
├── public/                 # Статические файлы
└── compose.yaml            # Docker Compose конфигурация
```

## Деплой

Проект настроен для публикации на GitHub Pages:

- **URL:** https://abutorov.github.io/StandartSoftPlus/
- **Base Path:** `/StandartSoftPlus/`

### Команды деплоя

```bash
bun build
# Загрузка dist/ на GitHub Pages
```

## Особенности конфигурации

### Docker окружение

- Включен polling для HMR на macOS (`CHOKIDAR_USEPOLLING=true`)
- Порт 4321 пробрасывается на хост
- SSH ключи монтируются для работы с Git

### VSCode расширения

- Astro Language Support
- Prettier
- TailwindCSS IntelliSense

## Лицензия

Проприетарный проект
