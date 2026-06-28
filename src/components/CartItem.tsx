import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CartItem as CartItemType } from '../types';
import { formatCurrency } from '../utils/currency';
import { QuantityButton } from './QuantityButton';
import { THEME } from '../theme/theme';

interface CartItemProps {
  item: CartItemType;
  currencySymbol?: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const getProductDetails = (name: string) => {
  const normalized = name.toLowerCase();
  if (normalized.includes('coffee')) {
    return { icon: 'coffee', color: '#8B5A2B', bgColor: '#FDF2E9' };
  }
  if (normalized.includes('tea')) {
    return { icon: 'tea', color: '#0D9488', bgColor: '#F0FDFA' };
  }
  if (normalized.includes('milk')) {
    return { icon: 'water', color: '#0284C7', bgColor: '#F0F9FF' };
  }
  if (normalized.includes('burger')) {
    return { icon: 'hamburger', color: '#D97706', bgColor: '#FEF3C7' };
  }
  if (normalized.includes('pizza')) {
    return { icon: 'pizza', color: '#DC2626', bgColor: '#FEF2F2' };
  }
  return { icon: 'food-fork-drink', color: '#4F46E5', bgColor: '#EEF2F6' };
};

export const CartItem: React.FC<CartItemProps> = ({
  item,
  currencySymbol = '₹',
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const itemTotal = item.product.price * item.quantity;
  const details = getProductDetails(item.product.name);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <View style={[styles.iconBadge, { backgroundColor: details.bgColor }]}>
          <Icon name={details.icon} size={22} color={details.color} />
        </View>

        <View style={styles.itemInfo}>
          <Text variant="titleMedium" style={styles.name}>
            {item.product.name}
          </Text>
          <Text variant="bodyMedium" style={styles.price}>
            {formatCurrency(item.product.price, currencySymbol)} × {item.quantity}
          </Text>
        </View>

        <View style={styles.controls}>
          <View style={styles.quantityContainer}>
            <QuantityButton icon="minus" onPress={onDecrease} disabled={item.quantity <= 1} />
            <Text style={styles.quantity}>{item.quantity}</Text>
            <QuantityButton icon="plus" onPress={onIncrease} />
          </View>

          <Text variant="titleMedium" style={styles.total}>
            {formatCurrency(itemTotal, currencySymbol)}
          </Text>

          <TouchableOpacity onPress={onRemove} style={styles.removeButton} activeOpacity={0.6}>
            <Icon name="trash-can-outline" size={20} color={THEME.colors.danger} />
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: THEME.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
    ...THEME.shadows.sm,
  },
  content: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  name: {
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    fontSize: 14,
  },
  price: {
    color: THEME.colors.textSecondary,
    fontSize: 12,
    marginTop: 1,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  quantity: {
    fontSize: 14,
    fontWeight: '700',
    marginHorizontal: 6,
    minWidth: 20,
    textAlign: 'center',
    color: THEME.colors.textPrimary,
  },
  total: {
    fontWeight: '700',
    color: THEME.colors.primary,
    minWidth: 65,
    textAlign: 'right',
    marginRight: 6,
    fontSize: 14,
  },
  removeButton: {
    padding: 6,
  },
});
