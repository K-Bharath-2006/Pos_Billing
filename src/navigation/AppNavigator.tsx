import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME } from '../theme/theme';

import { BillingScreen } from '../screens/BillingScreen';
import { ReceiptPreviewScreen } from '../screens/ReceiptPreviewScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { InvoiceDetailScreen } from '../screens/InvoiceDetailScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

import { useAppSelector } from '../hooks/storeHooks';

const BillingStack = createNativeStackNavigator();

const BillingStackScreen = () => {
  const settings = useAppSelector(state => state.settings);
  return (
    <BillingStack.Navigator>
      <BillingStack.Screen
        name="BillingMain"
        component={BillingScreen}
        options={{ 
          title: settings.storeName || 'POS Billing',
          headerShown: true,
          headerStyle: {
            backgroundColor: THEME.colors.surface,
          },
          headerTitleStyle: {
            fontWeight: '800',
            color: THEME.colors.textPrimary,
            fontSize: 18,
          },
          headerShadowVisible: false,
        }}
      />
      <BillingStack.Screen
        name="ReceiptPreview"
        component={ReceiptPreviewScreen}
        options={{ title: 'Receipt Preview' }}
      />
    </BillingStack.Navigator>
  );
};

const HistoryStack = createNativeStackNavigator();

const HistoryStackScreen = () => {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen
        name="HistoryMain"
        component={HistoryScreen}
        options={{ title: 'Billing History' }}
      />
      <HistoryStack.Screen
        name="InvoiceDetail"
        component={InvoiceDetailScreen}
        options={{ title: 'Invoice Details' }}
      />
    </HistoryStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          if (route.name === 'Billing') {
            iconName = 'calculator';
          } else if (route.name === 'History') {
            iconName = 'history';
          } else if (route.name === 'Settings') {
            iconName = 'cog';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: THEME.colors.primary,
        tabBarInactiveTintColor: THEME.colors.textMuted,
        tabBarStyle: {
          backgroundColor: THEME.colors.surface,
          borderTopColor: THEME.colors.borderLight,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 11,
          marginTop: 2,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Billing" component={BillingStackScreen} />
      <Tab.Screen name="History" component={HistoryStackScreen} />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ 
          headerShown: true, 
          title: 'Store Settings',
          headerStyle: {
            backgroundColor: THEME.colors.surface,
          },
          headerTitleStyle: {
            fontWeight: '800',
            color: THEME.colors.textPrimary,
          },
          headerShadowVisible: false,
        }} 
      />
    </Tab.Navigator>
  );
};
