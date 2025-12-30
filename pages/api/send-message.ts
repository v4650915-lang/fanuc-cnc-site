import type { NextApiRequest, NextApiResponse } from 'next';
import { socialLinksConfig } from '@/config/socialLinks';
import FormData from 'form-data';
import axios from 'axios';

interface MessageData {
  name: string;
  message: string;
  photos?: string[]; // Base64 encoded images
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, message, photos }: MessageData = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: 'Имя и сообщение обязательны' });
    }

    // Проверяем наличие токена и Chat ID
    if (!socialLinksConfig.telegram.botToken) {
      return res.status(500).json({ error: 'Telegram Bot Token не настроен' });
    }

    if (!socialLinksConfig.telegram.chatId) {
      return res.status(500).json({ 
        error: 'Chat ID не настроен. Добавьте бота в группу и получите Chat ID через @userinfobot' 
      });
    }

    // Формируем текст сообщения
    let messageText = `📨 <b>Новое сообщение с сайта</b>\n\n`;
    messageText += `👤 <b>От:</b> ${name}\n\n`;
    messageText += `💬 <b>Сообщение:</b>\n${message}\n`;

    if (photos && photos.length > 0) {
      messageText += `\n📷 <b>Прикреплено фото:</b> ${photos.length} шт.`;
    }

    // Отправляем сообщение в Telegram
    const telegramApiUrl = `https://api.telegram.org/bot${socialLinksConfig.telegram.botToken}/sendMessage`;
    
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: socialLinksConfig.telegram.chatId,
        text: messageText,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', data);
      return res.status(500).json({ 
        error: 'Ошибка отправки сообщения в Telegram',
        details: data.description || 'Неизвестная ошибка'
      });
    }

    // Если есть фото, отправляем их отдельными сообщениями (неблокирующая отправка)
    let photoErrors: string[] = [];
    let photosSent = 0;
    
    if (photos && photos.length > 0) {
      
      for (let i = 0; i < photos.length; i++) {
        try {
          const photoBase64 = photos[i];
          if (!photoBase64 || photoBase64.trim() === '') {
            console.warn(`Photo ${i + 1} is empty, skipping`);
            continue;
          }

          // Конвертируем base64 в Buffer
          let imageBuffer: Buffer;
          try {
            imageBuffer = Buffer.from(photoBase64, 'base64');
          } catch (bufferError) {
            console.error(`Error converting photo ${i + 1} to buffer:`, bufferError);
            photoErrors.push(`Фото ${i + 1}: Ошибка конвертации`);
            continue;
          }
          
          if (imageBuffer.length === 0) {
            console.warn(`Photo ${i + 1} buffer is empty, skipping`);
            photoErrors.push(`Фото ${i + 1}: Пустой файл`);
            continue;
          }
          
          // Создаем FormData для отправки фото
          const formData = new FormData();
          formData.append('chat_id', socialLinksConfig.telegram.chatId);
          formData.append('photo', imageBuffer, {
            filename: `photo_${i + 1}.jpg`,
            contentType: 'image/jpeg',
          });
          if (i === 0) {
            formData.append('caption', `📷 Фото от ${name}`);
          }

          // Отправляем фото через axios (правильная работа с multipart/form-data)
          try {
            const photoResponse = await axios.post(
              `https://api.telegram.org/bot${socialLinksConfig.telegram.botToken}/sendPhoto`,
              formData,
              {
                headers: {
                  ...formData.getHeaders(),
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
              }
            );

            const photoData = photoResponse.data;

            if (!photoData.ok) {
              const errorMsg = `Фото ${i + 1}: ${photoData.description || 'Неизвестная ошибка'}`;
              console.error('Telegram Photo API error:', errorMsg, photoData);
              photoErrors.push(errorMsg);
            } else {
              console.log(`Photo ${i + 1} sent successfully`);
              photosSent++;
            }
          } catch (axiosError: any) {
            const errorMsg = `Фото ${i + 1}: ${axiosError.response?.data?.description || axiosError.message || 'Ошибка отправки'}`;
            console.error('Axios error sending photo:', errorMsg, axiosError.response?.data);
            photoErrors.push(errorMsg);
          }
        } catch (photoError) {
          const errorMsg = `Фото ${i + 1}: ${photoError instanceof Error ? photoError.message : 'Ошибка отправки'}`;
          console.error('Error sending photo:', errorMsg, photoError);
          if (photoError instanceof Error) {
            console.error('Error stack:', photoError.stack);
          }
          photoErrors.push(errorMsg);
          // Продолжаем отправку остальных фото даже если одно не отправилось
        }
      }
    }

    // Возвращаем успех, даже если некоторые фото не отправились
    // Текстовое сообщение уже отправлено успешно
    const responseMessage = photos && photos.length > 0
      ? `Сообщение отправлено! Фото: ${photosSent}/${photos.length} отправлено.`
      : 'Сообщение успешно отправлено!';
    
    return res.status(200).json({ 
      success: true, 
      message: responseMessage,
      photosSent: photosSent,
      photosTotal: photos?.length || 0,
      photoErrors: photoErrors.length > 0 ? photoErrors : undefined
    });

  } catch (error) {
    console.error('Error in send-message API:', error);
    
    // Детальное логирование ошибки
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return res.status(500).json({ 
      error: 'Внутренняя ошибка сервера',
      details: error instanceof Error ? error.message : 'Неизвестная ошибка'
    });
  }
}

