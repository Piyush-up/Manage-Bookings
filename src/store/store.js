import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import quotationReducer from "./slices/quotationSlice";
import { baseApi } from "../api/baseApi";

const logger = createLogger({
  collapsed: true,
});

export const store = configureStore({
  reducer: {
    quotation: quotationReducer, // UI state
    [baseApi.reducerPath]: baseApi.reducer, // RTK Query
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware).concat(logger),
});
