/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx}'],
    theme: {
        extend: {
            maxWidth: {
                mw: '1200px',
                //minWidth: ???
            },
            colors: {
                primary: {
                    DEFAULT: '#2393D2',
                    1: '#E5E5E5',
                },
                gray: {
                    DEFAULT: '#FFFFFF',
                    1: '#F7F7F7',
                    2: '#AEB0B4',
                },
            },
        },
    },
    plugins: [],
};
