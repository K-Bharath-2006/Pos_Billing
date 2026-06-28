import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { THEME } from '../theme/theme';

interface SettingInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'phone-pad';
  leftIcon?: string;
}

export const SettingInput: React.FC<SettingInputProps> = ({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  keyboardType = 'default',
  leftIcon,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        error={!!error}
        outlineColor={THEME.colors.border}
        activeOutlineColor={THEME.colors.primary}
        outlineStyle={styles.outline}
        style={styles.input}
        textColor={THEME.colors.textPrimary}
        placeholderTextColor={THEME.colors.textMuted}
        left={leftIcon ? <TextInput.Icon icon={leftIcon} size={20} color={() => THEME.colors.textMuted} /> : undefined}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: THEME.colors.surface,
    fontSize: 14,
  },
  outline: {
    borderRadius: 10,
  },
  errorText: {
    color: THEME.colors.danger,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
