'use client';

import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  sway: number;
}

export const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const generateSnowflakes = () => {
      const flakes: Snowflake[] = [];
      // Уменьшил количество для более ненавязчивого эффекта
      for (let i = 0; i < 30; i++) {
        flakes.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 15,
          duration: 8 + Math.random() * 12,
          size: 1.5 + Math.random() * 3,
          opacity: 0.3 + Math.random() * 0.4,
          sway: Math.random() * 20 - 10,
        });
      }
      setSnowflakes(flakes);
    };

    generateSnowflakes();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute text-white"
          style={{
            left: `${flake.left}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
            fontSize: `${flake.size}px`,
            opacity: flake.opacity,
            transform: `translateX(${flake.sway}px)`,
          }}
        >
          <div className="animate-snow" style={{ filter: 'blur(0.5px)' }}>❄</div>
        </div>
      ))}
    </div>
  );
};

