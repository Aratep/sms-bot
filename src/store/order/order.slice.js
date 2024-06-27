import { createSlice } from "@reduxjs/toolkit";

// ACTIONS
import { getSecondCode, createInvoice } from "store/order/order.actions";
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
  invoiceData: "",
  invoiceDataLoading: false,
  invoiceDataError: "",
  // OTHER PROPS
  isFirstCodeSet: false,
  isSecondCodeSet: false,
  isRepeatClicked: false,
  isOrderAborted: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderInfoReducer: (state, action) => {
      state.orderInfo = action.payload;
    },
    resetInvoiceReducer: (state) => {
      state.invoiceData = "";
    },
    resetFirstCodeReducer: (state) => {
      state.orderInfo.first_code = "";
    },
    abortOrderReducer: (state, action) => {
      state.isOrderAborted = action.payload;
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
    setIsRepeatClickedReducer: (state, action) => {
      state.isRepeatClicked = action.payload;
    },
    // ORDER INFO
    makeOrderStartReducer: (state) => {
      state.orderInfoLoading = true;
    },
    makeOrderSuccessReducer: (state, { payload }) => {
      state.orderId = payload;
      state.orderInfoLoading = false;
    },
    makeOrderFailedReducer: (state, { payload }) => {
      state.orderInfoError = payload;
      notify(`${payload.message}`, "error");
      state.orderInfoLoading = false;
    },
  },
  extraReducers: (builder) => {
    // MAKE ORDER
    // builder.addCase(makeOrder.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(makeOrder.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.orderId = action.payload;
    // });
    // builder.addCase(makeOrder.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error;
    //   notify(`Order: ${action.error.message}`, "error");
    // });
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
  setIsRepeatClickedReducer,
  resetInvoiceReducer,
  abortOrderReducer,
  resetFirstCodeReducer,
  // make order
  makeOrderStartReducer,
  makeOrderSuccessReducer,
  makeOrderFailedReducer,
} = orderSlice.actions;

export const orderSelector = (state) => state.order;
