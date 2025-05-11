import { Link, Tabs, usePathname } from 'expo-router';
import React, { useState, useRef } from 'react';
import {
  Animated,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeToggle } from '@/components/molecules/theme/ThemeToggle';
import Sidebar from '@/components/layout/Sidebar';

export default function TabLayout() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const translateX = useRef(new Animated.Value(-250)).current;

  const getRouteName = (path: string) => {
    if (path === '/') return 'index';
    if (path === '/jobs') return 'jobs';
    if (path === '/learning') return 'learning';
    if (path === '/chat') return 'chat';
    if (path === '/profile') return 'profile';
    return 'index';
  };

  const activeRoute = getRouteName(pathname);

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      Animated.timing(translateX, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsSidebarOpen(false));
    } else {
      setIsSidebarOpen(true);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Conditional Header */}
      {activeRoute === 'index' ? (
        <View style={[styles.minimalHeader, { backgroundColor: '#FFA500' }]}>
          <TouchableOpacity onPress={toggleSidebar}>
            <MaterialIcons name="menu" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Notification pressed')}>
            <MaterialIcons name="notifications" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleSidebar}>
            <MaterialIcons name="menu" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {activeRoute === 'learning' && 'Learning'}
            {activeRoute === 'jobs' && 'Job'}
            {activeRoute === 'profile' && 'Profile'}
          </Text>
          <TouchableOpacity onPress={() => console.log('Notification pressed')}>
            <MaterialIcons name="notifications" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      )}

      {isSidebarOpen && (
        <TouchableOpacity style={styles.overlay} onPress={toggleSidebar} />
      )}

      <Animated.View
        style={[styles.sidebarContainer, { transform: [{ translateX }] }]}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          translateX={translateX}
        />
      </Animated.View>

      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => (
          <View style={styles.bottomNav}>
            <Link href="/" asChild>
              <TouchableOpacity style={styles.navItem}>
                <MaterialIcons
                  name="home"
                  size={24}
                  color={activeRoute === 'index' ? '#FFA500' : 'black'}
                />
                <Text
                  style={[
                    styles.navText,
                    activeRoute === 'index' && styles.activeText,
                  ]}
                >
                  Home
                </Text>
              </TouchableOpacity>
            </Link>
            <Link href="/learning" asChild>
              <TouchableOpacity style={styles.navItem}>
                <MaterialIcons
                  name="local-library"
                  size={24}
                  color={activeRoute === 'learning' ? '#FFA500' : 'black'}
                />
                <Text
                  style={[
                    styles.navText,
                    activeRoute === 'learning' && styles.activeText,
                  ]}
                >
                  Learning
                </Text>
              </TouchableOpacity>
            </Link>
            <Link href="/jobs" asChild>
              <TouchableOpacity style={styles.navItem}>
                <MaterialIcons
                  name="work"
                  size={24}
                  color={activeRoute === 'jobs' ? '#FFA500' : 'black'}
                />
                <Text
                  style={[
                    styles.navText,
                    activeRoute === 'jobs' && styles.activeText,
                  ]}
                >
                  Job
                </Text>
              </TouchableOpacity>
            </Link>
            <Link href="/profile" asChild>
              <TouchableOpacity style={styles.navItem}>
                <MaterialIcons
                  name="person"
                  size={24}
                  color={activeRoute === 'profile' ? '#FFA500' : 'black'}
                />
                <Text
                  style={[
                    styles.navText,
                    activeRoute === 'profile' && styles.activeText,
                  ]}
                >
                  Profile
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}
      >
        <Tabs.Screen name="index" options={{ title: 'ホーム' }} />
        <Tabs.Screen name="jobs" options={{ title: '検索' }} />
        <Tabs.Screen name="learning" options={{ title: '学習' }} />
        <Tabs.Screen name="chat" options={{ title: 'メッセージ' }} />
        <Tabs.Screen name="profile" options={{ title: 'プロフィール' }} />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#000',
    marginTop: 4,
  },
  activeText: {
    color: '#FFA500',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    zIndex: 1003,
    elevation: 0,
    position: 'relative',
  },
  minimalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 0, // Removed border to eliminate white line
    zIndex: 1003,
    elevation: 0,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1003,
  },
  sidebarContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 250,
    zIndex: 1004,
  },
});
