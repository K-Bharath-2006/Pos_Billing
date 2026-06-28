export const formatCurrency = (amount: number, symbol: string = '₹'): string => {
  if (isNaN(amount)) {
    return `${symbol}0.00`;
  }
  return `${symbol}${amount.toFixed(2)}`;
};
