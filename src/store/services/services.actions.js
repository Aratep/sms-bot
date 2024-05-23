import { createAsyncThunk } from "@reduxjs/toolkit";

// API
import { smAPI } from "api";

export const getServices = createAsyncThunk(
  "fetch/services",
  async ({ name }) => {
    const res = await smAPI.fetchServices(name);
    return res.data;
  }
);
