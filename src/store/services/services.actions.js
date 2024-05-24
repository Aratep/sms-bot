import { createAsyncThunk } from "@reduxjs/toolkit";

// API
import { smsAPI } from "api";

export const getServices = createAsyncThunk(
  "fetch/services",
  async ({ name }) => {
    const res = await smsAPI.fetchServices(name);
    return res.data;
  }
);
