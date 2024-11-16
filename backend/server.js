// server.js

require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Optional Middleware Imports
const morgan = require('morgan'); // For logging HTTP requests
const helmet = require('helmet'); // For securing HTTP headers

const app = express();
const PORT = process.env.PORT || 5001;

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail password or App Password
  },
});

// Apply Middleware
app.use(helmet()); // Secure HTTP headers
app.use(morgan('combined')); // Log HTTP requests
app.use(cors({
  origin: 'http://localhost:3000', // Update this to match your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define Your Routes Here

// Example: Contact Form Submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Received contact form submission:', req.body); // Log the received data

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Your business email
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Message sent successfully!' });
  });
});

// Updated: Create Payment Intent (without confirmation)
app.post('/create-payment-intent', async (req, res) => {
  const { amount, paymentMethodId } = req.body;
  console.log('Received payment intent request:', req.body); // Log the received data

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'eur', // Your desired currency
      payment_method: paymentMethodId,
      // Removed confirmation_method and confirm to avoid double confirmation
      // confirmation_method: 'manual',
      // confirm: true,
      // Optionally, enable automatic payment methods
      // automatic_payment_methods: {
      //   enabled: true,
      // },
    });

    console.log('Payment Intent created:', paymentIntent); // Log details
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating Payment Intent:', error);
    res.status(500).send({ error: error.message });
  }
});

// Example: Retrieve Payment Intent Status
app.get('/payment-intent/:id', async (req, res) => {
  const paymentIntentId = req.params.id;
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    res.json({ status: paymentIntent.status });
  } catch (error) {
    console.error('Error retrieving Payment Intent:', error);
    res.status(500).json({ error: 'Unable to retrieve payment status.' });
  }
});

// Webhook Endpoint (Optional)
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!', paymentIntent);
      // Implement your business logic here (e.g., send confirmation email)
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
