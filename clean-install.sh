#!/bin/bash
# clean-install.sh - Скрипт очистки и переустановки зависимостей

echo "🧹 Очистка кеша и зависимостей..."

# Удаляем node_modules
if [ -d "node_modules" ]; then
    echo "  → Удаление node_modules..."
    rm -rf node_modules
fi

# Удаляем .astro кеш
if [ -d ".astro" ]; then
    echo "  → Удаление .astro кеша..."
    rm -rf .astro
fi

# Удаляем bun.lock
if [ -f "bun.lock" ]; then
    echo "  → Удаление bun.lock..."
    rm -f bun.lock
fi

# Удаляем playwright кеш (если есть)
if [ -d ".cache" ]; then
    echo "  → Удаление .cache..."
    rm -rf .cache
fi

echo ""
echo "📦 Установка зависимостей..."
bun install

echo ""
echo "✅ Готово!"
echo ""
echo "Запустите проект: bun run dev"