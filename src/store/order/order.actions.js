import { createAsyncThunk } from "@reduxjs/toolkit";

// API
import { smsAPI } from "api";
// SLICES
import {
  resetOrderInfoReducer,
  setOrderInfoReducer,
  setFirstCodeReducer,
} from "./order.slice";

export const makeOrder = createAsyncThunk(
  "fetch/create/order",
  async ({ params }, { dispatch }) => {
    const res = await smsAPI.fetchOrderCreate(params);
    const orderInfoParams = { auth_data: params.auth_data, id: res.data };
    const orderRes = await dispatch(getOrderInfo(orderInfoParams)).unwrap();
    dispatch(setOrderInfo(orderRes));

    const intervalId = setInterval(async () => {
      const reOrderRes = await dispatch(getOrderInfo(orderInfoParams)).unwrap();
      const updatedFirstCode = reOrderRes?.first_code;

      if (updatedFirstCode !== undefined && updatedFirstCode !== "") {
        dispatch(setOrderInfo(reOrderRes));
        dispatch(setIsFirstCode(true));
        clearInterval(intervalId);
      }
    }, 2000);

    return res.data;
  }
);

export const getOrderInfo = createAsyncThunk(
  "fetch/get/order",
  async (params) => {
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
  async (params) => {
    const res = await smsAPI.fetchSecondCode(params);
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
