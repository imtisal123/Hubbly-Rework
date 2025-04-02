import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { BackNextFooter } from '@/components/common/BackNextFooter';
import { ToggleSwitch } from '@/components/common/ToggleSwitch';
import { ProgressBar } from '@/components/common/ProgressBar';
import { useProfile } from '@/context/ProfileContext';
import { colors } from '@/src/theme/colors';

export default function ParentStatusScreen() {
  const { profileData, updateProfile } = useProfile();
  const [isFatherAlive, setIsFatherAlive] = useState(true);
  const [isMotherAlive, setIsMotherAlive] = useState(true);

  const handleNext = () => {
    updateProfile({
      parents: {
        isFatherAlive,
        isMotherAlive,
      },
    });

    // Navigate based on parent status
    if (!isMotherAlive && !isFatherAlive) {
      router.push('/sibling-count');
    } else if (!isMotherAlive) {
      router.push('/father-details');
    } else {
      router.push('/mother-details');
    }
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
          <ProgressBar currentStep={1} totalSteps={4} />
          
          <Text style={styles.title}>Parent Status</Text>
          <Text style={styles.subtitle}>
            Tell us about {possessiveName.toLowerCase()} parents
          </Text>

          <View style={styles.togglesContainer}>
            <ToggleSwitch
              label={`Is ${possessiveName} father alive?`}
              value={isFatherAlive}
              onToggle={setIsFatherAlive}
            />

            <View style={styles.divider} />

            <ToggleSwitch
              label={`Is ${possessiveName} mother alive?`}
              value={isMotherAlive}
              onToggle={setIsMotherAlive}
            />
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
    marginBottom: 32,
  },
  togglesContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
});