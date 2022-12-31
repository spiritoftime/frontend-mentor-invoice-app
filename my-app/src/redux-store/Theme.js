import { createSlice } from "@reduxjs/toolkit";
export const ThemeSlice = createSlice({
  name: "Theme",
  initialState: { isLight: false },
  reducers: {
    toggleTheme(state, action) {
      console.log(action.payload);
      state.isLight = action.payload;
    },
  },
});
export const ThemeActions = ThemeSlice.actions;
