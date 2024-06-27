import { createAsyncThunk } from "@reduxjs/toolkit";

// API
import { smsAPI } from "api";
// SLICES
import {
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
} from "./order.slice";
// ACTIONS
import { setIsOrderDone } from "store/common/common.actions";

export const makeOrderAsync =
  ({ params }) =>
  async (dispatch) => {
    try {
      dispatch(makeOrderStartReducer());
      const orderCreateRes = await smsAPI.fetchOrderCreate(params);
      const orderInfoParams = {
        auth_data: params.auth_data,
        id: orderCreateRes.data,
      };

      const orderRes = await dispatch(
        getOrderInfo({ params: orderInfoParams })
      ).unwrap();
      dispatch(setOrderInfo(orderRes));

      const intervalId = setInterval(async () => {
        const reOrderRes = await dispatch(
          getOrderInfo({ params: orderInfoParams })
        ).unwrap();
        const updatedFirstCode = reOrderRes?.first_code;

        if (updatedFirstCode !== undefined && updatedFirstCode !== "") {
          dispatch(setOrderInfo(reOrderRes));
          dispatch(setIsFirstCode(true));
          dispatch(setIsOrderDone(true));
          clearInterval(intervalId);
        }
      }, 2000);

      dispatch(makeOrderSuccessReducer(orderCreateRes.data));
    } catch (error) {
      dispatch(makeOrderFailedReducer(error.response.data));
    }
  };

export const getOrderInfo = createAsyncThunk(
  "fetch/get/order",
  async ({ params }) => {
    const res = await smsAPI.fetchOrderGet(params);
    return res.data;
  }
);

export const cancelOrder = createAsyncThunk(
  "fetch/cancel/order",
  async (params) => {
    const res = await smsAPI.fetchOrderCancel(params);
    return res.data;
  }
);

export const getSecondCode = createAsyncThunk(
  "fetch/second/code",
  async (params, { dispatch }) => {
    const res = await smsAPI.fetchSecondCode(params);
    const orderInfoParams = {
      auth_data: params.auth_data,
      id: params.order_id,
    };

    const orderRes = await dispatch(
      getOrderInfo({ params: orderInfoParams })
    ).unwrap();
    dispatch(setOrderInfo(orderRes));

    const intervalId = setInterval(async () => {
      const reOrderRes = await dispatch(
        getOrderInfo({ params: orderInfoParams })
      ).unwrap();
      const updatedSecondCode = reOrderRes?.second_code;

      if (updatedSecondCode !== undefined && updatedSecondCode !== "") {
        dispatch(setOrderInfo(reOrderRes));
        dispatch(setIsSecondCode(true));
        clearInterval(intervalId);
      }
    }, 2000);
    return res.data;
  }
);

export const createInvoice = createAsyncThunk(
  "fetch/create/invoice",
  async (params) => {
    const res = await smsAPI.fetchCreateInvoice(params);
    return res.data;
  }
);

export const resetOrderInfo = () => (dispatch) => {
  dispatch(resetOrderInfoReducer());
};

export const setOrderInfo = (payload) => (dispatch) => {
  dispatch(setOrderInfoReducer(payload));
};

export const setIsFirstCode = (payload) => (dispatch) => {
  dispatch(setFirstCodeReducer(payload));
};

export const setIsSecondCode = (payload) => (dispatch) => {
  dispatch(setSecondCodeReducer(payload));
};

export const setIsRepeatClicked = (payload) => (dispatch) => {
  dispatch(setIsRepeatClickedReducer(payload));
};

export const resetInvoiceData = () => (dispatch) => {
  dispatch(resetInvoiceReducer());
};

export const resetFirstCode = () => (dispatch) => {
  dispatch(resetFirstCodeReducer());
};

export const abortOrder = (payload) => (dispatch) => {
  dispatch(abortOrderReducer(payload));
};
