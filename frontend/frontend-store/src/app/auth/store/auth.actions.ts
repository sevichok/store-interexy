import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import repository from "repository";

// ============ DTOS ============ //
import { AuthDto } from "../types/auth-dto.type";
import { LoginDto } from "../types/login-dto.type";
import { RegisterDto } from "../types/register-dto.type";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const signinUser = createAsyncThunk<AuthDto, { data: LoginDto }>(
  "POST/auth/signin",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        REACT_APP_API_URL + "/auth/signin",
        data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Sign In Failed");
    }
  }
);

export const signupUser = createAsyncThunk<AuthDto, { data: RegisterDto }>(
  "POST/auth/signup",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await repository.post(
        REACT_APP_API_URL + "/auth/signup",
        data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Sign Up Failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "POST/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await repository.post(
        REACT_APP_API_URL + "/auth/logout"
      );
      console.log(response)
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Logout Failed");
    }
  }
);
