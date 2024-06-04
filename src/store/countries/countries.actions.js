import { createAsyncThunk } from "@reduxjs/toolkit";

// API
import { smsAPI } from "api";

export const getCountries = createAsyncThunk(
  "fetch/countries",
  async (params) => {
    const res = await smsAPI.fetchCountries(params);
    return res.data;
  }
);
