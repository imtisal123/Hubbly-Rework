import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileData {
  // Auth data
  auth?: {
    phoneNumber: string;
    password: string;
  };
  
  // Basic profile info
  name?: string;
  relationship?: string;
  parentType?: 'mother' | 'father' | null;
  youAre?: 'brother' | 'sister' | null;
  
  // Detailed profile info
  dateOfBirth?: string;
  gender?: string;
  height?: string;
  
  // Additional personal details
  maritalStatus?: string;
  religion?: string;
  sect?: string | null;
  hasChildren?: boolean;
  numberOfChildren?: number;
  ethnicity?: string;
  currentCity?: string;
  neighborhood?: string;
  openToMovingCity?: boolean;
  openToMovingCountry?: boolean;
  
  // Additional details
  nationality?: string;
  dualNationality?: string | null;
  permanentResidence?: string | null;
  education?: {
    level: string;
    institution: string;
    fieldOfStudy: string;
  };
  career?: {
    occupation: string;
    company: string;
    incomeRange: string;
  };
  living?: {
    homeOwnership: string;
    withFamily: boolean;
  };
  
  // Photo
  photo?: {
    uri: string | null;
    isPrivate: boolean;
  };
  
  // Parent status
  parents?: {
    isFatherAlive: boolean;
    isMotherAlive: boolean;
  };
  
  // Mother's details
  mother?: {
    maritalStatus: string;
    city: string;
    area: string;
    profession: string;
    educationLevel: string;
    photo: string | null;
  };

  // Father's details
  father?: {
    maritalStatus: string;
    city: string;
    area: string;
    profession: string;
    educationLevel: string;
    photo: string | null;
  };

  // Sibling counts
  siblingCounts?: {
    sisters: number;
    brothers: number;
  };

  // Sibling details
  siblings?: Array<{
    age: number;
    maritalStatus: string;
    educationLevel: string;
    profession: string;
    city: string;
    photo: string | null;
  }>;

  // Family environment
  familyEnvironment?: {
    type: string;
    notes: string;
  };

  // Match preferences
  matchPreferences?: {
    ageRange: {
      min: number;
      max: number;
    };
    heightRange: {
      min: string;
      max: string;
    };
    education: string;
    religion: string;
    ethnicity: string;
    location: string;
  };
}

interface ProfileContextType {
  profileData: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profileData, setProfileData] = useState<ProfileData>({});

  const updateProfile = (data: Partial<ProfileData>) => {
    setProfileData(prev => ({ ...prev, ...data }));
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}