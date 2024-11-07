
# React Weather App

![Project Screenshot](./src/assets/hero_image.png)


A dynamic weather application that provides current weather information and a five-day forecast based on location input. It uses data from the OpenWeather API for weather information and images from the Unsplash API to provide background images relevant to the searched location.

## Features
- Displays current weather conditions and five-day forecast.
- Auto-updates background image based on city using the Unsplash API.
- Dark overlay for enhanced readability.
- Simple and intuitive UI.

## Languages and Frameworks Used
- **JavaScript**: Core language for the application.
- **React**: JavaScript library for building the user interface.
- **CSS**: Styling for layout and design.
- **Axios**: For making HTTP requests to external APIs.

## Prerequisites
- **Node.js**: Make sure you have Node.js installed to manage dependencies and run the application.

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
  - `pages/`: Contains main page components, including `Home.js`.
  - `assets/`: Stores image assets like icons and patterns.
- `public/`: Static files and public assets.

## API Usage

- **OpenWeather API**: Provides weather data based on user-inputted locations.
- **Unsplash API**: Supplies relevant background images for searched locations.

## Learn More
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). For more information on Create React App, you can refer to its [documentation](https://facebook.github.io/create-react-app/docs/getting-started).

