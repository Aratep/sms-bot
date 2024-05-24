import { createAsyncThunk } from "@reduxjs/toolkit";

// API
import { smsAPI } from "api";

export const getPrice = createAsyncThunk("fetch/price", async (params) => {
  const res = await smsAPI.fetchPrice(params);
  return res.data;
});
