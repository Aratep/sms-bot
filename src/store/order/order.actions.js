import { createAsyncThunk } from "@reduxjs/toolkit";

// API
import { smsAPI } from "api";

export const makeOrder = createAsyncThunk(
  "fetch/create/order",
  async (params) => {
    const res = await smsAPI.fetchOrderCreate(params);
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
