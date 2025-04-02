import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { ChevronDown, ChevronUp, MapPin, Ruler, Users, Heart, Briefcase, GraduationCap, Chrome as Home, Globe as Globe2, Quote, Baby, MessageCircle, X } from 'lucide-react-native';
import { colors } from '@/src/theme/colors';
import { capitalize, formatMobilityText, formatIncomeRange, formatLivingArrangement } from '@/src/utils/text';
import { Card } from '@/components/common/Card';

// Sample profiles data
export const sampleProfiles = [
  {
    name: "Ayesha Khan",
    age: 27,
    height: "5'4\"",
    maritalStatus: "Never Married",
    religion: "Islam",
    sect: "Sunni",
    ethnicity: "Punjabi",
    city: "Lahore",
    neighborhood: "DHA",
    openToMovingCity: true,
    openToMovingCountry: false,
    nationality: "Pakistani",
    education: { level: "Master's Degree", institution: "LUMS", field: "Economics" },
    career: { occupation: "Doctor", company: "Shifa Intl.", incomeRange: "PKR 250k-500k" },
    living: { homeOwnership: "Own", livesWithFamily: false },
    hasChildren: true,
    numberOfChildren: 2,
    profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
    mother: {
      isAlive: true,
      maritalStatus: "Married",
      profession: "Homemaker",
      education: "Matric",
      city: "Lahore",
      area: "Model Town",
      photo: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    father: {
      isAlive: true,
      maritalStatus: "Married",
      profession: "Businessman",
      education: "Bachelor's Degree",
      city: "Lahore",
      area: "Model Town",
      photo: "https://randomuser.me/api/portraits/men/65.jpg"
    },
    siblings: [
      {
        gender: "Brother",
        age: 30,
        maritalStatus: "Married",
        profession: "Engineer",
        education: "Bachelor's Degree",
        city: "Islamabad",
        photo: "https://randomuser.me/api/portraits/men/20.jpg"
      }
    ]
  },
  {
    name: "Zainab Ali",
    age: 29,
    height: "5'5\"",
    maritalStatus: "Divorced",
    religion: "Islam",
    sect: "Shia",
    ethnicity: "Syed",
    city: "Karachi",
    neighborhood: "Clifton",
    openToMovingCity: true,
    openToMovingCountry: true,
    nationality: "Pakistani",
    education: { level: "MBBS", institution: "AKU", field: "Medicine" },
    career: { occupation: "Surgeon", company: "AKUH", incomeRange: "PKR 500k+" },
    living: { homeOwnership: "Rent", livesWithFamily: true },
    hasChildren: false,
    profilePicture: "https://randomuser.me/api/portraits/women/22.jpg",
    mother: {
      isAlive: true,
      maritalStatus: "Married",
      profession: "Professor",
      education: "PhD",
      city: "Karachi",
      area: "PECHS",
      photo: "https://randomuser.me/api/portraits/women/66.jpg"
    },
    father: {
      isAlive: false
    },
    siblings: [
      {
        gender: "Sister",
        age: 26,
        maritalStatus: "Never Married",
        profession: "Lawyer",
        education: "Doctorate",
        city: "Lahore",
        photo: "https://randomuser.me/api/portraits/women/50.jpg"
      }
    ]
  },
  {
    name: "Hamza Usman",
    age: 30,
    height: "5'10\"",
    maritalStatus: "Never Married",
    religion: "Islam",
    sect: "Sunni",
    ethnicity: "Pathan",
    city: "Peshawar",
    neighborhood: "Hayatabad",
    openToMovingCity: false,
    openToMovingCountry: true,
    nationality: "Pakistani",
    education: { level: "Bachelor's Degree", institution: "NUST", field: "Engineering" },
    career: { occupation: "Software Engineer", company: "Careem", incomeRange: "PKR 100k-250k" },
    living: { homeOwnership: "Rent", livesWithFamily: false },
    hasChildren: false,
    profilePicture: "https://randomuser.me/api/portraits/men/45.jpg",
    mother: {
      isAlive: false
    },
    father: {
      isAlive: true,
      maritalStatus: "Widowed",
      profession: "Retired Army Officer",
      education: "Master's Degree",
      city: "Peshawar",
      area: "Hayatabad",
      photo: "https://randomuser.me/api/portraits/men/66.jpg"
    },
    siblings: []
  },
  {
    name: "Ali Raza",
    age: 26,
    height: "5'8\"",
    maritalStatus: "Never Married",
    religion: "Islam",
    sect: "Sunni",
    ethnicity: "Urdu Speaking",
    city: "Rawalpindi",
    neighborhood: "Saddar",
    openToMovingCity: true,
    openToMovingCountry: false,
    nationality: "Pakistani",
    education: { level: "Bachelor's Degree", institution: "FAST", field: "Computer Science" },
    career: { occupation: "UI/UX Designer", company: "Systems Ltd.", incomeRange: "PKR 50k-100k" },
    living: { homeOwnership: "Rent", livesWithFamily: true },
    hasChildren: false,
    profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
    mother: {
      isAlive: true,
      maritalStatus: "Married",
      profession: "Lecturer",
      education: "Master's Degree",
      city: "Rawalpindi",
      area: "Satellite Town",
      photo: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    father: {
      isAlive: true,
      maritalStatus: "Married",
      profession: "Civil Engineer",
      education: "Bachelor's Degree",
      city: "Rawalpindi",
      area: "Satellite Town",
      photo: "https://randomuser.me/api/portraits/men/68.jpg"
    },
    siblings: [
      {
        gender: "Brother",
        age: 22,
        maritalStatus: "Never Married",
        profession: "Student",
        education: "Bachelor's Degree",
        city: "Rawalpindi",
        photo: "https://randomuser.me/api/portraits/men/40.jpg"
      },
      {
        gender: "Sister",
        age: 24,
        maritalStatus: "Never Married",
        profession: "Interior Designer",
        education: "Master's Degree",
        city: "Islamabad",
        photo: "https://randomuser.me/api/portraits/women/44.jpg"
      }
    ]
  },
  {
    name: "Fatima Javed",
    age: 31,
    height: "5'6\"",
    maritalStatus: "Widowed",
    religion: "Islam",
    sect: "Sunni",
    ethnicity: "Kashmiri",
    city: "Multan",
    neighborhood: "Cantt",
    openToMovingCity: false,
    openToMovingCountry: false,
    nationality: "Pakistani",
    education: { level: "Doctorate", institution: "Punjab University", field: "Psychology" },
    career: { occupation: "Therapist", company: "Private Practice", incomeRange: "PKR 100k-250k" },
    living: { homeOwnership: "Own", livesWithFamily: false },
    hasChildren: true,
    numberOfChildren: 1,
    profilePicture: "https://randomuser.me/api/portraits/women/60.jpg",
    mother: {
      isAlive: false
    },
    father: {
      isAlive: false
    },
    siblings: []
  }
];

function formatLocation(area?: string, city?: string): string {
  return [area, city].filter(Boolean).join(', ');
}

function SummaryCard({ icon: Icon, title, value }: { 
  icon: any, 
  title: string, 
  value: string 
}) {
  if (!value) return null;
  
  return (
    <Card style={styles.summaryCard}>
      <Icon size={20} color={colors.primary} />
      <Text style={styles.summaryLabel}>{title}</Text>
      <Text style={styles.summaryValue}>{capitalize(value)}</Text>
    </Card>
  );
}

function InfoCard({ icon: Icon, title, value, formatter }: { 
  icon: any, 
  title: string, 
  value: string,
  formatter?: (value: string) => string 
}) {
  if (!value) return null;
  
  const displayValue = formatter ? formatter(value) : capitalize(value);
  
  return (
    <Card style={styles.fullCard}>
      <View style={styles.cardHeader}>
        <Icon size={20} color={colors.primary} />
        <View style={styles.cardContent}>
          <Text style={styles.cardLabel}>{title}</Text>
          <Text style={styles.cardValue}>{displayValue}</Text>
        </View>
      </View>
    </Card>
  );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  const validChildren = React.Children.toArray(children).filter(child => child !== null);
  if (validChildren.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {validChildren}
    </View>
  );
}

function TabButton({ title, isActive, onPress }: { title: string, isActive: boolean, onPress: () => void }) {
  return (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={onPress}
    >
      <Text style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

function EmptyStateCard({ emoji, title, message }: { emoji: string; title: string; message?: string }) {
  return (
    <Card style={styles.emptyStateCard}>
      <Text style={styles.emptyStateEmoji}>{emoji}</Text>
      <Text style={styles.emptyStateTitle}>{title}</Text>
      {message && <Text style={styles.emptyStateMessage}>{message}</Text>}
    </Card>
  );
}

function ParentCard({ parent, type, name }: { parent: any, type: 'mother' | 'father', name: string }) {
  if (!parent) return null;

  const location = formatLocation(parent.area, parent.city);

  return (
    <View style={styles.parentCard}>
      <View style={styles.parentHeader}>
        {parent.photo ? (
          <Image source={{ uri: parent.photo }} style={styles.parentPhoto} />
        ) : (
          <View style={styles.parentPhotoPlaceholder}>
            <Text style={styles.parentPhotoPlaceholderText}>{type[0].toUpperCase()}</Text>
          </View>
        )}
        <View style={styles.parentInfo}>
          <Text style={styles.parentType}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
        </View>
      </View>

      <View style={styles.parentDetails}>
        <InfoCard
          icon={Briefcase}
          title="Occupation"
          value={parent.profession}
        />
        <InfoCard
          icon={Heart}
          title="Marital Status"
          value={parent.maritalStatus}
        />
        <InfoCard
          icon={GraduationCap}
          title="Education"
          value={parent.education}
        />
        <InfoCard
          icon={MapPin}
          title="Location"
          value={location}
        />
      </View>
    </View>
  );
}

function ProfileInfo({ profile, onAction }: { profile: any, onAction: (action: string) => void }) {
  const [expanded, setExpanded] = useState(false);

  const location = formatLocation(profile.neighborhood, profile.city);

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: profile.profilePicture }} 
            style={styles.profileImage}
            resizeMode="cover"
          />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.age}>{profile.age} years</Text>
          </View>
        </View>

        <View style={styles.summaryGrid}>
          <SummaryCard
            icon={MapPin}
            title="Location"
            value={location}
          />
          <SummaryCard
            icon={Ruler}
            title="Height"
            value={profile.height}
          />
          <SummaryCard
            icon={Users}
            title="Ethnicity"
            value={profile.ethnicity}
          />
          <SummaryCard
            icon={Heart}
            title="Religion"
            value={profile.religion ? (profile.sect ? `${profile.religion} - ${profile.sect}` : profile.religion) : ''}
          />
          <SummaryCard
            icon={Heart}
            title="Marital Status"
            value={profile.maritalStatus}
          />
          <SummaryCard
            icon={GraduationCap}
            title="Institution"
            value={profile.education?.institution}
          />
        </View>

        <TouchableOpacity
          style={styles.expandButton}
          onPress={() => setExpanded(!expanded)}
        >
          <Text style={styles.expandButtonText}>
            {expanded ? 'Show Less' : 'Learn More'}
          </Text>
          {expanded ? (
            <ChevronUp size={20} color={colors.primary} />
          ) : (
            <ChevronDown size={20} color={colors.primary} />
          )}
        </TouchableOpacity>

        {expanded && (
          <View style={styles.expandedContent}>
            {/* Education Section */}
            {profile.education && (
              <Section title="Education">
                <InfoCard
                  icon={GraduationCap}
                  title="Degree"
                  value={profile.education.level}
                />
                <InfoCard
                  icon={GraduationCap}
                  title="Institution"
                  value={profile.education.institution}
                />
                <InfoCard
                  icon={GraduationCap}
                  title="Field of Study"
                  value={profile.education.field}
                />
              </Section>
            )}

            {/* Children Section */}
            {profile.hasChildren && (
              <Section title="Children">
                <InfoCard
                  icon={Baby}
                  title="Children"
                  value={profile.numberOfChildren ? `Yes (${profile.numberOfChildren})` : 'Yes'}
                />
              </Section>
            )}

            {/* Career Section */}
            {profile.career && (
              <Section title="Career">
                <InfoCard
                  icon={Briefcase}
                  title="Occupation"
                  value={profile.career.occupation}
                />
                <InfoCard
                  icon={Briefcase}
                  title="Company"
                  value={profile.career.company}
                />
                <InfoCard
                  icon={Briefcase}
                  title="Monthly Income"
                  value={profile.career.incomeRange}
                  formatter={formatIncomeRange}
                />
              </Section>
            )}

            {/* Living Situation Section */}
            {profile.living && (
              <Section title="Living Situation">
                <InfoCard
                  icon={Home}
                  title="Home Ownership"
                  value={profile.living.homeOwnership}
                />
                <InfoCard
                  icon={Home}
                  title="Living Arrangement"
                  value={formatLivingArrangement(profile.living.livesWithFamily)}
                />
              </Section>
            )}

            {/* Location & Mobility Section */}
            <Section title="Location & Mobility">
              <InfoCard
                icon={Globe2}
                title="Open to Moving"
                value={formatMobilityText(
                  profile.openToMovingCity,
                  profile.openToMovingCountry
                )}
              />
            </Section>

            {/* Nationality Section */}
            <Section title="Nationality">
              <InfoCard
                icon={Globe2}
                title="Nationality"
                value={profile.nationality}
              />
            </Section>
          </View>
        )}
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.dislikeButton]}
          onPress={() => onAction('dislike')}
        >
          <X size={24} color={colors.error} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.messageButton]}
          onPress={() => onAction('message')}
        >
          <MessageCircle size={24} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          onPress={() => onAction('like')}
        >
          <Heart size={24} color={colors.success} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function ParentsInfo({ profile }: { profile: any }) {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      {!profile.mother?.isAlive && !profile.father?.isAlive ? (
        <EmptyStateCard
          emoji="💝"
          title="No Parent Information"
          message="Parent details have not been added yet."
        />
      ) : (
        <>
          {!profile.mother?.isAlive && (
            <EmptyStateCard
              emoji="🕊️"
              title={`${profile.name}'s mother is no longer with us`}
              message="Her memory lives on in our hearts"
            />
          )}
          {!profile.father?.isAlive && (
            <EmptyStateCard
              emoji="🕊️"
              title={`${profile.name}'s father is no longer with us`}
              message="His memory lives on in our hearts"
            />
          )}
          {profile.mother?.isAlive && <ParentCard parent={profile.mother} type="mother" name={profile.name} />}
          {profile.father?.isAlive && <ParentCard parent={profile.father} type="father" name={profile.name} />}
        </>
      )}
    </ScrollView>
  );
}

