import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { useProfile } from '@/context/ProfileContext';
import { ChevronDown, ChevronUp, MapPin, Ruler, Users, Heart, Briefcase, GraduationCap, Chrome as Home, Globe as Globe2, Quote, Baby } from 'lucide-react-native';
import { colors } from '@/src/theme/colors';
import { capitalize, formatMobilityText, formatIncomeRange, formatLivingArrangement } from '@/src/utils/text';
import { Card } from '@/components/common/Card';

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

function ProfileInfo() {
  const { profileData } = useProfile();
  const [expanded, setExpanded] = useState(false);

  const getBadgeText = () => {
    if (profileData.youAre === 'brother') return 'Brother Managed Profile';
    if (profileData.youAre === 'sister') return 'Sister Managed Profile';
    if (profileData.parentType === 'mother') return 'Mother Managed Profile';
    if (profileData.parentType === 'father') return 'Father Managed Profile';
    return 'Family Managed Profile';
  };

  const getAge = () => {
    if (!profileData.dateOfBirth) return '';
    const birthDate = new Date(profileData.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };

  const location = formatLocation(profileData.neighborhood, profileData.currentCity);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            {profileData.photo?.uri ? (
              <Image 
                source={{ uri: profileData.photo.uri }} 
                style={styles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.profileImage, styles.placeholderImage]}>
                <Text style={styles.placeholderText}>
                  {profileData.name?.[0]?.toUpperCase() || '?'}
                </Text>
              </View>
            )}
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{profileData.name}</Text>
              <Text style={styles.age}>{getAge()} years</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{getBadgeText()}</Text>
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
              value={profileData.height || ''}
            />
            <SummaryCard
              icon={Users}
              title="Ethnicity"
              value={profileData.ethnicity || ''}
            />
            <SummaryCard
              icon={Heart}
              title="Religion"
              value={profileData.religion ? (profileData.sect ? `${profileData.religion} - ${profileData.sect}` : profileData.religion) : ''}
            />
            <SummaryCard
              icon={Heart}
              title="Marital Status"
              value={profileData.maritalStatus || ''}
            />
            <SummaryCard
              icon={GraduationCap}
              title="Institution"
              value={profileData.education?.institution || ''}
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
              {profileData.education && (
                <Section title="Education">
                  <InfoCard
                    icon={GraduationCap}
                    title="Degree"
                    value={profileData.education.level}
                  />
                  <InfoCard
                    icon={GraduationCap}
                    title="Institution"
                    value={profileData.education.institution}
                  />
                  <InfoCard
                    icon={GraduationCap}
                    title="Field of Study"
                    value={profileData.education.fieldOfStudy}
                  />
                </Section>
              )}

              {/* Children Section */}
              {profileData.hasChildren && (
                <Section title="Children">
                  <InfoCard
                    icon={Baby}
                    title="Children"
                    value={profileData.numberOfChildren ? `Yes (${profileData.numberOfChildren})` : 'Yes'}
                  />
                </Section>
              )}

              {/* Career Section */}
              {profileData.career && (
                <Section title="Career">
                  <InfoCard
                    icon={Briefcase}
                    title="Occupation"
                    value={profileData.career.occupation}
                  />
                  <InfoCard
                    icon={Briefcase}
                    title="Company"
                    value={profileData.career.company}
                  />
                  <InfoCard
                    icon={Briefcase}
                    title="Monthly Income"
                    value={profileData.career.incomeRange}
                    formatter={formatIncomeRange}
                  />
                </Section>
              )}

              {/* Living Situation Section */}
              {profileData.living && (
                <Section title="Living Situation">
                  <InfoCard
                    icon={Home}
                    title="Home Ownership"
                    value={profileData.living.homeOwnership}
                  />
                  <InfoCard
                    icon={Home}
                    title="Living Arrangement"
                    value={formatLivingArrangement(profileData.living.withFamily)}
                  />
                </Section>
              )}

              {/* Location & Mobility Section */}
              <Section title="Location & Mobility">
                <InfoCard
                  icon={Globe2}
                  title="Open to Moving"
                  value={formatMobilityText(
                    profileData.openToMovingCity || false,
                    profileData.openToMovingCountry || false
                  )}
                />
              </Section>

              {/* Nationality Section */}
              {(profileData.nationality || profileData.dualNationality || profileData.permanentResidence) && (
                <Section title="Nationality">
                  {profileData.nationality && (
                    <InfoCard
                      icon={Globe2}
                      title="Nationality"
                      value={profileData.nationality}
                    />
                  )}
                  {profileData.dualNationality && (
                    <InfoCard
                      icon={Globe2}
                      title="Dual Nationality"
                      value={profileData.dualNationality}
                    />
                  )}
                  {profileData.permanentResidence && (
                    <InfoCard
                      icon={Globe2}
                      title="PR/Greencard"
                      value={profileData.permanentResidence}
                    />
                  )}
                </Section>
              )}

              {/* Additional Notes section */}
              {profileData.familyEnvironment?.notes && (
                <Section title="Additional Notes">
                  <Card style={styles.fullCard}>
                    <Quote size={24} color={colors.primary} style={styles.quoteIcon} />
                    <Text style={styles.notesText}>
                      {profileData.familyEnvironment.notes}
                    </Text>
                  </Card>
                </Section>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
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

function ParentCard({ parent, type }: { parent: any, type: 'mother' | 'father' }) {
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
          value={parent.educationLevel}
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

function ParentsInfo() {
  const { profileData } = useProfile();
  if (!profileData || typeof profileData !== 'object') return null;

  const { parents, mother, father } = profileData;
  const name = profileData.name || 'Their';
  const possessiveName = name === 'Their' ? name.toLowerCase() : `${name}'s`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {!parents ? (
          <EmptyStateCard
            emoji="💝"
            title="No Parent Information"
            message="Parent details have not been added yet."
          />
        ) : (
          <>
            {!parents.isMotherAlive && (
              <EmptyStateCard
                emoji="🕊️"
                title={`${possessiveName} mother is no longer with us`}
                message="Her memory lives on in our hearts"
              />
            )}
            {!parents.isFatherAlive && (
              <EmptyStateCard
                emoji="🕊️"
                title={`${possessiveName} father is no longer with us`}
                message="His memory lives on in our hearts"
              />
            )}
            {parents.isMotherAlive && mother && <ParentCard parent={mother} type="mother" />}
            {parents.isFatherAlive && father && <ParentCard parent={father} type="father" />}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function SiblingsInfo() {
  const { profileData } = useProfile();
  if (!profileData || typeof profileData !== 'object') return null;

  const { siblings, siblingCounts } = profileData;
  const name = profileData.name || 'They';

  const hasSiblings = siblingCounts && (siblingCounts.brothers > 0 || siblingCounts.sisters > 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {!hasSiblings ? (
          <EmptyStateCard
            emoji="⭐"
            title={`${name} is an only child`}
            message="They are the shining star of their family"
          />
        ) : !siblings || siblings.length === 0 ? (
          <EmptyStateCard
            emoji="💫"
            title="Sibling Information"
            message="Sibling details have not been added yet"
          />
        ) : (
          siblings.map((sibling, index) => (
            <SiblingCard
              key={index}
              sibling={sibling}
              index={index}
              type={index < (siblingCounts?.sisters || 0) ? 'Sister' : 'Brother'}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('Profile');

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

      {activeTab === 'Profile' && <ProfileInfo />}
      {activeTab === 'Parents' && <ParentsInfo />}
      {activeTab === 'Siblings' && <SiblingsInfo />}
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
    paddingBottom: 20,
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
  placeholderImage: {
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
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
  badge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: colors.card,
    fontSize: 12,
    fontWeight: '600',
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
  expandedContent: {
    marginTop: 16,
  },
  quoteIcon: {
    marginBottom: 12,
  },
  notesText: {
    fontSize: 16,
    color: colors.text,
    fontStyle: 'italic',
    lineHeight: 24,
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
  noParentText: {
    fontSize: 16,
    color: colors.muted,
    textAlign: 'center',
    margin: 24,
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
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.muted,
    textAlign: 'center',
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