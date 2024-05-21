import { createAsyncThunk } from "@reduxjs/toolkit";

// API
import { countriesAPI } from "api";

export const getCountries = createAsyncThunk(
  "fetch/countries",
  async ({ name }) => {
    const res = await countriesAPI.fetchCountries(name);
    return res.data;
  }
);
