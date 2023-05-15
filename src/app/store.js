import { configureStore } from "@reduxjs/toolkit";
import countdownTimerReducer from "../features/coundownTimerSlice";

export const store = configureStore({
  reducer: {
    countdownTimer: countdownTimerReducer,
  },
});
