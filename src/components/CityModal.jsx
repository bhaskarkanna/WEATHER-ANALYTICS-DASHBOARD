import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Brush
} from "recharts";
import weatherApi from "../api/weatherApi";

export default function CityModal({ city, onClose, unit }) {
  const [forecast, setForecast] = useState(null);
  const [rangeDays, setRangeDays] = useState(7);

  useEffect(() => {
    if (!city) return;
    let mounted = true;
    (async () => {
      const res = await weatherApi.forecast(city.location.name, Math.max(rangeDays, 1));
      if (mounted) setForecast(res.forecast);
    })();
    return () => (mounted = false);
  }, [city, rangeDays]);

  const dailyData = useMemo(() => {
    if (!forecast) return [];
    return forecast.forecastday.map(d => ({
      date: d.date,
      avgC: d.day.avgtemp_c,
      avgF: d.day.avgtemp_f,
      precip: d.day.totalprecip_mm,
      wind: d.day.maxwind_kph,
    }));
  }, [forecast]);

  const hourlyData = useMemo(() => {
    if (!forecast) return [];
    return forecast.forecastday.flatMap(d =>
      d.hour.map(h => ({
        time: h.time.replace(" ", "T"),
        tempC: h.temp_c,
        tempF: h.temp_f,
        precip: h.precip_mm,
        wind: h.wind_kph,
      }))
    );
  }, [forecast]);

  if (!city || !forecast) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start z-50 overflow-auto py-8">
      <div className="bg-white p-6 rounded-2xl w-[95%] md:w-[90%] lg:w-[80%] shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold">{city.location.name} — Analytics</h2>
            <p className="text-sm text-gray-600">{city.current.condition.text} • Humidity {city.current.humidity}% • UV {city.current.uv}</p>
          </div>
          <div className="flex items-center space-x-3">
            <select value={rangeDays} onChange={(e) => setRangeDays(Number(e.target.value))}
                    className="border rounded px-2 py-1">
              <option value={3}>3 days</option>
              <option value={5}>5 days</option>
              <option value={7}>7 days</option>
            </select>
            <button onClick={onClose} className="text-gray-600">Close ✕</button>
          </div>
        </div>

        <div style={{ width: "100%", height: 300 }} className="mb-6">
          <ResponsiveContainer>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={unit === "C" ? "avgC" : "avgF"} name={`Avg Temp (${unit})`} stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="precip" name="Precip (mm)" stroke="#06b6d4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Hour-by-hour (selected range)</h3>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tickFormatter={t => t.slice(11,16)} />
                <YAxis />
                <Tooltip labelFormatter={(l) => l} />
                <Legend />
                <Line type="monotone" dataKey={unit === "C" ? "tempC" : "tempF"} name={`Temp (${unit})`} stroke="#ef4444" dot={false} />
                <Line type="monotone" dataKey="precip" name="Precip (mm)" stroke="#06b6d4" dot={false} />
                <Brush dataKey="time" height={30} stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">Today</h4>
            <ul className="text-sm text-gray-700">
              <li>Temp: {city.current.temp_c}°C / {city.current.temp_f}°F</li>
              <li>Feels like: {city.current.feelslike_c}°C</li>
              <li>Humidity: {city.current.humidity}%</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">Wind & Pressure</h4>
            <ul className="text-sm text-gray-700">
              <li>Wind: {city.current.wind_kph} kph ({city.current.wind_dir})</li>
              <li>Gust: {city.current.gust_kph} kph</li>
              <li>Pressure: {city.current.pressure_mb} mb</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">Air & UV</h4>
            <ul className="text-sm text-gray-700">
              <li>Visibility: {city.current.vis_km} km</li>
              <li>UV Index: {city.current.uv}</li>
              <li>Dew Point (approx): {city.current.dewpoint_c}°C</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
