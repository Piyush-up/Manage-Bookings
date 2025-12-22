import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import quotationReducer from "./slices/quotationSlice";

export const store = configureStore({
  reducer: {
    quotation: quotationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createLogger()),
});

export default store;
