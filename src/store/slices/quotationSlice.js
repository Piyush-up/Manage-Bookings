import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDate: null,
  searchCity: "",
  nights: 1,
  pax: 0,
  tourName: "",
};

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
});

export const {
  setSelectedDate,
  setSearchCity,
  setNights,
  setPax,
  setTourName,
} = quotationSlice.actions;

export default quotationSlice.reducer;
