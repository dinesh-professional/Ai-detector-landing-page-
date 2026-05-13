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
        'cyber-bg': '#050816',
        'neon-blue': '#00D9FF',
        'neon-purple': '#8B5CF6',
        'danger-red': '#FF3B5C',
        'neon-green': '#00FF88',
        'cyber-gray': '#1A1A2E',
        'border-glow': '#00D9FF33',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 0.75s step-end infinite',
        'radar-spin': 'radarSpin 4s linear infinite',
        'grid-move': 'gridMove 20s linear infinite',
        'counter': 'counter 2s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'glow-border': 'glowBorder 2s ease-in-out infinite alternate',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px #00D9FF44, 0 0 40px #00D9FF22' },
          '50%': { boxShadow: '0 0 40px #00D9FF88, 0 0 80px #00D9FF44' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blink: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#00D9FF' },
        },
        radarSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        gridMove: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '50px 50px' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glowBorder: {
          '0%': { borderColor: '#00D9FF44' },
          '100%': { borderColor: '#00D9FF' },
        },
      },
      backgroundImage: {
        'cyber-grid': "linear-gradient(rgba(0,217,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.05) 1px, transparent 1px)",
        'hero-gradient': 'radial-gradient(ellipse at 50% 50%, #1a0533 0%, #050816 60%)',
        'card-gradient': 'linear-gradient(135deg, rgba(0,217,255,0.05) 0%, rgba(139,92,246,0.05) 100%)',
        'neon-gradient': 'linear-gradient(135deg, #00D9FF, #8B5CF6)',
      },
    },
  },
  plugins: [],
};
