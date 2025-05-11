import { Stack } from 'expo-router';
import * as React from 'react';
import { ChevronLeft, Pencil } from '@/components/atoms/icons';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, NavigationProp } from '@react-navigation/native';

interface JobDetailParams {
  JobId?: string;
  name?: string;
  date?: string;
  imageKey?: string;
}

type JobDetailParamList = {
  '[JobId]': JobDetailParams;
};

type JobDetailRouteProp = RouteProp<JobDetailParamList, '[JobId]'>;
type NavigationProps = NavigationProp<JobDetailRouteProp>;

export default function JobLayout() {
  const navigation = useNavigation<NavigationProps>();

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
      <Stack.Screen
        name="[jobId]"
        options={({ route, navigation }) => {
          const params = route.params as { name?: string } | undefined;
          return {
            title: params?.name || 'Unknown Exam',
          };
        }}
      />
    </Stack>
  );
}
