import { createAsyncThunk } from "@reduxjs/toolkit";

// API
import { smsAPI } from "api";

export const getServices = createAsyncThunk(
  "fetch/services",
  async (params) => {
    const res = await smsAPI.fetchServices(params);
    return res.data;
  }
);
