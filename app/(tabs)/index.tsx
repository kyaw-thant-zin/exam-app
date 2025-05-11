import React, { useCallback, useState } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { Card, CardContent, CardFooter } from '@/components/atoms/ui/card';
import { Text } from '@/components/atoms/ui/text';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Link, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const featuredJobs = [
  {
    id: '1',
    title: 'Software Engineer',
    description: 'Google, Mountain View, CA',
    salary: '$120,000',
    category: 'Software Projects',
    bookmark: true,
    createdAt: '2 minutes ago',
  },
  {
    id: '2',
    title: 'Marketing Manager',
    description: 'Apple, Cupertino, CA',
    salary: '$70,000',
    category: 'Marketing Campaigns',
    bookmark: false,
    createdAt: '5 hours ago',
  },
];

const upcomingExams: {
  id: string;
  name: string;
  instructor: string;
  date: string;
  imageKey: string;
  plan: string;
  progress: number;
  total: number;
}[] = [
  {
    id: '1',
    name: 'Figma Basics',
    instructor: 'Jacob Jones',
    date: 'November 20, 2023, 10:00 AM',
    imageKey: 'math',
    plan: 'Free',
    progress: 20,
    total: 25,
  },
  {
    id: '2',
    name: 'Logo Design Fundamentals',
    instructor: 'Jacob Jones',
    date: 'November 22, 2023, 2:00 PM',
    imageKey: 'design',
    plan: 'Paid',
    progress: 15,
    total: 25,
  },
];

// Activities section data
const medias = [
  {
    id: '1',
    title: 'Software Engineer',
    description: 'Google, Mountain View, CA',
    imageUri: 'https://random.imagecdn.app/500/150?category=tech', // Placeholder
  },
  {
    id: '2',
    title: 'Marketing Manager',
    description: 'Apple, Cupertino, CA',
    imageUri: 'https://random.imagecdn.app/500/150?category=marketing', // Placeholder
  },
];

// Practice section data
const practiceItems = [
  {
    id: '1',
    name: 'N5 Practice',
  },
  {
    id: '2',
    name: 'N4 Practice',
  },
  {
    id: '3',
    name: 'N3 Practice',
  },
  {
    id: '4',
    name: 'N2 Practice',
  },
  {
    id: '5',
    name: 'N1 Practice',
  },
];

const topPage = {
  greeting: 'Hello, John!',
  date: 'March 20, 2025',
  learningSection: 'Learning Activities',
  featuredJobsSection: 'Featured Jobs',
  mediaSection: 'Media',
  practiceSection: 'Practice',
};

