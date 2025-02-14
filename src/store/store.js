import { configureStore } from "@reduxjs/toolkit";
import scrollDirectionReducer from "./scrollDirection/scrollDirectionSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    scrollDirection: scrollDirectionReducer,
    auth: authReducer,
  },
});
