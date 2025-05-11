import { Dimensions, Platform } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// Adjusts size based on screen width
const scale = (size: number) => (screenWidth / guidelineBaseWidth) * size;

// Adjusts size based on screen height
const verticalScale = (size: number) =>
  (screenHeight / guidelineBaseHeight) * size;

// Adjusts size with a smoother scaling effect
const moderateScale = (size: number, factor = 0.25) =>
  size + (scale(size) - size) * factor;

// Returns current screen width and height
const getDimensions = () => {
  const { height, width } = Dimensions.get("window");
  return { height, width };
};

// Returns screen width minus scaled margin
const getAdjustedWidth = (margin: number = 26) => {
  return screenWidth - moderateScale(margin);
};

const getDeviceHeight = () => screenHeight;

const isIOS = () => Platform.OS === "ios";

const isWeb = Platform.OS === "web";

export {
  scale,
  verticalScale,
  moderateScale,
  getDimensions,
  getAdjustedWidth,
  getDeviceHeight,
  screenWidth,
  screenHeight,
  isIOS,
  isWeb
};
