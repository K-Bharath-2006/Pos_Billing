import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useAppSelector } from '../hooks/storeHooks';
import { ReceiptView } from '../components/ReceiptView';
import { PrimaryButton } from '../components/PrimaryButton';
import { THEME } from '../theme/theme';

export const InvoiceDetailScreen = ({ route, navigation }: any) => {
  const { invoice } = route.params;
  const settings = useAppSelector(state => state.settings);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ReceiptView invoice={invoice} settings={settings} />
      </ScrollView>
      <View style={styles.footer}>
        <PrimaryButton
          title="Back to History"
          icon="arrow-left"
          onPress={handleBack}
          style={styles.backButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: THEME.colors.surface,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.borderLight,
    ...THEME.shadows.lg,
  },
  backButton: {
    marginVertical: 0,
  },
});
