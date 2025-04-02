import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '@/src/theme/colors';

interface ToggleSwitchProps {
  label: string;
  value: boolean;
  onToggle: (value: boolean) => void;
}

export function ToggleSwitch({ label, value, onToggle }: ToggleSwitchProps) {
  const offset = useSharedValue(value ? 22 : 0);

  const toggleAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const onPress = () => {
    const newValue = !value;
    offset.value = withSpring(newValue ? 22 : 0);
    onToggle(newValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        onPress={onPress}
        style={[styles.track, value && styles.trackActive]}>
        <Animated.View style={[styles.thumb, toggleAnimStyle]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  track: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.secondary,
    padding: 2,
  },
  trackActive: {
    backgroundColor: colors.primary,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.card,
    ...Platform.select({
      ios: {
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
      },
    }),
  },
});