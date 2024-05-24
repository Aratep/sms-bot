import { createSlice } from "@reduxjs/toolkit";

// ACTIONS
import { makeOrder } from "store/order/order.actions";
// UTILS
import { notify } from "utils/helper-functions";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(makeOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(makeOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(makeOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      notify(`Order: ${action.error.message}`, "error");
    });
  },
});

export const orderSelector = (state) => state.order;
