import { createSlice } from "@reduxjs/toolkit";

// ACTIONS
import { getUser, getUserOrders } from "store/user/user.actions";
// UTILS
import { notify } from "utils/helper-functions";

const initialState = {
  data: [],
  loading: false,
  error: "",
  userOrders: [],
  userOrdersLoading: false,
  userOrdersError: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // reducers: {
  //
  // },
  extraReducers: (builder) => {
    // USER DATA
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      notify(`User: ${action.error.message}`, "error");
    });
    // USER ORDERS
    builder.addCase(getUserOrders.pending, (state) => {
      state.userOrdersLoading = true;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.userOrdersLoading = false;
      state.userOrders = action.payload;
    });
    builder.addCase(getUserOrders.rejected, (state, action) => {
      state.userOrdersLoading = false;
      state.userOrdersError = action.error;
      notify(`Orders: ${action.error.message}`, "error");
    });
  },
});

export const userSelector = (state) => state.user;
