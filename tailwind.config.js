/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'newyear-gold': '#FFD700',
        'newyear-red': '#DC143C',
        'newyear-green': '#228B22',
        'metal-silver': '#C0C0C0',
        'metal-bronze': '#CD7F32',
        'metal-steel': '#71797E',
        // Индустриальные цвета для металлообработки
        'steel-gray': '#4A5568',
        'steel-dark': '#2D3748',
        'steel-light': '#718096',
        'industrial-blue': '#2C5282',
        'industrial-orange': '#F56500',
        'coolant-blue': '#00B4D8',
        'coolant-green': '#00C9A7',
        'chrome': '#E2E8F0',
        'metal-brushed': '#A0AEC0',
        'oil-dark': '#1A202C',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'snow': 'snow 10s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 15px #FFD700' },
          '100%': { boxShadow: '0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFD700' },
        },
        snow: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1) rotate(180deg)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}

