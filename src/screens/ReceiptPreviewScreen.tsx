import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useAppSelector } from '../hooks/storeHooks';
import { ReceiptView } from '../components/ReceiptView';
import { PrimaryButton } from '../components/PrimaryButton';
import { THEME } from '../theme/theme';

export const ReceiptPreviewScreen = ({ route, navigation }: any) => {
  const { invoice } = route.params;
  const settings = useAppSelector(state => state.settings);

  const handleDone = () => {
    // Go back or reset the stack
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('BillingMain');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ReceiptView invoice={invoice} settings={settings} />
      </ScrollView>
      <View style={styles.footer}>
        <PrimaryButton
          title="Done & Close"
          icon="check"
          onPress={handleDone}
          style={styles.doneButton}
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
  doneButton: {
    marginVertical: 0,
  },
});
