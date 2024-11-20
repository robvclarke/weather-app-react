// App.js
import React from "react";
// Importing necessary components and libraries
import { Routes, Route } from "react-router-dom"; // React Router for routing between pages
import Navbar from "./components/Navbar"; // Navbar component for navigation
import Home from "./pages/Home"; // Home page component
import About from "./pages/About"; // About page component
import SupportUs from "./pages/SupportUs"; // Support Us page component
import ThankYou from "./pages/ThankYou"; // Thank You page component
import ContactUs from "./pages/ContactUs"; // Contact Us page component
import MessageSent from "./pages/MessageSent"; // Message Sent page component
import { Elements } from "@stripe/react-stripe-js"; // Stripe Elements for payment integration
import { loadStripe } from "@stripe/stripe-js"; // Stripe API for loading payment processing

// Stripe public key is loaded and used to create a Stripe instance
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// Function to render the App component
// This component handles the routing and layout of the application
function App() {
  return (
    <div className="app">
      {/* Navbar component, shared across all pages */}
      <Navbar />
      {/* Defining the Routes for different pages in the app */}
      <Routes>
        {/* Home route: The main page of the app */}
        <Route path="/" element={<Home />} />
        
        {/* About route: Displays information about the app */}
        <Route path="/about" element={<About />} />
        
        {/* Support Us route: Contains the donation page with Stripe payment integration */}
        <Route
          path="/support"
          element={
            <Elements stripe={stripePromise}>
              {/* Wrapping SupportUs component with Stripe Elements for payment */}
              <SupportUs />
            </Elements>
          }
        />
        
        {/* Thank You route: Acknowledges user after donation */}
        <Route path="/thank-you" element={<ThankYou />} />
        
        {/* Contact route: Contact form page for user inquiries */}
        <Route path="/contact" element={<ContactUs />} />
        
        {/* Message Sent route: Displays confirmation after contact form submission */}
        <Route path="/message-sent" element={<MessageSent />} />
      </Routes>
    </div>
  );
}

export default App;
