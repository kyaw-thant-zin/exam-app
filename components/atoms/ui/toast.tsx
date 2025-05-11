import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import Toast, {
  ErrorToast,
  ToastConfig,
  ToastConfigParams
} from "react-native-toast-message";
import { Text } from "./text";
import { getAdjustedWidth, moderateScale, scale } from "@/utils/deviceConfig";

interface ToasterProps {}

const Toaster: React.FC<ToasterProps> = () => {
  const toastConfig = {
    success: (props: ToastConfigParams<any>) => (
      <View className="p-4">
        <View className="bg-green-600 h-full rounded-full px-4 py-3 min-w-[100px]">
          <Text className="w-auto text-center text-white text-sm">
            {props.text1}
          </Text>
        </View>
      </View>
    ),
    error: (props: ToastConfigParams<any>) => (
      <View className="p-4">
        <View className="bg-red-600 h-full rounded-full px-4 py-3 min-w-[100px]">
          <Text className="w-auto text-center text-white text-sm">
            {props.text1}
          </Text>
        </View>
      </View>
    )
  };

  return <Toast config={toastConfig} />;
};

export default Toaster;
