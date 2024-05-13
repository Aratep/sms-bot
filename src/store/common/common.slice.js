import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navLinks: [],
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setNavLinksReducer: (state, action) => {
      state.navLinks = action.payload;
    },
  },
});

export const { setNavLinksReducer } = commonSlice.actions;

export const commonSelector = (state) => state.common;
