// MessageSent.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MessageSent() {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="message-sent-page">
      <h1>Thank You!</h1>
      <p>Your message has been sent successfully.</p>
      <button className="primary-button" onClick={handleReturnHome}>
        Return to Home
      </button>
    </div>
  );
}

export default MessageSent;
