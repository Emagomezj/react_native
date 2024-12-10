import { configureStore } from '@reduxjs/toolkit';
import shopReducer from '../features/shop/shopSlice';
import cartReducer from '../features/cart/cartSlice';
import themeReducer from '../features/theme/themeSlice';
import sessionReducer from '../features/auth/sessionSlice';
import { shopApi } from '../services/shopService';
import { homeApi } from '../services/homeService';
import { receiptApi } from '../services/receiptsService';
import { sessionApi } from '../services/authService';

export const store = configureStore({
  reducer: {
    shopReducer,
    themeReducer,
    cartReducer,
    sessionReducer,
    [shopApi.reducerPath] : shopApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [receiptApi.reducerPath]: receiptApi.reducer,
    [sessionApi.reducerPath]: sessionApi.reducer
  },
  middleware: (getDefaulMiddleware) => 
    getDefaulMiddleware()
    .concat(shopApi.middleware)
    .concat(homeApi.middleware)
    .concat(receiptApi.middleware)
    .concat(sessionApi.middleware)
})