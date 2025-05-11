import { useLocalSearchParams, Stack } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the params interface
interface CourseParams {
  id?: string;
  name?: string;
  tutor?: string;
  imageKey?: string;
  description?: string;
  price?: string;
  lessons?: string;
  plan?: string;
}

const CourseDetail: React.FC = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [activeTab, setActiveTab] = useState('About'); // State to track active tab

  const navigation = useNavigation<any>();
  const params = useLocalSearchParams() as CourseParams;
  const { id, name, tutor, imageKey, description, price, lessons, plan } =
    params || {};

  // Construct course data with fallbacks
  const courseData = {
    id: id || 'unknown-id',
    name: name || 'Design Thinking',
    tutor: tutor || 'Robert Green',
    img: imageKey
      ? `https://random.imagecdn.app/500/150?category=tech`
      : 'https://random.imagecdn.app/500/150?category=tech',
    description:
      description ||
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    price: price || '$180.00',
    lessons: lessons || '32 Lessons',
    plan: plan || 'free',
    lessonsList: [
      { id: 1, title: 'Introduction to Design Thinking' },
      { id: 2, title: 'Understanding User Needs' },
      { id: 3, title: 'Ideation Techniques' },
      { id: 4, title: 'Prototyping Basics' },
      { id: 5, title: 'User Testing and Feedback' },
    ],
  };

  // Refresh callback
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Handle lesson click (for demo purposes, we'll log the lesson title)
  const handleLessonClick = (lessonTitle: string) => {
    console.log(`Opening lesson: ${lessonTitle}`);
    // Add navigation or lesson content logic here
  };

  // Handle button click (for demo purposes)
  const handleButtonClick = () => {
    if (courseData.plan === 'free') {
      console.log('Playing all lessons');
      navigation.navigate('exam/[examId]/play', { examId: '1' });
    } else {
      console.log('Enrolling in course');
    }
    // Add navigation or logic here
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'About':
        return (
          <>
            <Text style={styles.sectionTitle}>About Course</Text>
            <Text style={styles.description}>{courseData.description}</Text>
          </>
        );
      case 'Lessons':
        return (
          <>
            <Text style={styles.sectionTitle}>Lessons</Text>
            {courseData.lessonsList.map((lesson) => (
              <TouchableOpacity
                key={lesson.id}
                style={styles.lessonItem}
                onPress={() => handleLessonClick(lesson.title)}
              >
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Ionicons
                  name="play-circle-outline"
                  size={24}
                  color="#3B82F6"
                />
              </TouchableOpacity>
            ))}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Scrollable Content */}
      <ScrollView
        className="w-full"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          {/* Dummy Image */}
          <Image source={{ uri: courseData.img }} style={styles.courseImage} />

          {/* Course Info */}
          <View style={styles.infoContainer}>
            <Text
              style={[
                styles.planBadge,
                courseData.plan === 'free'
                  ? styles.planBadgeFree
                  : styles.planBadgePaid,
              ]}
            >
              {courseData.plan === 'free' ? 'Free Plan' : 'Paid Plan'}
            </Text>
          </View>
          <Text style={styles.courseName}>{courseData.name}</Text>
          <View style={styles.metaInfo}>
            <Text style={styles.metaText}>{courseData.tutor}</Text>
            <Text style={styles.metaText}>• {courseData.lessons}</Text>
            <Text style={styles.metaText}>• Certificate</Text>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity onPress={() => setActiveTab('About')}>
              <Text
                style={[styles.tab, activeTab === 'About' && styles.activeTab]}
              >
                About
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('Lessons')}>
              <Text
                style={[
                  styles.tab,
                  activeTab === 'Lessons' && styles.activeTab,
                ]}
              >
                Lessons
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {renderTabContent()}
        </View>
      </ScrollView>

      {/* Fixed Bottom Section within SafeAreaView */}
      <View style={styles.bottomSection}>
        <View style={styles.priceContainer}>
          {courseData.plan === 'paid' && (
            <>
              <Text style={styles.infoLabel}>Total Price</Text>
              <Text style={styles.infoValue}>{courseData.price}</Text>
            </>
          )}
        </View>
        <TouchableOpacity
          style={[
            styles.enrollButton,
            courseData.plan === 'free' ? styles.buttonFree : styles.buttonPaid,
          ]}
          onPress={handleButtonClick}
        >
          <Text style={styles.enrollButtonText}>
            {courseData.plan === 'free' ? 'Play All' : 'Enroll Now'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 100, // Space for the fixed bottom section
  },
  content: {
    padding: 0,
  },
  courseImage: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  planBadge: {
    color: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  planBadgeFree: {
    backgroundColor: '#10B981',
  },
  planBadgePaid: {
    backgroundColor: '#F59E0B',
  },
  rating: {
    fontSize: 14,
    color: '#4A5568',
  },
  courseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  tab: {
    fontSize: 16,
    color: '#6B7280',
    paddingBottom: 8,
    marginRight: 24,
  },
  activeTab: {
    color: '#3B82F6',
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#4A5568',
    paddingHorizontal: 16,
    lineHeight: 20,
    marginBottom: 16,
  },
  tutorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tutorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  tutorInfo: {
    flex: 1,
  },
  tutorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  tutorRole: {
    fontSize: 14,
    color: '#6B7280',
  },
  tutorActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 8,
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  priceContainer: {
    flex: 1, // Takes up remaining space on the left
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  enrollButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFree: {
    backgroundColor: '#10B981',
  },
  buttonPaid: {
    backgroundColor: '#F59E0B',
  },
  enrollButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  lessonTitle: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
});

export default CourseDetail;
