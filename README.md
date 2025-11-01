# 🌦️ Weather Analytics Dashboard

A web-based application that provides live and forecasted weather data, interactive analytics, and personalized features like favorites and Google login.

---

## 🚀 Features
- 🌍 Real-time current weather for multiple cities  
- 🔍 Search cities with autocomplete  
- ⭐ Add & manage favorite cities (persisted in Firebase)  
- 📈 5–7 day forecast with charts  
- 🔁 Auto-refresh every 60 seconds  
- 🌡️ Celsius ↔ Fahrenheit unit toggle  
- 🔐 Google Sign-In using Firebase  
- 📊 Interactive charts (Recharts)  
- ⚙️ Caching to reduce API calls  
- 💻 Responsive, modern UI built with Tailwind CSS  

---

## 🧠 Tech Stack
- **React (Hooks)**
- **Redux Toolkit**
- **Firebase (Auth + Firestore)**
- **WeatherAPI**
- **Recharts**
- **Tailwind CSS**
- **Vite**

---

## ⚙️ Setup Instructions

1️⃣ Clone this repository:
```bash
  git clone https://github.com/bhaskarkanna/WEATHER-ANALYTICS-DASHBOARD.git
  cd WEATHER-ANALYTICS-DASHBOARD

2️⃣ Install dependencies:

  npm install


3️⃣ Create a .env file in the root folder and add your credentials:

  VITE_WEATHERAPI_KEY=your_weatherapi_key
  VITE_FIREBASE_API_KEY=your_firebase_key
  VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
  VITE_FIREBASE_PROJECT_ID=your_project_id
  VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
  VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
  VITE_FIREBASE_APP_ID=your_app_id
  VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id


4️⃣ Start the development server:

   npm run dev


5️⃣ Open the app:
  👉 http://localhost:5173

📘 Project Overview

  This dashboard helps users explore both short-term and long-term weather patterns with:

  Real-time updates

  Historical and forecasted data

  Graphical analytics for temperature, humidity, and wind trends

📊 Features Overview
Section	           Description
Dashboard	        Shows all cities with real-time weather updates
Search	           Autocomplete city lookup powered by WeatherAPI
Favorites	        Save and load favorite cities across sessions
Charts	           Visualize temperature and humidity trends
Auth	              Secure Google login via Firebase
Settings	           Switch between Celsius and Fahrenheit
Auto-Update         Data refreshes every 60 seconds


🧑‍💻 Developer
  Bhaskar Kanna
 📍 India
 💻 Full Stack Developer | React | Node.js | Firebase
