'use client';

import { motion } from 'framer-motion';

interface FanucStand {
  model: string;
  year: string;
  description: string;
  features: string[];
  icon: string;
  image?: string;
}

export const FanucStands = () => {
const stands: FanucStand[] = [
    {
      model: 'FANUC System 6',
      year: '1976',
      description: 'Революционная система с 16-битным микропроцессором Intel 8086. Стала стандартом индустрии и оставалась в производстве более 20 лет.',
      features: [
        '16-битный процессор Intel 8086',
        'Контурная обработка',
        'Циклы и подпрограммы',
        'Высокая надежность'
      ],
      icon: '⚙️',
      image: '/fanuc-cnc-site/images/stands/fanuc-modern.webp', // ИСПРАВЛЕНО
    },
    {
      model: 'FANUC 0i-TD',
      year: '2000-е',
      description: 'Компактная и экономичная система для токарных станков. Отличный баланс цены и функциональности для среднего бизнеса.',
      features: [
        'Компактный дизайн',
        'Токарная обработка',
        'Графическое программирование',
        'Высокая надежность'
      ],
      icon: '🔧',
      image: '/fanuc-cnc-site/images/stands/fanuc-mid.webp', // ИСПРАВЛЕНО
    },
    {
      model: 'FANUC 0i-TF Plus',
      year: '2010-е',
      description: 'Современная система с расширенными возможностями. Поддержка сложных циклов обработки и интуитивный интерфейс оператора.',
      features: [
        'Сенсорный экран',
        'Расширенные циклы',
        'USB подключение',
        'Энергоэффективность'
      ],
      icon: '🚀',
      image: '/fanuc-cnc-site/images/stands/fanuc-2010s.png', // ИСПРАВЛЕНО
    },
    {
      model: 'FANUC 30i-B',
      year: '2020-е',
      description: 'Флагманская система для высокоточного производства. Поддержка Industry 4.0, машинного обучения и цифровых двойников.',
      features: [
        'Industry 4.0',
        'Машинное обучение',
        'Цифровые двойники',
        'Максимальная точность'
      ],
      icon: '🤖',
      image: '/fanuc-cnc-site/images/stands/fanuc-old.webp', // ИСПРАВЛЕНО
    },
  ];

  return (
    <section className="py-16 px-4 relative z-10 bg-gradient-to-b from-gray-900 to-gray-950">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-chrome via-coolant-blue to-chrome mb-4 text-shadow font-mono"
          style={{
            textShadow: '0 0 15px rgba(226, 232, 240, 0.4), 0 2px 4px rgba(0, 0, 0, 0.5)',
            letterSpacing: '0.05em',
          }}
        >
          ЭВОЛЮЦИЯ СТОЕК FANUC
        </h2>
        <p className="text-xl text-steel-light max-w-3xl mx-auto font-mono"
          style={{ letterSpacing: '0.02em' }}
        >
          От первых систем до современных решений Industry 4.0
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
        {stands.map((stand, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="metal-texture cnc-panel border-2 border-steel-light/30 rounded-lg p-4 md:p-6 hover:border-coolant-blue/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:welding-glow"
          >
            {/* Изображение стойки или стилизованная панель */}
            <div className="mb-4 h-48 md:h-56 rounded-lg overflow-hidden relative group">
              <img 
                src={stand.image} 
                alt={stand.model}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Если изображение не загрузилось, показываем стилизованную панель
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.fanuc-panel-mockup')) {
                    const panel = document.createElement('div');
                    panel.className = 'fanuc-panel-mockup w-full h-full p-3 flex flex-col';
                    panel.innerHTML = `
                      <div class="fanuc-panel-screen flex-1 mb-2 p-2 flex flex-col items-center justify-center">
                        <div class="text-xs md:text-sm font-mono text-coolant-blue/80 mb-1">FANUC</div>
                        <div class="text-[10px] md:text-xs font-mono text-chrome/60 text-center">${stand.model}</div>
                        <div class="mt-2 flex gap-1">
                          <div class="fanuc-panel-indicator"></div>
                          <div class="fanuc-panel-indicator" style="animation-delay: 0.3s"></div>
                          <div class="fanuc-panel-indicator" style="animation-delay: 0.6s"></div>
                        </div>
                      </div>
                      <div class="grid grid-cols-4 gap-1">
                        ${Array.from({ length: 8 }).map(() => '<div class="fanuc-panel-button h-4"></div>').join('')}
                      </div>
                    `;
                    parent.appendChild(panel);
                  }
                }}
              />
              {/* Fallback панель, если изображение не указано */}
              {!stand.image && (
                <div className="fanuc-panel-mockup w-full h-full p-3 flex flex-col">
                  {/* Желтая полоса Fanuc */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400"></div>
                  
                  {/* Экран панели */}
                  <div className="fanuc-panel-screen flex-1 mb-2 p-2 flex flex-col items-center justify-center mt-2">
                    <div className="text-xs md:text-sm font-mono text-coolant-blue/90 mb-1 font-bold">FANUC</div>
                    <div className="text-[10px] md:text-xs font-mono text-chrome/70 text-center mb-2">{stand.model}</div>
                    <div className="text-[8px] md:text-[10px] font-mono text-steel-light/50 text-center">{stand.year}</div>
                    <div className="mt-3 flex gap-1.5">
                      <div className="fanuc-panel-indicator"></div>
                      <div className="fanuc-panel-indicator" style={{ animationDelay: '0.3s' }}></div>
                      <div className="fanuc-panel-indicator" style={{ animationDelay: '0.6s' }}></div>
                    </div>
                  </div>
                  
                  {/* Кнопки управления */}
                  <div className="grid grid-cols-4 gap-1">
                    {Array.from({ length: 8 }).map((_, idx) => (
                      <div key={idx} className="fanuc-panel-button h-4"></div>
                    ))}
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-chrome mb-2 text-center text-shadow font-mono"
              style={{
                textShadow: '0 0 10px rgba(226, 232, 240, 0.5), 0 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              {stand.model}
            </h3>
            <p className="text-coolant-blue/90 text-xs md:text-sm mb-3 md:mb-4 text-center font-semibold">
              {stand.year}
            </p>
            <p className="text-steel-light text-xs md:text-sm leading-relaxed mb-3 md:mb-4 text-justify">
              {stand.description}
            </p>
            <div className="border-t border-steel-light/30 pt-3 md:pt-4">
              <p className="text-steel-light/80 text-xs font-semibold mb-2 font-mono">ОСНОВНЫЕ ХАРАКТЕРИСТИКИ:</p>
              <ul className="space-y-1">
                {stand.features.map((feature, idx) => (
                  <li key={idx} className="text-steel-light text-xs flex items-start">
                    <span className="text-coolant-blue mr-2 flex-shrink-0">▸</span>
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

