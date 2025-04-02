import { Tabs } from 'expo-router';
import { Heart, User as User2, Search } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { colors } from '@/src/theme/colors';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: 60 + (insets.bottom || 16),
          paddingBottom: insets.bottom || 16,
          paddingTop: 8,
        },
      }}>
      <Tabs.Screen
        name="profile"
        options={{
          title: 'My Profile',
          tabBarIcon: ({ color, size }) => (
            <User2 size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="criteria"
        options={{
          title: 'Criteria',
          tabBarIcon: ({ color, size }) => (
            <Heart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Find Matches',
          tabBarIcon: ({ color, size }) => (
            <Search size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}