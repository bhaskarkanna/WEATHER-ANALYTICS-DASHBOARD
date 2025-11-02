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

## Folder Structure
  src/
 ├── api/
 │   └── weatherApi.js
 ├── components/
 │   ├── CityCard.jsx
 │   ├── CityModal.jsx
 │   └── SearchBar.jsx
 ├── pages/
 │   └── Dashboard.jsx
 ├── store/
 │   └── weatherSlice.js
 ├── firebase/
 │   └── config.js
 ├── App.jsx
 ├── main.jsx
 └── index.css

 ---

## ⚙️ Setup Instructions

1️⃣ **Clone this repository**:
    git clone https://github.com/bhaskarkanna/WEATHER-ANALYTICS-DASHBOARD.git
    cd WEATHER-ANALYTICS-DASHBOARD


2️⃣ **Install dependencies**:
     npm install


3️⃣ **Create a .env file in the root folder and add your credentials**:
     VITE_WEATHERAPI_KEY=your_weatherapi_key
     VITE_FIREBASE_API_KEY=your_firebase_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id


4️⃣ **Start the development server**:
     npm run dev


5️⃣ **Open the app**:
  👉 http://localhost:5173

 ---

## 📘 Project Overview

 1. This dashboard helps users explore both short-term and long-term weather patterns with:

 2. Real-time updates

 3.Historical and forecasted data

 4.Graphical analytics for temperature, humidity, and wind trends

 ---

## 📊 Features Overview

Section	           Description
Dashboard	         Shows all cities with real-time weather updates
Search	           Autocomplete city lookup powered by WeatherAPI
Favorites	         Save and load favorite cities across sessions
Charts	           Visualize temperature and humidity trends
Auth	             Secure Google login via Firebase
Settings	         Switch between Celsius and Fahrenheit
Auto-Update        Data refreshes every 60 seconds

 ---

## 🧩Conclusion
    The Weather Analytics Dashboard is a technically robust, visually interactive, and user-friendly web application that satisfies all project requirements and exceeds expectations through bonus features.

    It successfully demonstrates:
    
    1.Real-time data visualization.
    2.Secure cloud authentication.
    3.Scalable architecture.
    4.Intuitive UX design

    This project highlights a complete understanding of modern frontend engineering, state management, data visualization, and real-time analytics, making it an ideal showcase for both academic and professional purposes.
    
    

