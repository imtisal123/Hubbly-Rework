import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { Card } from '@/components/common/Card';
import { InputField } from '@/components/common/InputField';
import { BackNextFooter } from '@/components/common/BackNextFooter';
import { ProgressBar } from '@/components/common/ProgressBar';
import { useProfile } from '@/context/ProfileContext';
import { colors } from '@/src/theme/colors';

const relationships = [
  { id: 'son', label: 'Son' },
  { id: 'daughter', label: 'Daughter' },
  { id: 'brother', label: 'Brother' },
  { id: 'sister', label: 'Sister' },
  { id: 'other', label: 'Other' },
] as const;

type Relationship = (typeof relationships)[number]['id'];
type ParentType = 'mother' | 'father';
type SiblingType = 'brother' | 'sister';

export default function ProfileRelationshipScreen() {
  const { updateProfile } = useProfile();
  const [relationship, setRelationship] = useState<Relationship | null>(null);
  const [customRelationship, setCustomRelationship] = useState('');
  const [parentType, setParentType] = useState<ParentType | null>(null);
  const [siblingType, setSiblingType] = useState<SiblingType | null>(null);

  const handleNext = () => {
    if (!relationship) return;

    updateProfile({
      relationship: relationship === 'other' ? customRelationship : relationship,
      parentType: parentType,
      youAre: siblingType,
    });

    router.push('/profile-name');
  };

  const isChild = relationship === 'son' || relationship === 'daughter';
  const isSibling = relationship === 'brother' || relationship === 'sister';
  const canContinue = relationship && 
    ((!isChild && !isSibling) || (isChild && parentType) || (isSibling && siblingType)) && 
    (relationship !== 'other' || customRelationship.trim().length > 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <ProgressBar currentStep={1} totalSteps={4} />
          
          <Text style={styles.title}>Who are you creating this profile for?</Text>
          <Text style={styles.subtitle}>Select your relationship with them</Text>

          <View style={styles.optionsContainer}>
            {relationships.map(({ id, label }) => (
              <TouchableOpacity
                key={id}
                onPress={() => {
                  setRelationship(id);
                  if (!isChild) setParentType(null);
                  if (!isSibling) setSiblingType(null);
                }}
              >
                <Card style={[
                  styles.optionCard,
                  relationship === id && styles.selectedCard
                ]}>
                  <Text style={[
                    styles.optionText,
                    relationship === id && styles.selectedText
                  ]}>{label}</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>

          {relationship === 'other' && (
            <InputField
              label="Specify relationship"
              placeholder="e.g., Cousin, Friend"
              value={customRelationship}
              onChangeText={setCustomRelationship}
            />
          )}

          {isChild && (
            <View style={styles.parentSection}>
              <Text style={styles.sectionTitle}>You are their:</Text>
              <View style={styles.parentOptions}>
                {(['mother', 'father'] as const).map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setParentType(type)}
                  >
                    <Card style={[
                      styles.optionCard,
                      parentType === type && styles.selectedCard
                    ]}>
                      <Text style={[
                        styles.optionText,
                        parentType === type && styles.selectedText
                      ]}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                    </Card>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {isSibling && (
            <View style={styles.parentSection}>
              <Text style={styles.sectionTitle}>You are their:</Text>
              <View style={styles.parentOptions}>
                {(['brother', 'sister'] as const).map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setSiblingType(type)}
                  >
                    <Card style={[
                      styles.optionCard,
                      siblingType === type && styles.selectedCard
                    ]}>
                      <Text style={[
                        styles.optionText,
                        siblingType === type && styles.selectedText
                      ]}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                    </Card>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
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
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  optionCard: {
    padding: 20,
  },
  selectedCard: {
    backgroundColor: colors.primary,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
  selectedText: {
    color: colors.card,
    fontWeight: '600',
  },
  parentSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  parentOptions: {
    flexDirection: 'row',
    gap: 12,
  },
});