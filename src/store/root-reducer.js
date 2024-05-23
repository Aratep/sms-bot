import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

// SLICES
import { commonSlice } from "store/common/common.slice";
import { countriesSlice } from "store/countries/countries.slice";
import { servicesSlice } from "store/services/services.slice";

// PERSIST CONFIG
import { persistConfig } from "store/persist-config";

const rootReducers = combineReducers({
  common: commonSlice.reducer,
  countries: countriesSlice.reducer,
  services: servicesSlice.reducer,
});

export default persistReducer(persistConfig, rootReducers);
