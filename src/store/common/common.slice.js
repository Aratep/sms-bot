import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tgHash: {
    hash: "",
    checkDataString: "",
  },
  selectedOptions: {
    service: { value: "", src: "", id: null, price: "" },
    country: { value: "", src: "", id: null, price: "" },
  },
  isOrderDone: false,
  isTimerEnd: false,
  isInsufficientFunds: true,
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
    resetSelectedOptionReducer: (state) => {
      state.selectedOptions = initialState.selectedOptions;
    },
    setIsOrderDoneReducer: (state, action) => {
      state.isOrderDone = action.payload;
    },
    setIsTimerEndReducer: (state, action) => {
      state.isTimerEnd = action.payload;
    },
    setIsTInsufficientFundsReducer: (state, action) => {
      state.isInsufficientFunds = action.payload;
    },
  },
});

export const {
  setTgHashReducer,
  setSelectedOptionReducer,
  resetSelectedOptionReducer,
  setIsOrderDoneReducer,
  setIsTimerEndReducer,
  setIsTInsufficientFundsReducer,
} = commonSlice.actions;

export const commonSelector = (state) => state.common;
