import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Users } from 'lucide-react-native';
import { Card } from '@/components/common/Card';
import { DropdownSelect } from '@/components/common/DropdownSelect';
import { BackNextFooter } from '@/components/common/BackNextFooter';
import { ProgressBar } from '@/components/common/ProgressBar';
import { useProfile } from '@/context/ProfileContext';
import { colors } from '@/src/theme/colors';

const countOptions = Array.from({ length: 8 }, (_, i) => ({
  label: i === 0 ? 'None' : `${i}`,
  value: `${i}`,
}));

export default function SiblingCountScreen() {
  const { profileData, updateProfile } = useProfile();
  const [sisters, setSisters] = useState('0');
  const [brothers, setBrothers] = useState('0');

  const handleBack = () => {
    const { parents } = profileData;
    if (parents?.isFatherAlive) {
      router.push('/father-details');
    } else if (parents?.isMotherAlive) {
      router.push('/mother-details');
    } else {
      router.push('/parent-status');
    }
  };

  const handleNext = () => {
    const sistersCount = parseInt(sisters, 10);
    const brothersCount = parseInt(brothers, 10);
    
    updateProfile({
      siblingCounts: {
        sisters: sistersCount,
        brothers: brothersCount,
      },
      // Initialize an empty array for siblings if there are any
      siblings: sistersCount + brothersCount > 0 ? [] : undefined,
    });

    // Navigate to first sibling details screen if there are siblings
    if (sistersCount + brothersCount > 0) {
      router.push('/sibling-details/1');
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
          
          <Text style={styles.title}>Sibling Information</Text>
          <Text style={styles.subtitle}>
            Tell us about {possessiveName.toLowerCase()} siblings
          </Text>

          <Card style={styles.infoCard}>
            <Users size={24} color={colors.primary} />
            <Text style={styles.infoText}>
              Please select the number of brothers and sisters. We'll collect details for each sibling in the next steps.
            </Text>
          </Card>

          <View style={styles.section}>
            <DropdownSelect
              label="Number of Sisters"
              options={countOptions}
              selected={sisters}
              onSelect={setSisters}
            />

            <DropdownSelect
              label="Number of Brothers"
              options={countOptions}
              selected={brothers}
              onSelect={setBrothers}
            />

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total Siblings:</Text>
              <Text style={styles.totalCount}>
                {parseInt(sisters, 10) + parseInt(brothers, 10)}
              </Text>
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
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  totalCount: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
});