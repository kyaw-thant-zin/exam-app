import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import React from 'react';
import { Text } from '@/components/atoms/ui/text';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const profileData = {
  name: 'ジョン・スミス',
  email: 'johnsmith@gmail.com',
  coursesEnrolled: 21,
  timeSpent: '21:20時間',
  questionsAttempted: 214,
  accuracy: '25%',
  plan: 'スターター',
  expiration: '2025年3月28日',
  profileImage: 'https://random.imagecdn.app/100/100?category=buildings',
};

const Profile = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleStatPress = (stat: string) => {
    console.log(`Clicked on ${stat}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        className="w-full"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Profile Header with Gradient and Image */}
          <LinearGradient
            colors={['#FFA500', '#FFA500']}
            style={styles.headerGradient}
          >
            <View style={styles.profileHeader}>
              <Image
                source={{ uri: profileData.profileImage }}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>{profileData.name}</Text>
              <Text style={styles.profileEmail}>{profileData.email}</Text>
            </View>
          </LinearGradient>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <View style={styles.statRow}>
              <TouchableOpacity
                style={[styles.statBox, { backgroundColor: '#FF8C00' }]}
                onPress={() => handleStatPress('登録コース')}
              >
                <MaterialIcons name="school" size={20} color="#FFF" />
                <Text style={styles.statText}>
                  {profileData.coursesEnrolled}
                </Text>
                <Text style={styles.statLabel}>登録コース</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.statBox, { backgroundColor: '#FF7F00' }]}
                onPress={() => handleStatPress('時間')}
              >
                <MaterialIcons name="access-time" size={20} color="#FFF" />
                <Text style={styles.statText}>{profileData.timeSpent}</Text>
                <Text style={styles.statLabel}>時間</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.statRow}>
              <TouchableOpacity
                style={[styles.statBox, { backgroundColor: '#4A90E2' }]}
                onPress={() => handleStatPress('試行質問')}
              >
                <MaterialIcons name="help-outline" size={20} color="#FFF" />
                <Text style={styles.statText}>
                  {profileData.questionsAttempted}
                </Text>
                <Text style={styles.statLabel}>試行質問</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.statBox, { backgroundColor: '#63B8FF' }]}
                onPress={() => handleStatPress('精度')}
              >
                <MaterialIcons name="check-circle" size={20} color="#FFF" />
                <Text style={styles.statText}>{profileData.accuracy}</Text>
                <Text style={styles.statLabel}>精度</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Current Plan Section */}
          <TouchableOpacity style={styles.planButton}>
            <View style={styles.planHeader}>
              <Text style={styles.planText}>現在のプラン</Text>
            </View>
            <View style={styles.planDetails}>
              <View style={styles.planTextContainer}>
                <Text style={styles.planName}>{profileData.plan}</Text>
                <Text style={styles.planExpiration}>
                  あなたのサブスクリプションは{profileData.expiration}に期限切れ
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#4A90E2" />
            </View>
          </TouchableOpacity>

          {/* Navigation Options */}
          <View style={styles.navigationOptions}>
            <TouchableOpacity style={styles.navOption}>
              <MaterialIcons name="explore" size={24} color="#FFA500" />
              <Text
                style={styles.navOptionText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                探索
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navOption}>
              <MaterialIcons name="star" size={24} color="#FFA500" />
              <Text
                style={styles.navOptionText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                バッジ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navOption}>
              <MaterialIcons name="leaderboard" size={24} color="#FFA500" />
              <Text
                style={styles.navOptionText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                リーダーボード
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navOption}>
              <MaterialIcons name="location-on" size={24} color="#FFA500" />
              <Text
                style={styles.navOptionText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                状態
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navOption}>
              <MaterialIcons name="show-chart" size={24} color="#FFA500" />
              <Text
                style={styles.navOptionText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                活動
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navOption}>
              <MaterialIcons name="credit-card" size={24} color="#FFA500" />
              <Text
                style={styles.navOptionText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                サブスクリプション
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navOption}>
              <MaterialIcons name="settings" size={24} color="#FFA500" />
              <Text
                style={styles.navOptionText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                設定
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  headerGradient: {
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  profileHeader: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.8,
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statBox: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFF',
    opacity: 0.8,
  },
  planButton: {
    backgroundColor: '#FFF',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  planHeader: {
    position: 'absolute',
    top: -10,
    left: 16,
    backgroundColor: '#4A90E2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  planText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
  },
  planDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  planTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  planName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  planExpiration: {
    fontSize: 12,
    color: '#666',
  },
  navigationOptions: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  navOption: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navOptionText: {
    fontSize: 12,
    color: '#FFA500',
    marginTop: 8,
    fontWeight: '500',
    textAlign: 'center',
    numberOfLines: 1,
    ellipsizeMode: 'tail',
  },
});

export default Profile;
