import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

// SLICES
import { commonSlice } from "store/common/common.slice";
import { countriesSlice } from "store/countries/countries.slice";
import { servicesSlice } from "store/services/services.slice";
import { pricesSlice } from "store/prices/prices.slice";
import { orderSlice } from "store/order/order.slice";
import { userSlice } from "store/user/user.slice";

// PERSIST CONFIG
import { persistConfig, orderPersistConfig } from "store/persist-config";

const persistedAuthReducer = persistReducer(
  orderPersistConfig,
  orderSlice.reducer
);

const rootReducers = combineReducers({
  common: commonSlice.reducer,
  countries: countriesSlice.reducer,
  services: servicesSlice.reducer,
  prices: pricesSlice.reducer,
  order: persistedAuthReducer,
  user: userSlice.reducer,
});

export default persistReducer(persistConfig, rootReducers);
