// MessageSent.js
import React from "react";
import confirmationImage from "../assets/Thank_You_Image.png";

function MessageSent() {
  return (
    <div className="message-sent-page">
      <div className="message-sent-card">
        <div className="message-sent-text">
          <h1>Message Sent!</h1>
          <p>Thank you for reaching out. We will get back to you as soon as possible.</p>
          <button className="primary-button" onClick={() => window.location.href = "/"}>
            Return to Home
          </button>
        </div>
        <div className="message-sent-image">
          <img src={confirmationImage} alt="Thank you for reaching out" />
        </div>
      </div>
    </div>
  );
}

export default MessageSent;
