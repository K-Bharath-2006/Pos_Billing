import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { THEME } from '../theme/theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  color?: string;
  style?: ViewStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  icon,
  color = THEME.colors.primary,
  style,
}) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      icon={icon}
      buttonColor={color}
      textColor="#FFFFFF"
      style={[styles.button, style]}
      labelStyle={styles.label}
      contentStyle={styles.content}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    marginVertical: 8,
    ...THEME.shadows.md,
  },
  content: {
    height: 52,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
