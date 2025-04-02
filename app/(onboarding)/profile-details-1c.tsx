import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { MapPin } from 'lucide-react-native';
import { Card } from '@/components/common/Card';
import { InputField } from '@/components/common/InputField';
import { ToggleSwitch } from '@/components/common/ToggleSwitch';
import { BackNextFooter } from '@/components/common/BackNextFooter';
import { ProgressBar } from '@/components/common/ProgressBar';
import { useProfile } from '@/context/ProfileContext';
import { colors } from '@/src/theme/colors';

export default function ProfileDetails1cScreen() {
  const { profileData, updateProfile } = useProfile();
  const [ethnicity, setEthnicity] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [openToMovingCity, setOpenToMovingCity] = useState(false);
  const [openToMovingCountry, setOpenToMovingCountry] = useState(false);

  const handleNext = () => {
    updateProfile({
      ethnicity: ethnicity.trim(),
      currentCity: currentCity.trim(),
      neighborhood: neighborhood.trim(),
      openToMovingCity,
      openToMovingCountry,
    });

    router.push('/profile-details-2');
  };

  const name = profileData.name || 'their';
  const possessiveName = name === 'their' ? name : name.endsWith('s') ? `${name}'` : `${name}'s`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <ProgressBar currentStep={4} totalSteps={6} />
          
          <Text style={styles.title}>Location & Background</Text>
          <Text style={styles.subtitle}>
            Tell us about {possessiveName.toLowerCase()} location and cultural background
          </Text>

          <Card style={styles.infoCard}>
            <MapPin size={24} color={colors.primary} />
            <Text style={styles.infoText}>
              Location preferences play a crucial role in finding compatible matches. Let us know about their flexibility in relocating.
            </Text>
          </Card>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cultural Background</Text>
            <InputField
              label="Ethnicity"
              value={ethnicity}
              onChangeText={setEthnicity}
              placeholder="e.g., Punjabi, Sindhi, Pashtun"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Location</Text>
            <InputField
              label="City"
              value={currentCity}
              onChangeText={setCurrentCity}
              placeholder="e.g., Lahore"
            />

            <InputField
              label="Area/Neighborhood"
              value={neighborhood}
              onChangeText={setNeighborhood}
              placeholder="e.g., DHA Phase 5"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Relocation Flexibility</Text>
            <View style={styles.toggleContainer}>
              <ToggleSwitch
                label="Open to moving to a different city?"
                value={openToMovingCity}
                onToggle={setOpenToMovingCity}
              />

              <ToggleSwitch
                label="Open to moving to a different country?"
                value={openToMovingCountry}
                onToggle={setOpenToMovingCountry}
              />
            </View>
          </View>
        </ScrollView>

        <BackNextFooter
          onNext={handleNext}
          onBack={() => router.back()}
          nextTitle="Continue"
        />
      </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.muted,
    marginBottom: 24,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    padding: 16,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  toggleContainer: {
    gap: 16,
  },
});