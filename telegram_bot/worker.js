// Cloudflare Worker для уведомлений в Telegram
export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Обработка OPTIONS (preflight)
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Только POST
    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: corsHeaders,
      });
    }

    try {
      const data = await request.json();

      // Формирование сообщения
      const message = `
🔔 <b>Новая заявка с сайта</b>

👤 <b>Имя:</b> ${data.name}
📞 <b>Способ связи:</b> ${data.contactType}
📱 <b>Контакт:</b> ${data.contactValue}
💬 <b>Сообщение:</b>
${data.message}

⏰ <i>${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}</i>
      `.trim();

      // Отправка в Telegram (для обоих получателей)
      const chatIds = [
        env.TELEGRAM_CHAT_ID_1, // Ваш chat_id
        env.TELEGRAM_CHAT_ID_2, // Chat_id партнера
      ];

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

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    } catch (error) {
      console.error("Error:", error);
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
