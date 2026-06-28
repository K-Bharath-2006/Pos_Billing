export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoreSettings {
  storeName: string;
  storeAddress: string;
  phoneNumber: string;
}

export interface BillingSettings {
  gstEnabled: boolean;
  gstPercentage: number;
  currencySymbol: string;
}

export interface ReceiptSettings {
  footerMessage: string;
  autoPrint: boolean;
}

export interface AppSettings {
  storeName: string;
  storeAddress: string;
  phoneNumber: string;
  gstEnabled: boolean;
  gstPercentage: number;
  currencySymbol: string;
  footerMessage: string;
  autoPrint: boolean;
}

export interface Invoice {
  invoiceNumber: string;
  invoiceDate: string;
  items: CartItem[];
  discount: number; // Percentage, e.g. 10 for 10%
  gst: number; // Calculated tax amount
  subtotal: number; // Sum of items (price * quantity)
  total: number; // Grand total
}
