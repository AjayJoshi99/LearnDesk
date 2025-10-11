import React from "react";
import "./styles/Loading.css";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p className="loading-text">{message}</p>
    </div>
  );
};

export default Loading;
