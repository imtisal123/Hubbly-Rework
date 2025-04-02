import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Heart, Save } from 'lucide-react-native';
import { Card } from '@/components/common/Card';
import { InputField } from '@/components/common/InputField';
import { DropdownSelect } from '@/components/common/DropdownSelect';
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

export default function CriteriaScreen() {
  const { profileData, updateProfile } = useProfile();
  const preferences = profileData.matchPreferences || {
    ageRange: { min: 25, max: 35 },
    heightRange: { min: "5'6\"", max: "6'0\"" },
    education: '',
    religion: '',
    ethnicity: '',
    location: '',
  };

  const [minAge, setMinAge] = useState(preferences.ageRange.min.toString());
  const [maxAge, setMaxAge] = useState(preferences.ageRange.max.toString());
  
  const [minHeightFeet, setMinHeightFeet] = useState(preferences.heightRange.min.split("'")[0]);
  const [minHeightInches, setMinHeightInches] = useState(preferences.heightRange.min.split("'")[1].replace('"', ''));
  const [maxHeightFeet, setMaxHeightFeet] = useState(preferences.heightRange.max.split("'")[0]);
  const [maxHeightInches, setMaxHeightInches] = useState(preferences.heightRange.max.split("'")[1].replace('"', ''));
  
  const [education, setEducation] = useState(preferences.education);
  const [religion, setReligion] = useState(preferences.religion);
  const [ethnicity, setEthnicity] = useState(preferences.ethnicity);
  const [location, setLocation] = useState(preferences.location);

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const updatedPreferences = {
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
    };

    updateProfile({
      matchPreferences: updatedPreferences,
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Match Criteria</Text>
          <Text style={styles.subtitle}>Set your preferences for potential matches</Text>
        </View>

        <Card style={styles.infoCard}>
          <Heart size={24} color={colors.primary} />
          <Text style={styles.infoText}>
            These preferences help us find more compatible matches. You can update them anytime.
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

      <TouchableOpacity
        style={[styles.saveButton, saved && styles.savedButton]}
        onPress={handleSave}
        disabled={saved}
      >
        {saved ? (
          <Text style={styles.saveButtonText}>✓ Saved</Text>
        ) : (
          <>
            <Save size={20} color={colors.card} />
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 0,
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
    marginBottom: 16,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    margin: 16,
    marginTop: 0,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  section: {
    backgroundColor: colors.card,
    margin: 16,
    marginBottom: 0,
    padding: 16,
    borderRadius: 12,
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
  saveButton: {
    backgroundColor: colors.primary,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  savedButton: {
    backgroundColor: colors.success,
  },
  saveButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
});