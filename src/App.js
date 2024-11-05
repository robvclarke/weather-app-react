import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import SupportUs from "./pages/SupportUs";
import ThankYou from "./pages/ThankYou"; // Import the ThankYou component
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QHpj1Rxv6yPYsJCoCoCpXcOIe0arw7HFy19dnPK3msDXlfkII9QJUt92G1lsJq6VttwIPAHGmQxl1sIFXDwQwib00uBWfa6E6"); // Use your Stripe publishable key here

function App() {
  return (
    <div className="app">
      <Router>
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
