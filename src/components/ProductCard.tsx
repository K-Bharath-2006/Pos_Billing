import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Product } from '../types';
import { formatCurrency } from '../utils/currency';
import { THEME } from '../theme/theme';

interface ProductCardProps {
  product: Product;
  currencySymbol?: string;
  onAdd: () => void;
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

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currencySymbol = '₹',
  onAdd,
}) => {
  const details = getProductDetails(product.name);

  return (
    <Card style={styles.card} onPress={onAdd}>
      <Card.Content style={styles.content}>
        <View style={styles.leftContainer}>
          <View style={[styles.iconContainer, { backgroundColor: details.bgColor }]}>
            <Icon name={details.icon} size={18} color={details.color} />
          </View>
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.name}>
              {product.name}
            </Text>
            <Text style={styles.price}>
              {formatCurrency(product.price, currencySymbol)}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={onAdd}
          activeOpacity={0.8}
        >
          <Icon name="plus" size={14} color={THEME.colors.primary} />
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
    marginHorizontal: 4,
    backgroundColor: THEME.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
    ...THEME.shadows.sm,
  },
  content: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 6,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  price: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    fontWeight: '600',
    marginTop: 1,
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: THEME.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
