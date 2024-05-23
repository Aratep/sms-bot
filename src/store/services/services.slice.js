import { createSlice } from "@reduxjs/toolkit";

// ACTIONS
import { getServices } from "store/services/services.actions";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getServices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getServices.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getServices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const servicesSelector = (state) => state.services;
