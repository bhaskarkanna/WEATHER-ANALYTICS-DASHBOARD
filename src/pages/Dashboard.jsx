import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CityCard from "../components/CityCard";
import CityModal from "../components/CityModal";
import {
  fetchCurrent,
  setCities,
  addFav,
  removeFav,
  setUnit,
} from "../store/weatherSlice";
import weatherApi from "../api/weatherApi";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  fbSignOut,
  db,
  doc,
  setDoc,
  getDoc,
  onAuthStateChanged,
} from "../firebase/config";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { cities, favorites, unit } = useSelector((s) => s.weather);
  const [selected, setSelected] = useState(null);
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // 🔐 Listen for Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // 🎬 Smooth fade-in animation
  useEffect(() => {
    setFadeIn(true);
  }, []);

  // 🌍 Load default cities when logged in
  useEffect(() => {
    if (!user) return;
    const defaults = ["London", "New York", "Mumbai"];
    (async () => {
      try {
        const responses = await Promise.all(
          defaults.map((c) => weatherApi.current(c))
        );
        dispatch(setCities(responses));
      } catch (err) {
        console.error(err);
      }
    })();

    const interval = setInterval(async () => {
      try {
        const responses = await Promise.all(
          defaults.map((c) => weatherApi.current(c))
        );
        dispatch(setCities(responses));
      } catch {}
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch, user]);

  // 🔍 Handle search input
  async function handleInputChange(e) {
    const value = e.target.value;
    setQuery(value);
    if (value.length < 3) return setSuggestions([]);
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${
          import.meta.env.VITE_WEATHERAPI_KEY
        }&q=${value}`
      );
      const data = await res.json();
      setSuggestions(data || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function onSearchSelect(name) {
    if (!name) return;
    try {
      await dispatch(fetchCurrent({ q: name }));
      setSuggestions([]);
      setQuery("");
    } catch (err) {
      console.error(err);
    }
  }

  // ⭐ Manage favorites
  function toggleFav(name) {
    if (favorites.includes(name)) dispatch(removeFav(name));
    else dispatch(addFav(name));
    if (user && db) {
      const uDoc = doc(db, "users", user.uid);
      setDoc(
        uDoc,
        { favorites: JSON.parse(localStorage.getItem("wa_favs") || "[]") },
        { merge: true }
      );
    }
  }

  // 🔑 Google Sign-In (always ask login)
  async function handleGoogleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const u = res.user;
      setUser(u);
      if (db) {
        const uDoc = doc(db, "users", u.uid);
        const snap = await getDoc(uDoc);
        if (!snap.exists()) {
          await setDoc(uDoc, {
            favorites: JSON.parse(localStorage.getItem("wa_favs") || "[]"),
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSignOut() {
    try {
      await fbSignOut(auth);
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  }

  // 🕒 Show loading while Firebase initializes
  if (loadingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
        <span className="text-6xl animate-bounce">🌤️</span>
        <p className="text-gray-600 text-lg mt-4">
          Checking sign-in status...
        </p>
      </div>
    );
  }

  // 🚪 Show login screen if not signed in
  if (!user) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 transition-all duration-700 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-6 animate-fadeIn">
          <div className="flex items-center space-x-3">
            <span className="text-6xl animate-bounce">🌦️</span>
            <h1 className="text-5xl font-extrabold text-center text-black">
              Weather Analytics Dashboard
            </h1>
          </div>

          <div className="bg-white shadow-2xl rounded-3xl p-10 flex flex-col items-center space-y-6 w-96">
            <p className="text-gray-600 text-lg text-center">
              Sign in with Google to access your personalized weather dashboard.
            </p>
            <button
              onClick={handleGoogleSignIn}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-2xl shadow-md transition duration-300 w-full"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 🌦️ Dashboard after login
  return (
    <div
      className={`p-6 md:p-8 bg-gray-50 min-h-screen flex flex-col items-center transition-all duration-700 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <h1 className="text-5xl font-extrabold text-center text-black mb-10 mt-6 flex items-center space-x-3">
        <span className="animate-bounce">🌦️</span>
        <span>Weather Analytics Dashboard</span>
      </h1>

      {/* Search + Unit + User */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-6xl flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-semibold text-blue-700 text-center">
          Explore Real-Time Weather Insights
        </h2>

        {/* Search */}
        <div className="flex flex-col items-center w-full mt-2 relative">
          <div className="flex w-full max-w-3xl justify-center">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && onSearchSelect(query)}
              placeholder="🔍 Search city (try Mumbai, London, New York)"
              className="w-full px-5 py-3 text-lg rounded-2xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <button
              onClick={() => onSearchSelect(query)}
              className="ml-3 px-6 py-3 text-lg rounded-2xl bg-blue-600 text-white hover:bg-blue-700 shadow-md transition duration-300"
            >
              Search
            </button>
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute top-full mt-2 w-full max-w-3xl bg-white rounded-xl shadow-lg border border-gray-200 z-20">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className="px-5 py-2 hover:bg-blue-50 cursor-pointer text-gray-700"
                  onClick={() => {
                    onSearchSelect(s.name);
                    setQuery("");
                    setSuggestions([]);
                  }}
                >
                  {s.name}, {s.region || s.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Unit & Signout */}
        <div className="flex justify-center items-center space-x-4">
          <div className="text-gray-700 font-medium">Unit:</div>
          <button
            onClick={() => dispatch(setUnit(unit === "C" ? "F" : "C"))}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
          >
            {unit}
          </button>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-600">Hi, {user.displayName}</div>
            <button
              onClick={handleSignOut}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg text-sm"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Weather Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">
        {cities.map((c) => (
          <CityCard
            key={c.location.name}
            city={c}
            onView={() => setSelected(c)}
            onFavToggle={() => toggleFav(c.location.name)}
            isFav={favorites.includes(c.location.name)}
            unit={unit}
          />
        ))}
      </div>

      {selected && (
        <CityModal
          city={selected}
          onClose={() => setSelected(null)}
          unit={unit}
        />
      )}
    </div>
  );
}



