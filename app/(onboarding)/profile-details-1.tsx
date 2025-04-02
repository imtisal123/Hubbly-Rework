import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, SafeAreaView, Modal } from 'react-native';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { Card } from '@/components/common/Card';
import { BackNextFooter } from '@/components/common/BackNextFooter';
import { ProgressBar } from '@/components/common/ProgressBar';
import { DropdownSelect } from '@/components/common/DropdownSelect';
import { useProfile } from '@/context/ProfileContext';
import { colors } from '@/src/theme/colors';

const genderOptions = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
] as const;

type Gender = (typeof genderOptions)[number]['id'];

const heightFeetOptions = Array.from({ length: 8 }, (_, i) => ({
  label: `${i + 4} ft`,
  value: `${i + 4}`,
}));

const heightInchesOptions = Array.from({ length: 12 }, (_, i) => ({
  label: `${i} in`,
  value: `${i}`,
}));

export default function ProfileDetailsScreen() {
  const { profileData, updateProfile } = useProfile();
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
  const minDate = new Date(1900, 0, 1);
  
  const [date, setDate] = useState(maxDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState<Gender | null>(null);
  const [feet, setFeet] = useState('5');
  const [inches, setInches] = useState('8');

  const handleDateChange = (_: any, selectedDate: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleNext = () => {
    if (!gender) return;

    updateProfile({
      dateOfBirth: date.toISOString(),
      gender,
      height: `${feet}'${inches}"`,
    });

    router.push('/profile-details-1b');
  };

  const name = profileData.name || 'their';
  const possessiveName = name === 'their' ? name : name.endsWith('s') ? `${name}'` : `${name}'s`;
  const formattedDate = format(date, 'MMMM d, yyyy');
  const canContinue = gender !== null;

  const renderDatePicker = () => {
    if (!showDatePicker) return null;

    const pickerContent = (
      <View style={Platform.OS === 'ios' ? styles.pickerContainer : undefined}>
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={maxDate}
          minimumDate={minDate}
          textColor={colors.text}
          style={Platform.OS === 'ios' ? styles.iOSPicker : undefined}
          themeVariant="light"
        />
      </View>
    );

    if (Platform.OS === 'ios') {
      return (
        <Modal
          visible={true}
          transparent
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Date of Birth</Text>
                <Text style={styles.modalSubtitle}>Must be at least 16 years old</Text>
              </View>
              {pickerContent}
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    }

    return pickerContent;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <ProgressBar currentStep={2} totalSteps={6} />
          
          <View style={styles.section}>
            <Text style={styles.title}>When is {possessiveName} birthday?</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.dateButton}
            >
              <Card>
                <Text style={styles.dateButtonText}>{formattedDate}</Text>
              </Card>
            </TouchableOpacity>
            {renderDatePicker()}
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>What is {possessiveName} gender?</Text>
            <View style={styles.genderOptions}>
              {genderOptions.map(({ id, label }) => (
                <TouchableOpacity
                  key={id}
                  style={styles.genderOption}
                  onPress={() => setGender(id)}
                >
                  <Card style={[
                    styles.genderCard,
                    gender === id && styles.selectedGenderCard
                  ]}>
                    <Text style={[
                      styles.genderText,
                      gender === id && styles.selectedGenderText
                    ]}>{label}</Text>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>How tall is {possessiveName.replace("'s", '')}?</Text>
            <View style={styles.heightContainer}>
              <View style={styles.heightPicker}>
                <DropdownSelect
                  label="Feet"
                  options={heightFeetOptions}
                  selected={feet}
                  onSelect={setFeet}
                />
              </View>
              <View style={styles.heightPicker}>
                <DropdownSelect
                  label="Inches"
                  options={heightInchesOptions}
                  selected={inches}
                  onSelect={setInches}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <BackNextFooter
          onNext={canContinue ? handleNext : undefined}
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
  dateButton: {
    width: '100%',
  },
  dateButtonText: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    padding: 12,
  },
  genderOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  genderOption: {
    flex: 1,
  },
  genderCard: {
    padding: 20,
  },
  selectedGenderCard: {
    backgroundColor: colors.primary,
  },
  genderText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
  selectedGenderText: {
    color: colors.card,
    fontWeight: '600',
  },
  heightContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  heightPicker: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 4,
  },
  pickerContainer: {
    backgroundColor: colors.card,
    paddingVertical: 8,
  },
  iOSPicker: {
    height: 200,
    width: '100%',
  },
  doneButton: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  doneButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});