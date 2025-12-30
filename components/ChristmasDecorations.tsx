'use client';

export const ChristmasDecorations = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Звезды на фоне */}
      <div className="absolute top-10 left-10 text-4xl animate-float" style={{ animationDelay: '0s' }}>
        ⭐
      </div>
      <div className="absolute top-20 right-20 text-3xl animate-float" style={{ animationDelay: '1s' }}>
        ✨
      </div>
      <div className="absolute bottom-20 left-20 text-4xl animate-float" style={{ animationDelay: '2s' }}>
        ⭐
      </div>
      <div className="absolute bottom-10 right-10 text-3xl animate-float" style={{ animationDelay: '1.5s' }}>
        ✨
      </div>
      <div className="absolute top-1/2 left-5 text-2xl animate-float" style={{ animationDelay: '0.5s' }}>
        🎄
      </div>
      <div className="absolute top-1/3 right-5 text-2xl animate-float" style={{ animationDelay: '2.5s' }}>
        🎄
      </div>
    </div>
  );
};

