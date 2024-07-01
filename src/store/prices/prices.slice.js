import { createSlice } from "@reduxjs/toolkit";

// ACTIONS
import { getPrice } from "store/prices/prices.actions";
// UTILS
import { notify } from "utils/helper-functions";

const initialState = {
  data: {},
  loading: false,
  error: "",
};

export const pricesSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {
    resetPricesDataReducer: (state) => {
      state.data = initialState.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPrice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPrice.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getPrice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      notify(`Prices: ${action.error.message}`, "error");
    });
  },
});
export const { resetPricesDataReducer } = pricesSlice.actions;
export const pricesSelector = (state) => state.prices;
