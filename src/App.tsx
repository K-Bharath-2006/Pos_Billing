import React, { useEffect, useState } from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './store';
import { AppNavigator } from './navigation/AppNavigator';
import { loadSettingsFromStorage, loadInvoicesFromStorage } from './utils/storage';
import { setAllSettings } from './store/settingsSlice';
import { loadInvoices } from './store/invoiceSlice';
import { LoadingView } from './components/LoadingView';

const AppContent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Load settings from AsyncStorage
        const savedSettings = await loadSettingsFromStorage();
        if (savedSettings) {
          store.dispatch(setAllSettings(savedSettings));
        }

        // Load invoices from AsyncStorage
        const savedInvoices = await loadInvoicesFromStorage();
        if (savedInvoices) {
          store.dispatch(loadInvoices(savedInvoices));
        }
      } catch (error) {
        console.error('Error during app initialization:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (loading) {
    return <LoadingView message="Initializing POS System..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <AppContent />
      </PaperProvider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
