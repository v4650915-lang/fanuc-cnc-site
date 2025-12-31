'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const ContactForm = () => {
  const [name, setName] = useState('подписчик');
  const [message, setMessage] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Твои данные Telegram
  const BOT_TOKEN = "7664323861:AAEqI-Pn6axi-ABetTrlz4TPKIOm6LX9P3A";
  const CHAT_ID = "1163474868";

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).slice(0, 5 - photos.length);
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setSubmitStatus({ type: 'error', message: 'Пожалуйста, введите сообщение' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const textHeadline = `🚀 <b>Новое сообщение с сайта!</b>\n\n`;
    const textBody = `👤 <b>Имя:</b> ${name || 'подписчик'}\n💬 <b>Сообщение:</b> ${message}`;

    try {
      if (photos.length === 0) {
        // Если фото нет, отправляем просто текстовое сообщение
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: textHeadline + textBody,
            parse_mode: 'HTML',
          }),
        });

        if (!response.ok) throw new Error('Ошибка при отправке текста');
      } else {
        // Если есть фото, используем sendMediaGroup для пачки фотографий
        const formData = new FormData();
        formData.append('chat_id', CHAT_ID);

        const media = photos.map((file, index) => {
          formData.append(`photo${index}`, file);
          return {
            type: 'photo',
            media: `attach://photo${index}`,
            // Подпись добавляем только к первой фотографии в группе
            caption: index === 0 ? textHeadline + textBody : '',
            parse_mode: 'HTML'
          };
        });

        formData.append('media', JSON.stringify(media));

        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMediaGroup`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Ошибка при отправке медиагруппы');
      }

      // Успешная отправка
      setSubmitStatus({ type: 'success', message: 'Сообщение и фото успешно отправлены в Telegram! 🎉' });
      setMessage('');
      setPhotos([]);
      setName('подписчик');
      
      setTimeout(() => setSubmitStatus({ type: null, message: '' }), 5000);

    } catch (error) {
      console.error('Error submitting to Telegram:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Ошибка отправки. Проверь интернет или настройки бота.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative z-10 max-w-4xl mx-auto my-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{
            backgroundImage: `url('/fanuc-cnc-site/images/newyear-frame.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            boxShadow: '0 0 80px rgba(255, 215, 0, 0.8)',
            border: '8px solid rgba(255, 215, 0, 1)',
            minHeight: '600px',
          }}
        >
          <form onSubmit={handleSubmit} className="relative z-10 p-10">
            <div className="mb-8 text-center relative">
              <div className="absolute inset-0 -mx-4 -my-2 bg-black/60 backdrop-blur-sm rounded-2xl border-2 border-yellow-500/30"></div>
              <label className="block text-4xl md:text-5xl font-black mb-8 text-center relative z-10 px-4 py-3"
                style={{ color: '#D4AF37', textShadow: '0 2px 4px rgba(0, 0, 0, 0.9)' }}>
                ✨ Форма обратной связи ✨
              </label>
            </div>
            
            <div className="mb-6">
              <label className="block text-base font-bold mb-3 text-white">Имя</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-5 pr-5 py-5 text-lg rounded-2xl text-gray-900 bg-white/90"
                placeholder="подписчик"
              />
            </div>

            <div className="mb-6">
              <label className="block text-base font-bold mb-3 text-white">Сообщение</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Напишите ваши пожелания..."
                className="w-full pl-5 pr-5 py-5 text-lg rounded-2xl text-gray-900 bg-white/90 resize-none"
                rows={6}
              />
            </div>

            <div className="mb-6">
              <label className="block text-base font-bold mb-3 text-white">Прикрепить фото (до 5 шт)</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
                disabled={photos.length >= 5}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={photos.length >= 5}
                className="w-full py-5 text-white font-bold text-lg rounded-2xl bg-blue-600/80 hover:bg-blue-500 transition-all"
              >
                📷 {photos.length >= 5 ? 'Максимум 5 фото' : 'Выбрать фото'}
              </button>
              
              {photos.length > 0 && (
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img src={URL.createObjectURL(photo)} alt="Preview" className="w-full h-20 object-cover rounded-lg border-2 border-yellow-500" />
                      <button type="button" onClick={() => removePhoto(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6">×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {submitStatus.type && (
              <div className={`mb-4 p-4 rounded-xl text-center font-bold ${submitStatus.type === 'success' ? 'bg-green-500/80 text-white' : 'bg-red-500/80 text-white'}`}>
                {submitStatus.message}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-white font-bold text-xl rounded-xl bg-gradient-to-r from-red-500 to-yellow-500 shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? '🚀 Отправка...' : 'Отправить 🎉'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};