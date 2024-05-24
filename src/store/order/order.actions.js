import { createAsyncThunk } from "@reduxjs/toolkit";

// API
import { smsAPI } from "api";

export const makeOrder = createAsyncThunk("fetch/order", async (params) => {
  const res = await smsAPI.fetchOrder(params);
  return res.data;
});
