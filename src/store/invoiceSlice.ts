import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Invoice } from '../types';

interface InvoiceState {
  invoiceHistory: Invoice[];
  currentInvoice: Invoice | null;
}

const initialState: InvoiceState = {
  invoiceHistory: [],
  currentInvoice: null,
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    createInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoiceHistory.unshift(action.payload);
      state.currentInvoice = action.payload;
    },
    loadInvoices: (state, action: PayloadAction<Invoice[]>) => {
      state.invoiceHistory = action.payload;
    },
    setCurrentInvoice: (state, action: PayloadAction<Invoice | null>) => {
      state.currentInvoice = action.payload;
    },
    deleteInvoice: (state, action: PayloadAction<string>) => {
      state.invoiceHistory = state.invoiceHistory.filter(inv => inv.invoiceNumber !== action.payload);
      if (state.currentInvoice?.invoiceNumber === action.payload) {
        state.currentInvoice = null;
      }
    },
  },
});

export const {
  createInvoice,
  loadInvoices,
  setCurrentInvoice,
  deleteInvoice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
