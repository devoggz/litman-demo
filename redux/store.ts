import { configureStore, Middleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

import quickViewReducer from "./features/quickView-slice";
import cartReducer from "./features/cart-slice";
import wishlistReducer from "./features/wishlist-slice";
import productDetailsReducer from "./features/product-details";

import { saveCartToStorage } from "@/app/lib/cartStorage";

const localStorageMiddleware: Middleware =
  (store) => (next) => (action: any) => {
    const result = next(action);

    // Save cart to localStorage after any cart action
    if (action.type?.startsWith("cart/")) {
      const state = store.getState();

      saveCartToStorage(state.cartReducer.items);
    }

    return result;
  };

export const store = configureStore({
  reducer: {
    quickViewReducer,
    cartReducer,
    wishlistReducer,
    productDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* 🔥 FIX — this is the only change */
export const useAppDispatch = () => useDispatch<AppDispatch>();
