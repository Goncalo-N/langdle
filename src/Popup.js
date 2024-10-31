// Popup.js
import React from 'react';
import './Popup.css'; // Create a CSS file for styling the popup

const Popup = ({ message, onRetry, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{message}</h2>
        <button className="retry-button" onClick={onRetry}>Retry</button>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
