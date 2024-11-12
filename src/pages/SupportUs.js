import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import supportImage from "../assets/Donate_Image.png";

function SupportUs() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");

  const handleSuggestedAmount = (value) => {
    setAmount(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        // Assuming user info, could be expanded to include name, email, etc.
      },
    });

    if (error) {
      console.error(error);
    } else {
      console.log("PaymentMethod:", paymentMethod);
      navigate("/thank-you");
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
          
          <div className="suggested-amounts">
            <button onClick={() => handleSuggestedAmount(5)}>€5</button>
            <button onClick={() => handleSuggestedAmount(10)}>€10</button>
            <button onClick={() => handleSuggestedAmount(20)}>€20</button>
            <button onClick={() => handleSuggestedAmount(50)}>€50</button>
          </div>
          
          <form onSubmit={handleSubmit} className="payment-form">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              required
            />
            <CardElement className="StripeElement" />
            <button type="submit" className="primary-button" disabled={!stripe}>
              Donate €{amount || ""}
            </button>
          </form>
        </div>
        
        <div className="support-card__image">
          <img src={supportImage} alt="Supporting Clarke Weather Inc." />
        </div>
      </div>
    </div>
  );
}

export default SupportUs;
