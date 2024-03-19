import React from 'react';

function TItle({ tag, text, className }) {
    const Tag = tag;
    return <Tag className={`font-bold text-2xl ${className}`}>{text}</Tag>;
}

export default TItle;
