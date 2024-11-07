
# React Weather App

![Project Screenshot](./src/assets/hero_image.png)

A dynamic weather application that provides current weather information and a five-day forecast based on location input. Built with React, it integrates multiple third-party APIs to deliver a visually engaging and user-friendly weather experience. 

## Features
- Displays current weather conditions and a five-day forecast.
- Auto-updates background image based on city using the Unsplash API.
- Embedded Google Maps for visual confirmation of the searched city.
- Location-based weather retrieval with user permissions.
- Dark overlay on background images for enhanced readability.
- Simple and intuitive UI with responsive design.

## Languages, Frameworks, and Tools Used
- **JavaScript**: Core language for the application.
- **React**: JavaScript library for building the user interface.
- **CSS**: Styling for layout and design, following BEM conventions for clarity and modularity.
- **Axios**: For making HTTP requests to external APIs.
- **React Hook Form**: For managing form state and validation.
- **Stripe API**: Enables secure online donations on the Support Us page.

## Prerequisites
- **Node.js**: Required to manage dependencies and run the application.
- **API Keys**: Obtain API keys from OpenWeather, Unsplash, Google Maps, and Stripe.

## Installation

### 1. Clone the repository
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

### 2. Install dependencies
   ```bash
   npm install
   ```

### 3. Environment Variables
   - Create a `.env` file in the root directory and add your API keys:
     ```plaintext
     REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key
     REACT_APP_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
     REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
     REACT_APP_STRIPE_API_KEY=your_stripe_api_key
     ```

## Running the Project

To start the development server:

```bash
npm start
```

The application will be accessible at `http://localhost:3000` in your browser.

## Project Structure
- `src/`: Main source code for the project.
  - `components/`: Contains reusable UI components.
  - `pages/`: Main page components, including Home.js, About.js, SupportUs.js, and ThankYou.js
  - `assets/`: Stores image assets like icons and patterns.
- `public/`: Static files and public assets.
- `Environment Configurations:/` .env file for managing API keys and environment variables.


## API Usage

- **theOpenWear API**: Provides weather data based on user-inputted locations.
- **Unsplash API**: Supplies relevant background images for searched locations.
- **Google Maps Embed API**: Renders a map for each location searched..
- **Stripe API**: Supports secure donations on the Support Us page.

## Project Design

- **Color Scheme:**: Light, natural colors with a blue primary theme to evoke a calm, weather-focused aesthetic.
- **Fonts**: Uses fonts from Google Fonts, including Orbitron and Outfit, for a clean and modern feel.
- **Photography**: Backgrounds from Unsplash.com are dynamically fetched based on location searches. Photographs I took myself for the About and and Support Us pages.
- **Branding**: "Clarke Weather Inc." is a fictional family-run weather service, with a fun, personal element introduced by including images of the visionary CEO (the developer) and their dog, Toni.

## Deployment

- **Background Image Overlay:**: Achieving consistent overlay effects on Unsplash images required inline CSS along with external styles in index.css due to layering and load timing issues.
- **React Router on GitHub Pagess**: UUsed a basename in the router to handle subdirectory routing, ensuring navigation works on GitHub Pages.

## Learn More
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). For more information on Create React App, you can refer to its [documentation](https://facebook.github.io/create-react-app/docs/getting-started).

