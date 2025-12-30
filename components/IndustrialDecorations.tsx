'use client';

export const IndustrialDecorations = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Технические линии и разметки */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-steel-light/20 to-transparent"></div>
      <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-coolant-blue/10 to-transparent"></div>
      <div className="absolute bottom-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-industrial-orange/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-steel-light/20 to-transparent"></div>
      
      {/* Вертикальные технические линии */}
      <div className="absolute top-0 left-10 bottom-0 w-px bg-gradient-to-b from-transparent via-steel-light/10 to-transparent"></div>
      <div className="absolute top-0 right-10 bottom-0 w-px bg-gradient-to-b from-transparent via-steel-light/10 to-transparent"></div>
      
      {/* Технические элементы - шестеренки */}
      <div className="absolute top-10 left-10 text-3xl opacity-20 animate-float" style={{ animationDelay: '0s', filter: 'drop-shadow(0 0 5px rgba(0, 180, 216, 0.3))' }}>
        ⚙️
      </div>
      <div className="absolute top-20 right-20 text-2xl opacity-20 animate-float" style={{ animationDelay: '1s', filter: 'drop-shadow(0 0 5px rgba(245, 101, 0, 0.3))' }}>
        🔧
      </div>
      <div className="absolute bottom-20 left-20 text-3xl opacity-20 animate-float" style={{ animationDelay: '2s', filter: 'drop-shadow(0 0 5px rgba(0, 180, 216, 0.3))' }}>
        ⚙️
      </div>
      <div className="absolute bottom-10 right-10 text-2xl opacity-20 animate-float" style={{ animationDelay: '1.5s', filter: 'drop-shadow(0 0 5px rgba(245, 101, 0, 0.3))' }}>
        🔩
      </div>
      
      {/* Технические индикаторы */}
      <div className="absolute top-1/4 left-5 w-1 h-8 bg-coolant-blue/30"></div>
      <div className="absolute top-1/3 right-5 w-1 h-8 bg-industrial-orange/30"></div>
      <div className="absolute bottom-1/4 left-5 w-1 h-8 bg-coolant-blue/30"></div>
      <div className="absolute bottom-1/3 right-5 w-1 h-8 bg-industrial-orange/30"></div>
      
      {/* Технические точки разметки */}
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-steel-light/20 rounded-full"></div>
      <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-steel-light/20 rounded-full"></div>
      <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-steel-light/20 rounded-full"></div>
      <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-steel-light/20 rounded-full"></div>
    </div>
  );
};

