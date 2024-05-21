import { createSlice } from "@reduxjs/toolkit";

// ACTIONS
import { getCountries } from "store/countries/countries.actions";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  // reducers: {
  //
  // },
  extraReducers: (builder) => {
    builder.addCase(getCountries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getCountries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

// export const { resetAnswersReducer } = countriesSlice.actions;

export const countriesSelector = (state) => state.countries;
