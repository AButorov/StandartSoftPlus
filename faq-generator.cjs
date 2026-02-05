const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, 
        BorderStyle, Table, TableRow, TableCell, WidthType, ShadingType, 
        ExternalHyperlink, PageBreak, LevelFormat } = require('docx');
const fs = require('fs');

/**
 * Генератор оптимизированного FAQ документа
 * Версия: 2.0 (SEO-оптимизирован)
 * Дата: 2025-02-03
 * Использование: node faq-generator.js
 */

const doc = new Document({
  styles: {
    default: { 
      document: { 
        run: { font: "Arial", size: 24 } // 12pt базовый размер
      } 
    },
    paragraphStyles: [
      // Заголовок H1
      { 
        id: "Heading1", 
        name: "Heading 1", 
        basedOn: "Normal", 
        next: "Normal", 
        quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: "1A1A1A" },
        paragraph: { 
          spacing: { before: 480, after: 360 }, 
          outlineLevel: 0 
        } 
      },
      // Заголовок H2
      { 
        id: "Heading2", 
        name: "Heading 2", 
        basedOn: "Normal", 
        next: "Normal", 
        quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "2C3E50" },
        paragraph: { 
          spacing: { before: 360, after: 240 }, 
          outlineLevel: 1 
        } 
      },
      // Заголовок H3 (вопросы)
      { 
        id: "Heading3", 
        name: "Heading 3", 
        basedOn: "Normal", 
        next: "Normal", 
        quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: "34495E" },
        paragraph: { 
          spacing: { before: 240, after: 180 }, 
          outlineLevel: 2 
        } 
      },
    ]
  },

  numbering: {
    config: [
      { 
        reference: "bullets",
        levels: [
          { 
            level: 0, 
            format: LevelFormat.BULLET, 
            text: "•", 
            alignment: AlignmentType.LEFT,
            style: { 
              paragraph: { 
                indent: { left: 720, hanging: 360 } 
              } 
            } 
          }
        ] 
      },
    ]
  },

  sections: [{
    properties: {
      page: {
        size: {
          width: 12240,   // US Letter
          height: 15840
        },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    
    children: [
      // ГЛАВНЫЙ ЗАГОЛОВОК (H1)
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun("Разработка мобильных приложений и веб-сервисов — Часто задаваемые вопросы")
        ],
        spacing: { after: 480 }
      }),

      // Вводный текст
      new Paragraph({
        children: [
          new TextRun({
            text: "Полное руководство по стоимости, срокам и процессу разработки цифровых продуктов. Ответы на 40+ вопросов о создании iOS/Android приложений, веб-сервисов и технической поддержке.",
            italics: true,
            size: 24
          })
        ],
        spacing: { after: 480 },
        alignment: AlignmentType.CENTER
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Последнее обновление: Февраль 2025",
            size: 20,
            color: "7F8C8D"
          })
        ],
        spacing: { after: 720 },
        alignment: AlignmentType.CENTER
      }),

      // БЛОК 1: СТОИМОСТЬ И СРОКИ
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [
          new TextRun("💰 Блок 1: Стоимость и сроки разработки")
        ],
        spacing: { before: 480, after: 360 }
      }),

      new Paragraph({
        children: [
          new TextRun("Прозрачное ценообразование и фиксированные сроки — основа нашего подхода к работе с клиентами.")
        ],
        spacing: { after: 360 }
      }),

      // Вопрос 1
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [
          new TextRun("1. Сколько стоит разработка мобильного приложения iOS/Android в 2025 году?")
        ],
        spacing: { before: 360, after: 240 }
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "От 100 000 ₽ за MVP до 2 000 000 ₽ за enterprise-решение.", bold: true })
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        children: [
          new TextRun("Точная цена фиксируется в договоре после утверждения Технического задания (ТЗ) и остаётся неизменной в процессе работы.")
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "Примеры:", bold: true })
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun("Приложение-каталог с корзиной: "),
          new TextRun({ text: "150-300 тыс. ₽", bold: true })
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun("Маркетплейс с личным кабинетом: "),
          new TextRun({ text: "500-800 тыс. ₽", bold: true })
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun("Финтех-сервис с интеграциями: "),
          new TextRun({ text: "1-2 млн. ₽", bold: true })
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        children: [
          new TextRun("Разработка на Flutter (один код для iOS + Android) экономит до 40% бюджета по сравнению с нативной разработкой.")
        ],
        spacing: { after: 480 }
      }),

      // БЛОК 2: ПРОЦЕСС РАБОТЫ (новая страница)
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [
          new TextRun("📋 Блок 2: Процесс работы и контроль")
        ],
        spacing: { before: 720, after: 360 },
        pageBreakBefore: true
      }),

      new Paragraph({
        children: [
          new TextRun("Прозрачность процессов и юридическая чистота — основа долгосрочного сотрудничества.")
        ],
        spacing: { after: 360 }
      }),

      // Вопрос 8 (из исходного скрипта)
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [
          new TextRun("8. Что нужно от меня для старта работ?")
        ],
        spacing: { before: 360, after: 240 }
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "Для начала достаточно сформулированной бизнес-идеи.", bold: true })
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        children: [
          new TextRun("Готовое Техническое задание или дизайн-макеты не обязательны. Минимальная информация для старта:")
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Что решает продукт? ", bold: true }),
          new TextRun("(проблема, которую закрываете)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Для кого? ", bold: true }),
          new TextRun("(целевая аудитория)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Ключевые функции ", bold: true }),
          new TextRun("(что пользователь сможет делать)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Примеры-аналоги ", bold: true }),
          new TextRun("(если есть)")
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        children: [
          new TextRun("На этапе брифинга (30-60 минут) мы детализируем концепцию и начнём предпроектную аналитику.")
        ],
        spacing: { after: 480 }
      }),

      // БЛОК 3: МОБИЛЬНАЯ РАЗРАБОТКА (новая страница)
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [
          new TextRun("📱 Блок 3: Мобильная разработка (iOS / Android)")
        ],
        spacing: { before: 720, after: 360 },
        pageBreakBefore: true
      }),

      new Paragraph({
        children: [
          new TextRun("От идеи до иконки в телефоне пользователя. Оптимальные технологии и полное сопровождение публикации.")
        ],
        spacing: { after: 360 }
      }),

      // Вопрос 17
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [
          new TextRun("17. Нативная или кроссплатформенная разработка?")
        ],
        spacing: { before: 360, after: 240 }
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "Наше флагманское решение — кроссплатформа на Flutter (Dart).", bold: true })
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        children: [
          new TextRun("Flutter — современная технология от Google, позволяющая создавать производительные приложения одновременно для iOS и Android.")
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "Сравнение подходов:", bold: true })
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Нативная разработка (Swift + Kotlin): ", bold: true }),
          new TextRun("два отдельных кода = двойной бюджет")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Flutter (кроссплатформа): ", bold: true }),
          new TextRun("один код для обеих платформ = экономия до 40%")
        ],
        spacing: { after: 480 }
      }),

      // Итоговая информация
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [
          new TextRun("ℹ️ Информация о документе")
        ],
        spacing: { before: 720, after: 360 },
        pageBreakBefore: true
      }),

      new Paragraph({
        children: [
          new TextRun("Документ сгенерирован автоматически и оптимизирован для:")
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun("📊 SEO (структурированные заголовки H1-H3, ключевые фразы)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun("🎨 Презентации (понятная иерархия, маркеры, цветные ударения)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun("📄 Экспорта (DOCX → PDF без потери форматирования)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun("📱 Мобильности (респонзивная вёрстка при открытии на разных устройствах)")
        ],
        spacing: { after: 360 }
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "Версия 2.0 | Дата создания: 03.02.2025 | Язык: Русский", italics: true, size: 20, color: "7F8C8D" })
        ],
        alignment: AlignmentType.CENTER
      })
    ]
  }]
});

// ============================================================
// СОХРАНЕНИЕ ФАЙЛА
// ============================================================

Packer.toBuffer(doc).then((buffer) => {
  const filename = 'FAQ-2025-SEO-optimized.docx';
  fs.writeFileSync(filename, buffer);
  console.log(`✅ Файл успешно создан: ${filename}`);
  console.log(`📦 Размер: ${(buffer.length / 1024).toFixed(2)} KB`);
  console.log(`📍 Путь: ${process.cwd()}/${filename}`);
}).catch((err) => {
  console.error('❌ Ошибка при сохранении файла:', err);
});
