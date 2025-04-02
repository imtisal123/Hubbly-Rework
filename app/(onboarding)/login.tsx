import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { InputField } from '@/components/common/InputField';
import { Button } from '@/components/common/Button';
import { DropdownSelect } from '@/components/common/DropdownSelect';
import { useProfile } from '@/context/ProfileContext';
import { colors } from '@/src/theme/colors';

const { width } = Dimensions.get('window');
const IMAGE_SIZE = Math.min(width * 0.4, 180);

const countryCodes = [
  { label: '🇺🇸 +1', value: '+1' },
  { label: '🇬🇧 +44', value: '+44' },
  { label: '🇨🇦 +1', value: '+1' },
  { label: '🇦🇺 +61', value: '+61' },
  { label: '🇮🇳 +91', value: '+91' },
  { label: '🇵🇰 +92', value: '+92' },
];

export default function LoginScreen() {
  const { updateProfile } = useProfile();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    setLoading(true);
    
    // Store login credentials in context
    updateProfile({
      auth: {
        phoneNumber: `${countryCode}${phoneNumber}`,
        password,
      }
    });

    setTimeout(() => {
      setLoading(false);
      router.push('/profile-relationship');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=60' }}
            style={[styles.headerImage, { width: IMAGE_SIZE, height: IMAGE_SIZE }]}
          />
          <Text style={styles.title}>Welcome to Hubbly 💞</Text>
          <Text style={styles.subtitle}>Find the perfect match for your loved one</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.phoneContainer}>
            <View style={styles.countryCodeContainer}>
              <DropdownSelect
                label="Code"
                options={countryCodes}
                selected={countryCode}
                onSelect={setCountryCode}
              />
            </View>
            <View style={styles.phoneInputContainer}>
              <InputField
                label="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholder="Enter your phone number"
                autoComplete="tel"
              />
            </View>
          </View>

          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Create a password"
            autoComplete="password-new"
          />

          <Button
            title="Continue"
            onPress={handleContinue}
            loading={loading}
            style={styles.continueButton}
          />
        </View>
      </ScrollView>
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
  contentContainer: {
    padding: 20,
    minHeight: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  headerImage: {
    borderRadius: 90,
    marginBottom: 24,
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
    color: colors.muted,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  phoneContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  countryCodeContainer: {
    flex: 2,
  },
  phoneInputContainer: {
    flex: 5,
  },
  continueButton: {
    marginTop: 24,
  },
});