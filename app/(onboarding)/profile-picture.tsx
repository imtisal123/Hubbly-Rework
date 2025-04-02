import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Camera, ImagePlus } from 'lucide-react-native';
import { Card } from '@/components/common/Card';
import { BackNextFooter } from '@/components/common/BackNextFooter';
import { ToggleSwitch } from '@/components/common/ToggleSwitch';
import { useProfile } from '@/context/ProfileContext';
import { colors } from '@/src/theme/colors';

export default function ProfilePictureScreen() {
  const { profileData, updateProfile } = useProfile();
  const [image, setImage] = useState<string | null>(null);
  const [privatePhotos, setPrivatePhotos] = useState(true);

  const pickImage = async (useCamera: boolean) => {
    try {
      // Request permissions first
      if (useCamera) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
          return;
        }
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need gallery permissions to make this work!');
          return;
        }
      }

      // Launch camera or gallery
      const result = await (useCamera
        ? ImagePicker.launchCameraAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
          })
        : ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
          }));

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Failed to pick image. Please try again.');
    }
  };

  const handleNext = () => {
    updateProfile({
      photo: {
        uri: image,
        isPrivate: privatePhotos,
      },
    });
    router.push('/parent-status');
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
          <Text style={styles.title}>Add {possessiveName} photo</Text>
          <Text style={styles.subtitle}>
            Add a clear photo that shows {possessiveName.toLowerCase().replace("'s", '')} face
          </Text>

          <View style={styles.imageContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Card style={styles.placeholderCard}>
                <ImagePlus size={48} color={colors.muted} />
                <Text style={styles.placeholderText}>No photo selected</Text>
              </Card>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cameraButton]}
              onPress={() => pickImage(true)}
            >
              <Camera size={24} color={colors.card} />
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.galleryButton]}
              onPress={() => pickImage(false)}
            >
              <ImagePlus size={24} color={colors.primary} />
              <Text style={[styles.buttonText, styles.galleryButtonText]}>
                Choose from Gallery
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.privacySection}>
            <ToggleSwitch
              label="Only show photos to matches"
              value={privatePhotos}
              onToggle={setPrivatePhotos}
            />
            <Text style={styles.privacyNote}>
              When enabled, only matched profiles will be able to see the photos
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
    paddingBottom: 100, // Add padding to ensure content isn't hidden by footer
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
  imageContainer: {
    aspectRatio: 1,
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
    marginBottom: 24,
    borderRadius: 16,
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
    backgroundColor: colors.card,
  },
  placeholderText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.muted,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  cameraButton: {
    backgroundColor: colors.primary,
  },
  galleryButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
  galleryButtonText: {
    color: colors.primary,
  },
  privacySection: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  privacyNote: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 8,
    marginLeft: 8,
  },
});