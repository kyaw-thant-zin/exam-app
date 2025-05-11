import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { Text } from '@/components/atoms/ui/text';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Link, useRouter } from 'expo-router';
import DropDownPicker, {
  DropDownPickerProps,
} from 'react-native-dropdown-picker';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getJobsList } from '@/services/jobs/queries';
import { useQuery } from '@tanstack/react-query';
import { JobList } from '@/services/jobs/type';

// Extend TextStyle to include numberOfLines and ellipsizeMode if needed
declare module 'react-native' {
  interface TextStyle {
    numberOfLines?: number;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  }
}

// Sample job data with bookmarked property
const recentJobs: any[] = [
  {
    id: '1',
    title: 'ソフトウェアエンジニア',
    company: 'Google',
    location: 'マウンテンビュー, CA',
    jobType: 'フルタイム',
    salary: '¥12,000,000',
    bookmarked: true, // Bookmarked
  },
  {
    id: '2',
    title: 'マーケティングマネージャー',
    company: 'Apple',
    location: 'クパチーノ, CA',
    jobType: 'フルタイム',
    salary: '¥7,000,000',
    bookmarked: false, // Not bookmarked
  },
  {
    id: '3',
    title: 'データアナリスト',
    company: 'Microsoft',
    location: 'レドモンド, WA',
    jobType: 'フルタイム',
    salary: '¥8,000,000',
    bookmarked: true, // Bookmarked
  },
  {
    id: '4',
    title: '登録看護師',
    company: 'ジョンズ・ホプキンス',
    location: 'ボルチモア, MD',
    jobType: 'フルタイム',
    salary: '¥6,000,000',
    bookmarked: false, // Not bookmarked
  },
  {
    id: '5',
    title: 'プロジェクトマネージャー',
    company: 'Amazon',
    location: 'シアトル, WA',
    jobType: 'フルタイム',
    salary: '¥10,000,000',
    bookmarked: true, // Bookmarked
  },
  {
    id: '6',
    title: 'グラフィックデザイナー',
    company: 'フリーランス',
    location: 'リモート',
    jobType: 'フリーランス',
    salary: '¥4,000,000',
    bookmarked: false, // Not bookmarked
  },
];

// Custom arrow icon components (unchanged)
const ArrowDownIcon = () => (
  <MaterialIcons name="keyboard-arrow-down" size={20} color="#888" />
);
const ArrowUpIcon = () => (
  <MaterialIcons name="keyboard-arrow-up" size={20} color="#888" />
);

