import React from "react";

export default function CityCard({ city, onView, onFavToggle, isFav, unit }) {
  const temp = unit === "C" ? `${city.current.temp_c}°C` : `${city.current.temp_f}°F`;
  const icon = city.current.condition.icon.startsWith("//") ? "https:" + city.current.condition.icon : city.current.condition.icon;
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{city.location.name}</h2>
          <p className="text-sm text-gray-500">{city.location.region}</p>
        </div>
        <img className="w-14 h-14" src={icon} alt={city.current.condition.text} />
      </div>

      <div className="mt-4 flex-1">
        <p className="text-4xl font-bold">{temp}</p>
        <p className="text-gray-600">{city.current.condition.text}</p>

        <div className="mt-3 text-sm text-gray-600 space-y-1">
          <div>Humidity: {city.current.humidity}%</div>
          <div>Wind: {city.current.wind_kph} kph</div>
          <div>Pressure: {city.current.pressure_mb} mb</div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="space-x-2">
          <button onClick={onView} className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
          <button onClick={onFavToggle} className={`px-3 py-1 rounded ${isFav ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
            {isFav ? "Favorited" : "Favorite"}
          </button>
        </div>
        <div className="text-xs text-gray-400">Updated: {city.current.last_updated}</div>
      </div>
    </div>
  );
}
