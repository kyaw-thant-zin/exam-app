import { SafeAreaView, View } from 'react-native';
import React from 'react';
import { Text } from '@/components/atoms/ui/text';

const ProfileEdit = () => {
  return (
    <SafeAreaView>
      <View className="flex h-full justify-center items-center">
        <View className="mb-4">
          <Text className="text-2xl">Hey I am profile edit</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEdit;
