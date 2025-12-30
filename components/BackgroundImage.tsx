'use client';

export const BackgroundImage = () => {
  return (
    <div 
      className="fixed inset-0 z-0"
      style={{
        backgroundImage: `url('/images/background/cnc-machining.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Темный оверлей для читаемости */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/85"></div>
      
      {/* Дополнительный радиальный градиент для глубины */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.7) 100%)',
        }}
      ></div>
    </div>
  );
};

