import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CartItem } from '../components/CartItem';
import { BillSummary } from '../components/BillSummary';
import { PrimaryButton } from '../components/PrimaryButton';
import { EmptyState } from '../components/EmptyState';
import { SectionHeader } from '../components/SectionHeader';
import { THEME } from '../theme/theme';
import {
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  applyDiscount,
  calculateTotals,
  clearCart,
} from '../store/billingSlice';
import { createInvoice } from '../store/invoiceSlice';
import { getNextInvoiceNumber } from '../utils/invoiceNumber';
import { saveInvoicesToStorage } from '../utils/storage';

export const BillingScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  
  const { cartItems, discountPercentage, subtotal, discountAmount, gstAmount, grandTotal } = useAppSelector(
    state => state.billing
  );
  const settings = useAppSelector(state => state.settings);
  const { invoiceHistory } = useAppSelector(state => state.invoice);

  const [discountInput, setDiscountInput] = useState(discountPercentage.toString());

  // Keep Redux totals calculated whenever items, discount or GST settings change
  useEffect(() => {
    dispatch(
      calculateTotals({
        gstEnabled: settings.gstEnabled,
        gstPercentage: settings.gstPercentage,
      })
    );
  }, [cartItems, discountPercentage, settings.gstEnabled, settings.gstPercentage, dispatch]);

  const handleAddProduct = (product: any) => {
    dispatch(addProduct(product));
  };

  const handleIncrease = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemove = (id: string) => {
    dispatch(removeProduct(id));
  };

  const handleDiscountChange = (text: string) => {
    // Basic sanitization
    const sanitized = text.replace(/[^0-9.]/g, '');
    setDiscountInput(sanitized);

    const numericValue = parseFloat(sanitized);
    if (!isNaN(numericValue)) {
      if (numericValue >= 0 && numericValue <= 100) {
        dispatch(applyDiscount(numericValue));
      }
    } else {
      dispatch(applyDiscount(0));
    }
  };

  const handleGenerateBill = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add products to the cart before generating a bill.');
      return;
    }

    // Generate Invoice Number format INV-1001, INV-1002, etc.
    const lastInvoice = invoiceHistory[0]; // history is sorted newest first
    const nextInvoiceNo = getNextInvoiceNumber(lastInvoice?.invoiceNumber || null);

    const newInvoice = {
      invoiceNumber: nextInvoiceNo,
      invoiceDate: new Date().toISOString(),
      items: cartItems,
      discount: discountPercentage,
      gst: gstAmount,
      subtotal: subtotal,
      total: grandTotal,
    };

    // Save invoice to Redux store
    dispatch(createInvoice(newInvoice));
    
    // Persist list using AsyncStorage
    const updatedHistory = [newInvoice, ...invoiceHistory];
    await saveInvoicesToStorage(updatedHistory);

    // Clear billing cart state
    dispatch(clearCart());
    setDiscountInput('0');

    // Navigate to Receipt Preview
    navigation.navigate('ReceiptPreview', { invoice: newInvoice });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            {settings.storeAddress ? (
              <View style={styles.addressBanner}>
                <Icon name="map-marker" size={14} color={THEME.colors.primary} style={styles.addressIcon} />
                <Text style={styles.storeAddress}>{settings.storeAddress}</Text>
              </View>
            ) : null}

            <SectionHeader title="Select Products" />
            <View style={styles.productsGrid}>
              {PRODUCTS.map(item => (
                <View key={item.id} style={styles.productGridItem}>
                  <ProductCard
                    product={item}
                    currencySymbol={settings.currencySymbol}
                    onAdd={() => handleAddProduct(item)}
                  />
                </View>
              ))}
            </View>

            <SectionHeader title="Active Order Items" />
          </>
        }
        data={cartItems}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            currencySymbol={settings.currencySymbol}
            onIncrease={() => handleIncrease(item.product.id)}
            onDecrease={() => handleDecrease(item.product.id)}
            onRemove={() => handleRemove(item.product.id)}
          />
        )}
        keyExtractor={item => item.product.id}
        ListEmptyComponent={
          <EmptyState
            icon="cart-outline"
            title="Your cart is empty"
            description="Tap on any product above to build your active invoice."
            style={styles.emptyCart}
          />
        }
        ListFooterComponent={
          cartItems.length > 0 ? (
            <View style={styles.footerContainer}>
              <View style={styles.discountCard}>
                <View style={styles.discountTextContainer}>
                  <Icon name="tag-outline" size={20} color={THEME.colors.primary} />
                  <Text style={styles.discountLabel}>Add Order Discount</Text>
                </View>
                <TextInput
                  mode="outlined"
                  value={discountInput}
                  onChangeText={handleDiscountChange}
                  keyboardType="numeric"
                  style={styles.discountInput}
                  placeholder="0"
                  maxLength={5}
                  activeOutlineColor={THEME.colors.primary}
                  outlineColor={THEME.colors.border}
                  outlineStyle={styles.discountInputOutline}
                  textColor={THEME.colors.textPrimary}
                  placeholderTextColor={THEME.colors.textMuted}
                  right={<TextInput.Affix text="%" />}
                />
              </View>

              <BillSummary
                subtotal={subtotal}
                discountPercentage={discountPercentage}
                discountAmount={discountAmount}
                gstEnabled={settings.gstEnabled}
                gstPercentage={settings.gstPercentage}
                gstAmount={gstAmount}
                grandTotal={grandTotal}
                currencySymbol={settings.currencySymbol}
              />

              <PrimaryButton
                title="Generate Invoice Receipt"
                icon="receipt"
                onPress={handleGenerateBill}
                style={styles.billButton}
              />
            </View>
          ) : null
        }
        contentContainerStyle={styles.scrollContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  addressBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: THEME.colors.primaryLight,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.borderLight,
  },
  addressIcon: {
    marginRight: 4,
  },
  storeAddress: {
    color: THEME.colors.primaryDark,
    fontSize: 12,
    fontWeight: '700',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  productGridItem: {
    width: '50%',
    paddingHorizontal: 4,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  emptyCart: {
    marginVertical: 12,
  },
  footerContainer: {
    marginTop: 12,
    paddingHorizontal: 4,
  },
  discountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: THEME.colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
    ...THEME.shadows.sm,
  },
  discountTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginLeft: 8,
  },
  discountInput: {
    width: 90,
    backgroundColor: THEME.colors.surface,
    height: 38,
    textAlign: 'center',
    fontSize: 14,
  },
  discountInputOutline: {
    borderRadius: 8,
  },
  billButton: {
    marginHorizontal: 12,
    marginTop: 12,
  },
});
