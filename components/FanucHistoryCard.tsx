'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

interface HistoryCardProps {
  title: string;
  subtitle: string;
  shortDescription: string;
  detailedContent: string;
  icon: string;
  delay: number;
}

const HistoryCard = ({ 
  title, 
  subtitle, 
  shortDescription, 
  detailedContent, 
  icon, 
  delay 
}: HistoryCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
      className="relative group h-[400px] md:h-[450px]"
    >
      <div
        className="relative w-full h-full cursor-pointer touch-manipulation"
        onClick={() => setIsFlipped(!isFlipped)}
        onTouchStart={() => setIsFlipped(!isFlipped)}
        style={{ perspective: '1200px' }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{ 
            rotateY: isFlipped ? 180 : 0,
            scale: isFlipped ? 1.05 : 1,
          }}
          transition={{ 
            duration: 0.8, 
            type: 'spring', 
            stiffness: 150, 
            damping: 15,
            scale: { duration: 0.3 }
          }}
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Лицевая сторона */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <motion.div 
              className="metal-texture cnc-panel rounded-xl md:rounded-2xl p-5 md:p-8 h-full border-2 border-steel-light/30 hover:border-coolant-blue/80 active:border-coolant-blue/80 transition-all duration-300 shadow-xl hover:shadow-2xl hover:welding-glow flex flex-col items-center justify-center text-center touch-manipulation relative overflow-hidden"
              whileHover={{ 
                boxShadow: '0 0 30px rgba(0, 180, 216, 0.4), 0 0 60px rgba(0, 180, 216, 0.2)',
              }}
            >
              {/* Эффект свечения при наведении */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-coolant-blue/0 via-coolant-blue/10 to-coolant-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
              />
              
              <motion.div 
                className="text-5xl md:text-7xl mb-4 md:mb-5"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
              >
                {icon}
              </motion.div>
              
              <h3 className="text-xl md:text-3xl font-bold text-chrome mb-3 md:mb-4 text-shadow font-mono"
                style={{
                  textShadow: '0 0 15px rgba(226, 232, 240, 0.6), 0 3px 6px rgba(0, 0, 0, 0.7)',
                }}
              >
                {title}
              </h3>
              
              <p className="text-coolant-blue/95 text-base md:text-lg mb-4 md:mb-5 font-semibold">
                {subtitle}
              </p>
              
              <p className="text-steel-light leading-relaxed text-sm md:text-base mb-4 md:mb-5 px-3 md:px-4 font-medium">
                {shortDescription}
              </p>
              
              <motion.div 
                className="mt-auto pt-3 md:pt-4 text-steel-light/70 text-sm md:text-base font-mono flex items-center gap-2"
                animate={{ 
                  x: [0, 5, 0],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: 'easeInOut'
                }}
              >
                <span className="hidden md:inline">Нажмите, чтобы узнать больше</span>
                <span className="md:hidden">Нажмите для подробностей</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: 'easeInOut'
                  }}
                >
                  →
                </motion.span>
              </motion.div>
            </motion.div>
          </div>

          {/* Обратная сторона */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <motion.div 
              className="metal-texture cnc-panel rounded-xl md:rounded-2xl p-5 md:p-8 h-full border-2 border-coolant-blue/80 transition-all duration-300 shadow-2xl welding-glow flex flex-col overflow-y-auto touch-manipulation relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Эффект свечения на обратной стороне */}
              <div className="absolute inset-0 bg-gradient-to-br from-coolant-blue/20 via-transparent to-coolant-blue/20 pointer-events-none" />
              
              <h3 className="text-xl md:text-3xl font-bold text-chrome mb-3 md:mb-4 text-center text-shadow font-mono"
                style={{
                  textShadow: '0 0 15px rgba(226, 232, 240, 0.6), 0 3px 6px rgba(0, 0, 0, 0.7)',
                }}
              >
                {title}
              </h3>
              
              <p className="text-coolant-blue/95 text-base md:text-lg mb-4 md:mb-5 text-center font-semibold">
                {subtitle}
              </p>
              
              <div className="text-steel-light leading-relaxed text-justify text-sm md:text-base flex-grow px-2 md:px-3 font-medium">
                {detailedContent}
              </div>
              
              <motion.div 
                className="mt-4 md:mt-5 text-center text-steel-light/70 text-sm md:text-base font-mono flex items-center justify-center gap-2"
                animate={{ 
                  x: [-5, 0, -5],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: 'easeInOut'
                }}
              >
                <motion.span
                  animate={{ x: [-5, 0, -5] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: 'easeInOut'
                  }}
                >
                  ←
                </motion.span>
                <span className="hidden md:inline">Нажмите, чтобы вернуться</span>
                <span className="md:hidden">Нажмите</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const FanucHistoryCards = () => {
  const historyData = [
    {
      title: 'Основатель FANUC',
      subtitle: 'Сейуки Инаба (1925-2010)',
      shortDescription: 'Выдающийся японский инженер и предприниматель, основатель компании FANUC в 1972 году.',
      detailedContent: `Сейуки Инаба - выдающийся японский инженер и предприниматель, основатель компании FANUC в 1972 году. Родился в префектуре Яманаси, Япония. 

Инаба начал свою карьеру в Fujitsu, где работал над разработкой систем числового программного управления. Его видение заключалось в создании надежных и эффективных систем ЧПУ, которые могли бы автоматизировать производственные процессы.

Под его руководством FANUC стала мировым лидером в области промышленной автоматизации и робототехники. Инаба был известен своим инновационным подходом к разработке и стремлением к совершенству. Он лично участвовал в создании первых систем ЧПУ и заложил основы корпоративной культуры, ориентированной на качество и инновации.

Благодаря его лидерству, FANUC выросла из небольшой компании в глобального лидера с более чем 7000 сотрудников по всему миру. Инаба оставался председателем совета директоров до своей смерти в 2010 году, продолжая влиять на развитие компании и индустрии в целом.`,
      icon: '👨‍🔬',
      delay: 0,
    },
    {
      title: 'Первые модели ЧПУ',
      subtitle: 'FANUC 2000C и FANUC 3000C (1970-е)',
      shortDescription: 'Первые коммерчески успешные системы ЧПУ от FANUC, использовавшие микропроцессоры для управления станками.',
      detailedContent: `Первые системы ЧПУ от FANUC появились в начале 1970-х годов. Модель FANUC 2000C была одной из первых коммерчески успешных систем, использовавших микропроцессоры для управления станками.

FANUC 2000C представляла собой революционное решение для своего времени. Она использовала перфоленты для ввода программ и была способна управлять фрезерными и токарными станками с высокой точностью. Система поддерживала линейную и круглую интерполяцию, что позволяло выполнять сложные контурные операции.

FANUC 3000C была более продвинутой версией с улучшенной точностью и функциональностью. Она включала дополнительные функции, такие как компенсация инструмента, коррекцию на радиус инструмента и поддержку подпрограмм. Эти системы заложили основу для будущих разработок компании и доказали жизнеспособность концепции автоматизированного производства.

Обе модели получили широкое признание в промышленности и стали стандартом для многих производителей станков. Они продемонстрировали преимущества автоматизации и открыли путь для дальнейшего развития технологий ЧПУ.`,
      icon: '⚙️',
      delay: 0.2,
    },
    {
      title: 'FANUC System 6',
      subtitle: 'Революция в ЧПУ (1976)',
      shortDescription: 'Первая система ЧПУ, использующая 16-битный микропроцессор Intel 8086, ставшая стандартом индустрии.',
      detailedContent: `FANUC System 6, представленная в 1976 году, стала настоящим прорывом в индустрии ЧПУ. Это была первая система, использующая 16-битный микропроцессор Intel 8086, что значительно повысило вычислительную мощность и возможности обработки.

System 6 поддерживала более сложные операции, включая контурную обработку, циклы и подпрограммы. Система могла обрабатывать до 3 осей одновременно с высокой точностью позиционирования. Она включала функции компенсации инструмента, коррекции на радиус и длины инструмента, а также поддержку различных систем координат.

Одной из ключевых особенностей System 6 была её надежность. Система была спроектирована для работы в промышленных условиях с высокой устойчивостью к вибрациям, температуре и электромагнитным помехам. Это сделало её идеальным выбором для производственных цехов.

Система стала стандартом для многих производителей станков и закрепила позицию FANUC как лидера рынка. Её надежность и простота программирования сделали её одной из самых популярных систем ЧПУ в мире. System 6 оставалась в производстве более 20 лет и установила рекорд долговечности для систем ЧПУ.`,
      icon: '🚀',
      delay: 0.4,
    },
    {
      title: 'Эволюция и развитие',
      subtitle: 'От 1980-х до наших дней',
      shortDescription: 'Непрерывные инновации FANUC: от System 0 до современных серий 0i-F и 30i-B с поддержкой 5-осевой обработки.',
      detailedContent: `С 1980-х годов FANUC продолжила инновации, выпуская серии System 0, System 10, System 11, System 15, System 16, System 18, System 21, System 30i, и современные серии 0i-F и 30i-B.

Каждое поколение приносило улучшения в точности, скорости обработки, удобстве программирования и интеграции с CAD/CAM системами. System 0 стала компактной и экономичной системой для небольших станков. System 10 и 11 добавили поддержку большего количества осей и улучшенную графику. System 15 и 16 представили цветные дисплеи и улучшенный пользовательский интерфейс.

System 18 стала первой системой с открытой архитектурой, позволяющей интеграцию с внешними системами. System 21 добавила поддержку сетевых протоколов и удаленного мониторинга. System 30i представила поддержку 5-осевой обработки и нанотехнологий.

Современные системы FANUC поддерживают 5-осевую обработку, адаптивное управление, интеллектуальные функции и интеграцию с промышленными роботами. Серии 0i-F и 30i-B включают поддержку искусственного интеллекта, машинного обучения и облачных технологий.

Компания также стала лидером в области робототехники, выпустив более 750,000 промышленных роботов по всему миру. FANUC продолжает инновации, разрабатывая решения для Индустрии 4.0 и умного производства.`,
      icon: '🌐',
      delay: 0.6,
    },
  ];

  return (
    <section className="py-16 px-4 relative z-10">
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
          История FANUC
        </h2>
        <p className="text-xl text-steel-light max-w-3xl mx-auto font-mono"
          style={{ letterSpacing: '0.02em' }}
        >
          Путешествие от первых систем ЧПУ до мирового лидера в автоматизации
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-7xl mx-auto">
        {historyData.map((card, index) => (
          <HistoryCard
            key={index}
            title={card.title}
            subtitle={card.subtitle}
            shortDescription={card.shortDescription}
            detailedContent={card.detailedContent}
            icon={card.icon}
            delay={card.delay}
          />
        ))}
      </div>
    </section>
  );
};
