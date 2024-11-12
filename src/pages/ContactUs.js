import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import contactImage from "../assets/Contact_Image.png";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to the confirmation page after form submission
    navigate("/message-sent");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <div className="contact-card__text">
          <h1>Contact Clarke Weather Inc.</h1>
          <p>We'd love to hear from you! Feel free to get in touch with any questions, feedback, or suggestions.</p>
          <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here"
              rows="4"
              required
            />
            <button type="submit" className="primary-button">
              Send Message
            </button>
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
