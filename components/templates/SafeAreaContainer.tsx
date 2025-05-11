import { SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { useDimensions } from "@/hooks/useWindowDimension";
import { usePlatform } from "@/hooks/usePlatfom";

const SafeAreaContainer = ({
  children
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { scaleSize } = useDimensions();
  const { isWeb } = usePlatform();

  return (
    <SafeAreaView className="flex-1 justify-center items-center w-full">
      <ScrollView
        className="w-full"
        contentContainerStyle={{
          width: "100%",
          height: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: scaleSize(16),
          ...(isWeb && { maxWidth: 528, marginHorizontal: "auto" })
        }}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SafeAreaContainer;
