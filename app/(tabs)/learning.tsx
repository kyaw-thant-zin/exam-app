import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

// Type-safe EXAM_IMAGES object with explicit keys
const EXAM_IMAGES: Record<string, string> = {
  math: 'https://random.imagecdn.app/500/150?category=tech',
  history: 'https://random.imagecdn.app/500/150?category=tech',
  physics: 'https://random.imagecdn.app/500/150?category=tech',
  chemistry: 'https://random.imagecdn.app/500/150?category=tech',
  english: 'https://random.imagecdn.app/500/150?category=tech',
  biology: 'https://random.imagecdn.app/500/150?category=tech',
};

// Define the exam data interface
interface Exam {
  id: string;
  name: string;
  instructor: string;
  date: string;
  imageKey: string;
  plan: 'FREE' | 'PAID';
  progress: number; // Added for progress bar
  total: number; // Added for progress bar
}

const Learning: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);

  const upcomingExams: Exam[] = [
    {
      id: '1',
      name: 'フィグマ入門',
      instructor: 'ジェイコブ・ジョーンズ',
      date: '2023年11月20日 午前10:00',
      imageKey: 'math',
      plan: 'FREE',
      progress: 20,
      total: 25,
    },
    {
      id: '2',
      name: 'ロゴデザイン基礎',
      instructor: 'エレノア・ペナ',
      date: '2023年11月22日 午後2:00',
      imageKey: 'history',
      plan: 'PAID',
      progress: 15,
      total: 25,
    },
    {
      id: '3',
      name: 'フィグマ入門',
      instructor: 'キャスリン・マーフィー',
      date: '2023年11月25日 午前8:00',
      imageKey: 'physics',
      plan: 'FREE',
      progress: 10,
      total: 25,
    },
    {
      id: '4',
      name: 'ユーザー中心デザイン',
      instructor: 'マービン・マッキニー',
      date: '2023年11月27日 午前11:00',
      imageKey: 'chemistry',
      plan: 'PAID',
      progress: 18,
      total: 25,
    },
    {
      id: '5',
      name: '英語文学試験',
      instructor: 'ジェーン・ドー',
      date: '2023年11月29日 午後2:00',
      imageKey: 'english',
      plan: 'FREE',
      progress: 22,
      total: 25,
    },
    {
      id: '6',
      name: '生物学最終試験',
      instructor: 'ジョン・スミス',
      date: '2023年12月1日 午前10:00',
      imageKey: 'biology',
      plan: 'PAID',
      progress: 5,
      total: 25,
    },
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <ScrollView
          className="w-full p-4"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Header with Search */}
            <View className="mb-6">
              <Text className="text-2xl font-bold text-gray-900 mb-4">
                学習コース一覧
              </Text>
              <TextInput
                className="p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="学習コースを検索"
                placeholderTextColor="#a1a1aa"
              />
            </View>

            {/* Upcoming Exams Section */}
            {upcomingExams.map((exam, index) => (
              <Link
                key={index}
                href={`/learning/${encodeURIComponent(exam.id)}`}
                asChild
              >
                <TouchableOpacity>
                  <View style={styles.examItem}>
                    <Image
                      source={{ uri: EXAM_IMAGES[exam.imageKey] }}
                      style={styles.examImage}
                    />
                    <View style={styles.examDetails}>
                      <Text style={styles.examName}>{exam.name}</Text>
                      <Text style={styles.instructor}>{exam.instructor}</Text>
                      <View style={styles.planContainer}>
                        <View style={styles.dateAndProgressContainer}>
                          <Text style={styles.examDate}>{exam.date}</Text>
                          <View style={styles.progressContainer}>
                            <View style={styles.progressBarBackground}>
                              <View
                                style={[
                                  styles.progressBarFill,
                                  {
                                    width: `${
                                      (exam.progress / exam.total) * 100
                                    }%`,
                                  },
                                ]}
                              />
                            </View>
                            <Text style={styles.progressText}>
                              {exam.progress}/{exam.total}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={[
                            styles.planBadge,
                            exam.plan === 'FREE'
                              ? styles.planBadgeFree
                              : styles.planBadgePaid,
                          ]}
                        >
                          <Text style={styles.planText}>{exam.plan}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  examItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 12,
  },
  examImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  examDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  examName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  instructor: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  planContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateAndProgressContainer: {
    flex: 1,
    marginRight: 8,
  },
  examDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
  },
  planBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  planBadgeFree: {
    textTransform: 'uppercase',
    backgroundColor: '#10B981',
  },
  planBadgePaid: {
    textTransform: 'uppercase',
    backgroundColor: '#F59E0B',
  },
  planText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default Learning;
