import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tgHash: "",
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setTgHashReducer: (state, action) => {
      state.tgHash = action.payload;
    },
  },
});

export const { setTgHashReducer } = commonSlice.actions;

export const commonSelector = (state) => state.common;
