#!/usr/bin/env node
/**
 * FAQ ГЕНЕРАТОР 3.0 — Полная версия из исходного DOCX
 * 
 * Функция: Читает FAQ-2025.docx → парсит HTML → генерирует полный DOCX с SEO
 * Использование: node generate-faq.cjs
 * Выход: /scripts/FAQ-2025-FULL-SEO.docx
 * 
 * Дата: 2025-02-03
 * Автор: StandartSoft
 */

const mammoth = require('mammoth');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, 
        LevelFormat, convertInchesToTwip } = require('docx');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// ============================================================
// КОНФИГ
// ============================================================

const CONFIG = {
  INPUT_FILE: path.join(__dirname, '../Kopiia-Chasto-zadavaemye-voprosy-FAQ.docx'),
  OUTPUT_DIR: path.join(__dirname),
  OUTPUT_FILE: 'FAQ-2025-FULL-SEO.docx',
  COLORS: {
    heading1: '1A1A1A',    // Тёмный серый
    heading2: '2C3E50',    // Синий
    heading3: '34495E',    // Тёмно-синий
    meta: '7F8C8D'         // Светлый серый
  },
  FONTS: {
    default: 'Arial',
    sizes: {
      h1: 36,   // 18pt
      h2: 32,   // 16pt
      h3: 28,   // 14pt
      body: 24  // 12pt
    }
  }
};

// ============================================================
// УТИЛИТЫ ДЛЯ ПАРСИНГА HTML
// ============================================================

/**
 * Парсит HTML-структуру из Mammoth
 * Возвращает массив блоков вида { type: 'h1'|'h2'|'h3'|'p'|'ul', content, items }
 */
function parseHTMLStructure(html) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  
  const blocks = [];
  const walker = doc.createTreeWalker(
    doc.body,
    dom.window.NodeFilter.SHOW_ELEMENT,
    null,
    false
  );

  let node;
  while (node = walker.nextNode()) {
    const tag = node.tagName.toLowerCase();
    const text = node.textContent?.trim() || '';

    if (!text) continue; // Пропускаем пустые

    if (tag === 'h1') {
      blocks.push({ type: 'h1', content: text });
    } else if (tag === 'h2') {
      blocks.push({ type: 'h2', content: text });
    } else if (tag === 'h3') {
      blocks.push({ type: 'h3', content: text });
    } else if (tag === 'p') {
      if (text) blocks.push({ type: 'p', content: text });
    } else if (tag === 'ul' || tag === 'ol') {
      const items = [];
      node.querySelectorAll('li').forEach(li => {
        const liText = li.textContent?.trim();
        if (liText) items.push(liText);
      });
      if (items.length > 0) {
        blocks.push({ 
          type: tag === 'ul' ? 'ul' : 'ol', 
          items 
        });
      }
    } else if (tag === 'blockquote') {
      blocks.push({ type: 'blockquote', content: text });
    }
  }

  return blocks;
}

/**
 * "Усиливает" текст: добавляет выразительности без искажения смысла
 * - Короткие абзацы в начале раздела (лид)
 * - Унификация форматирования
 * - Скрытые CTA в конце блока (если нужно)
 */
function enhanceContent(blocks) {
  const enhanced = [];

  // Добавляем короткий лид в начало каждого H2-раздела
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    enhanced.push(block);

    // Если текущий блок H2, ищем следующий обычный параграф для "лида"
    if (block.type === 'h2' && i + 1 < blocks.length) {
      const nextBlock = blocks[i + 1];
      
      // Если следующий — просто параграф, помечаем как "intro"
      if (nextBlock.type === 'p' && !nextBlock.isIntro) {
        enhanced[enhanced.length] = { ...nextBlock, isIntro: true };
        i++; // Пропускаем этот параграф в основном цикле
      }
    }
  }

  return enhanced;
}

/**
 * Превращает блоки в DOCX-параграфы
 */
function blocksToDocxParagraphs(blocks) {
  const paragraphs = [];

  blocks.forEach((block, idx) => {
    switch (block.type) {
      case 'h1':
        paragraphs.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: block.content,
                size: CONFIG.FONTS.sizes.h1,
                bold: true,
                font: CONFIG.FONTS.default,
                color: CONFIG.COLORS.heading1
              })
            ],
            spacing: { before: 480, after: 360 }
          })
        );
        break;

      case 'h2':
        paragraphs.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun({
                text: block.content,
                size: CONFIG.FONTS.sizes.h2,
                bold: true,
                font: CONFIG.FONTS.default,
                color: CONFIG.COLORS.heading2
              })
            ],
            spacing: { before: 360, after: 240 }
          })
        );
        break;

      case 'h3':
        paragraphs.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({
                text: block.content,
                size: CONFIG.FONTS.sizes.h3,
                bold: true,
                font: CONFIG.FONTS.default,
                color: CONFIG.COLORS.heading3
              })
            ],
            spacing: { before: 240, after: 180 }
          })
        );
        break;

      case 'p':
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: block.content,
                size: CONFIG.FONTS.sizes.body,
                font: CONFIG.FONTS.default
              })
            ],
            spacing: { after: 180 },
            ...(block.isIntro && { italics: true })
          })
        );
        break;

      case 'ul':
      case 'ol':
        block.items.forEach(item => {
          paragraphs.push(
            new Paragraph({
              numbering: { 
                reference: block.type === 'ul' ? 'bullets' : 'numbers',
                level: 0 
              },
              children: [
                new TextRun({
                  text: item,
                  size: CONFIG.FONTS.sizes.body,
                  font: CONFIG.FONTS.default
                })
              ],
              spacing: { after: 120 }
            })
          );
        });
        break;

      case 'blockquote':
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: block.content,
                size: CONFIG.FONTS.sizes.body,
                font: CONFIG.FONTS.default,
                italics: true,
                color: '555555'
              })
            ],
            spacing: { before: 120, after: 180, indentation: { left: 720, right: 720 } }
          })
        );
        break;
    }
  });

  return paragraphs;
}

