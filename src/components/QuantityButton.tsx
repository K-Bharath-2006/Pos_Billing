import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME } from '../theme/theme';

interface QuantityButtonProps {
  icon: string; // e.g. "plus", "minus"
  onPress: () => void;
  disabled?: boolean;
  color?: string;
  size?: number;
}

export const QuantityButton: React.FC<QuantityButtonProps> = ({
  icon,
  onPress,
  disabled = false,
  color = THEME.colors.primary,
  size = 18,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabled,
        { borderColor: disabled ? THEME.colors.borderLight : color },
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Icon name={icon} size={size} color={disabled ? THEME.colors.textMuted : color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1.5,
    borderRadius: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.surface,
  },
  disabled: {
    borderColor: THEME.colors.borderLight,
    backgroundColor: THEME.colors.background,
  },
});
