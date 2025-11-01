import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import weatherApi from "../api/weatherApi";
import { readCache, writeCache } from "../utils/cache";

const CACHE_PREFIX = "wa_cache_v1:";
const TTL = 55 * 1000;

function cacheKeyFor(q) {
  return CACHE_PREFIX + q.toLowerCase();
}

export const fetchCurrent = createAsyncThunk(
  "weather/fetchCurrent",
  async ({ q }, { rejectWithValue }) => {
    try {
      const key = cacheKeyFor(q);
      const cache = readCache(key);
      if (cache && Date.now() - cache.ts < TTL) return cache.data;
      const res = await weatherApi.current(q);
      writeCache(key, { data: res, ts: Date.now() });
      return res;
    } catch (err) {
      return rejectWithValue(err.message || "error");
    }
  }
);

export const fetchForecast = createAsyncThunk(
  "weather/fetchForecast",
  async ({ q, days = 7 }, { rejectWithValue }) => {
    try {
      const res = await weatherApi.forecast(q, days);
      return res;
    } catch (err) {
      return rejectWithValue(err.message || "error");
    }
  }
);

const initialState = {
  cities: [],
  selectedForecast: null,
  favorites: JSON.parse(localStorage.getItem("wa_favs") || "[]"),
  unit: localStorage.getItem("wa_unit") || "C",
  status: "idle",
  error: null,
};

const slice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setUnit(state, action) {
      state.unit = action.payload;
      localStorage.setItem("wa_unit", state.unit);
    },
    addFav(state, action) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
        localStorage.setItem("wa_favs", JSON.stringify(state.favorites));
      }
    },
    removeFav(state, action) {
      state.favorites = state.favorites.filter((f) => f !== action.payload);
      localStorage.setItem("wa_favs", JSON.stringify(state.favorites));
    },
    setCities(state, action) {
      state.cities = action.payload;
    },
    clearForecast(state) {
      state.selectedForecast = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrent.pending, (s) => { s.status = "loading"; })
      .addCase(fetchCurrent.fulfilled, (s, action) => {
        s.status = "succeeded";
        const existing = s.cities.findIndex(c => c.location?.name === action.payload.location.name);
        if (existing >= 0) s.cities[existing] = action.payload;
        else s.cities.unshift(action.payload);
      })
      .addCase(fetchCurrent.rejected, (s, action) => { s.status = "failed"; s.error = action.payload; })
      .addCase(fetchForecast.fulfilled, (s, action) => { s.selectedForecast = action.payload; })
      .addCase(fetchForecast.rejected, (s, action) => { s.error = action.payload; });
  }
});

export const { setUnit, addFav, removeFav, setCities, clearForecast } = slice.actions;
export default slice.reducer;
