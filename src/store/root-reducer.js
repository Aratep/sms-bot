import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

// SLICES
import { commonSlice } from "store/common/common.slice";
import { countriesSlice } from "store/countries/countries.slice";
import { servicesSlice } from "store/services/services.slice";
import { pricesSlice } from "store/prices/prices.slice";
import { orderSlice } from "store/order/order.slice";

// PERSIST CONFIG
import { persistConfig } from "store/persist-config";

const rootReducers = combineReducers({
  common: commonSlice.reducer,
  countries: countriesSlice.reducer,
  services: servicesSlice.reducer,
  prices: pricesSlice.reducer,
  order: orderSlice.reducer,
});

export default persistReducer(persistConfig, rootReducers);
