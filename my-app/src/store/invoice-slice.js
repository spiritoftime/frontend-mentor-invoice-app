import { createSlice } from "@reduxjs/toolkit";
const invoiceSlice = createSlice({
  name: "invoices",
  initialState: { invoices: [] },
  reducers: {
    getInvoices(state, action) {
      state.invoices = action.payload;
    },
  },
});
export const invoiceActions = invoiceSlice.actions;
export default invoiceSlice;
