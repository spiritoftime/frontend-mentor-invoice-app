import { createSlice } from "@reduxjs/toolkit";
const newInvoiceSlice = createSlice({
  name: "newInvoice",
  initialState: {},
  reducers: {
    getInvoiceData(state, action) {
      state[Object.keys(action.payload)[0]] = Object.values(action.payload)[0];
    },
  },
});
export const newInvoiceActions = newInvoiceSlice.actions;
export default newInvoiceSlice;
