import { createSlice } from "@reduxjs/toolkit";

// ACTIONS
import { makeOrder, getOrderInfo } from "store/order/order.actions";
// UTILS
import { notify } from "utils/helper-functions";

const initialState = {
  orderId: "",
  loading: false,
  error: "",
  orderInfo: {},
  orderInfoLoading: false,
  orderInfoError: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    // MAKE ORDER
    builder.addCase(makeOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(makeOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orderId = action.payload;
    });
    builder.addCase(makeOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      notify(`Order: ${action.error.message}`, "error");
    });
    // GET ORDER INFO
    builder.addCase(getOrderInfo.pending, (state) => {
      state.orderInfoLoading = true;
    });
    builder.addCase(getOrderInfo.fulfilled, (state, action) => {
      state.orderInfoLoading = false;
      state.orderInfo = action.payload;
    });
    builder.addCase(getOrderInfo.rejected, (state, action) => {
      state.orderInfoLoading = false;
      state.orderInfoError = action.error;
      notify(`Get Order: ${action.error.message}`, "error");
    });
  },
});

export const orderSelector = (state) => state.order;
