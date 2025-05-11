import { Stack } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Svg, { Path, Image as SvgImage } from 'react-native-svg';

// Type definition for character data
interface CharacterStrokeData {
  char: string;
  type: string;
  romaji: string;
  strokeImageUrl: string; // URL to the image with character and stroke numbers
}

// Sample data (replace with API call later)
const characterStrokeData: { [key: string]: CharacterStrokeData } = {
  あ: {
    char: 'あ',
    type: 'Hiragana',
    romaji: 'a',
    strokeImageUrl: 'https://example.com/stroke-orders/hiragana-a.png', // Replace with actual URL
  },
  い: {
    char: 'い',
    type: 'Hiragana',
    romaji: 'i',
    strokeImageUrl: 'https://example.com/stroke-orders/hiragana-i.png',
  },
  う: {
    char: 'う',
    type: 'Hiragana',
    romaji: 'u',
    strokeImageUrl: 'https://example.com/stroke-orders/hiragana-u.png',
  },
  え: {
    char: 'え',
    type: 'Hiragana',
    romaji: 'e',
    strokeImageUrl: 'https://example.com/stroke-orders/hiragana-e.png',
  },
  お: {
    char: 'お',
    type: 'Hiragana',
    romaji: 'o',
    strokeImageUrl: 'https://example.com/stroke-orders/hiragana-o.png',
  },
};

// Get screen dimensions for canvas sizing
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CANVAS_SIZE = SCREEN_WIDTH * 0.8; // 80% of screen width

const StrokeOrderScreen: React.FC = () => {
  const { char = 'あ' } = useLocalSearchParams();

  // Get character details from sample data
  const characterDetails =
    characterStrokeData[char as string] || characterStrokeData['あ'];

  // State for drawing paths
  const [paths, setPaths] = useState<string[]>([]);
  const currentPath = useRef<string[]>([]);
  const [showGrid, setShowGrid] = useState(true); // State to toggle grid visibility

  // Handle drawing on the canvas with boundary checks
  const onPanGestureEvent = ({
    nativeEvent,
  }: PanGestureHandlerGestureEvent) => {
    let { x, y } = nativeEvent;

    // Ensure the drawing stays within the canvas boundaries
    x = Math.max(0, Math.min(x, CANVAS_SIZE));
    y = Math.max(0, Math.min(y, CANVAS_SIZE));

    if (currentPath.current.length === 0) {
      currentPath.current.push(`M${x},${y}`);
    } else {
      currentPath.current.push(`L${x},${y}`);
    }
  };

  const onPanHandlerStateChange = ({
    nativeEvent,
  }: PanGestureHandlerGestureEvent) => {
    if (nativeEvent.state === 5) {
      // Gesture ended
      if (currentPath.current.length > 0) {
        setPaths([...paths, currentPath.current.join(' ')]);
      }
      currentPath.current = [];
    }
  };

  // Clear the canvas
  const clearCanvas = () => {
    setPaths([]);
    currentPath.current = [];
  };

  // Toggle grid visibility
  const toggleGrid = () => {
    setShowGrid((prev) => !prev);
  };

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={styles.centeredView}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.typeText}>{characterDetails.type}</Text>
              <Text style={styles.romajiText}>
                {characterDetails.romaji.toUpperCase()}
              </Text>
            </View>
            <View style={styles.strokeContainer}>
              {/* Grid Overlay */}
              {showGrid && (
                <View style={styles.gridOverlay}>
                  <View style={styles.gridLineVertical} />
                  <View style={styles.gridLineHorizontal} />
                </View>
              )}
              {/* Drawable Canvas with Stroke Order Image */}
              <PanGestureHandler
                onGestureEvent={onPanGestureEvent}
                onHandlerStateChange={onPanHandlerStateChange}
              >
                <View style={styles.canvasContainer}>
                  <Svg width={CANVAS_SIZE} height={CANVAS_SIZE}>
                    {/* Stroke order image as a background */}
                    <SvgImage
                      x={0}
                      y={0}
                      width={CANVAS_SIZE}
                      height={CANVAS_SIZE}
                      href={{ uri: characterDetails.strokeImageUrl }}
                      opacity={0.3} // Faintly visible for tracing
                      preserveAspectRatio="xMidYMid meet"
                    />
                    {/* Drawn paths */}
                    {paths.map((path, index) => (
                      <Path
                        key={index}
                        d={path}
                        stroke="#000000" // Changed to black
                        strokeWidth={5}
                        fill="none"
                        strokeCap="round"
                        strokeJoin="round"
                      />
                    ))}
                    {currentPath.current.length > 0 && (
                      <Path
                        d={currentPath.current.join(' ')}
                        stroke="#000000" // Changed to black
                        strokeWidth={5}
                        fill="none"
                        strokeCap="round"
                        strokeJoin="round"
                      />
                    )}
                  </Svg>
                </View>
              </PanGestureHandler>
            </View>
            <View style={styles.navContainer}>
              <TouchableOpacity onPress={toggleGrid}>
                <MaterialIcons
                  name={showGrid ? 'grid-on' : 'grid-off'}
                  size={24}
                  color="#1E90FF"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons
                  name="visibility-off"
                  size={24}
                  color="#1E90FF"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={clearCanvas}>
                <MaterialIcons
                  name="refresh"
                  size={24}
                  color="#1E90FF"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

// Updated Styles
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Changed to white
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  typeText: {
    fontSize: 24,
    color: '#333333', // Darker text color for better contrast on white background
    marginBottom: 5,
  },
  romajiText: {
    fontSize: 36,
    color: '#333333', // Darker text color for better contrast on white background
    fontStyle: 'italic',
  },
  strokeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
  },
  gridOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridLineVertical: {
    position: 'absolute',
    width: 1,
    height: '100%',
    backgroundColor: '#666666',
    opacity: 0.5,
  },
  gridLineHorizontal: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: '#666666',
    opacity: 0.5,
  },
  canvasContainer: {
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
    backgroundColor: 'transparent',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default StrokeOrderScreen;
