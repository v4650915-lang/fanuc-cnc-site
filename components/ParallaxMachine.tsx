'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const ParallaxMachine = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div ref={ref} className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden mb-16">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
      
      {/* Параллакс изображение станка/вала */}
      <motion.div
        style={{ y, opacity, scale }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative w-full h-full max-w-6xl mx-auto">
          {/* Фоновое изображение - вал с червячной передачей */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <img
              src="/fanuc-cnc-site/images/background/worm-gear-shaft.jpg"
              alt="Вал с червячной передачей - токарная обработка"
              className="w-full h-full object-cover opacity-12"
              style={{
                filter: 'grayscale(100%) contrast(1.3) brightness(0.7)',
                transform: 'scale(1.1)',
              }}
              onError={(e) => {
                // Fallback если изображение не найдено - используем минималистичный градиент
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent && !parent.querySelector('.fallback-gradient')) {
                  const fallback = document.createElement('div');
                  fallback.className = 'fallback-gradient w-full h-full bg-gradient-to-br from-steel-dark/20 via-transparent to-steel-dark/20';
                  fallback.style.backgroundImage = 'radial-gradient(circle at 50% 50%, rgba(0, 180, 216, 0.1) 0%, transparent 70%)';
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
          
          {/* Текст поверх - выровнен по центру */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-100 mb-4 text-shadow w-full text-center"
              style={{
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 4px 16px rgba(0, 0, 0, 0.7), 0 0 20px rgba(226, 232, 240, 0.3)',
              }}
            >
              ПРОФЕССИОНАЛЬНАЯ МЕТАЛЛООБРАБОТКА
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl lg:text-2xl font-bold text-center max-w-3xl mx-auto px-4 relative inline-block"
              style={{
                color: '#FFD700',
                textShadow: '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.9), 0 4px 12px rgba(0, 0, 0, 0.7)',
                letterSpacing: '0.05em',
              }}
            >
              <span className="relative z-10">Точность и надежность систем FANUC</span>
              {/* Подчеркивание в стиле FANUC */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                  boxShadow: '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.4)',
                  height: '3px',
                  bottom: '-4px',
                }}
              />
              {/* Дополнительное свечение снизу */}
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-yellow-400/50 blur-sm"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Эффект глубины */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950 pointer-events-none" />
    </div>
  );
};

