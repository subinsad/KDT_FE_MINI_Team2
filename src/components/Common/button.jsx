import React from 'react';

const Button = ({ className, text = '', width = '', ...props }) => {
    // 전달된 className과 함께 테일윈드 클래스를 적용
    return (
        <button
            className={`font-bold py-3 px-4 rounded ${className}`}
            style={{ width }}
            {...props}>
            {text}
        </button>
    );
};

export default Button;
