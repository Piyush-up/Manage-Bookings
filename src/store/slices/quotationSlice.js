import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ------------------ Async Thunk ------------------ */
export const fetchCities = createAsyncThunk(
  "quotation/fetchCities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:9090/KT_Quotation/QSJavaServletDemo?Action=10"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ------------------ Initial State ------------------ */
const initialState = {
  selectedDate: null,
  searchCity: "",
  nights: 1,
  pax: 0,
  tourName: "",
  cities: [],
  loading: false,
  error: null,
};

/* ------------------ Slice ------------------ */
const quotationSlice = createSlice({
  name: "quotation",
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSearchCity: (state, action) => {
      state.searchCity = action.payload;
    },
    setNights: (state, action) => {
      state.nights = action.payload;
    },
    setPax: (state, action) => {
      state.pax = action.payload;
    },
    setTourName: (state, action) => {
      state.tourName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ------------------ Exports ------------------ */
export const {
  setSelectedDate,
  setSearchCity,
  setNights,
  setPax,
  setTourName,
} = quotationSlice.actions;

export default quotationSlice.reducer;
