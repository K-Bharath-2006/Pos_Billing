import { CartItem } from '../types';

export interface BillingSummary {
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  gstAmount: number;
  grandTotal: number;
}

/**
 * Calculates billing totals: subtotal, discount, taxable amount, gst, and grand total.
 * subtotal = sum(price × quantity)
 * discountAmount = subtotal × discount%
 * taxableAmount = subtotal - discountAmount
 * if GST enabled
 *   gst = taxableAmount × gstPercentage
 * else
 *   gst = 0
 * grandTotal = taxableAmount + gst
 */
export const calculateBilling = (
  items: CartItem[],
  discountPercentage: number,
  gstEnabled: boolean,
  gstPercentage: number
): BillingSummary => {
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Validate discount percentage is between 0 and 100
  const discount = Math.min(Math.max(discountPercentage, 0), 100);
  const discountAmount = subtotal * (discount / 100);
  
  const taxableAmount = subtotal - discountAmount;
  
  // Validate GST percentage is between 0 and 100
  const gstRate = gstEnabled ? Math.min(Math.max(gstPercentage, 0), 100) : 0;
  const gstAmount = taxableAmount * (gstRate / 100);
  
  const grandTotal = taxableAmount + gstAmount;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    discountAmount: Number(discountAmount.toFixed(2)),
    taxableAmount: Number(taxableAmount.toFixed(2)),
    gstAmount: Number(gstAmount.toFixed(2)),
    grandTotal: Number(grandTotal.toFixed(2)),
  };
};
