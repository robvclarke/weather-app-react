// src/pages/ThankYou.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ThankYouImage from '../assets/Thank_You_Image.png'; // Ensure correct path

function ThankYou() {
  console.log('ThankYou component rendered');

  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Parse query parameters from the URL
    const query = new URLSearchParams(location.search);
    const paymentIntentId = query.get('payment_intent');
    const paymentIntentStatus = query.get('payment_intent_status');

    console.log('Parsed paymentIntentId:', paymentIntentId);
    console.log('Parsed paymentIntentStatus:', paymentIntentStatus);

    if (paymentIntentId) {
      // Verify the PaymentIntent status with your backend
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/payment-intent/${paymentIntentId}`)
        .then((response) => {
          console.log('Backend payment status:', response.data.status);
          setPaymentStatus(response.data.status);
        })
        .catch((err) => {
          console.error('Error verifying payment status:', err);
          setError('Unable to verify payment status. Please contact support.');
        });
    } else {
      setError('No payment information found.');
    }
  }, [location]);

  if (error) {
    return (
      <div className="thank-you-page">
        <div className="thank-you-card">
          <div className="thank-you-card__text">
            <h1>Payment Error</h1>
            <p>{error}</p>
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
            <h1>Processing Payment...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'succeeded') {
    return (
      <div className="thank-you-page">
        <div className="thank-you-card">
          <div className="thank-you-card__text">
            <h1>Thank You for Your Donation!</h1>
            <p>Your payment was successful.</p>
          </div>
          <div className="thank-you-card__image">
            <img src={ThankYouImage} alt="Thank You" />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="thank-you-page">
        <div className="thank-you-card">
          <div className="thank-you-card__text">
            <h1>Payment Status: {paymentStatus}</h1>
            <p>Please try again or contact support.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ThankYou;
