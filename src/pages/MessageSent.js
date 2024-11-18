// MessageSent.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContactImage from '../assets/Contact_Image.png'; // Ensure the correct path to your image

function MessageSent() {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="message-sent-page">
      <div className="message-sent-card">
        <div className="message-sent-text">
          <h1>Thank You!</h1>
          <p>Your message has been sent successfully.</p>
          <button className="primary-button" onClick={handleReturnHome}>
            Return to Home
          </button>
        </div>
        <div className="message-sent-image">
          <img src={ContactImage} alt="Contact Us" />
        </div>
      </div>
    </div>
  );
}

export default MessageSent;
