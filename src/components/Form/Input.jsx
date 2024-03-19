import React from 'react';

function Input({ text, placeholder, className, ...props }) {
    return (
        <>
            <p className="mb-1 font-light text-sm text-slate-600">{text}</p>
            <input
                className={`bg-gray-100 w-full py-3 px-4 font-light rounded ${className}`}
                placeholder={placeholder}
                {...props}
            />
        </>
    );
}

export default Input;
