function Category({ className, text, value, onClick, isActive, ...props }) {
    const activeStyles = {
        backgroundColor: isActive ? '#2d3748' : 'white',
        color: isActive ? 'white' : '#4a5568',
    };

    return (
        <button
            style={activeStyles}
            className="py-2 px-4 rounded border border-gray-600 text-gray-800 bg-white"
            value={value}
            onClick={onClick}
            {...props}>
            {text}
        </button>
    );
}

export default Category;
