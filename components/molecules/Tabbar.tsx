import { LayoutChangeEvent, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import { cn } from "@/utils";
import TabbarButton from "./TabbarButton";
import { isWeb } from "@/utils/deviceConfig";

export function Tabbar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [dimensions, setDimensions] = useState({ width: 100, height: 20 });

  const btnWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height
    });
  };

  const tabPositionX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }]
    };
  });

  return (
    <View
      onLayout={onTabbarLayout}
      className={cn(
        "flex-row items-center justify-between px-4 py-1 w-full",
        isWeb && "web-view"
      )}
    >
      <Animated.View
        className={cn("absolute bg-secondary/30 rounded-sm")}
        style={[
          animatedStyle,
          {
            width: btnWidth + 5,
            height: dimensions.height
          }
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(btnWidth * index, {
            duration: 1500
          });
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key
          });
        };

        return (
          <TabbarButton
            key={index}
            label={label as string}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            route={route}
            options={options}
          />
        );
      })}
    </View>
  );
}
