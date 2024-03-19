import React from 'react';

function Category({ className, text }) {
    return (
        <button
            className={`py-2 px-4 rounded border hover:bg-gray-800 hover:text-neutral-50
                border-gray-600 text-gray-800 bg-white ${className}`}>
            {text}
        </button>
    );
}

export default Category;
