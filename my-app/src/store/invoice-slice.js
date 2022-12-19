import { createSlice } from "@reduxjs/toolkit";
const invoiceSlice = createSlice({
  name: "invoices",
  initialState: { cartIsVisible: false },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});
export const invoiceActions = invoiceSlice.actions;
export default invoiceSlice;
