import React from 'react';

const Button = ({ className, text = '', width = '', onSubmit, ...props }) => {
    // 전달된 className과 함께 테일윈드 클래스를 적용
    return (
        <button
            className={`font-bold py-3 px-4 rounded bg-primary text-white hover:bg-[#34a1e0] active:bg-primary ${className}`}
            style={{ width }}
            onClick={onSubmit}
            {...props}>
            {text}
        </button>
    );
};

export default Button;
