import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
  Pressable,
  StyleSheet
} from "react-native";
import Svg, { Path, Text as SvgText, G } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { useDimensions } from "@/hooks/useWindowDimension";
import { Dialog, DialogClose, DialogContent } from "../atoms/ui/dialog";
import { Button } from "../atoms/ui/button";
import { Text } from "../atoms/ui/text";

const { width } = Dimensions.get("window");
const WHEEL_SIZE = width * 0.8;
const RADIUS = WHEEL_SIZE / 2;
const SECTIONS = 10;
const ANGLE_PER_SECTION = 360 / SECTIONS;

const SpinWheel = () => {
  const rotation = useSharedValue(0);
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { width, height } = useDimensions();

  console.log("width => ", width);
  console.log("height => ", height);

  const spinWheel = () => {
    const randomSpins = Math.floor(Math.random() * 10) + 5;
    const randomSection = Math.floor(Math.random() * SECTIONS);
    const finalRotation = randomSpins * 360 + randomSection * ANGLE_PER_SECTION;

    rotation.value = withTiming(finalRotation, { duration: 3000 }, () => {
      runOnJS(setWinningNumber)(randomSection + 1);
      runOnJS(setModalVisible)(true);
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    const rotateValue = `${rotation.value}deg`;
    return {
      transform: [{ rotate: rotateValue }]
    };
  });

  const getPath = (index: number) => {
    const startAngle = (index * ANGLE_PER_SECTION * Math.PI) / 180;
    const endAngle = ((index + 1) * ANGLE_PER_SECTION * Math.PI) / 180;

    const x1 = RADIUS + RADIUS * Math.cos(startAngle);
    const y1 = RADIUS + RADIUS * Math.sin(startAngle);
    const x2 = RADIUS + RADIUS * Math.cos(endAngle);
    const y2 = RADIUS + RADIUS * Math.sin(endAngle);

    return `M${RADIUS},${RADIUS} L${x1},${y1} A${RADIUS},${RADIUS} 0 0,1 ${x2},${y2} Z`;
  };

  return (
    <View className="flex-1 justify-center items-center w-full">
      <View className="items-center justify-center relative">
        <View className="flex-1 justify-center items-center absolute inset-0">
          <LottieView
            style={{
              width: 540,
              height: 540
            }}
            source={require("../../assets/spin-wheel-bg.json")}
            resizeMode="contain"
            autoPlay
            loop
          />
        </View>
        <Animated.View
          className="items-center justify-center relative"
          style={[animatedStyle]}
        >
          <Pressable
            style={{
              top: WHEEL_SIZE / 2 - 8,
              left: WHEEL_SIZE / 2 - 8
            }} // Centering the circle
            className="absolute w-5 h-5 bg-red-500 rounded-full z-[2]"
            onPress={spinWheel}
          />
          <Svg
            width={WHEEL_SIZE}
            height={WHEEL_SIZE}
            viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
          >
            <G>
              {[...Array(SECTIONS)].map((_, i) => (
                <Path
                  key={i}
                  d={getPath(i)}
                  fill={i % 2 === 0 ? "#4a881a" : "#be4040"}
                  stroke="white"
                  strokeWidth="2"
                />
              ))}
              {/* Section Numbers */}
              {[...Array(SECTIONS)].map((_, i) => {
                const angle =
                  (i * ANGLE_PER_SECTION + ANGLE_PER_SECTION / 2) *
                  (Math.PI / 180);
                return (
                  <SvgText
                    key={i}
                    x={RADIUS + RADIUS * 0.7 * Math.cos(angle)}
                    y={RADIUS + RADIUS * 0.7 * Math.sin(angle)}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                    fill="white"
                  >
                    {i + 1}
                  </SvgText>
                );
              })}
            </G>
          </Svg>
        </Animated.View>
      </View>
      <Button className="mt-10" onPress={spinWheel}>
        <Text>Spin Here</Text>
      </Button>
      <Dialog
        className="border-none"
        open={modalVisible}
        onOpenChange={setModalVisible}
      >
        <DialogContent
          className="bg-transparent shadow-none border-0 border-none outline-none"
          showClose={false}
        >
          <View className="flex justify-center items-center gap-5">
            <View className="absolute inset-0 w-full h-full flex-1 justify-center items-center">
              <View style={{ width, height }}>
                <LottieView
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                  source={require("../../assets/winning-effect.json")}
                  resizeMode="contain"
                  autoPlay
                  loop
                />
                <LottieView
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    right: 0
                  }}
                  source={require("../../assets/winning-effect-2.json")}
                  resizeMode="contain"
                  autoPlay
                  loop
                />
              </View>
            </View>
            <View className="w-40 h-40 flex justify-center items-center">
              <LottieView
                source={require("../../assets/winning.json")}
                autoPlay
                loop
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <Text className="text-2xl font-bold text-white">
              🎊 You won: {winningNumber} 🎊
            </Text>
            <DialogClose asChild>
              <Button variant="secondary" className="bg-red-400">
                <Text>Close</Text>
              </Button>
            </DialogClose>
          </View>
        </DialogContent>
      </Dialog>
    </View>
  );
};

export default SpinWheel;
