import { useLocalSearchParams, Stack } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getWeather } from '@/services/test/queries';
import { getJobDetail } from '@/services/jobs/queries';
import axios from 'axios';
import {
  GraduationCap,
  Calendar,
  Lightbulb,
  ChevronsLeftRight,
  Users2,
  BriefcaseBusiness,
} from '@/components/atoms/icons/index';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { MapPin } from 'lucide-react-native';
import { queryClient } from '@/providers/queryClientProvider';

interface ExamParams {
  jobId?: string;
  name?: string;
  date?: string;
  imageKey?: string;
  description?: string;
}

const ExamDetail: React.FC = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const navigation = useNavigation();
  const params = useLocalSearchParams() as ExamParams;
  const { jobId, name, date, imageKey } = params || {};

  const jobData = {
    id: jobId || 'unknown-id',
    name: name || 'Job Details',
    img: imageKey
      ? `https://via.placeholder.com/100/000000/FFFFFF?text=${
          imageKey.charAt(0).toUpperCase() + imageKey.slice(1)
        }`
      : 'https://via.placeholder.com/100/000000/FFFFFF?text=Default',
    date: date || 'Date not available',
    description: `Details for ${
      name || 'Unknown Exam'
    }. Prepare for your exam with study materials and notes.`,
    location: 'Online Classroom',
  };

  // Refresh callback
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const { data, error, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['jobDetail'],
    queryFn: () => getJobDetail({ jobId: Number(jobId) || 0 }),
  });

  const jobDetail = data?.data;
  console.log(jobId, 'Detail.....');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        className="w-full p-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <Stack.Screen
          options={{
            title: jobData.name,
            headerStyle: { backgroundColor: '#FFFFFF' },
            headerTintColor: '#1F2937',
            headerTitleAlign: 'center',
          }}
        />
        <View style={styles.container} className="mb-4">
          <View className="mb-3">
            <Text className="text-2xl font-bold text-gray-900 mb-1">
              {jobDetail?.title}
            </Text>
            <Text
              className="text-2xl font-bold text-gray-900 mb-3"
              style={styles.subTitle}
            >
              {jobDetail?.company_name}
            </Text>
          </View>

          <View style={styles.cards} className="mb-4">
            <View>
              <View style={styles.cardItems}>
                <Text style={styles.icons}>
                  <MapPin
                    color={styles.icons.color}
                    size={styles.icons.fontSize}
                  />
                </Text>
                <Text style={styles.description}>
                  {jobDetail?.location.name},{jobDetail?.location.region.name}
                </Text>
              </View>
              <View style={styles.cardItems}>
                <Text style={styles.icons}>
                  <BriefcaseBusiness
                    color={styles.icons.color}
                    size={styles.icons.fontSize}
                  />
                </Text>
                <Text style={styles.description}>
                  {jobDetail?.career_type.careers_categroy_name}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.container} className="mb-4">
          <Text className="text-2xl font-bold text-gray-900 mb-4">
            Job Description
          </Text>
          <Text className="text-2xl  mb-4" style={styles.jobDescription}>
            {jobDetail?.description}
          </Text>
        </View>
        <View style={styles.container} className="mb-4">
          <Text className="text-2xl font-bold text-gray-900 mb-4">
            Qualifications
          </Text>

          <View style={styles.cards} className="mb-4">
            <View>
              <View style={styles.cardItems}>
                {/* <MaterialIcons name="grading" size={24} style={styles.icons} /> */}
                <Text style={styles.icons}>
                  <GraduationCap
                    color={styles.icons.color}
                    size={styles.icons.fontSize}
                  />
                </Text>
                <Text style={styles.description}>
                  {jobDetail?.experience.careers_categroy_name}
                </Text>
              </View>
              <View style={styles.cardItems}>
                <Text style={styles.icons}>
                  <ChevronsLeftRight
                    color={styles.icons.color}
                    size={styles.icons.fontSize}
                  />
                </Text>
                <Text style={styles.description}>
                  {`${jobDetail?.experience_level} years of ${jobDetail?.industry.careers_categroy_name}`}
                </Text>
              </View>
              <View style={styles.cardItems}>
                <Text style={styles.icons}>
                  <Calendar
                    color={styles.icons.color}
                    size={styles.icons.fontSize}
                  />
                </Text>
                <Text style={styles.description}>
                  {jobDetail?.experience_level} years
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* <View style={styles.container} className="mb-4">
          <Text className="text-2xl font-bold text-gray-900  ">
            Preferred Qualifications
          </Text>
        </View>
        <View style={styles.cards} className="mb-4">
          <View>
            <View style={styles.cardItems}>
              <Text style={styles.icons}>
                <ChevronsLeftRight
                  color={styles.icons.color}
                  size={styles.icons.fontSize}
                />
              </Text>
              <Text style={styles.description}>
                Experiences with react and Node.js
              </Text>
            </View>
            <View style={styles.cardItems}>
              <Text style={styles.icons}>
                <Lightbulb
                  color={styles.icons.color}
                  size={styles.icons.fontSize}
                />
              </Text>
              <Text style={styles.description}>
                Advanced Problem Solving Skill
              </Text>
            </View>
            <View style={styles.cardItems}>
              <Text style={styles.icons}>
                <Users2
                  color={styles.icons.color}
                  size={styles.icons.fontSize}
                />
              </Text>
              <Text style={styles.description}>Strong Communication Skill</Text>
            </View>
          </View>
        </View> */}
        <View style={styles.cardItems} className="mb-4">
          <View style={{ width: '50%', padding: 16 }}>
            <TouchableOpacity>
              <Text style={styles.buttons}>Save</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '50%', padding: 16, paddingLeft: 0 }}>
            <TouchableOpacity>
              <Text style={{ ...styles.buttons, backgroundColor: '#eee600' }}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={styles.cardItems} className="mb-4">
          {jobDetails && data?.map((item: any, index: number) => (
            <View key={index}>
              <Text
                style={{
                  marginBottom: 3,
                  borderBlockColor: 'gray',
                  borderWidth: 1,
                  fontSize: 16,
                }}
              >
                {item.title}
              </Text>
            </View>
          ))}
        </View> */}

        {/* {jobs.map((job, index) => ( */}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  examImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  examName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  examDate: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  examDescription: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 8,
    textAlign: 'center',
  },
  examLocation: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 17,
    color: '#888',
  },
  cards: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    paddingBottom: 0,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardItems: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
  },
  jobDescription: {
    color: '#000',
    opacity: 0.8,
    fontSize: 15,
  },
  icons: {
    marginRight: 17,
    color: '#888',
    fontSize: 18,
  },

  buttons: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default ExamDetail;
