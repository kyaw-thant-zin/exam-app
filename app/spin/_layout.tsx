import { Stack } from 'expo-router';
import * as React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
  useNavigation,
} from '@react-navigation/native';
import { NAV_THEME } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity, View } from 'react-native';
import { ChevronLeft } from '@/components/atoms/icons';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export default function ProfileLayout() {
  const navigation = useNavigation();
  const { isDarkColorScheme } = useColorScheme();

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <Stack
        screenOptions={{
          headerShown: true,
          header: () => {
            return (
              <View className="absolute top-8 left-4 py-8 px-4">
                <TouchableOpacity
                  className="bg-foreground/10 p-2 rounded-full"
                  onPress={() => navigation.goBack()}
                >
                  <ChevronLeft
                    size={20}
                    strokeWidth={2.5}
                    className="w-4 h-4 text-foreground/70"
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Spin' }} />
      </Stack>
    </ThemeProvider>
  );
}
