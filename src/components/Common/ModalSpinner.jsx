import React from "react";

const Spinner = () => {
  const spinnerOverlayStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "9999",
  };

  const spinnerContainerStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "10px solid rgba(255, 255, 255, 0.3)",
    borderTop: "10px solid #fff",
    animation: "spin 1s linear infinite",
  };

  const spinnerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    border: "5px solid transparent",
    borderTop: "5px solid transparent",
  };

  return (
    <div style={spinnerOverlayStyle}>
      <div style={spinnerContainerStyle}>
        <div style={spinnerStyle}></div>
      </div>
    </div>
  );
};

export default Spinner;
