import { configureStore } from "@reduxjs/toolkit";
import invoiceSlice from "./invoice-slice";
import { LoginSlice } from "./login-slice";
const store = configureStore({
  reducer: {
    invoice: invoiceSlice.reducer,
    Login:LoginSlice.reducer
  },
});
export default store;
