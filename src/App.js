// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import SupportUs from "./pages/SupportUs";
import ThankYou from "./pages/ThankYou";
import ContactUs from "./pages/ContactUs";
import MessageSent from "./pages/MessageSent";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  console.log("Stripe Publishable Key:", process.env.REACT_APP_STRIPE_PUBLIC_KEY); // Temporary log
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/support"
          element={
            <Elements stripe={stripePromise}>
              <SupportUs />
            </Elements>
          }
        />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/message-sent" element={<MessageSent />} />
      </Routes>
    </div>
  );
}

export default App;
