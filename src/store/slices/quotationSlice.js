import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDate: null,
  searchCity: "",
  nights: 1,
  pax: 0,
  tourName: "",
  selectedCities: [], // list of cities added
  isModalOpen: false, // modal state
  mapProps: { type: "", data: null }, // data for map modal
};

const quotationSlice = createSlice({
  name: "quotation",
  initialState,
  reducers: {
    // Form fields
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
    addSelectedCity: (state, action) => {
      const exists = state.selectedCities.find(
        (c) => c.cityCode === action.payload.cityCode
      );
      if (!exists) state.selectedCities.push(action.payload);
    },

    removeSelectedCity: (state, action) => {
      state.selectedCities = state.selectedCities.filter(
        (c) => c.cityCode !== action.payload
      );
    },
    clearSelectedCities: (state) => {
      state.selectedCities = [];
    },

    openMap: (state, action) => {
      state.mapProps = action.payload;
      state.isModalOpen = true;
      state.mapProps.data = action.payload.data || [];
      state.mapProps.type = action.payload.type || "";
    },
    closeMap: (state) => {
      state.mapProps = { type: "", data: null };
      state.isModalOpen = false;
    },
  },
});

export const {
  setSelectedDate,
  setSearchCity,
  setNights,
  setPax,
  setTourName,
  addSelectedCity,
  removeSelectedCity,
  clearSelectedCities,
  openMap,
  closeMap,
} = quotationSlice.actions;

export default quotationSlice.reducer;
