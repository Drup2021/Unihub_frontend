import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return {
        user: response.data.user,
        accessToken: response.data.accessToken,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        { email, username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      return {
        accessToken: response.data.accessToken,
        message: response.data.message,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verify",
  async ({ verificationToken }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/verify-email",
        { verificationToken },
        { headers: { "Content-Type": "application/json" } }
      );
      return {
        user: response.data.user,
        message: response.data.message,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Verification failed"
      );
    }
  }
);

export const sendVerificationToken = createAsyncThunk(
  "auth/sendVerifToken",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/send-verification-token",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
      return {
        message: response.data.message,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "send verification token request failed"
      );
    }
  }
);

export const getNewAccessToken = createAsyncThunk(
  "auth/getNewAccessToken",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/new-access-token",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return {
        accessToken: response.data.accessToken,
      };
    } catch (err) {
      dispatch(logout());
      return rejectWithValue(
        err.response?.data?.message || "Get new accessToken failed"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = await getState();
      const { username, email } = state.auth.user;
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        { username, email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      localStorage.clear();

      return {
        message: response.data.message,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/forgot-password",
        { email },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return {
        message: response.data.message,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Forgot password failed"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ password, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/reset-password/${token}`,
        { password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return {
        message: response.data.message,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Reset password failed"
      );
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    const result = await dispatch(getNewAccessToken());
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/delete-account`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${result.payload.accessToken}`,
          },
          withCredentials: true,
        }
      );
      return {
        message: response.data.message,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Delete Account failed"
      );
    }
  }
);
