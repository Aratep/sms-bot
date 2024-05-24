import { createAsyncThunk } from "@reduxjs/toolkit";

// API
import { smsAPI } from "api";

export const getCountries = createAsyncThunk(
  "fetch/countries",
  async ({ name }) => {
    const res = await smsAPI.fetchCountries(name);
    return res.data;
  }
);