export default function Screen() {
  const { colorScheme } = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Learning categories
  const learningCategories = [
    {
      id: 'alphabet',
      name: 'Alphabet',
      icon: require('@/assets/images/ico-04.png'),
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <ScrollView
          className="w-full"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {/* JP Learning */}
          <View style={styles.headerContainer}>
            <Text style={styles.greetingText}>{topPage.greeting}</Text>
            <Text>{topPage.date}</Text>
            <View className="mt-4">
              {learningCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => router.push(`/learning/jp/alphabet`)}
                  activeOpacity={0.7}
                >
                  <Card style={styles.learningCard}>
                    <CardContent className="items-center">
                      <Image
                        source={category.icon}
                        className="w-20 h-20"
                        resizeMode="contain"
                      />
                      <Text style={styles.learningText}>{category.name}</Text>
                    </CardContent>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.container} className="py-4 mt-4">
            {/* Medias */}
            <View className="mb-6">
              <Text
                className="pl-4 font-semibold mb-4"
                style={styles.sectionTitleText}
              >
                {topPage.mediaSection}
              </Text>
              <View className="pl-4">
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="w-full flex-row"
                >
                  {medias.map((media) => (
                    <TouchableOpacity
                      key={media.id}
                      onPress={() =>
                        console.log(
                          `Navigate to media details for ID: ${media.id}`
                        )
                      }
                      activeOpacity={0.7}
                    >
                      <Card
                        className="w-[300px] h-[200px] rounded-xl bg-white"
                        style={{ marginRight: 32 }}
                      >
                        <CardContent className="p-0">
                          <Image
                            source={{ uri: media.imageUri }}
                            className="w-full h-32 rounded-t-lg"
                            resizeMode="cover"
                            onError={(error) =>
                              console.log(
                                'Image load error:',
                                error.nativeEvent.error
                              )
                            }
                          />
                          <View className="p-4">
                            <Text className="font-semibold text-gray-900 text-base">
                              {media.title}
                            </Text>
                            <Text className="text-sm text-gray-600">
                              {media.description}
                            </Text>
                          </View>
                        </CardContent>
                      </Card>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            {/* Learning Activities */}
            <View className="mb-6">
              <Text
                className="pl-4 font-semibold mb-4"
                style={styles.sectionTitleText}
              >
                {topPage.learningSection}
              </Text>
              <View className="px-4">
                {upcomingExams.map((exam) => (
                  <TouchableOpacity
                    key={exam.id}
                    onPress={() =>
                      console.log(
                        `Navigate to learning details for ID: ${exam.id}`
                      )
                    }
                    activeOpacity={0.7}
                  >
                    <Card className="w-full rounded-xl bg-white mb-4">
                      <CardContent className="p-0 relative">
                        <Image
                          source={{
                            uri: `https://random.imagecdn.app/500/150?category=${exam.imageKey}`,
                          }}
                          className="w-full h-32 rounded-t-lg"
                          resizeMode="cover"
                          onError={(error) =>
                            console.log(
                              'Image load error:',
                              error.nativeEvent.error
                            )
                          }
                        />
                        <View className="p-4">
                          <Text className="font-semibold text-gray-900 text-base">
                            {exam.name}
                          </Text>
                          <Text className="text-sm text-gray-600">
                            {exam.instructor}
                          </Text>
                          <Text className="text-xs text-gray-500 mt-1">
                            {exam.date}
                          </Text>
                          <View className="flex-row items-center mt-1">
                            <View className="flex-1 mr-2">
                              <View className="w-full h-2 bg-gray-200 rounded-full">
                                <View
                                  className="h-2 bg-blue-500 rounded-full"
                                  style={{
                                    width: `${
                                      (exam.progress / exam.total) * 100
                                    }%`,
                                  }}
                                />
                              </View>
                            </View>
                            <Text className="text-xs text-gray-500">
                              {exam.progress}/{exam.total}
                            </Text>
                          </View>
                          <View
                            className="absolute top-2 right-2 px-2 py-1 rounded-full"
                            style={{
                              backgroundColor:
                                exam.plan === 'Free' ? '#10B981' : '#F59E0B',
                            }}
                          >
                            <Text className="text-white text-xs font-medium">
                              {exam.plan}
                            </Text>
                          </View>
                        </View>
                      </CardContent>
                    </Card>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Featured Jobs */}
            <View className="mb-6">
              <Text
                className="pl-4 font-semibold mb-4"
                style={styles.sectionTitleText}
              >
                {topPage.featuredJobsSection}
              </Text>
              <View className="pl-4">
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="w-full flex-row"
                >
                  {featuredJobs.map((job) => (
                    <TouchableOpacity
                      key={job.id}
                      onPress={() =>
                        console.log(`Navigate to job details for ID: ${job.id}`)
                      }
                      activeOpacity={0.7}
                    >
                      <Card
                        className="w-[300px] h-auto rounded-xl bg-white"
                        style={{ marginRight: 32 }}
                      >
                        <CardContent className="p-4 relative">
                          <TouchableOpacity
                            className="absolute top-2 right-2"
                            onPress={() =>
                              console.log(`Bookmark toggled for ID: ${job.id}`)
                            }
                          >
                            <MaterialIcons
                              name={
                                job.bookmark ? 'bookmark' : 'bookmark-border'
                              }
                              size={24}
                              color={job.bookmark ? '#F59E0B' : '#666'}
                            />
                          </TouchableOpacity>
                          <View className="flex-col">
                            <Text className="font-semibold text-gray-900 text-base mb-1">
                              {job.title}
                            </Text>
                            <Text className="text-sm text-gray-600 mb-1">
                              {job.description}
                            </Text>
                            <View className="flex-row items-center mb-1">
                              <View className="bg-orange-500 rounded-full px-2 py-1 mr-2">
                                <Text className="text-white text-xs font-medium">
                                  {job.salary}
                                </Text>
                              </View>
                              <Text className="text-sm text-gray-600">
                                {job.category}
                              </Text>
                            </View>
                            <Text className="text-xs text-gray-500">
                              {job.createdAt}
                            </Text>
                          </View>
                        </CardContent>
                      </Card>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingBottom: 100,
  },
  headerContainer: {
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: '#FFA500',
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  learningCard: {
    width: '80%',
    height: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    marginHorizontal: 'auto',
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  learningText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 8,
  },
});
