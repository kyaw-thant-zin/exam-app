import { useWindowDimensions } from "react-native";

export const useDimensions = () => {
  const { width, height } = useWindowDimensions();
  const scaleSize = (size: number) => (width / 375) * size;

  return { width, height, scaleSize };
};
