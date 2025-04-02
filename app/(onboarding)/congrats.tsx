import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { router } from 'expo-router';
import { PartyPopper, ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@/components/common/Button';
import { useProfile } from '@/context/ProfileContext';
import { colors } from '@/src/theme/colors';

export default function CongratsScreen() {
  const { profileData } = useProfile();
  const name = profileData.name || 'their';

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#FFF5F2', '#FFE4E6']}
        style={styles.container}
      >
        <View style={styles.content}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=500&auto=format&fit=crop&q=60' }}
            style={styles.image}
          />
          
          <View style={styles.iconContainer}>
            <PartyPopper size={48} color={colors.primary} />
          </View>

          <Text style={styles.title}>Congratulations!</Text>
          <Text style={styles.subtitle}>
            You've completed {name}'s profile
          </Text>
          
          <View style={styles.messageContainer}>
            <Text style={styles.message}>
              All information has been saved successfully. We'll start looking for potential matches based on your preferences.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="View Profile"
              onPress={() => router.push('/tabs')}
              variant="primary"
            />
            <Button
              title="Edit Preferences"
              onPress={() => router.back()}
              variant="secondary"
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Need help? Contact our support team
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 24,
  },
  iconContainer: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 50,
    marginBottom: 24,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  messageContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    maxWidth: 400,
    width: '100%',
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  message: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 12,
    width: '100%',
    maxWidth: 400,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: colors.muted,
  },
});