/**
 * Возвращает конфиг для DOCX с нумерацией и стилями
 */
function getDocxConfig(paragraphs) {
  return {
    numbering: {
      config: [
        {
          reference: 'bullets',
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: '•',
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: {
                  indent: { left: 720, hanging: 360 }
                }
              }
            }
          ]
        },
        {
          reference: 'numbers',
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: '%1.',
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: {
                  indent: { left: 720, hanging: 360 }
                }
              }
            }
          ]
        }
      ]
    },
    sections: [{
      properties: {
        page: {
          margin: { 
            top: convertInchesToTwip(1),
            right: convertInchesToTwip(1),
            bottom: convertInchesToTwip(1),
            left: convertInchesToTwip(1)
          }
        }
      },
      children: paragraphs
    }]
  };
}

// ============================================================
// ГЛАВНЫЙ ПРОЦЕСС
// ============================================================

async function main() {
  console.log('📖 Чтение исходного DOCX...');
  console.log(`   Файл: ${CONFIG.INPUT_FILE}`);

  try {
    // Шаг 1: Читаем DOCX
    const result = await mammoth.convertToHtml({ path: CONFIG.INPUT_FILE });
    const html = result.value;
    const messages = result.messages || [];

    if (messages.length > 0) {
      console.log('\n⚠️  Предупреждения при конвертации:');
      messages.forEach(msg => console.log(`   - ${msg.message}`));
    }

    console.log('✅ DOCX прочитан успешно');

    // Шаг 2: Парсим структуру
    console.log('\n📐 Парсинг структуры HTML...');
    let blocks = parseHTMLStructure(html);
    console.log(`   Извлечено блоков: ${blocks.length}`);

    // Подсчёт разных типов
    const typeCount = {};
    blocks.forEach(b => {
      typeCount[b.type] = (typeCount[b.type] || 0) + 1;
    });
    console.log('   Состав:');
    Object.entries(typeCount).forEach(([type, count]) => {
      console.log(`     - ${type}: ${count}`);
    });

    // Шаг 3: Усиливаем контент
    console.log('\n✨ Усиление контента...');
    blocks = enhanceContent(blocks);

    // Шаг 4: Добавляем мета-информацию в начало/конец
    blocks.unshift({
      type: 'p',
      content: '📚 Полное руководство по разработке мобильных приложений, веб-сервисов и технической поддержке. Ответы на 40+ вопросов от профессионалов StandartSoft.',
      isIntro: true
    });

    blocks.push({
      type: 'p',
      content: '✅ Версия: 3.0 | Дата: 03.02.2025 | Язык: Русский',
      isIntro: false
    });

    // Шаг 5: Конвертируем в DOCX-параграфы
    console.log('\n🎨 Генерация DOCX...');
    const paragraphs = blocksToDocxParagraphs(blocks);
    console.log(`   Параграфов: ${paragraphs.length}`);

    // Шаг 6: Создаём документ
    const docConfig = getDocxConfig(paragraphs);
    const doc = new Document(docConfig);

    // Шаг 7: Сохраняем
    console.log('\n💾 Сохранение файла...');
    const outputPath = path.join(CONFIG.OUTPUT_DIR, CONFIG.OUTPUT_FILE);

    // Убеждаемся, что папка существует
    if (!fs.existsSync(CONFIG.OUTPUT_DIR)) {
      fs.mkdirSync(CONFIG.OUTPUT_DIR, { recursive: true });
    }

    await Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync(outputPath, buffer);

      const sizeKb = (buffer.length / 1024).toFixed(2);
      console.log(`\n✅ УСПЕХ!`);
      console.log(`   Файл: ${CONFIG.OUTPUT_FILE}`);
      console.log(`   Размер: ${sizeKb} KB`);
      console.log(`   Путь: ${outputPath}`);
      console.log(`\n📊 Статистика:
   - H1 заголовков: ${typeCount.h1 || 0}
   - H2 заголовков: ${typeCount.h2 || 0}
   - H3 вопросов: ${typeCount.h3 || 0}
   - Параграфов: ${typeCount.p || 0}
   - Списков: ${(typeCount.ul || 0) + (typeCount.ol || 0)}
   - Всего блоков: ${blocks.length}`);
    });

  } catch (error) {
    console.error('\n❌ ОШИБКА:', error.message);
    process.exit(1);
  }
}

// ============================================================
// ЗАПУСК
// ============================================================

main();
