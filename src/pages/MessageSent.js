// MessageSent.js
import React from 'react'; // Import React library
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook to navigate between pages
import ContactImage from '../assets/Contact_Image.png'; // Import image to be displayed on the page

function MessageSent() {
  // Initialize the useNavigate hook to programmatically navigate to different pages
  const navigate = useNavigate();

  // Function to navigate back to the homepage
  const handleReturnHome = () => {
    navigate('/'); // Redirect to the homepage when called
  };

  return (
    <div className="message-sent-page">
      {/* Card container for the message sent confirmation */}
      <div className="message-sent-card">
        {/* Text section showing the confirmation message */}
        <div className="message-sent-text">
          <h1>Thank You!</h1> {/* Heading for the message sent confirmation */}
          <p>Your message has been sent successfully.</p> {/* Inform the user their message was sent */}
          
          {/* Button to return to the homepage */}
          <button className="primary-button" onClick={handleReturnHome}>
            Return to Home
          </button>
        </div>

        {/* Image section to display the contact image */}
        <div className="message-sent-image">
          <img src={ContactImage} alt="Contact Us" /> {/* Display the contact image */}
        </div>
      </div>
    </div>
  );
}

export default MessageSent;
