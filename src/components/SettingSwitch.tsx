import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import { THEME } from '../theme/theme';

interface SettingSwitchProps {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const SettingSwitch: React.FC<SettingSwitchProps> = ({
  label,
  description,
  value,
  onValueChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      <Switch value={value} onValueChange={onValueChange} color={THEME.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.borderLight,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  description: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
});
