import React from "react";

function Input({ text, placeholder, className, showLabel = true, ...props }) {
  return (
    <>
      {showLabel && (
        <p className="mb-1 font-light text-sm text-slate-600">{text}</p>
      )}
      <input
        className={`bg-gray-100 py-3 px-4 font-light rounded hover:bg-gray-200  ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </>
  );
}

export default Input;
