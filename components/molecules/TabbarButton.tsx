import React, { useEffect, useState } from "react";
import { PlatformPressable } from "@react-navigation/elements";
import { cn } from "@/utils";
import { useLinkBuilder } from "@react-navigation/native";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import { Platform } from "react-native";
import { icon, RouteName } from "../atoms/icons/tabbarIcon";
import { Text } from "../atoms/ui/text";

interface TabbarButtonProps {
  label: string;
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  route: any;
  options: BottomTabNavigationOptions;
}

const TabbarButton = ({
  label,
  onPress,
  onLongPress,
  isFocused,
  route,
  options
}: TabbarButtonProps) => {
  const { buildHref } = useLinkBuilder();
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 0 : 1, {
      duration: 500
    });
  }, [scale, isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return {
      opacity
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [1, 20]);
    return {
      transform: [
        {
          scale: scaleValue
        }
      ],
      top
    };
  });

  return (
    <PlatformPressable
      href={buildHref(route.name, route.params)}
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarButtonTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      pressOpacity={1}
      style={{
        ...(Platform.OS === "web" && {
          display: "flex",
          flexDirection: "row",
          gap: 2,
          marginBottom: 24,
          marginHorizontal: 16
        })
      }}
      className="flex justify-center items-center gap-2 mb-6 mx-4"
    >
      {/* <Animated.View style={animatedIconStyle}>
        {icon[route.name as RouteName]({
          className: cn(
            "w-4 h-4",
            isFocused ? "text-primary top-2" : "text-foreground/40"
          )
        })}
      </Animated.View> */}
      {icon[route.name as RouteName]({
        className: cn(
          "w-4 h-4",
          isFocused ? "text-primary" : "text-foreground/40"
        )
      })}
      <Text
        style={animatedTextStyle}
        className={cn(isFocused ? "text-primary" : "text-foreground/40")}
      >
        {label as string}
      </Text>
    </PlatformPressable>
  );
};

export default TabbarButton;
