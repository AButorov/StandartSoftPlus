# Инструкция для совместной работы над StandartSoft Plus

## Для вашего друга (Windows)

### 1. Первоначальная настройка

```bash
# Клонировать репозиторий
git clone https://github.com/abutorov/StandartSoftPlus.git
cd StandartSoftPlus

# Установить Bun (Windows)
# https://bun.sh/docs/installation#windows
powershell -c "irm bun.sh/install.ps1 | iex"

# Создать .env файл
echo PUBLIC_WEB3FORMS_KEY=ваш_ключ > .env

# Установить зависимости
bun install

# Запустить dev-сервер
bun run dev
```

### 2. Git workflow - работа в отдельных ветках

**КРИТИЧЕСКИ ВАЖНО:** Никогда не коммитить напрямую в `main`!

```bash
# 1. Создать ветку для своей задачи
git checkout main
git pull origin main
git checkout -b feature/название-задачи

# 2. Работать в своей ветке
# Вносить изменения...

# 3. Коммитить изменения
git add src/components/MyComponent.tsx  # Только нужные файлы!
git commit -m "feat: добавил новый компонент"

# 4. Отправить на GitHub
git push origin feature/название-задачи

# 5. Создать Pull Request на GitHub
# https://github.com/abutorov/StandartSoftPlus/pulls
```

### 3. Файлы которые НЕЛЬЗЯ коммитить

```bash
# НЕ добавляйте в Git:
git add .env                    # ❌ НИКОГДА
git add node_modules/           # ❌ НИКОГДА
git add .vscode/settings.json   # ❌ Личные настройки
git add bun.lock               # ⚠️ Только если добавили зависимость
```

**Правильный подход:**

```bash
# Добавляйте только файлы проекта:
git add src/components/NewComponent.tsx
git add src/pages/newpage.astro
git add public/images/logo.png

# Проверяйте что добавляете:
git status
git diff --cached
```

### 4. Синхронизация с main

```bash
# Регулярно обновляйте свою ветку из main
git checkout main
git pull origin main
git checkout feature/ваша-ветка
git merge main

# Если конфликты - решайте их
# Затем:
git add .
git commit -m "merge: синхронизация с main"
git push origin feature/ваша-ветка
```

## Для вас (macOS + Docker)

### 1. Принятие изменений от друга

```bash
# 1. Посмотреть Pull Request на GitHub
# https://github.com/abutorov/StandartSoftPlus/pulls

# 2. Проверить изменения локально
git fetch origin
git checkout feature/название-ветки-друга
bun run dev  # Проверить что работает

# 3. Принять только нужные файлы (selective merge)
git checkout main
git checkout feature/название-ветки-друга -- src/components/NewComponent.tsx
git checkout feature/название-ветки-друга -- src/pages/newpage.astro
git add src/components/NewComponent.tsx src/pages/newpage.astro
git commit -m "feat: добавлен компонент от коллеги"
git push origin main

# 4. Закрыть ветку
git branch -d feature/название-ветки-друга
git push origin --delete feature/название-ветки-друга
```

### 2. Автоматизация через GitHub

**Альтернативный способ - через Pull Request UI:**

1. Друг создаёт Pull Request
2. Вы проверяете изменения на GitHub
3. Добавляете комментарии если нужны правки
4. Нажимаете "Merge Pull Request" когда готово
5. GitHub автоматически объединяет только файлы из PR

## Защита от конфликтов конфигураций

### 1. Обновить .gitignore

Добавьте в `.gitignore`:

```gitignore
# Локальные настройки VSCode
.vscode/settings.json
.vscode/launch.json

# Локальные настройки IDE
.idea/

# Персональные конфиги
*.local

# Файлы окружения
.env
.env.local
.env.*.local

# Логи
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# OS файлы
.DS_Store
Thumbs.db
```

### 2. Создать файлы-примеры

Создайте `.env.example`:

```bash
# .env.example
PUBLIC_WEB3FORMS_KEY=your_key_here
```

Коммитьте `.env.example`, но НЕ `.env`

### 3. Правила для конфигов проекта

**Файлы общие для всех:**

- `package.json` - коммитить
- `astro.config.mjs` - коммитить
- `astro.config.dev.mjs` - коммитить
- `tailwind.config.js` - коммитить
- `tsconfig.json` - коммитить

**Файлы НЕ коммитить:**

- `bun.lock` - только при изменении зависимостей
- `.env` - НИКОГДА
- `.vscode/settings.json` - только если общие настройки проекта

## Workflow для задач

### Распределение задач:

```bash
# Друг:
git checkout -b feature/add-new-project
# Добавляет новый проект в портфолио

# Вы:
git checkout -b feature/improve-contacts
# Улучшаете форму контактов

# Работаете параллельно, не мешая друг другу
```

### Пример хорошего коммита:

```bash
# ✅ ХОРОШО
git add src/components/ProjectCard.tsx
git add src/content/jobs/job-3.md
git add public/images/projects/job-3/
git commit -m "feat: добавил проект Delivery App в портфолио"

# ❌ ПЛОХО
git add .
git commit -m "изменения"
```

## Проверочный чеклист перед коммитом

```bash
# 1. Проверить что изменили
git status

# 2. Посмотреть diff
git diff

# 3. Проверить что НЕТ:
# - .env файлов
# - node_modules
# - личных настроек VSCode
# - случайных логов

# 4. Запустить проект
bun run dev
# Убедиться что всё работает

# 5. Добавить только нужные файлы
git add src/...

# 6. Коммитить
git commit -m "описательное сообщение"

# 7. Пушить в свою ветку
git push origin feature/название
```

## Решение конфликтов

Если возникли конфликты при merge:

```bash
# 1. Посмотреть конфликты
git status

# 2. Открыть конфликтующие файлы
# Искать маркеры:
# <<<<<<< HEAD
# ваш код
# =======
# код друга
# >>>>>>> feature/branch

# 3. Выбрать нужный вариант или объединить
# Удалить маркеры <<<, ===, >>>

# 4. Добавить разрешённые файлы
git add путь/к/файлу

# 5. Завершить merge
git commit -m "merge: разрешил конфликты"
```

## Рекомендации

1. **Общайтесь:** Договаривайтесь кто над чем работает
2. **Малые изменения:** Делайте небольшие PR, их легче проверять
3. **Частые коммиты:** Коммитьте часто, маленькими порциями
4. **Описательные сообщения:** Пишите понятные commit messages
5. **Проверяйте код:** Запускайте `bun run dev` перед push
6. **Не работайте в main:** Всегда создавайте ветки

## Структура веток

```
main                    # Продакшн, только стабильный код
├── feature/friend-task-1     # Ветка друга
├── feature/friend-task-2     # Ветка друга
├── feature/your-task-1       # Ваша ветка
└── backup-testing            # Старые эксперименты
```
