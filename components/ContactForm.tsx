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

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1]; // Убираем префикс data:image/...
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setSubmitStatus({ type: 'error', message: 'Пожалуйста, введите сообщение' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Конвертируем фото в base64
      const photosBase64: string[] = [];
      for (const photo of photos) {
        try {
          const base64 = await convertFileToBase64(photo);
          photosBase64.push(base64);
        } catch (error) {
          console.error('Error converting photo:', error);
        }
      }

      // Отправляем данные на API
      // ВАЖНО: API routes не работают на GitHub Pages (статический экспорт)
      // Для работы формы нужно использовать внешний сервис (Vercel, Netlify Functions и т.д.)
      const apiPath = process.env.NODE_ENV === 'production' 
        ? '/fanuc-cnc-site/api/send-message' 
        : '/api/send-message';
      const response = await fetch(apiPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name || 'подписчик',
          message: message,
          photos: photosBase64.length > 0 ? photosBase64 : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка отправки сообщения');
      }

      // Успешная отправка
      let successMessage = data.message || 'Сообщение успешно отправлено! 🎉';
      if (data.photosSent !== undefined && data.photosTotal !== undefined) {
        if (data.photosSent < data.photosTotal) {
          successMessage = `Сообщение отправлено! Фото: ${data.photosSent}/${data.photosTotal} отправлено.`;
          if (data.photoErrors && data.photoErrors.length > 0) {
            console.warn('Photo errors:', data.photoErrors);
          }
        }
      }
      setSubmitStatus({ type: 'success', message: successMessage });
      setMessage('');
      setPhotos([]);
      setName('подписчик');
      
      // Очищаем статус через 5 секунд
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Произошла ошибка при отправке. Попробуйте еще раз.' 
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
        {/* Новогодняя рамка - изображение как фон с усиленными эффектами */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{
            backgroundImage: `url('/fanuc-cnc-site/images/newyear-frame.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            boxShadow: `
              0 0 80px rgba(255, 215, 0, 0.8),
              0 0 160px rgba(255, 215, 0, 0.6),
              0 0 240px rgba(255, 215, 0, 0.4),
              inset 0 0 80px rgba(0, 0, 0, 0.1)
            `,
            border: '8px solid rgba(255, 215, 0, 1)',
            minHeight: '600px',
            animation: 'glow 3s ease-in-out infinite alternate',
          }}
        >
          {/* Анимированное свечение вокруг рамки */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-yellow-400/30 via-red-500/30 to-blue-400/30 blur-2xl animate-pulse z-0"
            style={{
              animation: 'glow 2s ease-in-out infinite alternate',
            }}
          ></div>
          
          {/* Убран центральный overlay - рамка видна везде */}
          
          {/* Декоративные светящиеся элементы по углам - усиленные */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-400/60 to-yellow-600/60 rounded-full blur-2xl animate-pulse z-0"
            style={{
              boxShadow: '0 0 40px rgba(255, 215, 0, 0.8), 0 0 80px rgba(255, 215, 0, 0.6)',
            }}
          ></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/60 to-blue-600/60 rounded-full blur-2xl animate-pulse z-0"
            style={{
              animationDelay: '0.5s',
              boxShadow: '0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(59, 130, 246, 0.6)',
            }}
          ></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-red-400/60 to-red-600/60 rounded-full blur-2xl animate-pulse z-0"
            style={{
              animationDelay: '1s',
              boxShadow: '0 0 40px rgba(255, 107, 107, 0.8), 0 0 80px rgba(255, 107, 107, 0.6)',
            }}
          ></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/60 to-yellow-600/60 rounded-full blur-2xl animate-pulse z-0"
            style={{
              animationDelay: '1.5s',
              boxShadow: '0 0 40px rgba(255, 215, 0, 0.8), 0 0 80px rgba(255, 215, 0, 0.6)',
            }}
          ></div>
          
          {/* Дополнительные блестящие частицы на рамке */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full animate-sparkle z-10"
            style={{
              boxShadow: '0 0 20px rgba(255, 215, 0, 1), 0 0 40px rgba(255, 215, 0, 0.8)',
            }}
          ></div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-400 rounded-full animate-sparkle z-10"
            style={{
              animationDelay: '1s',
              boxShadow: '0 0 20px rgba(255, 107, 107, 1), 0 0 40px rgba(255, 107, 107, 0.8)',
            }}
          ></div>
          <div className="absolute top-1/2 -translate-y-1/2 left-4 w-4 h-4 bg-blue-400 rounded-full animate-sparkle z-10"
            style={{
              animationDelay: '0.5s',
              boxShadow: '0 0 20px rgba(59, 130, 246, 1), 0 0 40px rgba(59, 130, 246, 0.8)',
            }}
          ></div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 bg-yellow-400 rounded-full animate-sparkle z-10"
            style={{
              animationDelay: '1.5s',
              boxShadow: '0 0 20px rgba(255, 215, 0, 1), 0 0 40px rgba(255, 215, 0, 0.8)',
            }}
          ></div>
          
          <form onSubmit={handleSubmit} className="relative z-10 p-10">
            <div className="mb-8 text-center relative">
              {/* Полупрозрачный фон для контраста */}
              <div className="absolute inset-0 -mx-4 -my-2 bg-black/60 backdrop-blur-sm rounded-2xl border-2 border-yellow-500/30"
                style={{
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.4), inset 0 0 15px rgba(212, 175, 55, 0.15)',
                }}
              ></div>
              
              <label className="block text-4xl md:text-5xl font-black mb-8 text-center relative z-10 px-4 py-3"
                style={{
                  color: '#D4AF37',
                  textShadow: `
                    0 0 8px rgba(212, 175, 55, 0.7),
                    0 0 15px rgba(212, 175, 55, 0.5),
                    0 0 25px rgba(212, 175, 55, 0.3),
                    0 2px 4px rgba(0, 0, 0, 0.9),
                    0 4px 8px rgba(0, 0, 0, 0.7),
                    -1px -1px 0 rgba(0, 0, 0, 0.8),
                    1px -1px 0 rgba(0, 0, 0, 0.8),
                    -1px 1px 0 rgba(0, 0, 0, 0.8),
                    1px 1px 0 rgba(0, 0, 0, 0.8)
                  `,
                  WebkitTextStroke: '1px rgba(0, 0, 0, 0.5)',
                  letterSpacing: '0.05em',
                  filter: 'drop-shadow(0 3px 6px rgba(212, 175, 55, 0.6)) drop-shadow(0 0 20px rgba(212, 175, 55, 0.4))',
                }}
              >
                <motion.span 
                  className="inline-block animate-float" 
                  style={{ animationDelay: '0s' }}
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                >
                  ✨
                </motion.span>
                <span className="mx-3">Форма обратной связи</span>
                <motion.span 
                  className="inline-block animate-float" 
                  style={{ animationDelay: '0.5s' }}
                  animate={{ rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
                >
                  ✨
                </motion.span>
              </label>
              
              {/* Дополнительное свечение снизу */}
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-yellow-600/60 to-transparent z-10"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{
                  boxShadow: '0 0 10px rgba(212, 175, 55, 0.6), 0 0 20px rgba(212, 175, 55, 0.4)',
                  height: '3px',
                }}
              />
            </div>
            
            {/* Поле имени */}
            <div className="mb-6">
              <label className="block text-base font-bold mb-3"
                style={{
                  color: '#8B4513',
                  textShadow: '0 2px 4px rgba(255, 255, 255, 0.9), 0 1px 2px rgba(0, 0, 0, 0.3)',
                }}
              >
                Имя
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl z-10">👤</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-14 pr-5 py-5 text-lg border-3 rounded-2xl text-gray-900 placeholder-gray-600 focus:outline-none transition-all duration-300 shadow-xl backdrop-blur-md"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.75)',
                    borderColor: '#FFD700',
                    borderWidth: '3px',
                    boxShadow: '0 6px 12px rgba(255, 215, 0, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.05)',
                    textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FF6B6B';
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
                    e.target.style.boxShadow = '0 8px 16px rgba(255, 107, 107, 0.4), inset 0 2px 4px rgba(0, 0, 0, 0.05)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#FFD700';
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
                    e.target.style.boxShadow = '0 6px 12px rgba(255, 215, 0, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.05)';
                  }}
                  placeholder="подписчик"
                />
              </div>
            </div>

            {/* Поле сообщения */}
            <div className="mb-6">
              <label className="block text-base font-bold mb-3"
                style={{
                  color: '#8B4513',
                  textShadow: '0 2px 4px rgba(255, 255, 255, 0.9), 0 1px 2px rgba(0, 0, 0, 0.3)',
                }}
              >
                Сообщение
              </label>
              <div className="relative">
                <span className="absolute left-5 top-5 text-2xl z-10">💬</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Напишите ваши пожелания каналу, телеграмм_боту, съемкам определенного формата видео, или индивидуального обучения, упомяните это в сообщении и оставьте ваши данные имя телеграмм пример @Naladchik_CNC"
                  className="w-full pl-14 pr-5 py-5 text-lg border-3 rounded-2xl text-gray-900 placeholder-gray-600 focus:outline-none transition-all duration-300 resize-none shadow-xl backdrop-blur-md"
                  rows={6}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.75)',
                    borderColor: '#FFD700',
                    borderWidth: '3px',
                    boxShadow: '0 6px 12px rgba(255, 215, 0, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.05)',
                    textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FF6B6B';
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
                    e.target.style.boxShadow = '0 8px 16px rgba(255, 107, 107, 0.4), inset 0 2px 4px rgba(0, 0, 0, 0.05)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#FFD700';
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
                    e.target.style.boxShadow = '0 6px 12px rgba(255, 215, 0, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.05)';
                  }}
                />
              </div>
            </div>

            {/* Загрузка фото */}
            <div className="mb-6">
              <label className="block text-base font-bold mb-3"
                style={{
                  color: '#8B4513',
                  textShadow: '0 2px 4px rgba(255, 255, 255, 0.9), 0 1px 2px rgba(0, 0, 0, 0.3)',
                }}
              >
                Прикрепить фото (до 5 шт)
              </label>
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={photos.length >= 5}
                />
                <motion.button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={photos.length >= 5}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 text-white font-bold text-lg rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl backdrop-blur-md"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0.8) 100%)',
                    border: '3px solid rgba(96, 165, 250, 0.9)',
                    boxShadow: '0 6px 12px rgba(59, 130, 246, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <span className="text-2xl">📷</span>
                  <span>{photos.length >= 5 ? 'Максимум 5 фото' : 'Выбрать фото'}</span>
                </motion.button>
                {photos.length > 0 && (
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    Загружено: {photos.length} / 5
                  </p>
                )}
              </div>

              {/* Превью загруженных фото */}
              {photos.length > 0 && (
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg border-2 border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Статус отправки */}
            {submitStatus.type && (
              <div className={`mb-4 p-4 rounded-xl ${
                submitStatus.type === 'success' 
                  ? 'bg-green-500/20 border-2 border-green-500/50 text-green-300' 
                  : 'bg-red-500/20 border-2 border-red-500/50 text-red-300'
              }`}>
                <p className="text-sm font-semibold text-center">
                  {submitStatus.message}
                </p>
              </div>
            )}

            {/* Кнопка отправки */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              className="w-full py-4 text-white font-bold text-lg rounded-xl transition-all duration-300 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.85) 0%, rgba(255, 215, 0, 0.85) 50%, rgba(255, 107, 107, 0.85) 100%)',
                backgroundSize: '200% 200%',
                boxShadow: '0 8px 16px rgba(255, 215, 0, 0.4), 0 4px 8px rgba(255, 107, 107, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.3)',
                animation: 'gradient-shift 3s ease infinite',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                border: '2px solid rgba(255, 215, 0, 0.6)',
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Отправка...</span>
                  </>
                ) : (
                  <>
                    <span>Отправить</span>
                    <span className="text-2xl">🎉</span>
                  </>
                )}
              </span>
              {!isSubmitting && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400/50 to-red-500/50"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Блестящий эффект */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" 
                    style={{ 
                      transform: 'skewX(-20deg)',
                      animation: 'sparkle 2s ease-in-out infinite'
                    }}
                  ></div>
                </>
              )}
            </motion.button>
          </form>
        </div>
        
        {/* Декоративные новогодние элементы вокруг формы - увеличенные и более яркие */}
        <div className="absolute -left-24 top-1/4 text-6xl animate-float z-0" 
          style={{ 
            filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 1)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.8))',
            textShadow: '0 0 30px rgba(255, 215, 0, 0.9), 0 0 60px rgba(255, 215, 0, 0.6)',
            animation: 'float 3s ease-in-out infinite, glow 2s ease-in-out infinite alternate',
          }}
        >
          🎄
        </div>
        <div className="absolute -right-24 top-1/4 text-6xl animate-float z-0" 
          style={{ 
            animationDelay: '0.5s',
            filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 1)) drop-shadow(0 0 40px rgba(59, 130, 246, 0.8))',
            textShadow: '0 0 30px rgba(59, 130, 246, 0.9), 0 0 60px rgba(59, 130, 246, 0.6)',
            animation: 'float 3s ease-in-out infinite, glow 2s ease-in-out infinite alternate',
          }}
        >
          🔔
        </div>
        <div className="absolute -left-24 bottom-1/4 text-6xl animate-float z-0" 
          style={{ 
            animationDelay: '1s',
            filter: 'drop-shadow(0 0 20px rgba(255, 107, 107, 1)) drop-shadow(0 0 40px rgba(255, 107, 107, 0.8))',
            textShadow: '0 0 30px rgba(255, 107, 107, 0.9), 0 0 60px rgba(255, 107, 107, 0.6)',
            animation: 'float 3s ease-in-out infinite, glow 2s ease-in-out infinite alternate',
          }}
        >
          ⭐
        </div>
        <div className="absolute -right-24 bottom-1/4 text-6xl animate-float z-0" 
          style={{ 
            animationDelay: '1.5s',
            filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 1)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.8))',
            textShadow: '0 0 30px rgba(255, 215, 0, 0.9), 0 0 60px rgba(255, 215, 0, 0.6)',
            animation: 'float 3s ease-in-out infinite, glow 2s ease-in-out infinite alternate',
          }}
        >
          ❄️
        </div>
        
        {/* Дополнительные новогодние элементы */}
        <div className="absolute -left-16 top-1/2 -translate-y-1/2 text-4xl animate-float z-0" 
          style={{ 
            animationDelay: '0.3s',
            filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.9))',
            textShadow: '0 0 20px rgba(255, 215, 0, 0.7)',
          }}
        >
          🎁
        </div>
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-4xl animate-float z-0" 
          style={{ 
            animationDelay: '0.8s',
            filter: 'drop-shadow(0 0 15px rgba(255, 107, 107, 0.9))',
            textShadow: '0 0 20px rgba(255, 107, 107, 0.7)',
          }}
        >
          🎊
        </div>
        
        {/* Блестящие частицы вокруг формы - больше и ярче */}
        <div className="absolute top-8 left-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-sparkle z-0" 
          style={{ 
            animationDelay: '0s', 
            boxShadow: '0 0 20px rgba(255, 215, 0, 1), 0 0 40px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.6)' 
          }}
        ></div>
        <div className="absolute top-8 right-1/4 w-4 h-4 bg-blue-400 rounded-full animate-sparkle z-0" 
          style={{ 
            animationDelay: '0.5s', 
            boxShadow: '0 0 20px rgba(59, 130, 246, 1), 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.6)' 
          }}
        ></div>
        <div className="absolute bottom-8 left-1/3 w-4 h-4 bg-red-400 rounded-full animate-sparkle z-0" 
          style={{ 
            animationDelay: '1s', 
            boxShadow: '0 0 20px rgba(255, 107, 107, 1), 0 0 40px rgba(255, 107, 107, 0.8), 0 0 60px rgba(255, 107, 107, 0.6)' 
          }}
        ></div>
        <div className="absolute bottom-8 right-1/3 w-4 h-4 bg-yellow-400 rounded-full animate-sparkle z-0" 
          style={{ 
            animationDelay: '1.5s', 
            boxShadow: '0 0 20px rgba(255, 215, 0, 1), 0 0 40px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.6)' 
          }}
        ></div>
        
        {/* Дополнительные частицы */}
        <div className="absolute top-1/3 left-0 w-3 h-3 bg-yellow-400 rounded-full animate-sparkle z-0" 
          style={{ 
            animationDelay: '0.25s', 
            boxShadow: '0 0 15px rgba(255, 215, 0, 1)' 
          }}
        ></div>
        <div className="absolute top-2/3 right-0 w-3 h-3 bg-red-400 rounded-full animate-sparkle z-0" 
          style={{ 
            animationDelay: '0.75s', 
            boxShadow: '0 0 15px rgba(255, 107, 107, 1)' 
          }}
        ></div>
      </motion.div>
    </div>
  );
};

