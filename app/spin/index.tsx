import React from 'react';
import SpinWheel from '../../components/organisms/SpinWheel'; // Import the SpinWheel component
import { SafeAreaView } from 'react-native';

const SpinPage = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-secondary/30">
      <SpinWheel />
    </SafeAreaView>
  );
};

export default SpinPage;
