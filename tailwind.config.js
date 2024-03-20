/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx}'],
    theme: {
        extend: {
            height: {
                /// SignInPage,SignUpPage(해더와 푸터를 뺀 값으로 전체 높이 지정)
                'minus-header-footer': 'calc(100vh - 106px - 314px)',
            },
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
