import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { formatCurrency } from '../utils/currency';
import { THEME } from '../theme/theme';

interface BillSummaryProps {
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  gstEnabled: boolean;
  gstPercentage: number;
  gstAmount: number;
  grandTotal: number;
  currencySymbol?: string;
}

export const BillSummary: React.FC<BillSummaryProps> = ({
  subtotal,
  discountPercentage,
  discountAmount,
  gstEnabled,
  gstPercentage,
  gstAmount,
  grandTotal,
  currencySymbol = '₹',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text variant="bodyMedium" style={styles.label}>Subtotal</Text>
        <Text variant="bodyMedium" style={styles.value}>
          {formatCurrency(subtotal, currencySymbol)}
        </Text>
      </View>

      {discountPercentage > 0 && (
        <View style={styles.row}>
          <Text variant="bodyMedium" style={[styles.label, styles.discountLabel]}>
            Discount ({discountPercentage}%)
          </Text>
          <Text variant="bodyMedium" style={[styles.value, styles.discountValue]}>
            -{formatCurrency(discountAmount, currencySymbol)}
          </Text>
        </View>
      )}

      {gstEnabled && (
        <View style={styles.row}>
          <Text variant="bodyMedium" style={styles.label}>
            GST ({gstPercentage}%)
          </Text>
          <Text variant="bodyMedium" style={styles.value}>
            {formatCurrency(gstAmount, currencySymbol)}
          </Text>
        </View>
      )}

      <Divider style={styles.divider} />

      <View style={styles.totalRow}>
        <Text variant="titleMedium" style={styles.grandTotalLabel}>Grand Total</Text>
        <Text variant="titleLarge" style={styles.grandTotalValue}>
          {formatCurrency(grandTotal, currencySymbol)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.surface,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
    marginHorizontal: 12,
    marginVertical: 8,
    ...THEME.shadows.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  label: {
    color: THEME.colors.textSecondary,
    fontWeight: '500',
  },
  value: {
    color: THEME.colors.textPrimary,
    fontWeight: '700',
  },
  discountLabel: {
    color: THEME.colors.danger,
  },
  discountValue: {
    color: THEME.colors.danger,
  },
  divider: {
    marginVertical: 12,
    backgroundColor: THEME.colors.borderLight,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: THEME.colors.primaryLight,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 4,
  },
  grandTotalLabel: {
    fontWeight: '800',
    color: THEME.colors.primaryDark,
  },
  grandTotalValue: {
    fontWeight: '900',
    color: THEME.colors.primary,
  },
});
