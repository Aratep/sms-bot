import { createAsyncThunk } from "@reduxjs/toolkit";

// API
import { smAPI } from "api";

export const getCountries = createAsyncThunk(
  "fetch/countries",
  async ({ name }) => {
    const res = await smAPI.fetchCountries(name);
    return res.data;
  }
);
