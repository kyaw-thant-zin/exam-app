import { Platform } from "react-native";

export const usePlatform = () => {
  const platform = Platform.OS;
  const isIOS = platform === "ios";
  const isAndroid = platform === "android";
  const isWeb = platform === "web";
  const isMacOS = platform === "macos";
  const isWindows = platform === "windows";

  return {
    platform,
    isIOS,
    isAndroid,
    isWeb,
    isMacOS,
    isWindows
  };
};
