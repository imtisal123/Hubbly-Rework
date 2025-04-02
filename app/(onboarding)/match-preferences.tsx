import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { Card } from '@/components/common/Card';
import { InputField } from '@/components/common/InputField';
import { DropdownSelect } from '@/components/common/DropdownSelect';
import { BackNextFooter } from '@/components/common/BackNextFooter';
import { ProgressBar } from '@/components/common/ProgressBar';
import { useProfile } from '@/context/ProfileContext';
import { colors } from '@/src/theme/colors';

const ageOptions = Array.from({ length: 41 }, (_, i) => ({
  label: `${i + 18} years`,
  value: `${i + 18}`,
}));

const heightFeetOptions = Array.from({ length: 4 }, (_, i) => ({
  label: `${i + 4} ft`,
  value: `${i + 4}`,
}));

const heightInchesOptions = Array.from({ length: 12 }, (_, i) => ({
  label: `${i} in`,
  value: `${i}`,
}));

const educationOptions = [
  { label: 'Matric', value: 'matric' },
  { label: 'FSc', value: 'fsc' },
  { label: "O'levels", value: 'olevels' },
  { label: 'A Levels', value: 'alevels' },
  { label: "Bachelor's Degree", value: 'bachelors' },
  { label: "Master's Degree", value: 'masters' },
  { label: 'Doctorate', value: 'doctorate' },
  { label: 'MBBS', value: 'mbbs' },
];

const religionOptions = [
  { label: 'Islam', value: 'islam' },
  { label: 'Christianity', value: 'christianity' },
  { label: 'Hinduism', value: 'hinduism' },
  { label: 'Sikhism', value: 'sikhism' },
  { label: 'Buddhism', value: 'buddhism' },
  { label: 'Other', value: 'other' },
];

export default function MatchPreferencesScreen() {
  const { profileData, updateProfile } = useProfile();
  const [minAge, setMinAge] = useState('25');
  const [maxAge, setMaxAge] = useState('35');
  const [minHeightFeet, setMinHeightFeet] = useState('5');
  const [minHeightInches, setMinHeightInches] = useState('0');
  const [maxHeightFeet, setMaxHeightFeet] = useState('6');
  const [maxHeightInches, setMaxHeightInches] = useState('0');
  const [education, setEducation] = useState('');
  const [religion, setReligion] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [location, setLocation] = useState('');

  const handleNext = () => {
    updateProfile({
      matchPreferences: {
        ageRange: {
          min: parseInt(minAge, 10),
          max: parseInt(maxAge, 10),
        },
        heightRange: {
          min: `${minHeightFeet}'${minHeightInches}"`,
          max: `${maxHeightFeet}'${maxHeightInches}"`,
        },
        education,
        religion,
        ethnicity: ethnicity.trim(),
        location: location.trim(),
      },
    });

    router.push('/congrats');
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
          
          <Text style={styles.title}>Match Preferences</Text>
          <Text style={styles.subtitle}>
            Let us know what kind of match you're hoping to find for {possessiveName.toLowerCase().replace("'s", '')}
          </Text>

          <Card style={styles.infoCard}>
            <Heart size={24} color={colors.primary} />
            <Text style={styles.infoText}>
              These preferences help us suggest more compatible matches. All fields are optional and can be updated later.
            </Text>
          </Card>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Age Range</Text>
            <View style={styles.rangeContainer}>
              <View style={styles.rangePicker}>
                <DropdownSelect
                  label="Minimum Age"
                  options={ageOptions}
                  selected={minAge}
                  onSelect={setMinAge}
                />
              </View>
              <View style={styles.rangePicker}>
                <DropdownSelect
                  label="Maximum Age"
                  options={ageOptions}
                  selected={maxAge}
                  onSelect={setMaxAge}
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Height Range</Text>
            <View style={styles.heightSection}>
              <Text style={styles.heightLabel}>Minimum Height</Text>
              <View style={styles.heightContainer}>
                <View style={styles.heightPicker}>
                  <DropdownSelect
                    label="Feet"
                    options={heightFeetOptions}
                    selected={minHeightFeet}
                    onSelect={setMinHeightFeet}
                  />
                </View>
                <View style={styles.heightPicker}>
                  <DropdownSelect
                    label="Inches"
                    options={heightInchesOptions}
                    selected={minHeightInches}
                    onSelect={setMinHeightInches}
                  />
                </View>
              </View>

              <Text style={[styles.heightLabel, styles.marginTop]}>Maximum Height</Text>
              <View style={styles.heightContainer}>
                <View style={styles.heightPicker}>
                  <DropdownSelect
                    label="Feet"
                    options={heightFeetOptions}
                    selected={maxHeightFeet}
                    onSelect={setMaxHeightFeet}
                  />
                </View>
                <View style={styles.heightPicker}>
                  <DropdownSelect
                    label="Inches"
                    options={heightInchesOptions}
                    selected={maxHeightInches}
                    onSelect={setMaxHeightInches}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education & Background</Text>
            <DropdownSelect
              label="Minimum Education Level"
              options={educationOptions}
              selected={education}
              onSelect={setEducation}
            />

            <DropdownSelect
              label="Religion"
              options={religionOptions}
              selected={religion}
              onSelect={setReligion}
            />

            <InputField
              label="Preferred Ethnicity"
              value={ethnicity}
              onChangeText={setEthnicity}
              placeholder="e.g., Punjabi, Sindhi, etc."
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <InputField
              label="Preferred Locations"
              value={location}
              onChangeText={setLocation}
              placeholder="e.g., Lahore, Toronto, London"
              multiline
            />
            <Text style={styles.hint}>
              Enter multiple locations separated by commas
            </Text>
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
  rangeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  rangePicker: {
    flex: 1,
  },
  heightSection: {
    gap: 8,
  },
  heightLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  heightContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  heightPicker: {
    flex: 1,
  },
  marginTop: {
    marginTop: 16,
  },
  hint: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 4,
    marginLeft: 4,
  },
});