import React from 'react';

function TItle({ tag, text, className }) {
    const Tag = tag;
    return <Tag className={className}>{text}</Tag>;
}

export default TItle;
