/**
 * Конфигурация ссылок и токенов для социальных сетей
 * 
 * ИНСТРУКЦИЯ ПО ЗАПОЛНЕНИЮ:
 * 1. Замените placeholder значения на реальные ссылки
 * 2. Для Telegram: используйте формат https://t.me/username или https://t.me/channel_name
 * 3. Для YouTube: используйте формат https://www.youtube.com/@channel или https://www.youtube.com/channel/CHANNEL_ID
 * 4. Для ВКонтакте: используйте формат https://vk.com/username или https://vk.com/public123456
 * 5. Токены для отправки сообщений (если используются боты) - укажите здесь
 */

export const socialLinksConfig = {
  telegram: {
    url: 'https://t.me/+Jj6Uy-wDMfk1NGIy', // Ссылка на группу "Токарная обработка ЧПУ"
    messageUrl: 'https://t.me/share/url?url=', // Для отправки сообщения через Telegram
    botToken: '7664323861:AAEqI-Pn6axi-ABetTrlz4TPKIOm6LX9P3A', // Токен бота Telegram для получения сообщений из формы
    chatId: '1163474868', // ID чата для отправки сообщений
  },
  youtube: {
    url: 'https://youtube.com/@vladimir.rabota.vahta-cnc?si=hxtJcEvApS-CYjqd', // Канал YouTube
    channelId: '', // ID канала YouTube (если нужен для API)
  },
  vkontakte: {
    url: 'https://vk.com/club228382060', // Группа ВКонтакте
    messageUrl: 'https://vk.com/share.php?url=', // Для отправки сообщения через VK
    groupId: '228382060', // ID группы ВКонтакте (извлечен из ссылки)
    accessToken: '', // Токен доступа VK API (если используется для отправки сообщений)
  },
};

/**
 * Функция для получения URL отправки сообщения в Telegram
 */
export const getTelegramMessageUrl = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://t.me/share/url?url=${encodedMessage}`;
};

/**
 * Функция для получения URL отправки сообщения в ВКонтакте
 */
export const getVKMessageUrl = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://vk.com/share.php?url=${encodedMessage}`;
};

