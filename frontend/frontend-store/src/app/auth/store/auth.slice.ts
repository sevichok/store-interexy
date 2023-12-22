import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/auth-state.type";
import { logoutUser, signinUser, signupUser } from "./auth.actions";

const initialState: AuthState = {
  access_token: "",
  refresh_token: "",
  isAuthenticated: !!sessionStorage.getItem("access_token"),
  pending: {},
  errors: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ============== Registration ==============
      .addCase(signupUser.pending, (state) => {
        state.pending.token = true;
        state.errors.token = null;
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.pending.token = false;
        state.access_token = payload.access_token;
        state.isAuthenticated = true;
        sessionStorage.setItem("access_token", payload.access_token);
      })
      .addCase(signupUser.rejected, (state, action: any & { payload: any }) => {
        state.pending.token = false;
        state.errors.token = action.payload;
      })
      // ============== Login ==============
      .addCase(signinUser.pending, (state) => {
        state.pending.token = true;
        state.errors.token = null;
      })
      .addCase(signinUser.fulfilled, (state, { payload }) => {
        state.pending.token = false;
        state.access_token = payload.access_token;
        state.isAuthenticated = true;
        sessionStorage.setItem("access_token", payload.access_token);
      })
      .addCase(signinUser.rejected, (state, action: any & { payload: any }) => {
        state.pending.token = false;
        state.errors.token = action.payload;
      })
      // ============== Logout ==============
      .addCase(logoutUser.pending, (state) => {
        state.pending.token = true;
        state.errors.token = null;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.pending.token = false;
        state.isAuthenticated = false;
        state.access_token = "";
        sessionStorage.removeItem("access_token");
      })
      .addCase(logoutUser.rejected, (state, action: any & { payload: any }) => {
        state.pending.token = false;
        state.errors.token = action.payload;
      });
  },
});

// export default authSlice.reducer;
