import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tgHash: "",
  selectedOptions: {
    country: { value: "", src: "" },
    service: { value: "", src: "" },
  },
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setTgHashReducer: (state, action) => {
      state.tgHash = action.payload;
    },
    setSelectedOptionReducer: (state, action) => {
      console.log("LJFKSDLKJFKLDF =======>>>>", action.payload);
      state.selectedOptions = { ...state.selectedOptions, [action.payload.name]: action.payload.value };
    },
  },
});

export const { setTgHashReducer, setSelectedOptionReducer } = commonSlice.actions;

export const commonSelector = (state) => state.common;
