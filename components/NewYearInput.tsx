'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export const NewYearInput = () => {
  const [value, setValue] = useState('');

  return (
    <div className="relative z-10 max-w-2xl mx-auto my-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Новогодняя рамка с украшениями */}
        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-newyear-red/20 via-newyear-gold/20 to-newyear-red/20 border-4 border-newyear-gold animate-glow">
          {/* Угловые украшения */}
          <div className="absolute -top-4 -left-4 text-4xl">🎁</div>
          <div className="absolute -top-4 -right-4 text-4xl">🎁</div>
          <div className="absolute -bottom-4 -left-4 text-4xl">🎁</div>
          <div className="absolute -bottom-4 -right-4 text-4xl">🎁</div>
          
          {/* Снежинки вокруг */}
          <div className="absolute -top-8 left-1/4 text-2xl animate-float">❄</div>
          <div className="absolute -top-8 right-1/4 text-2xl animate-float" style={{ animationDelay: '0.5s' }}>❄</div>
          <div className="absolute -bottom-8 left-1/3 text-2xl animate-float" style={{ animationDelay: '1s' }}>❄</div>
          <div className="absolute -bottom-8 right-1/3 text-2xl animate-float" style={{ animationDelay: '1.5s' }}>❄</div>
          
          <div className="relative z-10">
            <label className="block text-xl font-bold text-newyear-gold mb-4 text-center text-shadow">
              ✨ Введите ваш вопрос или комментарий ✨
            </label>
            
            <div className="relative">
              {/* Иконки по бокам */}
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🎄</span>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">🎄</span>
              
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Напишите здесь..."
                className="w-full px-12 py-6 text-lg bg-white/10 backdrop-blur-md border-2 border-newyear-gold/50 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-newyear-gold focus:ring-4 focus:ring-newyear-gold/30 transition-all duration-300 resize-none"
                rows={6}
              />
              
              {/* Подсветка при фокусе */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-newyear-gold/0 via-newyear-gold/20 to-newyear-gold/0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full py-4 bg-gradient-to-r from-newyear-red to-newyear-gold text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-newyear-gold/50 transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">Отправить 🎉</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-newyear-gold to-newyear-red"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>
        
        {/* Дополнительные декоративные элементы */}
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-3xl animate-float">⭐</div>
        <div className="absolute -right-12 top-1/2 -translate-y-1/2 text-3xl animate-float" style={{ animationDelay: '1s' }}>⭐</div>
      </motion.div>
    </div>
  );
};

