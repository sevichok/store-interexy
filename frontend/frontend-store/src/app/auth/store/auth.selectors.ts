import { RootState } from "store";

export const selectAccessToken = (state: RootState) => state.auth.access_token;
export const selectRefreshToken = (state: RootState) =>
  state.auth.refresh_token;
export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated;
