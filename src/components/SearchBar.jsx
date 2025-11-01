import React, { useState } from "react";
import weatherApi from "../api/weatherApi";

export default function SearchBar({ onSelect }) {
  const [q, setQ] = useState("");
  const [suggest, setSuggest] = useState([]);

  async function onChange(e) {
    const v = e.target.value;
    setQ(v);
    if (!v) { setSuggest([]); return; }
    try {
      const s = await weatherApi.search(v);
      setSuggest(s.slice(0, 6));
    } catch (err) {
      setSuggest([]);
    }
  }

  return (
    <div className="w-full md:w-1/2 relative">
      <input
        type="text"
        value={q}
        onChange={onChange}
        placeholder="Search city (try Mumbai, London, New York)"
        className="w-full border rounded-md px-4 py-2 shadow-sm"
      />
      {suggest.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white rounded-md border mt-1 z-10 max-h-56 overflow-auto">
          {suggest.map((s, i) => (
            <li
              key={i}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => { onSelect(s.name); setSuggest([]); setQ(""); }}
            >
              {s.name}{s.region ? `, ${s.region}` : ""} {s.country ? `, ${s.country}` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
