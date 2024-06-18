import storage from "redux-persist/lib/storage";

// ROOT PERSIST
export const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["prices", "order"],
};

export const orderPersistConfig = {
  key: "order",
  storage,
  blacklist: ["orderId"],
};
