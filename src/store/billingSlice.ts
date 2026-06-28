import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '../types';
import { calculateBilling } from '../utils/calculations';

interface BillingState {
  cartItems: CartItem[];
  discountPercentage: number;
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  gstAmount: number;
  grandTotal: number;
}

const initialState: BillingState = {
  cartItems: [],
  discountPercentage: 0,
  subtotal: 0,
  discountAmount: 0,
  taxableAmount: 0,
  gstAmount: 0,
  grandTotal: 0,
};

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const existingItem = state.cartItems.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ product: action.payload, quantity: 1 });
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(item => item.product.id !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(item => item.product.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(item => item.product.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    applyDiscount: (state, action: PayloadAction<number>) => {
      state.discountPercentage = Math.min(Math.max(action.payload, 0), 100);
    },
    calculateTotals: (
      state,
      action: PayloadAction<{ gstEnabled: boolean; gstPercentage: number }>
    ) => {
      const { gstEnabled, gstPercentage } = action.payload;
      const summary = calculateBilling(
        state.cartItems,
        state.discountPercentage,
        gstEnabled,
        gstPercentage
      );
      state.subtotal = summary.subtotal;
      state.discountAmount = summary.discountAmount;
      state.taxableAmount = summary.taxableAmount;
      state.gstAmount = summary.gstAmount;
      state.grandTotal = summary.grandTotal;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.discountPercentage = 0;
      state.subtotal = 0;
      state.discountAmount = 0;
      state.taxableAmount = 0;
      state.gstAmount = 0;
      state.grandTotal = 0;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  applyDiscount,
  calculateTotals,
  clearCart,
} = billingSlice.actions;

export default billingSlice.reducer;
