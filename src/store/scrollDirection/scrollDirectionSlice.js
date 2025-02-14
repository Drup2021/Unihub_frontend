import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scrollDirection: "up",
};

export const scrollDirectionSlice = createSlice({
  name: "scrollDirection",
  initialState,
  reducers: {
    changeScrollDirection: (state, action) => {
      return action.payload;
    },
  },
});

export const { changeScrollDirection } = scrollDirectionSlice.actions;
export default scrollDirectionSlice.reducer;
