// server.js

// Load environment variables from .env file
require('dotenv').config(); 

// Import required dependencies
const express = require('express'); // Express framework for building web applications
const cors = require('cors'); // Cross-origin resource sharing middleware to allow access from different domains
const nodemailer = require('nodemailer'); // Nodemailer for sending emails
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Stripe for handling payment processing
const axios = require('axios'); // Axios for making HTTP requests to external APIs

// Optional Middleware Imports for security and logging
const morgan = require('morgan'); // HTTP request logger middleware
const helmet = require('helmet'); // Secure HTTP headers middleware

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5001; // Set the port to either the environment variable or default to 5001

// Configure Nodemailer Transporter for email sending
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail password or App Password
  },
});

// Apply Middleware to the app
app.use(helmet()); // Secure HTTP headers
app.use(morgan('combined')); // Log HTTP requests in 'combined' format
app.use(cors({
  origin: 'https://clarke-weather-app-frontend-2902ebf9b6e7.herokuapp.com', // Allow access from the specified frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  credentials: true, // Allow cookies to be sent with requests
}));
app.use(express.json()); // Parse incoming JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies, used for form submissions

// Define the Weather Route (GET request) to fetch weather data
app.get('/weather', async (req, res) => {
  const { lat, lon, q } = req.query; // Extract query parameters for latitude, longitude, and city (q)

  // If no location or city is provided, return an error
  if (!lat && !lon && !q) {
    return res.status(400).json({ error: 'Latitude, longitude, or city (q) is required.' });
  }

  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY; // OpenWeatherMap API key
    let weatherResponse;

    // Fetch weather data based on latitude and longitude (geolocation)
    if (lat && lon) {
      weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          lat,
          lon,
          units: 'metric', // Use metric units for temperature
          appid: apiKey
        }
      });
    } 
    // Fetch weather data based on city name
    else if (q) {
      weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q,
          units: 'metric', 
          appid: apiKey
        }
      });
    }

    res.json(weatherResponse.data); // Send the weather data as a JSON response
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data. Please try again later.' }); // Handle errors
  }
});

// Contact Form Submission (POST request)
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body; // Extract contact form data from the request body
  console.log('Received contact form submission:', req.body); // Log the received data

  const mailOptions = {
    from: email, // Sender's email address
    to: process.env.EMAIL_USER, // Your business email address (destination)
    subject: `New Contact Form Submission from ${name}`, // Subject of the email
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // Body of the email
  };

  // Send email using Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error); // Log any errors
      return res.status(500).json({ error: 'Failed to send email. Please try again later.' }); // Respond with error
    }
    console.log('Email sent:', info.response); // Log the successful email response
    res.status(200).json({ message: 'Message sent successfully!' }); // Respond with success message
  });
});

// Create Payment Intent (POST request to handle payments)
app.post('/create-payment-intent', async (req, res) => {
  const { amount, paymentMethodId } = req.body; // Extract amount and paymentMethodId from the request body
  console.log('Received payment intent request:', req.body); // Log the payment intent data

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents (Stripe requires the amount to be in cents)
      currency: 'eur', // Currency for the payment (Euro)
      payment_method: paymentMethodId, // The payment method ID obtained from Stripe's frontend
    });

    console.log('Payment Intent created:', paymentIntent); // Log the payment intent creation details
    res.send({ clientSecret: paymentIntent.client_secret }); // Send client secret for frontend use
  } catch (error) {
    console.error('Error creating Payment Intent:', error); // Log any errors
    res.status(500).send({ error: error.message }); // Respond with error message if something goes wrong
  }
});

// Retrieve Payment Intent Status (GET request)
app.get('/payment-intent/:id', async (req, res) => {
  const paymentIntentId = req.params.id; // Extract the paymentIntentId from the URL parameters
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId); // Retrieve the payment intent from Stripe
    res.json({ status: paymentIntent.status }); // Send the payment status as a JSON response
  } catch (error) {
    console.error('Error retrieving Payment Intent:', error); // Log errors
    res.status(500).json({ error: 'Unable to retrieve payment status.' }); // Respond with error if unable to retrieve status
  }
});

// Webhook Endpoint for Stripe (to handle Stripe events such as successful payments)
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature']; // Retrieve the Stripe signature from the headers
  let event;

  try {
    // Construct the event object from the Stripe webhook payload and signature
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message); // Log errors
    return res.status(400).send(`Webhook Error: ${err.message}`); // Respond with error if signature verification fails
  }

  // Handle the event (e.g., successful payment)
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object; // Extract payment intent data from the event
      console.log('PaymentIntent was successful!', paymentIntent); // Log successful payment
      // Implement your business logic here (e.g., send confirmation email)
      break;
    default:
      console.log(`Unhandled event type ${event.type}.`); // Log unhandled events
  }

  // Respond to acknowledge receipt of the event
  res.json({ received: true });
});

// Simple health check endpoint
app.get('/', (req, res) => {
  res.send('Backend is running'); // Respond with a simple message to indicate the backend is running
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log the port the server is running on
});
