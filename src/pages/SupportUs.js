import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import supportImage from "../assets/Donate_Image.png";

function SupportUs() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  // Initialize amount as a number for consistency
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSuggestedAmount = (value) => {
    setAmount(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    console.log("Form submitted with amount:", amount); // Log submission

    if (!stripe || !elements) {
      console.log("Stripe.js has not loaded yet.");
      return;
    }

    if (!amount || amount <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }

    setIsSubmitting(true);

    try {
      const cardElement = elements.getElement(CardElement);

      // Create Payment Method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          // Optionally include billing details here
        },
      });

      if (paymentMethodError) {
        console.error("Payment Method Error:", paymentMethodError);
        setError(paymentMethodError.message);
        setIsSubmitting(false);
        return;
      }

      console.log("Payment Method created:", paymentMethod);

      // Create Payment Intent on the backend
      console.log("Sending POST request to backend to create Payment Intent...");
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/create-payment-intent`, {
        amount: amount * 100, // Convert to cents
        paymentMethodId: paymentMethod.id,
      });
      console.log("Payment Intent response:", response.data);

      const { clientSecret } = response.data;

      // Confirm the Payment Intent on the client, including payment_method
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        console.error("Payment Confirmation Error:", confirmError);
        setError(confirmError.message);
        setIsSubmitting(false);
        return;
      }

      console.log("Payment Intent after confirmation:", paymentIntent);

      if (paymentIntent.status === 'succeeded') {
        console.log("Payment succeeded:", paymentIntent);
        // Pass payment_intent and payment_intent_status as query params
        navigate(`/thank-you?payment_intent=${paymentIntent.id}&payment_intent_status=${paymentIntent.status}`);
      } else {
        console.log("Payment status:", paymentIntent.status);
        setError("Payment did not succeed. Please try again.");
      }
    } catch (serverError) {
      console.error("Server Error:", serverError);
      setError("There was an issue processing your payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="support-page">
      <div className="support-card">
        <div className="support-card__text">
          <h1>Support Clarke Weather Inc.</h1>
          <p>
            Your support helps us continue providing accurate and timely weather updates to our community. Thank you for being part of our journey.
          </p>
          
          {/* Suggested Donations label */}
          <div>
            <h3>Suggested Donations:</h3>
            <div className="suggested-amounts">
              <button type="button" onClick={() => handleSuggestedAmount(5)}>€5</button>
              <button type="button" onClick={() => handleSuggestedAmount(10)}>€10</button>
              <button type="button" onClick={() => handleSuggestedAmount(20)}>€20</button>
              <button type="button" onClick={() => handleSuggestedAmount(50)}>€50</button>
            </div>
          </div>

          {/* Other Amount label */}
          <div>
            <h3>Other Amount</h3>
            <form onSubmit={handleSubmit} className="payment-form">
              <label htmlFor="amount">Enter Amount</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
                required
                min="1"
              />
              <label htmlFor="payment-details">Payment Details</label>
              <CardElement className="StripeElement" />
              {error && <div className="error-message">{error}</div>}
              <button type="submit" className="primary-button" disabled={!stripe || !amount || isSubmitting}>
                {isSubmitting ? "Processing..." : `Donate €${amount || ""}`}
              </button>
            </form>
          </div>
        </div>
        
        <div className="support-card__image">
          <img src={supportImage} alt="Supporting Clarke Weather Inc." loading="lazy"/>
        </div>
      </div>
    </div>
  );
}

export default SupportUs;
