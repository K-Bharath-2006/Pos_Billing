import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME } from '../theme/theme';

interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Icon name={icon} size={64} color={THEME.colors.textMuted} />
      <Text variant="titleMedium" style={styles.title}>
        {title}
      </Text>
      {description ? (
        <Text variant="bodyMedium" style={styles.description}>
          {description}
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
    backgroundColor: 'transparent',
    padding: 24,
    minHeight: 250,
  },
  title: {
    marginTop: 16,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  description: {
    marginTop: 8,
    color: THEME.colors.textSecondary,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
});
