import React from "react";

function Checkbox({ options, selectedOptions, onChange }) {
  const handleOptionChange = (value) => {
    const updatedOptions = selectedOptions.map((option, index) =>
      index === value ? !option : option
    );
    onChange(updatedOptions);
  };

  return (
    <div className="flex flex-col space-y-2">
      {options.map((option, index) => (
        <div key={option.value} className="flex items-center">
          <input
            type="checkbox"
            value={option.value}
            checked={selectedOptions[index]}
            onChange={() => handleOptionChange(index)}
            className="hidden"
            id={option.value}
          />
          <label
            htmlFor={option.value}
            className="flex items-center cursor-pointer group p-1"
          >
            <div
              className={`w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center 
              ${selectedOptions[index] ? "bg-primary" : "bg-gray-200"}`}
            >
              {selectedOptions[index] && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.293 4.293a1 1 0 0 1 1.414 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L8 11.586l7.293-7.293a1 1 0 0 1 1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <span
              className={`ml-2 group-hover:text-black ${
                selectedOptions[index] ? " text-black" : " text-gray-500"
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

export default Checkbox;
