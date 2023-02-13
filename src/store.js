import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { blogsApi } from './services/blogsApi';

export const store = configureStore({
  reducer: {
    [blogsApi.reducerPath]: blogsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogsApi.middleware),
});

setupListeners(store.dispatch);
