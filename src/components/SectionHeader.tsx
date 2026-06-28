import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { THEME } from '../theme/theme';

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.accentBar} />
      <Text variant="titleMedium" style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 12,
  },
  accentBar: {
    width: 4,
    height: 16,
    borderRadius: 2,
    backgroundColor: THEME.colors.primary,
    marginRight: 8,
  },
  title: {
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    letterSpacing: 0.3,
    fontSize: 15,
  },
});
