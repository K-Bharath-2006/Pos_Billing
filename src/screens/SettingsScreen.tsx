import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, ToastAndroid, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Snackbar, Portal } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { SectionHeader } from '../components/SectionHeader';
import { SettingInput } from '../components/SettingInput';
import { SettingSwitch } from '../components/SettingSwitch';
import { PrimaryButton } from '../components/PrimaryButton';
import { AppSettings } from '../types';
import { THEME } from '../theme/theme';
import {
  setStoreName,
  setStoreAddress,
  setPhoneNumber,
  setGstEnabled,
  setGstPercentage,
  setCurrencySymbol,
  setFooterMessage,
  setAutoPrint,
} from '../store/settingsSlice';
import { saveSettingsToStorage } from '../utils/storage';

export const SettingsScreen = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(state => state.settings);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<AppSettings>({
    defaultValues: settings,
  });

  const gstEnabledWatch = watch('gstEnabled');

  // Reset form values if store settings are loaded asynchronously on startup
  useEffect(() => {
    reset(settings);
  }, [settings, reset]);

  const onSubmit = async (data: AppSettings) => {
    // Dispatch every field separately as requested in specifications
    dispatch(setStoreName(data.storeName));
    dispatch(setStoreAddress(data.storeAddress));
    dispatch(setPhoneNumber(data.phoneNumber));
    dispatch(setGstEnabled(data.gstEnabled));
    dispatch(setGstPercentage(Number(data.gstPercentage)));
    dispatch(setCurrencySymbol(data.currencySymbol));
    dispatch(setFooterMessage(data.footerMessage));
    dispatch(setAutoPrint(data.autoPrint));

    // Save settings directly to storage
    await saveSettingsToStorage(data);
    
    if (Platform.OS === 'android') {
      ToastAndroid.show('Settings saved successfully!', ToastAndroid.SHORT);
    } else {
      setSnackbarVisible(true);
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <SectionHeader title="Store Profile" />
        <View style={styles.sectionCard}>
          <Controller
            control={control}
            name="storeName"
            rules={{
              required: 'Store Name is required',
            }}
            render={({ field: { onChange, value } }) => (
              <SettingInput
                label="Store Name *"
                value={value}
                onChangeText={onChange}
                placeholder="e.g. My Retail Shop"
                leftIcon="store"
                error={errors.storeName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="storeAddress"
            render={({ field: { onChange, value } }) => (
              <SettingInput
                label="Store Address"
                value={value}
                onChangeText={onChange}
                placeholder="e.g. 123 Main St, City"
                leftIcon="map-marker"
              />
            )}
          />

          <Controller
            control={control}
            name="phoneNumber"
            rules={{
              pattern: {
                value: /^\+?[0-9]{10,14}$/,
                message: 'Enter a valid phone number (10-14 digits)',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <SettingInput
                label="Phone Number"
                value={value}
                onChangeText={onChange}
                placeholder="e.g. 9876543210"
                keyboardType="phone-pad"
                leftIcon="phone"
                error={errors.phoneNumber?.message}
              />
            )}
          />
        </View>

        <SectionHeader title="Tax & Currency" />
        <View style={styles.sectionCard}>
          <Controller
            control={control}
            name="gstEnabled"
            render={({ field: { onChange, value } }) => (
              <SettingSwitch
                label="Enable GST Tax"
                description="Calculate GST tax on invoices"
                value={value}
                onValueChange={onChange}
              />
            )}
          />

          {gstEnabledWatch && (
            <Controller
              control={control}
              name="gstPercentage"
              rules={{
                required: 'GST percentage is required when tax is enabled',
                min: { value: 0, message: 'GST cannot be negative' },
                max: { value: 100, message: 'GST cannot exceed 100%' },
              }}
              render={({ field: { onChange, value } }) => (
                <SettingInput
                  label="GST Percentage (%) *"
                  value={value.toString()}
                  onChangeText={(text) => onChange(text ? parseFloat(text) : '')}
                  keyboardType="numeric"
                  placeholder="18"
                  leftIcon="percent"
                  error={errors.gstPercentage?.message}
                />
              )}
            />
          )}

          <Controller
            control={control}
            name="currencySymbol"
            rules={{
              required: 'Currency symbol is required',
            }}
            render={({ field: { onChange, value } }) => (
              <SettingInput
                label="Currency Symbol *"
                value={value}
                onChangeText={onChange}
                placeholder="e.g. ₹ or $"
                leftIcon="currency-usd"
                error={errors.currencySymbol?.message}
              />
            )}
          />
        </View>

        <SectionHeader title="Receipt Format" />
        <View style={styles.sectionCard}>
          <Controller
            control={control}
            name="footerMessage"
            render={({ field: { onChange, value } }) => (
              <SettingInput
                label="Receipt Footer Message"
                value={value}
                onChangeText={onChange}
                placeholder="e.g. Thank you for shopping with us!"
                leftIcon="message-text-outline"
              />
            )}
          />

          <Controller
            control={control}
            name="autoPrint"
            render={({ field: { onChange, value } }) => (
              <SettingSwitch
                label="Auto Print"
                description="Trigger automatic printing upon billing"
                value={value}
                onValueChange={onChange}
              />
            )}
          />
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Save Settings"
            icon="content-save"
            onPress={handleSubmit(onSubmit)}
            disabled={!isDirty && Object.keys(errors).length === 0}
          />
        </View>
      </ScrollView>

      <Portal>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={styles.snackbar}
          action={{
            label: 'Dismiss',
            onPress: () => setSnackbarVisible(false),
            textColor: '#FFFFFF',
          }}
        >
          Settings saved successfully!
        </Snackbar>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 32,
    paddingTop: 8,
  },
  sectionCard: {
    backgroundColor: THEME.colors.surface,
    borderRadius: 14,
    padding: 10,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
    ...THEME.shadows.sm,
  },
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 4,
  },
  snackbar: {
    backgroundColor: THEME.colors.success,
    borderRadius: 12,
    marginBottom: 20,
    marginHorizontal: 16,
  },
});
