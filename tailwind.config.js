/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#7F43F5',
                    1: '#E5E5E5',
                },
                gray: {
                    DEFAULT: '#FFFFFF',
                    1: 'F7F7F7',
                    2: '#AEB0B4',
                },
            },
        },
    },
    plugins: [],
};
