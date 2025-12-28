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
                },
                // Investor Theme (Solar/Gold)
                invest: {
                    primary: '#D69E2E', // Solar Amber
                    light: '#ECC94B',
                    bg: '#FFFFFF',      // Crisp White
                    text: '#1A202C',
                    accent: '#ffffff',
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
                }
            }
        },
    },
    plugins: [],
}
