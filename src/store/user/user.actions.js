import { createAsyncThunk } from "@reduxjs/toolkit";

// API
import { smsAPI } from "api";

// GET CURRENT USER DATA
export const getUser = createAsyncThunk("fetch/user", async (params) => {
  const res = await smsAPI.fetchUser(params);
  return res.data;
});

// GET CURRENT USER'S ORDERS
export const getUserOrders = createAsyncThunk(
  "fetch/user/orders",
  async (params) => {
    const res = await smsAPI.fetchUserOrders(params);
    return res.data;
  }
);
