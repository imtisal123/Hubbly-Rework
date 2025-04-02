import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { InputField } from '@/components/common/InputField';
import { BackNextFooter } from '@/components/common/BackNextFooter';
import { ProgressBar } from '@/components/common/ProgressBar';
import { useProfile } from '@/context/ProfileContext';
import { colors } from '@/src/theme/colors';

export default function ProfileNameScreen() {
  const { profileData, updateProfile } = useProfile();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!name.trim()) {
      setError('Please enter their name');
      return;
    }

    updateProfile({ name: name.trim() });
    router.push('/profile-details-1');
  };

  const relationship = profileData.relationship || 'loved one';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <ProgressBar currentStep={2} totalSteps={4} />
          
          <Text style={styles.title}>What's their name?</Text>
          <Text style={styles.subtitle}>
            Enter the name of your {relationship.toLowerCase()}
          </Text>

          <InputField
            label="Full Name"
            placeholder="Enter their name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (error) setError('');
            }}
            error={error}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleNext}
          />
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
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.muted,
    marginBottom: 24,
  },
});