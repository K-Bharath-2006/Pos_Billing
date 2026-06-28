import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppSettings } from '../types';
import { DEFAULT_SETTINGS } from '../utils/constants';

const initialState: AppSettings = DEFAULT_SETTINGS;

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setStoreName: (state, action: PayloadAction<string>) => {
      state.storeName = action.payload;
    },
    setStoreAddress: (state, action: PayloadAction<string>) => {
      state.storeAddress = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setGstEnabled: (state, action: PayloadAction<boolean>) => {
      state.gstEnabled = action.payload;
    },
    setGstPercentage: (state, action: PayloadAction<number>) => {
      state.gstPercentage = action.payload;
    },
    setCurrencySymbol: (state, action: PayloadAction<string>) => {
      state.currencySymbol = action.payload;
    },
    setFooterMessage: (state, action: PayloadAction<string>) => {
      state.footerMessage = action.payload;
    },
    setAutoPrint: (state, action: PayloadAction<boolean>) => {
      state.autoPrint = action.payload;
    },
    setAllSettings: (state, action: PayloadAction<AppSettings>) => {
      return action.payload;
    },
  },
});

export const {
  setStoreName,
  setStoreAddress,
  setPhoneNumber,
  setGstEnabled,
  setGstPercentage,
  setCurrencySymbol,
  setFooterMessage,
  setAutoPrint,
  setAllSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
