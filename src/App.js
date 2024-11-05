import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Support from "./pages/Support";

// Set up your Stripe public key (this is your publishable key from Stripe dashboard)
const stripePromise = loadStripe("pk_test_51QHpj1Rxv6yPYsJCoCoCpXcOIe0arw7HFy19dnPK3msDXlfkII9QJUt92G1lsJq6VttwIPAHGmQxl1sIFXDwQwib00uBWfa6E6");

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="app">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </Router>
      </div>
    </Elements>
  );
}

export default App;
