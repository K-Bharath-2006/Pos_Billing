import { Invoice, AppSettings } from '../types';
import { formatCurrency } from './currency';

const RECEIPT_WIDTH = 32;

const center = (text: string, width: number = RECEIPT_WIDTH): string => {
  if (text.length >= width) {
    return text.substring(0, width);
  }
  const leftPadding = Math.floor((width - text.length) / 2);
  const rightPadding = width - text.length - leftPadding;
  return ' '.repeat(leftPadding) + text + ' '.repeat(rightPadding);
};

const leftRight = (left: string, right: string, width: number = RECEIPT_WIDTH): string => {
  const availableSpace = width - left.length - right.length;
  if (availableSpace <= 0) {
    const maxLeftLen = width - right.length - 1;
    const truncatedLeft = left.substring(0, maxLeftLen);
    return truncatedLeft + ' ' + right;
  }
  return left + ' '.repeat(availableSpace) + right;
};

/**
 * Generates a plain text representation of the invoice formatted like a physical thermal receipt.
 */
export const generateTextReceipt = (invoice: Invoice, settings: AppSettings): string => {
  const currencySymbol = settings.currencySymbol;
  const lines: string[] = [];

  const border = '='.repeat(RECEIPT_WIDTH);
  const dashBorder = '-'.repeat(RECEIPT_WIDTH);

  lines.push(border);
  lines.push(center(settings.storeName.toUpperCase()));
  
  if (settings.storeAddress) {
    // Split address by commas or spaces if it's too long, or just format
    const addressParts = settings.storeAddress.split(',');
    addressParts.forEach(part => {
      if (part.trim()) {
        lines.push(center(part.trim()));
      }
    });
  }
  
  if (settings.phoneNumber) {
    lines.push(center(`TEL: ${settings.phoneNumber}`));
  }
  lines.push(border);

  lines.push(leftRight(`Invoice: ${invoice.invoiceNumber}`, ''));
  
  let dateStr = invoice.invoiceDate;
  try {
    const d = new Date(invoice.invoiceDate);
    if (!isNaN(d.getTime())) {
      const datePart = d.toLocaleDateString();
      const timePart = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      dateStr = `${datePart} ${timePart}`;
    }
  } catch (e) {
    // Fallback to original string if error
  }
  lines.push(leftRight(`Date: ${dateStr}`, ''));
  lines.push(dashBorder);

  // Table Header
  lines.push(leftRight('ITEM', 'QTY x PRICE = TOTAL'));
  lines.push(dashBorder);

  // Items
  invoice.items.forEach(item => {
    const priceStr = item.product.price.toFixed(0);
    const totalStr = (item.product.price * item.quantity).toFixed(2);
    const itemTotalFormatted = `${currencySymbol}${totalStr}`;
    const qtyPriceStr = `${item.quantity}x${priceStr}`;
    
    // For long product names, wrap or print name on first line, pricing on second line
    if (item.product.name.length > 14) {
      lines.push(item.product.name);
      lines.push(leftRight(`  ${qtyPriceStr}`, itemTotalFormatted));
    } else {
      lines.push(leftRight(item.product.name, `${qtyPriceStr}  ${itemTotalFormatted}`));
    }
  });

  lines.push(dashBorder);

  // Totals
  lines.push(leftRight('Subtotal:', formatCurrency(invoice.subtotal, currencySymbol)));
  
  if (invoice.discount > 0) {
    const discAmt = invoice.subtotal * (invoice.discount / 100);
    lines.push(leftRight(`Discount (${invoice.discount}%):`, `-${formatCurrency(discAmt, currencySymbol)}`));
  }
  
  if (settings.gstEnabled && invoice.gst > 0) {
    lines.push(leftRight(`GST (${settings.gstPercentage}%):`, formatCurrency(invoice.gst, currencySymbol)));
  }
  
  lines.push(dashBorder);
  lines.push(leftRight('GRAND TOTAL:', formatCurrency(invoice.total, currencySymbol)));
  lines.push(border);

  if (settings.footerMessage) {
    const footerLines = settings.footerMessage.split('\n');
    footerLines.forEach(fLine => {
      if (fLine.trim()) {
        lines.push(center(fLine.trim()));
      }
    });
  }
  lines.push(center('*** THANK YOU ***'));
  lines.push(border);

  return lines.join('\n');
};
