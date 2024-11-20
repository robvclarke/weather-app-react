// ContactUs.js
import React, { useState } from "react";
import { useForm } from "react-hook-form"; // Importing useForm hook for handling form validation
import contactImage from "../assets/Contact_Image.png"; // Image to be displayed in the contact form
import axios from "axios"; // Importing Axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Importing useNavigate for routing to another page after form submission

function ContactUs() {
  // Destructuring 'register', 'handleSubmit', and 'formState' (to access validation errors) from 'useForm'
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); // Hook to navigate between pages
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission status

  // onSubmit function that is triggered when the form is submitted
  const onSubmit = async (data) => {
    setIsSubmitting(true); // Set the submitting state to true when the form is being submitted
    try {
      // Send POST request to the backend with the form data
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/contact`, data);
      navigate("/message-sent"); // Navigate to the "message-sent" page on successful submission
    } catch (error) {
      console.error("Error sending message:", error);
      alert("There was an issue sending your message. Please try again."); // Alert the user if an error occurs
    } finally {
      setIsSubmitting(false); // Reset the submitting state after the request is complete
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <div className="contact-card__text">
          <h1>Contact Clarke Weather Inc.</h1>
          <p>We'd love to hear from you! Feel free to get in touch with any questions, feedback, or suggestions.</p>
          
          {/* Form to collect user's name, email, and message */}
          <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
            {/* Name input field */}
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required." })} // Registering the field with validation
              placeholder="Enter your name"
            />
            {/* Displaying error message if name validation fails */}
            {errors.name && <p className="error-message">{errors.name.message}</p>}

            {/* Email input field */}
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Regular expression for email validation
                  message: "Please enter a valid email address."
                }
              })}
              placeholder="Enter your email address"
            />
            {/* Displaying error message if email validation fails */}
            {errors.email && <p className="error-message">{errors.email.message}</p>}

            {/* Message input field */}
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              {...register("message", { required: "Message is required." })} // Registering the field with validation
              placeholder="Write your message here"
              rows="4"
            />
            {/* Displaying error message if message validation fails */}
            {errors.message && <p className="error-message">{errors.message.message}</p>}

            {/* Submit button */}
            <button type="submit" className="primary-button" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"} {/* Button text changes while submitting */}
            </button>
          </form>
        </div>

        {/* Image section */}
        <div className="contact-card__image">
          <img src={contactImage} alt="Get in touch with Clarke Weather Inc." loading="lazy" /> {/* Displaying the contact image */}
        </div>
      </div>
    </div>
  );
}

export default ContactUs; // Exporting the ContactUs component for use in the app
