import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tgHash: {
    hash: "",
    checkDataString: "",
  },
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
      state.selectedOptions = {
        ...state.selectedOptions,
        [action.payload.name]: action.payload.value,
      };
    },
  },
});

export const { setTgHashReducer, setSelectedOptionReducer } =
  commonSlice.actions;

export const commonSelector = (state) => state.common;
