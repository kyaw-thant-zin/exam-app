import { Stack } from 'expo-router';
import * as React from 'react';
import { ChevronLeft, Pencil } from '@/components/atoms/icons';
import { useNavigation } from '@react-navigation/native';

export default function ProfileLayout() {
  const navigation = useNavigation();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => <ChevronLeft onPress={() => navigation.goBack()} />,
        headerRight: () => <Pencil size={18} />,
      }}
    >
      <Stack.Screen name="edit" options={{ title: 'Profile' }} />
    </Stack>
  );
}
