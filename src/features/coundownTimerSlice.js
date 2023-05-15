import { createSlice } from "@reduxjs/toolkit";

export const countdownTimerSlice = createSlice({
  name: "countdownTimer",
  initialState: {
    countDownIsFinished: false,
  },
  reducers: {
    setCountDownIsFinished: (state, action) => {
      state.countDownIsFinished = action.payload;
    },
  },
});

export const { setCountDownIsFinished } = countdownTimerSlice.actions;

export const isCountDownFinished = (state) =>
  state.countdownTimer.countDownIsFinished;

export default countdownTimerSlice.reducer;
