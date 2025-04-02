import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
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
  { label: 'Married', value: 'married' },
  { label: 'Never Married', value: 'never_married' },
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

export default function FatherDetailsScreen() {
  const { profileData, updateProfile } = useProfile();
  const [maritalStatus, setMaritalStatus] = useState(profileData.father?.maritalStatus || '');
  const [city, setCity] = useState(profileData.father?.city || '');
  const [area, setArea] = useState(profileData.father?.area || '');
  const [profession, setProfession] = useState(profileData.father?.profession || '');
  const [educationLevel, setEducationLevel] = useState(profileData.father?.educationLevel || '');
  const [photo, setPhoto] = useState<string | null>(profileData.father?.photo || null);

  const updateFatherData = (field: string, value: any) => {
    updateProfile({
      father: {
        ...profileData.father,
        [field]: value,
      },
    });
  };

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
        const newPhoto = result.assets[0].uri;
        setPhoto(newPhoto);
        updateFatherData('photo', newPhoto);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Failed to pick image. Please try again.');
    }
  };

  const handleNext = () => {
    const fatherData = {
      maritalStatus,
      city,
      area,
      profession,
      educationLevel,
      photo,
    };

    updateProfile({
      father: fatherData,
    });

    router.push('/sibling-count');
  };

  const handleBack = () => {
    const { parents } = profileData;
    if (parents?.isMotherAlive) {
      router.push('/mother-details');
    } else {
      router.push('/parent-status');
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
          <ProgressBar currentStep={3} totalSteps={4} />
          
          <Text style={styles.title}>Father's Details</Text>
          <Text style={styles.subtitle}>
            Tell us about {possessiveName.toLowerCase()} father
          </Text>

          <View style={styles.section}>
            <DropdownSelect
              label="Marital Status"
              options={maritalStatusOptions}
              selected={maritalStatus}
              onSelect={(value) => {
                setMaritalStatus(value);
                updateFatherData('maritalStatus', value);
              }}
            />

            <InputField
              label="City of Residence"
              value={city}
              onChangeText={(value) => {
                setCity(value);
                updateFatherData('city', value);
              }}
              placeholder="e.g., Lahore"
            />

            <InputField
              label="Area"
              value={area}
              onChangeText={(value) => {
                setArea(value);
                updateFatherData('area', value);
              }}
              placeholder="e.g., DHA Phase 5"
            />

            <InputField
              label="Profession"
              value={profession}
              onChangeText={(value) => {
                setProfession(value);
                updateFatherData('profession', value);
              }}
              placeholder="e.g., Engineer"
            />

            <DropdownSelect
              label="Education Level"
              options={educationOptions}
              selected={educationLevel}
              onSelect={(value) => {
                setEducationLevel(value);
                updateFatherData('educationLevel', value);
              }}
            />
          </View>

          <View style={styles.photoSection}>
            <Text style={styles.photoTitle}>Father's Photo (Optional)</Text>
            
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