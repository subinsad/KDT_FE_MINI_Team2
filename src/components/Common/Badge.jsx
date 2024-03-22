import React from 'react';

function Badge({ text, className }) {
    return (
        <span
            className={`py-1 px-2 font-extrabold text-xs tracking-widest rounded-full ${className}`}>
            {text}
        </span>
    );
}

export default Badge;