function SiblingsInfo({ profile }: { profile: any }) {
  const hasSiblings = profile.siblings && profile.siblings.length > 0;

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      {!hasSiblings ? (
        <EmptyStateCard
          emoji="⭐"
          title={`${profile.name} is an only child`}
          message="They are the shining star of their family"
        />
      ) : (
        profile.siblings.map((sibling: any, index: number) => (
          <View key={index} style={styles.siblingCard}>
            <View style={styles.siblingHeader}>
              {sibling.photo ? (
                <Image source={{ uri: sibling.photo }} style={styles.siblingPhoto} />
              ) : (
                <View style={styles.siblingPhotoPlaceholder}>
                  <Text style={styles.siblingPhotoPlaceholderText}>
                    {sibling.gender[0]}
                  </Text>
                </View>
              )}
              <View style={styles.siblingInfo}>
                <View style={styles.siblingBadge}>
                  <Text style={styles.siblingBadgeText}>{sibling.gender}</Text>
                </View>
                <Text style={styles.siblingAge}>{sibling.age} years old</Text>
              </View>
            </View>

            <View style={styles.siblingDetails}>
              <InfoCard
                icon={Heart}
                title="Marital Status"
                value={sibling.maritalStatus}
              />
              <InfoCard
                icon={Briefcase}
                title="Profession"
                value={sibling.profession}
              />
              <InfoCard
                icon={GraduationCap}
                title="Education"
                value={sibling.education}
              />
              <InfoCard
                icon={MapPin}
                title="City"
                value={sibling.city}
              />
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

export default function MatchesScreen() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAction = (action: string) => {
    switch (action) {
      case 'like':
      case 'dislike':
        if (currentIndex < sampleProfiles.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
        break;
      case 'message':
        console.log(`Messaging ${sampleProfiles[currentIndex].name}`);
        break;
    }
  };

  const currentProfile = sampleProfiles[currentIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.tabBar}>
        <TabButton
          title="Profile"
          isActive={activeTab === 'Profile'}
          onPress={() => setActiveTab('Profile')}
        />
        <TabButton
          title="Parents"
          isActive={activeTab === 'Parents'}
          onPress={() => setActiveTab('Parents')}
        />
        <TabButton
          title="Siblings"
          isActive={activeTab === 'Siblings'}
          onPress={() => setActiveTab('Siblings')}
        />
      </View>

      {activeTab === 'Profile' && <ProfileInfo profile={currentProfile} onAction={handleAction} />}
      {activeTab === 'Parents' && <ParentsInfo profile={currentProfile} />}
      {activeTab === 'Siblings' && <SiblingsInfo profile={currentProfile} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Extra padding for action buttons
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: colors.primary,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  activeTabButtonText: {
    color: colors.card,
  },
  header: {
    padding: 16,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.card,
    marginBottom: 16,
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  nameContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 8,
  },
  name: {
    color: colors.card,
    fontSize: 20,
    fontWeight: 'bold',
  },
  age: {
    color: colors.card,
    fontSize: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    minWidth: '48%',
    alignItems: 'center',
    padding: 12,
    gap: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.muted,
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  fullCard: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    padding: 12,
    backgroundColor: colors.card,
    borderRadius: 12,
  },
  expandButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  expandedContent: {
    marginTop: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.card,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  likeButton: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.success,
  },
  dislikeButton: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.error,
  },
  messageButton: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  parentCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    margin: 16,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  parentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  parentPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  parentPhotoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentPhotoPlaceholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  parentInfo: {
    marginLeft: 12,
    flex: 1,
  },
  parentType: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  parentDetails: {
    gap: 8,
  },
  siblingCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    margin: 16,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  siblingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  siblingPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  siblingPhotoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  siblingPhotoPlaceholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  siblingInfo: {
    marginLeft: 12,
    flex: 1,
  },
  siblingBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  
  siblingBadgeText: {
    color: colors.card,
    fontSize: 12,
    fontWeight: '600',
  },
  siblingAge: {
    fontSize: 14,
    color: colors.muted,
  },
  siblingDetails: {
    gap: 8,
  },
  emptyStateCard: {
    margin: 16,
    padding: 24,
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  emptyStateEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateMessage: {
    fontSize: 14,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
});