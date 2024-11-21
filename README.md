
# React Weather App

![Project Screenshot](./src/assets/hero_image.png)

A dynamic weather application that provides current weather information and a five-day forecast based on location input. Built with React, it integrates multiple third-party APIs to deliver a visually engaging and user-friendly weather experience. 

## Deployment

- **Frontend**: [https://clarke-weather-app-frontend-2902ebf9b6e7.herokuapp.com/](https://clarke-weather-app-frontend-2902ebf9b6e7.herokuapp.com/)
- **Backend**: [https://clarke-weather-app-backend-4295b05e7a22.herokuapp.com/](https://clarke-weather-app-backend-4295b05e7a22.herokuapp.com/)

## Documentation

- **Documentation**: [React Weather App Documentation on Notion](https://savory-spruce-322.notion.site/React-Weather-App-Documentation-1308035cd36080aeb90fc8fff270f0ea?pvs=4)

- **Google Slides Project Presentation**: [Google Slides Project Presentation](https://docs.google.com/presentation/d/1bdEZWVBGt_bUfp7q9w_m2chgMOGuMUlHXnDdHhgoqg8/edit?usp=sharing)

- **Github Repository**: [Github Repository for Project](https://github.com/robvclarke/weather-app-react)

## Features
- Displays current weather conditions and a five-day forecast.
- Auto-updates background image based on city using the Unsplash API.
- Embedded Google Maps for visual confirmation of the searched city.
- Location-based weather retrieval with user permissions.
- Dark overlay on background images for enhanced readability.
- Simple and intuitive UI with responsive design.
- Stripe integration for secure online donations on the "Support Us" page.
- Contact form for direct communication with Clarke Weather Inc.

## Languages, Frameworks, and Tools Used
- **JavaScript**: Core language for the application.
- **React**: JavaScript library for building the user interface.
- **CSS**: Styling for layout and design, following BEM conventions for clarity and modularity.
- **Node.js**: Server-side JavaScript runtime used to run the backend.
- **Axios**: For making HTTP requests to external APIs.
- **React Hook Form**: For managing form state and validation.
- **Stripe API**: Enables secure online donations on the Support Us page.
- **Nodemailer**: For sending emails through the contact form.
- **Express.js**: Backend framework for routing, handling API requests, and Stripe integration.
- **Heroku**: Deployment platform for both frontend and backend.

## Prerequisites
- **Node.js**: Required to manage dependencies and run the application.
- **API Keys**: Obtain API keys from OpenWeather, Unsplash, Google Maps, Stripe, and any other services used (e.g., Nodemailer for email functionality).
- **Frontend `.env`**: Contains the environment variables for the frontend, including API keys and URLs (e.g., `REACT_APP_BACKEND_URL`, `REACT_APP_STRIPE_PUBLIC_KEY`, etc.).
- **Backend `.env`**: Contains the environment variables for the backend, including API keys and sensitive data (e.g., `STRIPE_SECRET_KEY`, `OPENWEATHERMAP_API_KEY`, `EMAIL_USER`, etc.).
- **Heroku Deployment**: The frontend and backend are deployed separately on Heroku, with the backend handling weather API requests, Stripe payment processing, and the contact form submission via Nodemailer.

## Installation

### 1. Clone the repository
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

### 2. Install dependencies

Install dependencies for both frontend and backend:
   ```bash
   npm install
   ```

### 3. 3. Environment Variables

Create a .env file in the root directory and add your API keys:

```bash
REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key
REACT_APP_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_STRIPE_API_KEY=your_stripe_api_key
```

For the backend, create a .env file and add:

```bash
PORT=5001
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password
STRIPE_SECRET_KEY=your_stripe_secret_key
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
```

## Running the Project

To start the development server:

```bash
npm start
```

The application will be accessible at `http://localhost:3000` in your browser.

## Project Structure

```bash
.
├── Procfile
├── README.md
├── Weather App React
├── backend
├── build
├── node_modules
├── package-lock.json
├── package.json
├── project-structure.txt
├── public
└── src
```

- **src/**: Main source code for the project.
- **components/**: Contains reusable UI components (e.g., buttons, form elements, etc.).
- **pages/**: Main page components that correspond to different views of the app, including:
- **Home.js**: The landing page for the weather application.
- **About.js**: Information about the app and its creator.
- **SupportUs.js**: A page for users to donate and support the app.
- **ThankYou.js**: A page displayed after users make a donation.
- **assets/**: Stores image assets like icons, background images, and patterns.
- **public/**: Contains static files and public assets (e.g., index.html, favicon.ico).
- **backend/**: Contains server-side code that handles API requests, payment processing, and email functionality through Express.js.
- **build/**: Contains the production build of the frontend, generated after running npm run build.
- **node_modules/**: Contains all the installed dependencies for both frontend and backend.
- **package-lock.json/**: Ensures consistent dependencies across environments.
- **package.json**: Contains project metadata, dependencies, and scripts.
- **project-structure.txt**: Document describing the project folder structure.
- **Environment Configurations:/**: .env files for managing API keys and environment variables.
- **Frontend .env**: Contains environment variables for the frontend, such as REACT_APP_BACKEND_URL, REACT_APP_STRIPE_PUBLIC_KEY, etc.
- **Backend .env**: Contains environment variables for the backend, including sensitive information like STRIPE_SECRET_KEY, OPENWEATHERMAP_API_KEY, and email credentials.


## API Usage

- **theOpenWear API**: Provides weather data based on user-inputted locations.
- **Unsplash API**: Supplies relevant background images for searched locations.
- **Google Maps Embed API**: Renders a map for each location searched..
- **Stripe API**: Supports secure donations on the Support Us page.
- **Nodemailer**: Sends email notifications when the contact form is submitted.

## Project Design

- **Color Scheme:**: Light, natural colors with a blue primary theme to evoke a calm, weather-focused aesthetic.
- **Fonts**: Uses fonts from Google Fonts, including Orbitron and Outfit, for a clean and modern feel.
- **Photography**: Backgrounds from Unsplash.com are dynamically fetched based on location searches. Photographs I took myself for the About and and Support Us pages.
- **Branding**: "Clarke Weather Inc." is a fictional family-run weather service, with a fun, personal element introduced by including images of the visionary CEO (the developer) and their dog, Toni.

## Learn More
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). For more information on Create React App, you can refer to its [documentation](https://facebook.github.io/create-react-app/docs/getting-started).

