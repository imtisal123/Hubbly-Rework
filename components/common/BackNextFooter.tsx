import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from './Button';
import { colors } from '@/src/theme/colors';

interface BackNextFooterProps {
  onNext?: () => void;
  onBack?: () => void;
  nextTitle?: string;
  backTitle?: string;
  loading?: boolean;
}

export function BackNextFooter({
  onNext,
  onBack,
  nextTitle = 'Next',
  backTitle = 'Back',
  loading = false,
}: BackNextFooterProps) {
  return (
    <View style={styles.container}>
      {onBack && (
        <View style={styles.buttonContainer}>
          <Button
            title={backTitle}
            onPress={onBack}
            variant="secondary"
            disabled={loading}
          />
        </View>
      )}
      {onNext && (
        <View style={styles.buttonContainer}>
          <Button
            title={nextTitle}
            onPress={onNext}
            variant="primary"
            loading={loading}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
});