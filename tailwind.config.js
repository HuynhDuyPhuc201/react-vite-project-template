/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    safelist: [
        'slick-slider',
        'slick-prev',
        'slick-next',
        'slick-dots', // Các class của slick
    ],
    theme: {
        extend: {
            // screens: {
            //     xs: '320px',
            //     '3xl': '1600px',
            // },
        },
    },
    plugins: [],
};
