import { createSlice } from "@reduxjs/toolkit";

// ACTIONS
import {
  makeOrder,
  getSecondCode,
  createInvoice,
} from "store/order/order.actions";
// UTILS
import { notify } from "utils/helper-functions";

const initialState = {
  orderId: "",
  loading: false,
  error: "",
  // ORDER INFO
  orderInfo: {},
  orderInfoLoading: false,
  orderInfoError: "",
  // SECOND CODE
  secondCode: "",
  secondCodeLoading: false,
  secondCodeError: "",
  // INVVOICE
  invoiceData: {},
  invoiceDataLoading: false,
  invoiceDataError: "",
  // OTHER PROPS
  isFirstCodeSet: false,
  isSecondCodeSet: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderInfoReducer: (state, action) => {
      state.orderInfo = action.payload;
    },
    resetOrderInfoReducer: (state) => {
      state.orderInfo = {};
      state.orderInfoLoading = false;
      state.orderInfoError = "";
    },
    setFirstCodeReducer: (state, action) => {
      state.isFirstCodeSet = action.payload;
    },
    setSecondCodeReducer: (state, action) => {
      state.isSecondCodeSet = action.payload;
    },
  },
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
    // builder.addCase(getOrderInfo.pending, (state) => {
    //   state.orderInfoLoading = true;
    // });
    // builder.addCase(getOrderInfo.fulfilled, (state, action) => {
    //   state.orderInfoLoading = false;
    //   state.orderInfo = action.payload;
    // });
    // builder.addCase(getOrderInfo.rejected, (state, action) => {
    //   state.orderInfoLoading = false;
    //   state.orderInfoError = action.error;
    //   notify(`Get Order: ${action.error.message}`, "error");
    // });
    // GET SECOND CODE
    builder.addCase(getSecondCode.pending, (state) => {
      state.secondCodeLoading = true;
    });
    builder.addCase(getSecondCode.fulfilled, (state, action) => {
      state.secondCodeLoading = false;
      state.secondCode = action.payload;
    });
    builder.addCase(getSecondCode.rejected, (state, action) => {
      state.secondCodeLoading = false;
      state.secondCodeError = action.error;
      notify(`Get Code: ${action.error.message}`, "error");
    });
    // CREATE INVOICE
    builder.addCase(createInvoice.pending, (state) => {
      state.invoiceDataLoading = true;
    });
    builder.addCase(createInvoice.fulfilled, (state, action) => {
      state.invoiceDataLoading = false;
      state.invoiceData = action.payload;
      notify("Top Up: Success!");
    });
    builder.addCase(createInvoice.rejected, (state, action) => {
      state.invoiceDataLoading = false;
      state.invoiceDataError = action.error;
      notify(`Get Code: ${action.error.message}`, "error");
    });
  },
});

export const {
  resetOrderInfoReducer,
  setOrderInfoReducer,
  setFirstCodeReducer,
  setSecondCodeReducer,
} = orderSlice.actions;

export const orderSelector = (state) => state.order;
