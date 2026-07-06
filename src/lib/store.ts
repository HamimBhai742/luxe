import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./features/api/baseApi";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: authReducer,
      cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
