/**
 * Increments the invoice number string.
 * Example: "INV-1001" -> "INV-1002"
 */
export const getNextInvoiceNumber = (lastInvoiceNumber?: string | null): string => {
  if (!lastInvoiceNumber) {
    return 'INV-1001';
  }
  
  const match = lastInvoiceNumber.match(/^INV-(\d+)$/i);
  if (!match) {
    return 'INV-1001';
  }
  
  const numericPart = parseInt(match[1], 10);
  if (isNaN(numericPart)) {
    return 'INV-1001';
  }
  
  const nextNumber = numericPart + 1;
  return `INV-${nextNumber}`;
};
