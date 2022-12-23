import { createSlice } from "@reduxjs/toolkit";
export const LoginSlice = createSlice({
  name: "users",
  initialState: { uid: "", displayName: "", photoUrl: "", isLogin: false },
  reducers: {
    getLoginDetails(state, action) {
      state.uid = action.payload.uid;
      state.photoUrl = action.payload.photoUrl;
      state.isLogin = action.payload.isLogin;
      state.displayName = action.payload.displayName;
    },
  },
});
export const LoginActions = LoginSlice.actions;
