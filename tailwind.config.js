/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Land Owner Theme (Nature/Green)
                land: {
                    primary: '#2F855A', // Deep Forest Green
                    light: '#48BB78',
                    bg1: '#c4d8cfff',      // Soft Cream
                    text: '#2D3748',
                    bg: '#dbede5ff',
                    bgcalc: '#022d19e0',
                },
                // Investor Theme (Solar/Gold)
                invest: {
                    primary: '#D69E2E', // Solar Amber
                    light: '#e7dec0ff',
                    bg: '#FFFFFF',      // Crisp White
                    text: '#1A202C',
                    accent: '#ffffff',
                    card: '#514f45ff',
                    bgtimeline: '#dcd3b5ff',
                },
                // Common
                dark: '#1A202C',
                gray: {
                    100: '#F7FAFC',
                    200: '#EDF2F7',
                    300: '#E2E8F0',
                    800: '#2D3748',
                    900: '#171923',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['"Playfair Display"', 'serif'],
            },
            keyframes: {
                scan: {
                    '0%': { top: '0%' },
                    '100%': { top: '100%' },
                },
                growth: {
                    '0%': { height: '20%' },
                    '100%': { height: '100%' },
                },
                slide: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(200%)' },
                },
                translateY: {
                    '0%': { transform: 'translateY(10%)' },
                    '100%': { transform: 'translateY(-10%)' },
                },
                flight: {
                    '0%': { transform: 'translate(0, 0)', opacity: 1 },
                    '100%': { transform: 'translate(50px, -50px)', opacity: 0 },
                },
                notificationSlide: {
                    '0%': { opacity: 0, transform: 'translateY(-10px)' },
                    '20%': { opacity: 1, transform: 'translateY(0)' },
                    '80%': { opacity: 1, transform: 'translateY(0)' },
                    '100%': { opacity: 0, transform: 'translateY(10px)' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0)' },
                    '100%': { transform: 'scale(1)' },
                },
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                fadeBack: {
                    '0%': { opacity: 0.6, transform: 'scale(0.9)' },
                    '100%': { opacity: 0.3, transform: 'scale(0.8)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '200% 0' },
                    '100%': { backgroundPosition: '-200% 0' },
                },
                countUp: {
                    '0%': { opacity: 0, transform: 'translateY(10px) scale(0.9)' },
                    '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
                },
                rise: {
                    '0%': { opacity: 0, transform: 'translateY(20px) scale(0.5)' },
                    '40%': { opacity: 1 },
                    '100%': { opacity: 0, transform: 'translateY(-60px) scale(1.2)' },
                }
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite reverse',
                'slide-up': 'notificationSlide 6s ease-in-out infinite',
                'rise': 'rise 4s ease-out infinite',
                'shimmer': 'shimmer 8s linear infinite',
                'scale-in': 'scaleIn 0.3s ease-out',
                'fade-in': 'fadeIn 0.5s ease-out',
                'fade-in-up': 'countUp 0.8s ease-out forwards',
            }
        },
    },
    plugins: [],
}
