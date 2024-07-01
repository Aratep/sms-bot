import { createAsyncThunk } from "@reduxjs/toolkit";

// API
import { smsAPI } from "api";
// SLICES
import { resetPricesDataReducer } from "./prices.slice";

export const getPrice = createAsyncThunk("fetch/price", async (params) => {
  const res = await smsAPI.fetchPrice(params);
  return res.data;
});

export const resetPricesData = () => (dispatch) => {
  dispatch(resetPricesDataReducer());
};
