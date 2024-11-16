// ThankYou.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Parse query parameters from the URL
    const query = new URLSearchParams(location.search);
    const paymentIntentId = query.get('payment_intent');
    const paymentIntentStatus = query.get('payment_intent_status');

    if (paymentIntentId) {
      // Optionally, verify the PaymentIntent status with your backend
      // This step ensures that the payment was indeed successful
      axios.get(`http://localhost:5001/payment-intent/${paymentIntentId}`)
        .then(response => {
          setPaymentStatus(response.data.status);
        })
        .catch(err => {
          console.error('Error verifying payment status:', err);
          setError('Unable to verify payment status. Please contact support.');
        });
    } else {
      setError('No payment information found.');
    }
  }, [location]);

  if (error) {
    return (
      <div>
        <h2>Payment Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!paymentStatus) {
    return (
      <div>
        <h2>Processing Payment...</h2>
      </div>
    );
  }

  if (paymentStatus === 'succeeded') {
    return (
      <div>
        <h2>Thank You for Your Donation!</h2>
        <p>Your payment was successful.</p>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Payment Status: {paymentStatus}</h2>
        <p>Please try again or contact support.</p>
      </div>
    );
  }
}

export default ThankYou;
