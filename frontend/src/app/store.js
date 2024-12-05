import { configureStore } from '@reduxjs/toolkit';
import shopReducer from '../features/shop/shopSlice';
import { shopApi } from '../services/shopService';
import themeReducer from '../features/theme/themeSlice';
import { homeApi } from '../services/homeService';

export const store = configureStore({
  reducer: {
    shopReducer,
    [shopApi.reducerPath] : shopApi.reducer,
    themeReducer,
    [homeApi.reducerPath]: homeApi.reducer
  },
  middleware: (getDefaulMiddleware) => 
    getDefaulMiddleware()
    .concat(shopApi.middleware)
    .concat(homeApi.middleware)
})