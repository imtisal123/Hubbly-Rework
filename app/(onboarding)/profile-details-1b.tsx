import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { BellRing as Ring, Users } from 'lucide-react-native';
import { Card } from '@/components/common/Card';
import { InputField } from '@/components/common/InputField';
import { DropdownSelect } from '@/components/common/DropdownSelect';
import { ToggleSwitch } from '@/components/common/ToggleSwitch';
import { BackNextFooter } from '@/components/common/BackNextFooter';
import { ProgressBar } from '@/components/common/ProgressBar';
import { useProfile } from '@/context/ProfileContext';
import { colors } from '@/src/theme/colors';

const maritalStatusOptions = [
  { label: 'Never Married', value: 'never_married' },
  { label: 'Divorced', value: 'divorced' },
  { label: 'Widowed', value: 'widowed' },
  { label: 'Separated', value: 'separated' },
];

const religionOptions = [
  { label: 'Islam', value: 'islam' },
  { label: 'Christianity', value: 'christianity' },
  { label: 'Hinduism', value: 'hinduism' },
  { label: 'Sikhism', value: 'sikhism' },
  { label: 'Buddhism', value: 'buddhism' },
  { label: 'Other', value: 'other' },
];

export default function ProfileDetails1bScreen() {
  const { profileData, updateProfile } = useProfile();
  const [maritalStatus, setMaritalStatus] = useState('');
  const [religion, setReligion] = useState('');
  const [sect, setSect] = useState('');
  const [hasChildren, setHasChildren] = useState(false);
  const [numberOfChildren, setNumberOfChildren] = useState('');

  const handleNext = () => {
    updateProfile({
      maritalStatus,
      religion,
      sect: religion === 'islam' ? sect : null,
      hasChildren,
      numberOfChildren: hasChildren ? parseInt(numberOfChildren, 10) : 0,
    });

    router.push('/profile-details-1c');
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
          <ProgressBar currentStep={3} totalSteps={6} />
          
          <Text style={styles.title}>Personal Background</Text>
          <Text style={styles.subtitle}>
            Tell us more about {possessiveName.toLowerCase()} background
          </Text>

          <Card style={styles.infoCard}>
            <Ring size={24} color={colors.primary} />
            <Text style={styles.infoText}>
              This information helps us find compatible matches with similar backgrounds and values.
            </Text>
          </Card>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Marital Status</Text>
            <DropdownSelect
              label="Current Marital Status"
              options={maritalStatusOptions}
              selected={maritalStatus}
              onSelect={setMaritalStatus}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Religious Background</Text>
            <DropdownSelect
              label="Religion"
              options={religionOptions}
              selected={religion}
              onSelect={setReligion}
            />

            {religion === 'islam' && (
              <InputField
                label="Islamic Sect"
                value={sect}
                onChangeText={setSect}
                placeholder="e.g., Sunni, Shia"
              />
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Children</Text>
            <View style={styles.childrenContainer}>
              <ToggleSwitch
                label="Do they have children?"
                value={hasChildren}
                onToggle={setHasChildren}
              />

              {hasChildren && (
                <InputField
                  label="Number of Children"
                  value={numberOfChildren}
                  onChangeText={setNumberOfChildren}
                  keyboardType="numeric"
                  placeholder="Enter number of children"
                />
              )}
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
  childrenContainer: {
    gap: 16,
  },
});