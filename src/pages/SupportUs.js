import React, { useState } from "react";
// Importing Stripe components for payment handling
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// Importing axios for making HTTP requests
import axios from "axios";
// Importing useNavigate for redirecting the user after payment
import { useNavigate } from "react-router-dom";
// Importing the image to display on the support page
import supportImage from "../assets/Donate_Image.png";

function SupportUs() {
  // Initialize the stripe and elements hooks to interact with Stripe Elements
  const stripe = useStripe();
  const elements = useElements();
  // Initialize useNavigate hook to navigate after a successful payment
  const navigate = useNavigate();
  
  // State variables to manage the donation amount, error messages, and submission status
  const [amount, setAmount] = useState(""); // Stores the amount of the donation
  const [error, setError] = useState(null); // Stores any error messages from the payment process
  const [isSubmitting, setIsSubmitting] = useState(false); // Tracks the form submission status

  // Function to handle pre-set suggested donation amounts
  const handleSuggestedAmount = (value) => {
    setAmount(value); // Sets the donation amount based on the button clicked
  };

  // Function to handle form submission for the donation
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setError(null); // Clear any previous error messages
    console.log("Form submitted with amount:", amount); // Log the submitted amount

    // Check if Stripe.js and Elements have loaded
    if (!stripe || !elements) {
      console.log("Stripe.js has not loaded yet.");
      return; // Return if Stripe hasn't loaded
    }

    // Check if the amount is valid
    if (!amount || amount <= 0) {
      setError("Please enter a valid donation amount.");
      return; // Return if the amount is invalid
    }

    setIsSubmitting(true); // Set submitting state to true to disable the button while processing

    try {
      const cardElement = elements.getElement(CardElement); // Get the CardElement instance from Elements

      // Create a payment method with the user's card details
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement, // Pass the card element to Stripe
        billing_details: {
          // Optional: you can include billing details here
        },
      });

      // Handle any errors in creating the payment method
      if (paymentMethodError) {
        console.error("Payment Method Error:", paymentMethodError);
        setError(paymentMethodError.message); // Set the error state with the error message
        setIsSubmitting(false); // Reset submitting state
        return; // Return if there was an error in creating the payment method
      }

      console.log("Payment Method created:", paymentMethod); // Log the payment method

      // Send a POST request to create a payment intent on the backend
      console.log("Sending POST request to backend to create Payment Intent...");
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/create-payment-intent`, {
        amount: amount * 100, // Convert the amount to cents
        paymentMethodId: paymentMethod.id, // Pass the payment method ID
      });
      console.log("Payment Intent response:", response.data);

      // Retrieve the client secret for the payment intent from the backend response
      const { clientSecret } = response.data;

      // Confirm the payment on the client side using the client secret
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id, // Pass the payment method ID
      });

      // Handle any errors in confirming the payment
      if (confirmError) {
        console.error("Payment Confirmation Error:", confirmError);
        setError(confirmError.message); // Set the error state with the confirmation error
        setIsSubmitting(false); // Reset submitting state
        return; // Return if there was an error in confirming the payment
      }

      console.log("Payment Intent after confirmation:", paymentIntent); // Log the payment intent

      // Check if the payment was successful
      if (paymentIntent.status === 'succeeded') {
        console.log("Payment succeeded:", paymentIntent);
        // Redirect the user to the thank you page with the payment intent details
        navigate(`/thank-you?payment_intent=${paymentIntent.id}&payment_intent_status=${paymentIntent.status}`);
      } else {
        console.log("Payment status:", paymentIntent.status);
        setError("Payment did not succeed. Please try again."); // Set error message if payment failed
      }
    } catch (serverError) {
      console.error("Server Error:", serverError); // Log server errors
      setError("There was an issue processing your payment. Please try again."); // Set a generic error message
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="support-page">
      <div className="support-card">
        <div className="support-card__text">
          <h1>Support Clarke Weather Inc.</h1>
          {/* Information about how donations help the company */}
          <p>
            Your support helps us continue providing accurate and timely weather updates to our community. Thank you for being part of our journey.
          </p>
          
          {/* Suggested Donations section */}
          <div>
            <h3 className="form-label">Suggested Donations:</h3>
            <div className="suggested-amounts">
              {/* Buttons for suggested donation amounts */}
              <button type="button" onClick={() => handleSuggestedAmount(5)}>€5</button>
              <button type="button" onClick={() => handleSuggestedAmount(10)}>€10</button>
              <button type="button" onClick={() => handleSuggestedAmount(20)}>€20</button>
              <button type="button" onClick={() => handleSuggestedAmount(50)}>€50</button>
            </div>
          </div>

          {/* Other Amount input section */}
          <div>
            <h3 className="form-label">Other Amount</h3>
            <form onSubmit={handleSubmit} className="payment-form">
              {/* Input for custom donation amount */}
              <input
                type="number"
                value={amount} // Bind the value to the state
                onChange={(e) => setAmount(e.target.value)} // Update the state when the user types
                placeholder="Enter Amount"
                required
                min="1"
              />
              <h3 className="form-label">Payment Details</h3>
              {/* Stripe CardElement to capture credit card information */}
              <CardElement className="StripeElement" />
              {/* Display error message if there is any */}
              {error && <div className="error-message">{error}</div>}
              {/* Submit button, disabled while submitting or invalid */}
              <button type="submit" className="primary-button" disabled={!stripe || !amount || isSubmitting}>
                {isSubmitting ? "Processing..." : `Donate €${amount || ""}`}
              </button>
            </form>
          </div>
        </div>
        
        <div className="support-card__image">
          {/* Image to illustrate donation */}
          <img src={supportImage} alt="Supporting Clarke Weather Inc." loading="lazy"/>
        </div>
      </div>
    </div>
  );
}

export default SupportUs;
