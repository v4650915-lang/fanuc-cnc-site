'use client';

export const Footer = () => {
  return (
    <footer className="py-12 text-center border-t border-white/20 mt-16 relative z-10">
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-3xl">🎄</span>
        <span className="text-newyear-gold font-mono font-bold text-2xl">FANUC</span>
        <span className="text-gray-400">×</span>
        <span className="text-white">ЧПУ Обучение</span>
        <span className="text-3xl">🎄</span>
      </div>
      <p className="text-gray-300 text-sm">
        © 2026 Токарная обработка ЧПУ. Все права защищены.
      </p>
      <p className="text-gray-400/60 text-xs mt-2">
        С Новым Годом! ❄️ Пусть ваши программы всегда работают без ошибок!
      </p>
    </footer>
  );
};

