import { createSlice } from "@reduxjs/toolkit";
const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
    filteredInvoices: [],
    filteredBy: "",
    queriedInvoice: {},
  },
  reducers: {
    getInvoices(state, action) {
      state.invoices = action.payload;
    },
    filterInvoices(state, action) {
      state.filteredInvoices = state.invoices.filter((invoice) => {
        if (action.payload === "") return state.invoices;
        return invoice.status === action.payload;
      });
      state.filteredBy = action.payload;
    },
    queryInvoice(state, action) {
      state.queriedInvoice = action.payload;
    },
  },
});
export const invoiceActions = invoiceSlice.actions;
export default invoiceSlice;
