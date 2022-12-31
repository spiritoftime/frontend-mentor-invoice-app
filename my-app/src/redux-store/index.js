import { configureStore } from "@reduxjs/toolkit";
import invoiceSlice from "./invoice-slice";
import { LoginSlice } from "./login-slice";
import { ThemeSlice } from "./Theme";
const store = configureStore({
  reducer: {
    theme:ThemeSlice.reducer,
    invoice: invoiceSlice.reducer,
    Login:LoginSlice.reducer
  },
});
export default store;
