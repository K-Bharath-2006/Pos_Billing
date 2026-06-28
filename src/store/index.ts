import { configureStore } from '@reduxjs/toolkit';
import billingReducer from './billingSlice';
import settingsReducer from './settingsSlice';
import invoiceReducer from './invoiceSlice';

export const store = configureStore({
  reducer: {
    billing: billingReducer,
    settings: settingsReducer,
    invoice: invoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
