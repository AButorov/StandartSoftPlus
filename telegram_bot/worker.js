// Cloudflare Worker для Telegram уведомлений
// Развернут на: https://telegram-notifier.standartsoftplus.workers.dev
//
// Назначение: Получает данные формы контактов и отправляет уведомления
// в Telegram нескольким получателям
//
// Переменные окружения (Cloudflare Dashboard → Settings → Variables):
//   - TELEGRAM_BOT_TOKEN: Токен бота от @BotFather
//   - TELEGRAM_CHAT_ID_1: Chat ID первого получателя
//   - TELEGRAM_CHAT_ID_2: Chat ID второго получателя

export default {
  async fetch(request, env) {
    // CORS headers для разрешения запросов с сайта
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Обработка preflight запроса
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Принимаем только POST запросы
    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: corsHeaders,
      });
    }

    try {
      // Парсинг данных формы
      const data = await request.json();

      // Формирование красивого сообщения с эмодзи
      const message = `
🔔 <b>Новая заявка с сайта</b>

👤 <b>Имя:</b> ${data.name}
📞 <b>Способ связи:</b> ${data.contactType}
📱 <b>Контакт:</b> ${data.contactValue}
💬 <b>Сообщение:</b>
${data.message}

⏰ <i>${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}</i>
      `.trim();

      // Получатели уведомлений
      const chatIds = [
        env.TELEGRAM_CHAT_ID_1, // Первый получатель
        env.TELEGRAM_CHAT_ID_2, // Второй получатель
      ];

      // Параллельная отправка сообщений всем получателям
      const promises = chatIds.map((chatId) =>
        fetch(
          `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: "HTML",
            }),
          },
        ),
      );

      await Promise.all(promises);

      // Успешный ответ
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    } catch (error) {
      console.error("Error:", error);

      // Ответ с ошибкой
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    }
  },
};
