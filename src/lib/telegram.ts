import { logger } from './logger';

export interface TelegramSettings {
  botToken: string;
  chatId: string;
}

/**
 * Retrieves the current Telegram settings from either localStorage or Environment variables.
 * LocalStorage takes precedence for easy runtime configuration in preview/app modes.
 */
export function getTelegramSettings(): TelegramSettings {
  const localToken = localStorage.getItem('astmed_tg_bot_token') || '';
  const localChatId = localStorage.getItem('astmed_tg_chat_id') || '';

  const envToken = ((import.meta as any).env?.VITE_TELEGRAM_BOT_TOKEN as string) || '';
  const envChatId = ((import.meta as any).env?.VITE_TELEGRAM_CHAT_ID as string) || '';

  return {
    botToken: localToken || envToken,
    chatId: localChatId || envChatId,
  };
}

/**
 * Saves Telegram settings to localStorage for dynamic overrides.
 */
export function saveTelegramSettings(botToken: string, chatId: string): void {
  localStorage.setItem('astmed_tg_bot_token', botToken.trim());
  localStorage.setItem('astmed_tg_chat_id', chatId.trim());
  logger.info('Настройки Telegram интеграции сохранены в локальное хранилище');
}

/**
 * Clears custom Telegram credentials from localStorage.
 */
export function clearTelegramSettings(): void {
  localStorage.removeItem('astmed_tg_bot_token');
  localStorage.removeItem('astmed_tg_chat_id');
  logger.info('Локальные настройки Telegram сброшены. Используются значения по умолчанию из окружения.');
}

/**
 * Checks if Telegram integration is configured.
 */
export function isTelegramConfigured(): boolean {
  const settings = getTelegramSettings();
  return !!(settings.botToken && settings.chatId);
}

function escapeHtml(unsafe: string): string {
  return (unsafe || '')
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Formats lead details for a premium look in Telegram text.
 */
export function formatLeadMessage(lead: {
  leadId: string;
  type: string;
  product?: string;
  contact: {
    name: string;
    phone: string;
    email?: string;
    comment?: string;
  };
}): string {
  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
  
  // Clean type translation
  let formattedType = lead.type;
  if (lead.type === 'kp') formattedType = '📋 Запрос коммерческого предложения (КП)';
  else if (lead.type === 'price') formattedType = '💰 Запрос расчета стоимости';
  else if (lead.type === 'consultation') formattedType = '📞 Запись на экспертную консультацию';
  else if (lead.type === 'leasing') formattedType = '🏦 Расчет кредита / Лизинга';
  else if (lead.type === 'turnkey') formattedType = '🏢 Клиника под ключ';
  else if (lead.type === 'Landing-Form') formattedType = '🚀 Горячая заявка с лендинга Aquapure II';

  const productInfo = lead.product ? lead.product : 'Все оборудование AstMed';

  return `
🔥 <b>НОВАЯ ЗАЯВКА НА САЙТЕ ASTMED</b>
──────────────────────
📌 <b>ID Заявки:</b> <code>${escapeHtml(lead.leadId)}</code>
📅 <b>Дата:</b> ${now} (МСК)
⚙️ <b>Тип запроса:</b> <b>${escapeHtml(formattedType)}</b>
📦 <b>Оборудование:</b> <b>${escapeHtml(productInfo)}</b>

👤 <b>Контактные данные:</b>
• <b>Имя:</b> ${escapeHtml(lead.contact.name)}
• <b>Телефон:</b> <code>${escapeHtml(lead.contact.phone)}</code>
${lead.contact.email ? `• <b>Email:</b> ${escapeHtml(lead.contact.email)}` : ''}

💬 <b>Комментарий:</b>
<i>${escapeHtml(lead.contact.comment || 'Без дополнительного комментария')}</i>
──────────────────────
💻 <i>Поступила из веб-приложения AstMed App</i>
  `.trim();
}

/**
 * Sends a gorgeous message to the specified Telegram channel or group.
 */
export async function sendTelegramNotification(lead: {
  leadId: string;
  type: string;
  product?: string;
  contact: {
    name: string;
    phone: string;
    email?: string;
    comment?: string;
  };
}): Promise<boolean> {
  const { botToken, chatId } = getTelegramSettings();

  if (!botToken || !chatId) {
    logger.warn('Интеграция с Telegram не настроена. Пропустили отправку сообщения.', {
      hint: 'Добавьте токен бота и chat ID в панель интеграции.'
    });
    return false;
  }

  const messageText = formatLeadMessage(lead);
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId.trim(),
        text: messageText,
        parse_mode: 'HTML',
      }),
    });

    const result = await response.json();
    if (result.ok) {
      logger.info(`✅ Успешно отправлено уведомление в Telegram по заявке ${lead.leadId}`);
      return true;
    } else {
      logger.error('❌ Ошибка отправки в Telegram API:', result);
      return false;
    }
  } catch (err: any) {
    logger.error('❌ Системный сбой при отправке уведомления в Telegram:', err.message || err);
    return false;
  }
}

/**
 * Fires a test ping notification to verify connection.
 */
export async function testTelegramConnection(botToken: string, chatId: string): Promise<{ success: boolean; message: string }> {
  const testMessage = `
⚡ <b>ТЕСТ ИНТЕГРАЦИИ TELEGRAM BOT</b>
──────────────────────
✅ Соединение успешно установлено!
Ваш бот настроен правильно для приема лидов с сайта <b>AstMed</b>.
📅 Время теста: ${new Date().toLocaleString('ru-RU')}
──────────────────────
  `.trim();

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId.trim(),
        text: testMessage,
        parse_mode: 'HTML',
      }),
    });

    const result = await response.json();
    if (result.ok) {
      return { success: true, message: 'Тестовое сообщение успешно отправлено!' };
    } else {
      return { success: false, message: `Telegram Error: ${result.description || JSON.stringify(result)}` };
    }
  } catch (err: any) {
    return { success: false, message: err.message || 'Сбой подключения' };
  }
}
