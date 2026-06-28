import { AppSettings } from '../types';

export const STORAGE_KEYS = {
  SETTINGS: 'pos_billing_settings',
  INVOICES: 'pos_billing_invoices',
  LAST_INVOICE_NO: 'pos_billing_last_invoice_no',
};

export const DEFAULT_SETTINGS: AppSettings = {
  storeName: 'My Retail Store',
  storeAddress: '123 Business Park, Cityville',
  phoneNumber: '9876543210',
  gstEnabled: true,
  gstPercentage: 18,
  currencySymbol: '₹',
  footerMessage: 'Thank you for shopping with us!',
  autoPrint: false,
};
