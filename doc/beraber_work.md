# Командная работа над StandartSoft Plus

Инструкция для совместной разработки проекта несколькими разработчиками.

## Оглавление

- [Первоначальная настройка](#первоначальная-настройка)
- [Git workflow для команды](#git-workflow-для-команды)
- [Ежедневная работа](#ежедневная-работа)
- [Pull Request процесс](#pull-request-процесс)
- [Разрешение конфликтов](#разрешение-конфликтов)
- [Защита от ошибок](#защита-от-ошибок)
- [Чеклисты](#чеклисты)

---

## Первоначальная настройка

### Для разработчика на Windows

```bash
# 1. Клонировать репозиторий
git clone https://github.com/abutorov/StandartSoftPlus.git
cd StandartSoftPlus

# 2. Установить Bun для Windows
# https://bun.sh/docs/installation#windows
powershell -c "irm bun.sh/install.ps1 | iex"

# 3. Создать .env файл
copy .env.example .env
# Отредактировать .env и добавить API ключ

# 4. Установить зависимости
bun install

# 5. Запустить dev-сервер
bun run dev
```

### Для разработчика на macOS/Linux

```bash
# 1. Клонировать репозиторий
git clone https://github.com/abutorov/StandartSoftPlus.git
cd StandartSoftPlus

# 2. Открыть в VSCode с DevContainer
code .
# Dev Containers: Reopen in Container

# 3. Создать .env файл (в контейнере)
cp .env.example .env
# Отредактировать .env и добавить API ключ

# 4. Зависимости установятся автоматически
# Сервер запустится на http://localhost:4321
```

---

## Git workflow для команды

### Основное правило

**НИКОГДА не коммитьте напрямую в `main`!** Всегда работайте в отдельных ветках.

### Начало работы над новой функцией

```bash
# 1. Переключиться на main и получить последние изменения
git checkout main
git pull origin main

# 2. Создать ветку для новой функции
git checkout -b feature/название-функции
# Примеры названий:
# feature/add-gallery
# feature/improve-contacts
# feature/new-project-card
# fix/navigation-bug

# 3. Начать работу
# Редактировать файлы в VSCode...
```

### Коммит изменений

```bash
# 1. Проверить что изменилось
git status

# 2. Посмотреть изменения
git diff

# 3. Добавить ТОЛЬКО нужные файлы (НЕ используйте git add .)
git add src/components/Gallery.tsx
git add src/pages/gallery.astro
git add public/images/gallery/

# 4. Проверить что будет закоммичено
git status

# 5. Закоммитить с описательным сообщением
git commit -m "feat: добавил компонент галереи"

# 6. Отправить в свою ветку на GitHub
git push origin feature/название-функции
```

### Ежедневная синхронизация с main

**КРИТИЧЕСКИ ВАЖНО:** Другие разработчики постоянно добавляют изменения в main!

```bash
# Выполнять КАЖДЫЙ день перед началом работы:

# 1. Обновить main
git checkout main
git pull origin main

# 2. Вернуться в свою ветку
git checkout feature/ваша-функция

# 3. Влить изменения из main
git merge main

# 4. Если конфликты - разрешить их (см. раздел ниже)
# Если конфликтов нет - продолжить работу
```

### Завершение работы над функцией

```bash
# 1. Финальная синхронизация с main
git checkout main
git pull origin main
git checkout feature/ваша-функция
git merge main

# 2. Разрешить конфликты если есть

# 3. Запушить финальную версию
git push origin feature/ваша-функция

# 4. Создать Pull Request на GitHub (см. раздел ниже)
```

---

## Ежедневная работа

### Утренняя рутина

```bash
# 1. Получить все обновления
git checkout main
git pull origin main

# 2. Синхронизировать свою ветку
git checkout feature/текущая-задача
git merge main

# 3. Разрешить конфликты если появились
# (см. раздел "Разрешение конфликтов")

# 4. Начать работу
bun run dev
```

### В течение дня

```bash
# Делайте коммиты часто, малыми порциями:

# Изменили компонент
git add src/components/Header.tsx
git commit -m "feat: добавил мобильное меню"
git push origin feature/текущая-задача

# Добавили стили
git add src/styles/navigation.css
git commit -m "style: обновил стили навигации"
git push origin feature/текущая-задача

# Исправили баг
git add src/components/ContactForm.tsx
git commit -m "fix: исправил валидацию email"
git push origin feature/текущая-задача
```

### Вечерняя рутина

**Если задача НЕ завершена:**

```bash
# Сохранить промежуточные изменения
git add .
git commit -m "WIP: промежуточное сохранение"
git push origin feature/текущая-задача
```

**Если задача ЗАВЕРШЕНА:**

```bash
# 1. Финальная синхронизация
git checkout main
git pull origin main
git checkout feature/текущая-задача
git merge main

# 2. Финальный push
git push origin feature/текущая-задача

# 3. Создать Pull Request (см. раздел ниже)
```

---

## Pull Request процесс

### Создание Pull Request

1. **Перейти на GitHub:**

```
   https://github.com/abutorov/StandartSoftPlus/pulls
```

2. **Нажать "New pull request"**

3. **Выбрать ветки:**
   - base: `main`
   - compare: `feature/ваша-функция`

4. **Заполнить описание:**

```markdown
## Что сделано

- Добавлен компонент галереи
- Обновлены стили для адаптивности
- Добавлены изображения для демо

## Тестирование

- [x] Проверено на desktop
- [x] Проверено на mobile
- [x] Запущен `bun run dev` без ошибок

## Скриншоты

(если применимо)
```

5. **Нажать "Create pull request"**

### Проверка Pull Request (для владельца проекта)

```bash
# 1. Получить ветку разработчика
git fetch origin
git checkout feature/название-ветки

# 2. Проверить что работает
./clean-install.sh
bun run dev

# 3. Просмотреть изменения
git diff main...feature/название-ветки

# 4. Если всё OK - принять через GitHub UI
# Или локально:
git checkout main
git pull origin main
git merge feature/название-ветки
git push origin main

# 5. Удалить ветку
git push origin --delete feature/название-ветки
```

### Выборочное принятие изменений

Если нужны только некоторые файлы из PR:

```bash
# 1. Переключиться на main
git checkout main
git pull origin main

# 2. Взять только нужные файлы из ветки
git checkout feature/другой-разработчик -- src/components/NewComponent.tsx
git checkout feature/другой-разработчик -- src/pages/newpage.astro

# 3. Закоммитить
git add src/components/NewComponent.tsx src/pages/newpage.astro
git commit -m "feat: добавлен компонент от команды"
git push origin main
```

---

## Разрешение конфликтов

### Когда возникают конфликты

Конфликты появляются когда:

- Вы и другой разработчик изменили одну и ту же строку в файле
- Один удалил файл, другой его изменил
- Изменения в одном месте кода пересекаются

### Процесс разрешения

```bash
# 1. При merge появляется сообщение о конфликте
git merge main
# CONFLICT (content): Merge conflict in src/components/Header.tsx

# 2. Посмотреть список конфликтов
git status
# Файлы с конфликтами помечены "both modified"

# 3. Открыть конфликтующий файл в VSCode
# Будут маркеры:

<<<<<<< HEAD (ваши изменения)
const title = "Моя версия заголовка";
=======
const title = "Версия из main";
>>>>>>> main

# 4. VSCode покажет кнопки:
# - Accept Current Change (оставить ваш вариант)
# - Accept Incoming Change (взять вариант из main)
# - Accept Both Changes (объединить оба)
# - Compare Changes (посмотреть разницу)

# 5. Выбрать нужный вариант или объединить вручную
const title = "Финальная версия заголовка";

# 6. Сохранить файл (маркеры должны исчезнуть!)

# 7. Добавить разрешённый файл
git add src/components/Header.tsx

# 8. Проверить что все конфликты разрешены
git status
# Не должно быть "both modified"

# 9. Завершить merge
git commit -m "merge: разрешил конфликты с main"

# 10. Запушить
git push origin feature/ваша-функция
```

### Стратегии разрешения конфликтов

**Простые конфликты (разные части кода):**

```bash
# Использовать "Accept Both Changes"
```

**Конфликты в логике:**

```bash
# Внимательно проанализировать оба варианта
# Объединить вручную или переписать
# Убедиться что код работает!
```

**Конфликты в импортах:**

```bash
# Объединить все импорты
# Удалить дубликаты
# Отсортировать
```

### Проверка после разрешения

```bash
# ОБЯЗАТЕЛЬНО проверить что проект работает!
./clean-install.sh
bun run dev

# Если ошибки - исправить и закоммитить
git add .
git commit -m "fix: исправил ошибки после merge"
git push origin feature/ваша-функция
```

---

## Защита от ошибок

### Файлы которые НЕЛЬЗЯ коммитить

```bash
# ❌ НИКОГДА не добавляйте в Git:
.env                    # Секретные ключи
.env.local
node_modules/           # Зависимости
.vscode/settings.json   # Личные настройки
.DS_Store              # macOS системные файлы
Thumbs.db              # Windows системные файлы
*.log                  # Логи
.cache/                # Кеш
dist/                  # Собранные файлы
```

### Файлы которые МОЖНО коммитить

```bash
# ✅ Коммитьте эти файлы:
src/                   # Исходный код
public/                # Статические файлы
package.json           # Зависимости проекта
astro.config.mjs       # Конфигурация
tailwind.config.js     # Конфигурация
tsconfig.json          # Конфигурация TypeScript
.env.example           # Пример .env
README.md              # Документация
```

### Правильное добавление файлов

```bash
# ❌ ПЛОХО - добавляет всё подряд
git add .

# ✅ ХОРОШО - добавляет конкретные файлы
git add src/components/Header.tsx
git add src/pages/about.astro
git add public/images/logo.png

# ✅ ХОРОШО - добавляет всю папку
git add src/components/
git add public/images/new-project/

# Всегда проверяйте ЧТО добавляете:
git status
git diff --cached
```

### Обновление .gitignore

Убедитесь что в `.gitignore` есть:

```gitignore
# Зависимости
node_modules/
.pnp
.pnp.js

# Локальные env файлы
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Логи
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Кеш и сборка
node_modules
dist
dist-ssr
*.local
.cache
.astro

# Редакторы
.vscode/settings.json
.vscode/launch.json
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Playwright
/test-results/
/playwright-report/
/playwright/.cache/
```

---

## Чеклисты

### Перед началом работы

- [ ] `git checkout main`
- [ ] `git pull origin main`
- [ ] `git checkout -b feature/название`
- [ ] Проверить что `bun run dev` работает

### Перед каждым коммитом

- [ ] `git status` - проверить изменения
- [ ] `git diff` - просмотреть diff
- [ ] Убедиться что НЕТ файлов .env, node_modules, личных настроек
- [ ] `git add` только нужные файлы
- [ ] `bun run dev` - проверить что работает
- [ ] `git commit -m "описание"`
- [ ] `git push origin feature/название`

### Перед merge в main

- [ ] `git checkout main`
- [ ] `git pull origin main`
- [ ] `git checkout feature/название`
- [ ] `git merge main`
- [ ] Разрешить конфликты если есть
- [ ] `./clean-install.sh`
- [ ] `bun run dev` - полное тестирование
- [ ] Создать Pull Request
- [ ] Дождаться ревью
- [ ] Merge через GitHub UI

### Ежедневная синхронизация

- [ ] Утро: `git pull origin main`
- [ ] Утро: `git merge main` в свою ветку
- [ ] В течение дня: частые коммиты
- [ ] Вечер: `git push origin feature/название`

---

## Экстренные ситуации

### Случайно начали работать в main

```bash
# 1. Сохранить изменения
git stash

# 2. Создать ветку
git checkout -b feature/emergency-fix

# 3. Вернуть изменения
git stash pop

# 4. Продолжить работу
```

### Забыли синхронизироваться с main

```bash
# 1. Проверить насколько отстали
git fetch origin
git status

# 2. Синхронизироваться
git checkout main
git pull origin main
git checkout feature/ваша-ветка
git merge main

# 3. Разрешить конфликты
```

### Нужно отменить последний коммит

```bash
# Если ещё НЕ запушили:
git reset --soft HEAD~1
# Изменения останутся, коммит отменится

# Если УЖЕ запушили:
git revert HEAD
git push origin feature/ваша-ветка
```

### Main ушёл далеко вперёд

```bash
# Вариант 1: Merge (безопаснее)
git checkout feature/ваша-ветка
git merge origin/main
# Разрешить конфликты

# Вариант 2: Rebase (чище история)
git checkout feature/ваша-ветка
git rebase origin/main
git push origin feature/ваша-ветка --force
```

---

## Правила командной работы

1. **Общение:** Сообщайте команде над чем работаете
2. **Малые изменения:** Делайте небольшие PR - их легче проверять
3. **Частые коммиты:** Коммитьте часто, небольшими порциями
4. **Описательные сообщения:** Используйте понятные commit messages
5. **Проверка кода:** Всегда запускайте `bun run dev` перед push
6. **Никогда в main:** Никогда не работайте напрямую в main
7. **Синхронизация:** Обновляйте main каждый день
8. **Pull Request:** Используйте PR для всех изменений
9. **Code Review:** Проверяйте код друг друга
10. **Тестирование:** Проверяйте что ничего не сломали

---

## Формат commit сообщений

Используйте префиксы:

```bash
feat: добавил новую функцию
fix: исправил баг
style: изменил стили (без логики)
refactor: рефакторинг кода
docs: обновил документацию
test: добавил тесты
chore: обновил зависимости
perf: улучшил производительность
merge: разрешил конфликты

# Примеры:
git commit -m "feat: добавил галерею проектов"
git commit -m "fix: исправил форму контактов"
git commit -m "style: обновил цвета навигации"
git commit -m "refactor: переписал компонент Header"
git commit -m "docs: обновил README"
```

---

## Структура веток

```
main                           # Продакшн, только стабильный код
├── feature/developer1-task    # Ветка разработчика 1
├── feature/developer2-task    # Ветка разработчика 2
├── feature/your-task          # Ваша ветка
├── fix/bug-navigation         # Исправление бага
└── backup-testing             # Старые эксперименты (не удалять)
```

---

## Полезные команды

```bash
# Посмотреть все ветки
git branch -a

# Посмотреть историю
git log --oneline -10
git log --graph --oneline --all

# Посмотреть изменения в файле
git diff путь/к/файлу

# Посмотреть кто изменял файл
git blame путь/к/файлу

# Переключиться между ветками
git checkout main
git checkout feature/название

# Удалить локальную ветку
git branch -d feature/название

# Удалить удалённую ветку
git push origin --delete feature/название

# Посмотреть удалённые ветки
git remote -v
git branch -r

# Очистить удалённые ветки
git fetch --prune
```

---

## Дополнительные ресурсы

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [README проекта](./README.md)
- [Инструкция по добавлению контента](./how_add_content.md)
