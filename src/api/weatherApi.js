import axios from "axios";

const KEY = import.meta.env.VITE_WEATHERAPI_KEY;
const BASE = "https://api.weatherapi.com/v1";

if (!KEY) console.warn("VITE_WEATHERAPI_KEY not set in .env");

export default {
  current: async (q) => {
    const url = `${BASE}/current.json?key=${KEY}&q=${encodeURIComponent(q)}`;
    const r = await axios.get(url);
    return r.data;
  },
  forecast: async (q, days = 7) => {
    const url = `${BASE}/forecast.json?key=${KEY}&q=${encodeURIComponent(q)}&days=${days}&aqi=yes&alerts=no`;
    const r = await axios.get(url);
    return r.data;
  },
  search: async (q) => {
    const url = `${BASE}/search.json?key=${KEY}&q=${encodeURIComponent(q)}`;
    const r = await axios.get(url);
    return r.data;
  }
};
