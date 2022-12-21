import { configureStore } from "@reduxjs/toolkit";
import invoiceSlice from "./invoice-slice";

const store = configureStore({
  reducer: {
    invoice: invoiceSlice.reducer,
  },
});
export default store;
