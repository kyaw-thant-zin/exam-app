import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, usePathname } from 'expo-router'; // Import usePathname

// Placeholder image for the avatar (replace with your actual image URL or local asset)
const PROFILE_IMAGE = 'https://via.placeholder.com/40'; // Example URL, replace with your asset

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  translateX: Animated.Value; // For animation
}

type AppRoute =
  | '/'
  | '/learning'
  | '/jobs'
  | '/chat'
  | '/profile'
  | '/test'
  | '/videos'
  | '/group'
  | '/analysis'
  | '/scoreboard'
  | '/question'
  | '/settings'
  | '/notifications'
  | '/logout';

type MaterialIconName =
  | 'home'
  | 'local-library'
  | 'work'
  | 'chat'
  | 'person'
  | 'leaderboard'
  | 'help'
  | 'settings'
  | 'notifications'
  | 'exit-to-app';

interface NavigationItem {
  name: string;
  href: AppRoute;
  icon: MaterialIconName;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, translateX }) => {
  const pathname = usePathname(); // Get current path to determine active item
  const navigationItems: NavigationItem[] = [
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'Learning', href: '/learning', icon: 'local-library' },
    { name: 'Job', href: '/jobs', icon: 'work' },
    { name: 'Profile', href: '/profile', icon: 'person' },
    {
      name: 'Notifications',
      href: '/notifications',
      icon: 'notifications',
    },
    { name: 'Settings', href: '/settings', icon: 'settings' },
    { name: 'Logout', href: '/logout', icon: 'exit-to-app' },
  ];

  const isActive = (href: string) => {
    return pathname === href; // Check if the current path matches the item's href
  };

  return (
    <Animated.View style={[styles.sidebar, { transform: [{ translateX }] }]}>
      <View style={styles.sidebarHeader}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialIcons name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileSection}>
        <Image source={{ uri: PROFILE_IMAGE }} style={styles.profileImage} />
        <Text style={styles.profileName}>Lucas Wilson</Text>
      </View>
      <View style={styles.sidebarContent}>
        {navigationItems.map((item) => (
          <Link
            style={[
              styles.navItem,
              isActive(item.href) && styles.activeNavItem,
            ]}
            href={item.href}
            asChild
            key={item.href}
          >
            <TouchableOpacity
              key={item.href}
              onPress={() => {
                onClose(); // Close sidebar after navigation
              }}
            >
              <MaterialIcons name={item.icon} size={24} />
              <Text
                style={[
                  styles.navText,
                  isActive(item.href) ? styles.activeText : styles.inactiveText,
                ]}
              >
                {item.name}
              </Text>
              <MaterialIcons name="chevron-right" size={24} />
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    zIndex: 1004,
  },
  sidebarHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  closeButton: {
    paddingHorizontal: 8,
    color: '#000',
    marginTop: 8,
    marginLeft: 'auto',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  profileName: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  sidebarContent: {
    paddingVertical: 10,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  activeNavItem: {
    backgroundColor: '#FFA500',
  },
  navText: {
    color: '#000',
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  activeText: {
    color: '#000',
  },
  inactiveText: {
    color: '#000',
  },
});

export default Sidebar;
