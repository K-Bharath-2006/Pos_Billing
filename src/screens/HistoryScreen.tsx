import React, { useState } from 'react';
import { StyleSheet, View, FlatList, ToastAndroid, Platform } from 'react-native';
import { Portal, Dialog, Button, Text } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { InvoiceCard } from '../components/InvoiceCard';
import { EmptyState } from '../components/EmptyState';
import { deleteInvoice } from '../store/invoiceSlice';
import { saveInvoicesToStorage } from '../utils/storage';
import { THEME } from '../theme/theme';

export const HistoryScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { invoiceHistory } = useAppSelector(state => state.invoice);
  const settings = useAppSelector(state => state.settings);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleInvoicePress = (invoice: any) => {
    // Navigate to Detail view (which also displays receipt view)
    navigation.navigate('InvoiceDetail', { invoice });
  };

  const handleDeleteTrigger = (invoiceNumber: string) => {
    setDeleteTarget(invoiceNumber);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const invoiceNumber = deleteTarget;
    setDeleteTarget(null);

    dispatch(deleteInvoice(invoiceNumber));
    const updatedHistory = invoiceHistory.filter(inv => inv.invoiceNumber !== invoiceNumber);
    await saveInvoicesToStorage(updatedHistory);
    
    if (Platform.OS === 'android') {
      ToastAndroid.show(`Invoice ${invoiceNumber} deleted successfully!`, ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={invoiceHistory}
        renderItem={({ item }) => (
          <InvoiceCard
            invoice={item}
            currencySymbol={settings.currencySymbol}
            onPress={() => handleInvoicePress(item)}
            onDelete={() => handleDeleteTrigger(item.invoiceNumber)}
          />
        )}
        keyExtractor={item => item.invoiceNumber}
        ListEmptyComponent={
          <EmptyState
            icon="receipt"
            title="No Invoices Found"
            description="You haven't generated any bills yet. Sales details will be saved here."
          />
        }
        contentContainerStyle={styles.listContent}
      />

      <Portal>
        <Dialog 
          visible={deleteTarget !== null} 
          onDismiss={() => setDeleteTarget(null)}
          style={styles.dialog}
        >
          <Dialog.Title style={styles.dialogTitle}>Delete Invoice</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              Are you sure you want to delete invoice <Text style={styles.boldText}>{deleteTarget}</Text>? This action cannot be undone.
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogActions}>
            <Button 
              onPress={() => setDeleteTarget(null)} 
              textColor={THEME.colors.textSecondary}
              labelStyle={styles.dialogBtnLabel}
            >
              Cancel
            </Button>
            <Button 
              onPress={confirmDelete} 
              textColor={THEME.colors.danger}
              buttonColor={THEME.colors.dangerLight}
              style={styles.deleteConfirmBtn}
              labelStyle={styles.dialogBtnLabel}
            >
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  listContent: {
    paddingVertical: 14,
    flexGrow: 1,
  },
  dialog: {
    backgroundColor: THEME.colors.surface,
    borderRadius: 16,
    paddingVertical: 4,
  },
  dialogTitle: {
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    fontSize: 18,
  },
  dialogText: {
    color: THEME.colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
  },
  dialogActions: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  dialogBtnLabel: {
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  deleteConfirmBtn: {
    borderRadius: 8,
    marginLeft: 8,
    paddingHorizontal: 4,
  },
});
