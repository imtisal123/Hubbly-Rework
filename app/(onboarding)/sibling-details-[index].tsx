import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { ImagePlus } from 'lucide-react-native';
import { Card } from '@/components/common/Card';
import { InputField } from '@/components/common/InputField';
import { DropdownSelect } from '@/components/common/DropdownSelect';
import { BackNextFooter } from '@/components/common/BackNextFooter';
import { ProgressBar } from '@/components/common/ProgressBar';
import { useProfile } from '@/context/ProfileContext';
import { colors } from '@/src/theme/colors';

const maritalStatusOptions = [
  { label: 'Never Married', value: 'never_married' },
  { label: 'Married', value: 'married' },
  { label: 'Divorced', value: 'divorced' },
  { label: 'Widowed', value: 'widowed' },
  { label: 'Separated', value: 'separated' },
];

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

export default function SiblingDetailsScreen() {
  const { index } = useLocalSearchParams<{ index: string }>();
  const { profileData, updateProfile } = useProfile();
  const currentIndex = parseInt(index, 10);

  const [age, setAge] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [profession, setProfession] = useState('');
  const [city, setCity] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need gallery permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Failed to pick image. Please try again.');
    }
  };

  const handleBack = () => {
    if (currentIndex === 1) {
      router.push('/sibling-count');
    } else {
      router.push(`/sibling-details-${currentIndex - 1}`);
    }
  };

  const handleNext = () => {
    const siblingData = {
      age: parseInt(age, 10),
      maritalStatus,
      educationLevel,
      profession,
      city,
      photo,
    };

    // Update the siblings array in context
    const currentSiblings = profileData.siblings || [];
    const updatedSiblings = [...currentSiblings];
    updatedSiblings[currentIndex - 1] = siblingData;

    updateProfile({ siblings: updatedSiblings });

    const totalSiblings = (profileData.siblingCounts?.brothers || 0) + 
                         (profileData.siblingCounts?.sisters || 0);

    if (currentIndex < totalSiblings) {
      router.push(`/sibling-details-${currentIndex + 1}`);
    } else {
      router.push('/family-environment');
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
          
          <Text style={styles.title}>Sibling {currentIndex}</Text>
          <Text style={styles.subtitle}>
            Tell us about {possessiveName.toLowerCase()} sibling
          </Text>

          <View style={styles.section}>
            <InputField
              label="Age"
              value={age}
              onChangeText={setAge}
              placeholder="Enter age"
              keyboardType="numeric"
            />

            <DropdownSelect
              label="Marital Status"
              options={maritalStatusOptions}
              selected={maritalStatus}
              onSelect={setMaritalStatus}
            />

            <DropdownSelect
              label="Education Level"
              options={educationOptions}
              selected={educationLevel}
              onSelect={setEducationLevel}
            />

            <InputField
              label="Profession"
              value={profession}
              onChangeText={setProfession}
              placeholder="e.g., Software Engineer"
            />

            <InputField
              label="City of Residence"
              value={city}
              onChangeText={setCity}
              placeholder="e.g., Lahore"
            />
          </View>

          <View style={styles.photoSection}>
            <Text style={styles.photoTitle}>Photo (Optional)</Text>
            
            <View style={styles.imageContainer}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.image} />
              ) : (
                <Card style={styles.placeholderCard}>
                  <ImagePlus size={48} color={colors.muted} />
                  <Text style={styles.placeholderText}>No photo selected</Text>
                </Card>
              )}
            </View>

            <TouchableOpacity
              style={styles.uploadButton}
              onPress={pickImage}
            >
              <Text style={styles.uploadButtonText}>Upload Photo</Text>
            </TouchableOpacity>
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
    marginBottom: 32,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  photoSection: {
    marginBottom: 24,
  },
  photoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  imageContainer: {
    aspectRatio: 1,
    width: '100%',
    maxWidth: 200,
    alignSelf: 'center',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderCard: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    marginTop: 8,
    fontSize: 14,
    color: colors.muted,
  },
  uploadButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
});