import React, { useState } from "react";
import { useForm } from "react-hook-form";
import contactImage from "../assets/Contact_Image.png";

function ContactUs() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
    setIsSubmitted(true);
    // Clear form or add further actions like backend integration
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <div className="contact-card__text">
          <h1>Contact Clarke Weather Inc.</h1>
          <p>We'd love to hear from you! Feel free to get in touch with any questions, feedback, or suggestions.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required." })}
              placeholder="Enter your name"
            />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
            
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Please enter a valid email address."
                }
              })}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
            
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              {...register("message", { required: "Message is required." })}
              placeholder="Write your message here"
              rows="4"
            />
            {errors.message && <p className="error-message">{errors.message.message}</p>}
            
            <button type="submit" className="primary-button">Send Message</button>
          </form>
        </div>
        <div className="contact-card__image">
          <img src={contactImage} alt="Get in touch with Clarke Weather Inc." />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
