import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { InputField } from '@/components/common/InputField';
import { DropdownSelect } from '@/components/common/DropdownSelect';
import { ToggleSwitch } from '@/components/common/ToggleSwitch';
import { BackNextFooter } from '@/components/common/BackNextFooter';
import { ProgressBar } from '@/components/common/ProgressBar';
import { useProfile } from '@/context/ProfileContext';
import { colors } from '@/src/theme/colors';

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

const incomeRanges = [
  { label: 'No income', value: 'none' },
  { label: 'PKR 0 – 50k', value: '0-50k' },
  { label: 'PKR 50k – 100k', value: '50k-100k' },
  { label: 'PKR 100k – 250k', value: '100k-250k' },
  { label: 'PKR 250k – 500k', value: '250k-500k' },
  { label: 'PKR 500k+', value: '500k+' },
  { label: 'Prefer not to say', value: 'private' },
];

const homeOwnershipOptions = [
  { label: 'Rent', value: 'rent' },
  { label: 'Own', value: 'own' },
];

export default function ProfileDetails2Screen() {
  const { profileData, updateProfile } = useProfile();
  const [nationality, setNationality] = useState('');
  const [hasDualNationality, setHasDualNationality] = useState(false);
  const [secondNationality, setSecondNationality] = useState('');
  const [hasPR, setHasPR] = useState(false);
  const [prCountry, setPRCountry] = useState('');
  const [education, setEducation] = useState('');
  const [institution, setInstitution] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [occupation, setOccupation] = useState('');
  const [company, setCompany] = useState('');
  const [incomeRange, setIncomeRange] = useState('');
  const [homeOwnership, setHomeOwnership] = useState('');
  const [livingWithFamily, setLivingWithFamily] = useState(true);

  const handleNext = () => {
    updateProfile({
      nationality,
      dualNationality: hasDualNationality ? secondNationality : null,
      permanentResidence: hasPR ? prCountry : null,
      education: {
        level: education,
        institution,
        fieldOfStudy,
      },
      career: {
        occupation,
        company,
        incomeRange,
      },
      living: {
        homeOwnership,
        withFamily: livingWithFamily,
      },
    });

    router.push('/profile-picture');
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
          <ProgressBar currentStep={5} totalSteps={6} />

          <View style={styles.section}>
            <Text style={styles.title}>What is {possessiveName} nationality?</Text>
            <InputField
              label="Nationality"
              value={nationality}
              onChangeText={setNationality}
              placeholder="e.g., Pakistani"
            />
            <ToggleSwitch
              label="Do they have dual nationality?"
              value={hasDualNationality}
              onToggle={setHasDualNationality}
            />
            {hasDualNationality && (
              <InputField
                label="Second Nationality"
                value={secondNationality}
                onChangeText={setSecondNationality}
                placeholder="e.g., Canadian"
              />
            )}
          </View>

          <View style={styles.section}>
            <ToggleSwitch
              label="Do they have PR/Greencard?"
              value={hasPR}
              onToggle={setHasPR}
            />
            {hasPR && (
              <InputField
                label="PR Country"
                value={prCountry}
                onChangeText={setPRCountry}
                placeholder="e.g., United States"
              />
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Education</Text>
            <DropdownSelect
              label="Highest Education"
              options={educationOptions}
              selected={education}
              onSelect={setEducation}
            />
            <InputField
              label="Institution/University"
              value={institution}
              onChangeText={setInstitution}
              placeholder="e.g., LUMS"
            />
            <InputField
              label="Field of Study"
              value={fieldOfStudy}
              onChangeText={setFieldOfStudy}
              placeholder="e.g., Economics"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Career</Text>
            <InputField
              label="Occupation"
              value={occupation}
              onChangeText={setOccupation}
              placeholder="e.g., Software Engineer"
            />
            <InputField
              label="Company"
              value={company}
              onChangeText={setCompany}
              placeholder="e.g., Tech Corp"
            />
            <DropdownSelect
              label="Monthly Income Range"
              options={incomeRanges}
              selected={incomeRange}
              onSelect={setIncomeRange}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Living Arrangement</Text>
            <DropdownSelect
              label="Home Ownership"
              options={homeOwnershipOptions}
              selected={homeOwnership}
              onSelect={setHomeOwnership}
            />
            <ToggleSwitch
              label="Living with family?"
              value={livingWithFamily}
              onToggle={setLivingWithFamily}
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
  section: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
});