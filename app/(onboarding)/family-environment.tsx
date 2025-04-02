import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Chrome as Home } from 'lucide-react-native';
import { Card } from '@/components/common/Card';
import { DropdownSelect } from '@/components/common/DropdownSelect';
import { BackNextFooter } from '@/components/common/BackNextFooter';
import { ProgressBar } from '@/components/common/ProgressBar';
import { useProfile } from '@/context/ProfileContext';
import { colors } from '@/src/theme/colors';

const environmentOptions = [
  { label: 'Liberal', value: 'liberal' },
  { label: 'Moderate', value: 'moderate' },
  { label: 'Conservative', value: 'conservative' },
];

export default function FamilyEnvironmentScreen() {
  const { profileData, updateProfile } = useProfile();
  const [environmentType, setEnvironmentType] = useState('');
  const [notes, setNotes] = useState('');

  const handleNext = () => {
    updateProfile({
      familyEnvironment: {
        type: environmentType,
        notes: notes.trim(),
      },
    });

    router.push('/match-preferences');
  };

  const handleBack = () => {
    const totalSiblings = (profileData.siblingCounts?.brothers || 0) + 
                         (profileData.siblingCounts?.sisters || 0);
    
    if (totalSiblings > 0) {
      // Navigate to the last sibling's details
      router.push(`/sibling-details/${totalSiblings}`);
    } else {
      router.push('/sibling-count');
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
          <ProgressBar currentStep={4} totalSteps={4} />
          
          <Text style={styles.title}>Family Environment</Text>
          <Text style={styles.subtitle}>
            Tell us a bit about the environment {possessiveName.toLowerCase()} was raised in
          </Text>

          <Card style={styles.infoCard}>
            <Home size={24} color={colors.primary} />
            <Text style={styles.infoText}>
              Understanding the family environment helps us find better matches with similar values and backgrounds.
            </Text>
          </Card>

          <View style={styles.section}>
            <DropdownSelect
              label="Family Environment Type"
              options={environmentOptions}
              selected={environmentType}
              onSelect={setEnvironmentType}
            />

            <View style={styles.notesContainer}>
              <Text style={styles.notesLabel}>Additional Notes (Optional)</Text>
              <Text style={styles.notesHint}>
                Is there anything else you would like to add about the family environment?
              </Text>
              <TextInput
                style={styles.notesInput}
                value={notes}
                onChangeText={setNotes}
                placeholder="Share any additional details about the family environment..."
                placeholderTextColor={colors.muted}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>
        </ScrollView>

        <BackNextFooter
          onNext={handleNext}
          onBack={handleBack}
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
  },
  notesContainer: {
    marginTop: 24,
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  notesHint: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 12,
  },
  notesInput: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    minHeight: 120,
    fontSize: 16,
    color: colors.text,
    textAlignVertical: 'top',
  },
});