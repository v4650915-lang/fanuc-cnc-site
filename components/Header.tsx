'use client';

export const Header = () => {
  // SVG иконка шестерни
  const GearIcon = ({ className = '', reverse = false }: { className?: string; reverse?: boolean }) => (
    <svg
      className={`${className} ${reverse ? 'gear-icon-reverse' : 'gear-icon'}`}
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z"
        stroke="#E2E8F0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.43 12.97C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.03L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.96 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.51 2.42L9.13 5.07C8.52 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.73 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.21 8.95 2.27 9.22 2.46 9.37L4.57 11.03C4.53 11.34 4.5 11.67 4.5 12C4.5 12.33 4.53 12.65 4.57 12.97L2.46 14.63C2.27 14.78 2.21 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.03 4.95 18.95L7.44 17.95C7.96 18.34 8.52 18.68 9.13 18.93L9.51 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.27 19.03 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.97Z"
        stroke="#E2E8F0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // SVG иконка болта/гайки
  const BoltIcon = ({ className = '' }: { className?: string }) => (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z"
        fill="#E2E8F0"
        stroke="#A0AEC0"
        strokeWidth="0.5"
      />
      <circle cx="12" cy="9" r="1.5" fill="#CBD5E0" />
    </svg>
  );

  return (
    <header className="py-8 px-4 text-center relative z-10 border-b-2 border-steel-gray/50 cnc-panel">
      {/* Технические линии сверху */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-coolant-blue/50 to-transparent"></div>
      
      <div className="flex items-center justify-center gap-6 md:gap-8 mb-4">
        {/* Левая сторона - шестерня и болт */}
        <div className="flex flex-col items-center gap-2">
          <GearIcon className="text-steel-light" />
          <BoltIcon className="text-steel-light opacity-80" />
        </div>
        
        {/* Заголовок с 3D металлическим эффектом */}
        <h1 
          className="text-3xl md:text-5xl lg:text-6xl font-black metal-3d-text font-mono"
          data-text="ТОКАРНАЯ ОБРАБОТКА ЧПУ"
        >
          ТОКАРНАЯ ОБРАБОТКА ЧПУ
        </h1>
        
        {/* Правая сторона - болт и шестерня (обратное вращение) */}
        <div className="flex flex-col items-center gap-2">
          <BoltIcon className="text-steel-light opacity-80" />
          <GearIcon className="text-steel-light" reverse />
        </div>
      </div>
      
      {/* Техническая разметка */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-px bg-steel-light/40"></div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-px bg-steel-light/40"></div>
      
      {/* Улучшенная читаемость текста */}
      <p className="text-base md:text-lg lg:text-xl header-text-readable mb-2 font-semibold tracking-wide max-w-4xl mx-auto">
        Мастерство, проверенное Fanuc. Ваш путь от концепции до безупречной детали.
      </p>
      <p className="text-sm md:text-base lg:text-lg header-text-readable-sub font-mono tracking-wide max-w-4xl mx-auto">
        Стань востребованным специалистом: программирование и работа на станках с ЧПУ.
      </p>
      
      {/* Технические линии снизу */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-industrial-orange/50 to-transparent"></div>
    </header>
  );
};

