import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

interface LoadingViewProps {
  message?: string;
}

export const LoadingView: React.FC<LoadingViewProps> = ({ message = 'Loading...' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1976D2" />
      {message ? (
        <Text variant="bodyMedium" style={styles.message}>
          {message}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  message: {
    marginTop: 12,
    color: '#7F8C8D',
    fontWeight: '500',
  },
});
