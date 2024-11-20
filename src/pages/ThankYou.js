// src/pages/ThankYou.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook to access the URL query parameters
import axios from 'axios'; // Import Axios for making HTTP requests
import ThankYouImage from '../assets/Thank_You_Image.png'; // Image to be displayed on successful payment

function ThankYou() {
  console.log('ThankYou component rendered'); // Log to the console when the component renders

  // Hooks to manage state
  const location = useLocation(); // Hook to get the current URL location
  const [paymentStatus, setPaymentStatus] = useState(null); // State to store payment status
  const [error, setError] = useState(null); // State to store any errors

  // Effect hook to handle query parameters and verify payment status
  useEffect(() => {
    // Parse query parameters from the URL
    const query = new URLSearchParams(location.search);
    const paymentIntentId = query.get('payment_intent'); // Extract paymentIntentId from the URL
    const paymentIntentStatus = query.get('payment_intent_status'); // Extract paymentIntentStatus from the URL

    console.log('Parsed paymentIntentId:', paymentIntentId); // Log the extracted paymentIntentId
    console.log('Parsed paymentIntentStatus:', paymentIntentStatus); // Log the extracted paymentIntentStatus

    // If paymentIntentId exists, verify the payment status from the backend
    if (paymentIntentId) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/payment-intent/${paymentIntentId}`) // Send GET request to verify the payment status
        .then((response) => {
          console.log('Backend payment status:', response.data.status); // Log the status from the backend
          setPaymentStatus(response.data.status); // Set the payment status in state
        })
        .catch((err) => {
          console.error('Error verifying payment status:', err); // Log any error during the request
          setError('Unable to verify payment status. Please contact support.'); // Set error message if the request fails
        });
    } else {
      // If no paymentIntentId is found in the URL
      setError('No payment information found.'); // Set error message if no payment info is available
    }
  }, [location]); // Dependency on location to re-run effect when URL changes

  // Conditional rendering based on payment status or errors
  if (error) {
    return (
      <div className="thank-you-page">
        <div className="thank-you-card">
          <div className="thank-you-card__text">
            <h1>Payment Error</h1> {/* Display error title */}
            <p>{error}</p> {/* Display the error message */}
          </div>
        </div>
      </div>
    );
  }

  if (!paymentStatus) {
    return (
      <div className="thank-you-page">
        <div className="thank-you-card">
          <div className="thank-you-card__text">
            <h1>Processing Payment...</h1> {/* Display processing message */}
          </div>
        </div>
      </div>
    );
  }

  // If payment status is 'succeeded', show thank you message
  if (paymentStatus === 'succeeded') {
    return (
      <div className="thank-you-page">
        <div className="thank-you-card">
          <div className="thank-you-card__text">
            <h1>Thank You for Your Donation!</h1> {/* Thank the user for their donation */}
            <p>Your payment was successful.</p> {/* Display success message */}
          </div>
          <div className="thank-you-card__image">
            <img src={ThankYouImage} alt="Thank You" /> {/* Display the thank you image */}
          </div>
        </div>
      </div>
    );
  } else {
    // If the payment status is not 'succeeded', show failure message
    return (
      <div className="thank-you-page">
        <div className="thank-you-card">
          <div className="thank-you-card__text">
            <h1>Payment Status: {paymentStatus}</h1> {/* Display payment status */}
            <p>Please try again or contact support.</p> {/* Message prompting user to retry or contact support */}
          </div>
        </div>
      </div>
    );
  }
}

export default ThankYou; 
