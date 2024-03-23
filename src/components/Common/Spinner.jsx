import React from "react";

const Spinner = () => {
  const spinnerContainerStyle = {
    display: "flex",
    justifyContent: "center",
  };
  const spinnerBoxStyle = {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTop: "2px solid #fff",
    animation: "spin 1s linear infinite",
  };
  const spinnerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    border: "2px solid transparent",
    borderTop: "2px solid transparent",
  };

  return (
    <div style={spinnerContainerStyle}>
      <div style={spinnerBoxStyle}>
        <div style={spinnerStyle}></div>
      </div>
    </div>
  );
};

export default Spinner;
