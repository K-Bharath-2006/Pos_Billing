import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Invoice, AppSettings } from '../types';
import { formatCurrency } from '../utils/currency';
import { THEME } from '../theme/theme';

interface ReceiptViewProps {
  invoice: Invoice;
  settings: AppSettings;
}

const Barcode: React.FC<{ invoiceNumber: string }> = ({ invoiceNumber }) => {
  const barPattern = [
    2, 1, 3, 1, 1, 2, 4, 1, 2, 2, 1, 3, 1, 1, 4, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 4, 1
  ];
  return (
    <View style={styles.barcodeContainer}>
      <View style={styles.barcodeLines}>
        {barPattern.map((width, idx) => (
          <View
            key={idx}
            style={{
              width: width,
              height: 38,
              backgroundColor: '#1E293B',
              marginRight: idx % 4 === 0 ? 2 : 1,
            }}
          />
        ))}
      </View>
      <Text style={styles.barcodeText}>*{invoiceNumber}*</Text>
    </View>
  );
};

export const ReceiptView: React.FC<ReceiptViewProps> = ({ invoice, settings }) => {
  const currencySymbol = settings.currencySymbol;

  // Format date
  let dateStr = invoice.invoiceDate;
  try {
    const d = new Date(invoice.invoiceDate);
    if (!isNaN(d.getTime())) {
      dateStr = `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  } catch (e) {
    // Fallback
  }

  return (
    <View style={styles.container}>
      <View style={styles.paper}>
        <View style={styles.tearLine} />

        {/* Header */}
        <Text style={styles.storeName}>{settings.storeName.toUpperCase()}</Text>
        {settings.storeAddress ? (
          <Text style={styles.storeDetail}>{settings.storeAddress}</Text>
        ) : null}
        {settings.phoneNumber ? (
          <Text style={styles.storeDetail}>TEL: {settings.phoneNumber}</Text>
        ) : null}

        <View style={styles.tearLine} />

        {/* Invoice Metadata */}
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>Invoice: {invoice.invoiceNumber}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>Date: {dateStr}</Text>
        </View>

        <View style={styles.tearLine} />

        {/* Table Header */}
        <View style={styles.tableHeaderRow}>
          <Text style={[styles.headerCol, styles.colLeft]}>ITEM</Text>
          <Text style={[styles.headerCol, styles.colCenter]}>QTY × PRICE</Text>
          <Text style={[styles.headerCol, styles.colRight]}>TOTAL</Text>
        </View>

        <View style={styles.tearLine} />

        {/* Items */}
        {invoice.items.map((item, index) => {
          const totalStr = formatCurrency(item.product.price * item.quantity, currencySymbol);
          const priceStr = formatCurrency(item.product.price, currencySymbol);
          return (
            <View key={index} style={styles.itemRow}>
              <Text style={[styles.itemText, styles.colLeft]} numberOfLines={2}>
                {item.product.name}
              </Text>
              <Text style={[styles.itemText, styles.colCenter, styles.textMuted]}>
                {item.quantity} × {priceStr}
              </Text>
              <Text style={[styles.itemText, styles.colRight]}>
                {totalStr}
              </Text>
            </View>
          );
        })}

        <View style={styles.tearLine} />

        {/* Summary Totals */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalValue}>{formatCurrency(invoice.subtotal, currencySymbol)}</Text>
        </View>

        {invoice.discount > 0 && (
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, styles.discountText]}>Discount ({invoice.discount}%):</Text>
            <Text style={[styles.totalValue, styles.discountText]}>
              -{formatCurrency(invoice.subtotal * (invoice.discount / 100), currencySymbol)}
            </Text>
          </View>
        )}

        {settings.gstEnabled && invoice.gst > 0 && (
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>GST ({settings.gstPercentage}%):</Text>
            <Text style={styles.totalValue}>{formatCurrency(invoice.gst, currencySymbol)}</Text>
          </View>
        )}

        <View style={styles.tearLine} />

        <View style={[styles.totalRow, styles.grandTotalRow]}>
          <Text style={styles.grandTotalLabel}>GRAND TOTAL:</Text>
          <Text style={styles.grandTotalValue}>{formatCurrency(invoice.total, currencySymbol)}</Text>
        </View>

        <View style={styles.tearLine} />

        {/* Footer messages */}
        {settings.footerMessage ? (
          <Text style={styles.footerText}>{settings.footerMessage}</Text>
        ) : null}
        <Text style={[styles.footerText, styles.thankYou]}>*** THANK YOU ***</Text>

        <View style={styles.tearLine} />

        {/* Barcode */}
        <Barcode invoiceNumber={invoice.invoiceNumber} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12,
    backgroundColor: THEME.colors.background,
  },
  paper: {
    backgroundColor: '#FAFAF7', // Warm cream paper tint
    paddingVertical: 24,
    paddingHorizontal: 20,
    width: '100%',
    maxWidth: 350,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...THEME.shadows.lg,
  },
  storeName: {
    ...Platform.select({
      ios: { fontFamily: 'Courier-Bold' },
      android: { fontFamily: 'monospace', fontWeight: 'bold' },
      default: { fontFamily: 'monospace', fontWeight: 'bold' },
    }),
    fontSize: 16,
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 4,
  },
  storeDetail: {
    ...Platform.select({
      ios: { fontFamily: 'Courier' },
      android: { fontFamily: 'monospace' },
      default: { fontFamily: 'monospace' },
    }),
    fontSize: 12,
    color: '#475569',
    textAlign: 'center',
    marginTop: 2,
  },
  tearLine: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginVertical: 10,
    height: 0,
  },
  metaRow: {
    flexDirection: 'row',
    marginVertical: 1,
  },
  metaText: {
    ...Platform.select({
      ios: { fontFamily: 'Courier' },
      android: { fontFamily: 'monospace' },
      default: { fontFamily: 'monospace' },
    }),
    fontSize: 12,
    color: '#334155',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  headerCol: {
    ...Platform.select({
      ios: { fontFamily: 'Courier-Bold' },
      android: { fontFamily: 'monospace', fontWeight: 'bold' },
      default: { fontFamily: 'monospace', fontWeight: 'bold' },
    }),
    fontSize: 12,
    color: '#0F172A',
  },
  colLeft: {
    flex: 2,
    textAlign: 'left',
  },
  colCenter: {
    flex: 1.8,
    textAlign: 'center',
  },
  colRight: {
    flex: 1.6,
    textAlign: 'right',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  itemText: {
    ...Platform.select({
      ios: { fontFamily: 'Courier' },
      android: { fontFamily: 'monospace' },
      default: { fontFamily: 'monospace' },
    }),
    fontSize: 12,
    color: '#0F172A',
  },
  textMuted: {
    color: '#64748B',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  totalLabel: {
    ...Platform.select({
      ios: { fontFamily: 'Courier' },
      android: { fontFamily: 'monospace' },
      default: { fontFamily: 'monospace' },
    }),
    fontSize: 12,
    color: '#475569',
  },
  totalValue: {
    ...Platform.select({
      ios: { fontFamily: 'Courier' },
      android: { fontFamily: 'monospace' },
      default: { fontFamily: 'monospace' },
    }),
    fontSize: 12,
    color: '#0F172A',
    fontWeight: '700',
  },
  discountText: {
    color: THEME.colors.danger,
  },
  grandTotalRow: {
    marginVertical: 4,
  },
  grandTotalLabel: {
    ...Platform.select({
      ios: { fontFamily: 'Courier-Bold' },
      android: { fontFamily: 'monospace', fontWeight: 'bold' },
      default: { fontFamily: 'monospace', fontWeight: 'bold' },
    }),
    fontSize: 14,
    color: '#0F172A',
  },
  grandTotalValue: {
    ...Platform.select({
      ios: { fontFamily: 'Courier-Bold' },
      android: { fontFamily: 'monospace', fontWeight: 'bold' },
      default: { fontFamily: 'monospace', fontWeight: 'bold' },
    }),
    fontSize: 14,
    color: '#0F172A',
  },
  footerText: {
    ...Platform.select({
      ios: { fontFamily: 'Courier' },
      android: { fontFamily: 'monospace' },
      default: { fontFamily: 'monospace' },
    }),
    fontSize: 11,
    color: '#475569',
    textAlign: 'center',
    marginVertical: 2,
  },
  thankYou: {
    fontWeight: 'bold',
    marginTop: 6,
  },
  barcodeContainer: {
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodeLines: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 38,
    overflow: 'hidden',
  },
  barcodeText: {
    ...Platform.select({
      ios: { fontFamily: 'Courier' },
      android: { fontFamily: 'monospace' },
      default: { fontFamily: 'monospace' },
    }),
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
    letterSpacing: 2,
    fontWeight: '600',
  },
});
