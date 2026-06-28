import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Invoice } from '../types';
import { formatCurrency } from '../utils/currency';
import { THEME } from '../theme/theme';

interface InvoiceCardProps {
  invoice: Invoice;
  currencySymbol?: string;
  onPress: () => void;
  onDelete: () => void;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({
  invoice,
  currencySymbol = '₹',
  onPress,
  onDelete,
}) => {
  let dateDisplay = invoice.invoiceDate;
  try {
    const d = new Date(invoice.invoiceDate);
    if (!isNaN(d.getTime())) {
      dateDisplay = `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  } catch (e) {
    // Fallback
  }

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content style={styles.content}>
        <View style={styles.left}>
          <View style={styles.iconBadge}>
            <Icon name="receipt" size={20} color={THEME.colors.primary} />
          </View>
          <View style={styles.info}>
            <Text variant="titleMedium" style={styles.invNumber}>
              {invoice.invoiceNumber}
            </Text>
            <Text variant="bodySmall" style={styles.date}>
              {dateDisplay}
            </Text>
          </View>
        </View>

        <View style={styles.right}>
          <Text variant="titleMedium" style={styles.amount}>
            {formatCurrency(invoice.total, currencySymbol)}
          </Text>
          <TouchableOpacity onPress={onDelete} style={styles.deleteButton} activeOpacity={0.6}>
            <Icon name="trash-can-outline" size={20} color={THEME.colors.danger} />
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    marginHorizontal: 12,
    backgroundColor: THEME.colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
    ...THEME.shadows.sm,
  },
  content: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: THEME.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  invNumber: {
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    fontSize: 14,
  },
  date: {
    color: THEME.colors.textMuted,
    marginTop: 2,
    fontSize: 11,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    marginRight: 10,
    fontSize: 14,
  },
  deleteButton: {
    padding: 6,
  },
});
