import React from "react";

function RadioButton({ options, selectedOption, onChange }) {
  return (
    <div className="flex flex-col space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            type="radio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={onChange}
            className="hidden"
            id={option.value}
          />
          <label
            htmlFor={option.value}
            className="flex items-center cursor-pointer group p-1"
          >
            <div
              className={`flex items-center justify-center w-5 h-5 rounded-full border-2 border-solid 
              ${
                selectedOption === option.value
                  ? " border-primary"
                  : "border-gray-300"
              }`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full border-2 border-gray-500
              ${selectedOption === option.value ? "bg-primary" : ""}`}
              ></div>
            </div>
            <span
              className={`ml-2 group-hover:text-black ${
                selectedOption === option.value
                  ? " text-black"
                  : " text-gray-500"
              }`}
            >
              {option.label}
            </span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default RadioButton;
