function Category({ className, text, value, onClick, isSelected, ...props }) {
    return (
        <button
            className={`py-2 px-4 rounded border ${
                isSelected ? 'active:bg-gray-800 active:text-neutral-50' : ''
            } border-gray-600 text-gray-800 bg-white ${className}`}
            value={value}
            onClick={onClick}
            {...props}>
            {text}
        </button>
    );
}

export default Category;