export default function JobOpportunitiesScreen() {
  const { colorScheme } = useColorScheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [location, setLocation] = React.useState('場所');
  const [jobType, setJobType] = React.useState('職種');
  const [industry, setIndustry] = React.useState('業界');
  const [openLocation, setOpenLocation] = React.useState(false);
  const [openJobType, setOpenJobType] = React.useState(false);
  const [openIndustry, setOpenIndustry] = React.useState(false);
  const router = useRouter();

  const locationOptions = [
    { label: '場所', value: '場所' },
    { label: 'マウンテンビュー, CA', value: 'マウンテンビュー, CA' },
    { label: 'クパチーノ, CA', value: 'クパチーノ, CA' },
    { label: 'レドモンド, WA', value: 'レドモンド, WA' },
    { label: 'ボルチモア, MD', value: 'ボルチモア, MD' },
    { label: 'シアトル, WA', value: 'シアトル, WA' },
    { label: 'リモート', value: 'リモート' },
  ];
  const jobTypeOptions = [
    { label: '職種', value: '職種' },
    { label: 'フルタイム', value: '1' },
    { label: 'パートタイム', value: '2' },
    { label: '契約', value: '3' },
    { label: 'フリーランス', value: '4' },
  ];
  const industryOptions = [
    { label: '業界', value: '業界' },
    { label: 'テクノロジー', value: 'テクノロジー' },
    { label: 'ヘルスケア', value: 'ヘルスケア' },
    { label: 'マーケティング', value: 'マーケティング' },
    { label: 'デザイン', value: 'デザイン' },
    { label: '小売', value: '小売' },
  ];

  const [refreshing, setRefreshing] = React.useState(false);
  // const [jobs, setJobs] = React.useState(recentJobs); // Local state to manage jobs

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const toggleBookmark = (id: string) => {
    // setJobs((prevJobs) =>
    //   prevJobs.map((job) =>
    //     job.id === id ? { ...job, bookmarked: !job.bookmarked } : job
    //   )
    // );
  };

  //get job list

  const { data } = useQuery({
    queryKey: ['jobs'],
    queryFn: getJobsList,
  });

  const jobList = data;
  // const [jobList, setJobs] = React.useState(jobs); // Local state to manage jobs

  const onSearchByCareerType = (value: string) => {
    const result = data?.filter((item) => item.career_type.id === value);
    // setJobs(result);
  };

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
                求人情報
              </Text>
              <TextInput
                className="p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="求人、企業、役職を検索..."
                placeholderTextColor="#a1a1aa"
              />
            </View>

            {/* Filters */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filtersScroll}
              className="py-4"
            >
              <View style={styles.filters}>
                <DropDownPicker
                  open={openLocation}
                  value={location}
                  items={locationOptions}
                  setOpen={setOpenLocation}
                  setValue={setLocation}
                  placeholder="場所"
                  style={styles.dropdownStyle}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  textStyle={styles.dropdownText}
                  placeholderStyle={styles.placeholderStyle}
                  ArrowDownIconComponent={ArrowDownIcon}
                  ArrowUpIconComponent={ArrowUpIcon}
                  zIndex={3000} // Ensure high zIndex within ScrollView
                  zIndexInverse={1000}
                  listMode="MODAL" // Use MODAL for better ScrollView compatibility
                  modalProps={{
                    animationType: 'slide',
                  }}
                  containerStyle={styles.filterDropdown}
                  labelProps={{
                    numberOfLines: 1,
                    ellipsizeMode: 'tail',
                  }}
                />
                <DropDownPicker
                  open={openJobType}
                  value={jobType}
                  items={jobTypeOptions}
                  onChangeValue={(item) => onSearchByCareerType(item || '')}
                  setOpen={setOpenJobType}
                  setValue={setJobType}
                  placeholder="職種"
                  style={styles.dropdownStyle}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  textStyle={styles.dropdownText}
                  placeholderStyle={styles.placeholderStyle}
                  ArrowDownIconComponent={ArrowDownIcon}
                  ArrowUpIconComponent={ArrowUpIcon}
                  zIndex={2000}
                  zIndexInverse={2000}
                  listMode="MODAL"
                  modalProps={{
                    animationType: 'slide',
                  }}
                  containerStyle={styles.filterDropdown}
                  labelProps={{
                    numberOfLines: 1,
                    ellipsizeMode: 'tail',
                  }}
                />
                <DropDownPicker
                  open={openIndustry}
                  value={industry}
                  items={industryOptions}
                  setOpen={setOpenIndustry}
                  setValue={setIndustry}
                  placeholder="業界"
                  style={styles.dropdownStyle}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  textStyle={styles.dropdownText}
                  placeholderStyle={styles.placeholderStyle}
                  ArrowDownIconComponent={ArrowDownIcon}
                  ArrowUpIconComponent={ArrowUpIcon}
                  zIndex={1000}
                  zIndexInverse={3000}
                  listMode="MODAL"
                  modalProps={{
                    animationType: 'slide',
                  }}
                  containerStyle={styles.filterDropdown}
                  labelProps={{
                    numberOfLines: 1,
                    ellipsizeMode: 'tail',
                  }}
                />
              </View>
            </ScrollView>

            {/* Recent Searches */}
            <View style={styles.recentSearches}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              {jobList &&
                jobList.map((job: JobList, index: number) => (
                  <Link
                    key={index}
                    href={`/job/${encodeURIComponent(job.id)}`}
                    asChild
                  >
                    <TouchableOpacity key={job.id} style={styles.jobCard}>
                      <View style={styles.jobDetails}>
                        <Text
                          style={styles.jobTitle}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {job.title}
                        </Text>
                        <Text
                          style={styles.jobLocation}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {job.company_name}, {job.location.name}
                        </Text>
                        <Text
                          style={styles.jobType}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {job.career_type.careers_categroy_name}
                        </Text>
                      </View>
                      <Text
                        style={styles.salary}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {job.salary}
                      </Text>
                      <TouchableOpacity
                        style={styles.saveIconContainer}
                        onPress={() => toggleBookmark(job.id)}
                      >
                        <MaterialIcons
                          name={job.created_by ? 'bookmark' : 'bookmark-border'}
                          size={24}
                          color={job.created_by ? '#FFA500' : '#666'}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </Link>
                ))}
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
    flex: 1,
    paddingBottom: 60,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 8,
  },
  micIcon: {
    padding: 8,
  },
  filtersScroll: {
    marginBottom: 16,
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterDropdown: {
    width: 120, // Keep the fixed width for truncation
    marginHorizontal: 4,
  },
  dropdownStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 10,
    flexShrink: 1, // Allow the dropdown to shrink if text overflows
  },
  dropDownContainerStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginTop: 2,
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownText: {
    fontSize: 14,
    color: '#000',
  },
  placeholderStyle: {
    color: '#888',
    fontSize: 14,
  },
  recentSearches: {
    paddingBottom: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  jobCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: 'space-between', // Ensure even spacing with the save icon
  },
  jobDetails: {
    flex: 1, // Take up remaining space, but allow salary and save icon to stay on the right
    marginRight: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  jobLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  jobType: {
    fontSize: 12,
    color: '#888',
  },
  salary: {
    fontSize: 16,
    color: '#FFA500',
    fontWeight: 'bold',
    marginRight: 8, // Space between salary and save icon
  },
  saveIconContainer: {
    padding: 4,
  },
});
