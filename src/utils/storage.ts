import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './constants';
import { AppSettings, Invoice } from '../types';

export const saveSettingsToStorage = async (settings: AppSettings): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings to AsyncStorage:', error);
  }
};

export const loadSettingsFromStorage = async (): Promise<AppSettings | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading settings from AsyncStorage:', error);
    return null;
  }
};

export const saveInvoicesToStorage = async (invoices: Invoice[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  } catch (error) {
    console.error('Error saving invoices to AsyncStorage:', error);
  }
};

export const loadInvoicesFromStorage = async (): Promise<Invoice[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.INVOICES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading invoices from AsyncStorage:', error);
    return [];
  }
};
