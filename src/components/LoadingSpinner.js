import React from "react";
import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
