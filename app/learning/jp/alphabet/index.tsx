import { Stack } from 'expo-router';
import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { router, useLocalSearchParams, usePathname } from 'expo-router';

const Alphabet: React.FC = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { tab } = useLocalSearchParams();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>(
    tab?.toString() || 'hiragana'
  );

  // Refresh callback
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Character sets with romaji and progress (0-100%) organized into rows
  const hiraganaCharacters = [
    [
      { id: 'a', char: 'あ', romaji: 'a', progress: 100 },
      { id: 'i', char: 'い', romaji: 'i', progress: 100 },
      { id: 'u', char: 'う', romaji: 'u', progress: 100 },
      { id: 'e', char: 'え', romaji: 'e', progress: 90 },
      { id: 'o', char: 'お', romaji: 'o', progress: 70 },
    ],
    [
      { id: 'ka', char: 'か', romaji: 'ka', progress: 30 },
      { id: 'ki', char: 'き', romaji: 'ki', progress: 60 },
      { id: 'ku', char: 'く', romaji: 'ku', progress: 40 },
      { id: 'ke', char: 'け', romaji: 'ke', progress: 70 },
      { id: 'ko', char: 'こ', romaji: 'ko', progress: 25 },
    ],
    [
      { id: 'sa', char: 'さ', romaji: 'sa', progress: 15 },
      { id: 'shi', char: 'し', romaji: 'shi', progress: 85 },
      { id: 'su', char: 'す', romaji: 'su', progress: 35 },
      { id: 'se', char: 'せ', romaji: 'se', progress: 45 },
      { id: 'so', char: 'そ', romaji: 'so', progress: 55 },
    ],
    [
      { id: 'ta', char: 'た', romaji: 'ta', progress: 65 },
      { id: 'chi', char: 'ち', romaji: 'chi', progress: 75 },
      { id: 'tsu', char: 'つ', romaji: 'tsu', progress: 95 },
      { id: 'te', char: 'て', romaji: 'te', progress: 5 },
      { id: 'to', char: 'と', romaji: 'to', progress: 3 },
    ],
    [
      { id: 'na', char: 'な', romaji: 'na', progress: 0 },
      { id: 'ni', char: 'に', romaji: 'ni', progress: 0 },
      { id: 'nu', char: 'ぬ', romaji: 'nu', progress: 0 },
      { id: 'ne', char: 'ね', romaji: 'ne', progress: 0 },
      { id: 'no', char: 'の', romaji: 'no', progress: 0 },
    ],
    [
      { id: 'ha', char: 'は', romaji: 'ha', progress: 0 },
      { id: 'hi', char: 'ひ', romaji: 'hi', progress: 0 },
      { id: 'fu', char: 'ふ', romaji: 'fu', progress: 0 },
      { id: 'he', char: 'へ', romaji: 'he', progress: 0 },
      { id: 'ho', char: 'ほ', romaji: 'ho', progress: 0 },
    ],
    [
      { id: 'ma', char: 'ま', romaji: 'ma', progress: 0 },
      { id: 'mi', char: 'み', romaji: 'mi', progress: 0 },
      { id: 'mu', char: 'む', romaji: 'mu', progress: 0 },
      { id: 'me', char: 'め', romaji: 'me', progress: 0 },
      { id: 'mo', char: 'も', romaji: 'mo', progress: 0 },
    ],
    [
      { id: 'ya', char: 'や', romaji: 'ya', progress: 0 },
      { id: 'yu', char: 'ゆ', romaji: 'yu', progress: 0 },
      { id: 'yo', char: 'よ', romaji: 'yo', progress: 0 },
    ],
    [
      { id: 'ra', char: 'ら', romaji: 'ra', progress: 0 },
      { id: 'ri', char: 'り', romaji: 'ri', progress: 0 },
      { id: 'ru', char: 'る', romaji: 'ru', progress: 0 },
      { id: 're', char: 'れ', romaji: 're', progress: 0 },
      { id: 'ro', char: 'ろ', romaji: 'ro', progress: 0 },
    ],
    [
      { id: 'wa', char: 'わ', romaji: 'wa', progress: 0 },
      { id: 'wo', char: 'を', romaji: 'wo', progress: 0 },
      { id: 'n', char: 'ん', romaji: 'n', progress: 0 },
    ],
  ];

  const katakanaCharacters = [
    [
      { id: 'a', char: 'ア', romaji: 'a', progress: 100 },
      { id: 'i', char: 'イ', romaji: 'i', progress: 100 },
      { id: 'u', char: 'ウ', romaji: 'u', progress: 100 },
      { id: 'e', char: 'エ', romaji: 'e', progress: 90 },
      { id: 'o', char: 'オ', romaji: 'o', progress: 70 },
    ],
    [
      { id: 'ka', char: 'カ', romaji: 'ka', progress: 30 },
      { id: 'ki', char: 'キ', romaji: 'ki', progress: 60 },
      { id: 'ku', char: 'ク', romaji: 'ku', progress: 40 },
      { id: 'ke', char: 'ケ', romaji: 'ke', progress: 70 },
      { id: 'ko', char: 'コ', romaji: 'ko', progress: 25 },
    ],
    [
      { id: 'sa', char: 'サ', romaji: 'sa', progress: 15 },
      { id: 'shi', char: 'シ', romaji: 'shi', progress: 85 },
      { id: 'su', char: 'ス', romaji: 'su', progress: 35 },
      { id: 'se', char: 'セ', romaji: 'se', progress: 45 },
      { id: 'so', char: 'ソ', romaji: 'so', progress: 55 },
    ],
    [
      { id: 'ta', char: 'タ', romaji: 'ta', progress: 65 },
      { id: 'chi', char: 'チ', romaji: 'chi', progress: 75 },
      { id: 'tsu', char: 'ツ', romaji: 'tsu', progress: 95 },
      { id: 'te', char: 'テ', romaji: 'te', progress: 5 },
      { id: 'to', char: 'ト', romaji: 'to', progress: 3 },
    ],
    [
      { id: 'na', char: 'ナ', romaji: 'na', progress: 0 },
      { id: 'ni', char: 'ニ', romaji: 'ni', progress: 0 },
      { id: 'nu', char: 'ヌ', romaji: 'nu', progress: 0 },
      { id: 'ne', char: 'ネ', romaji: 'ne', progress: 0 },
      { id: 'no', char: 'ノ', romaji: 'no', progress: 0 },
    ],
    [
      { id: 'ha', char: 'ハ', romaji: 'ha', progress: 0 },
      { id: 'hi', char: 'ヒ', romaji: 'hi', progress: 0 },
      { id: 'fu', char: 'フ', romaji: 'fu', progress: 0 },
      { id: 'he', char: 'ヘ', romaji: 'he', progress: 0 },
      { id: 'ho', char: 'ホ', romaji: 'ho', progress: 0 },
    ],
    [
      { id: 'ma', char: 'マ', romaji: 'ma', progress: 0 },
      { id: 'mi', char: 'ミ', romaji: 'mi', progress: 0 },
      { id: 'mu', char: 'ム', romaji: 'mu', progress: 0 },
      { id: 'me', char: 'メ', romaji: 'me', progress: 0 },
      { id: 'mo', char: 'モ', romaji: 'mo', progress: 0 },
    ],
    [
      { id: 'ya', char: 'ヤ', romaji: 'ya', progress: 0 },
      { id: 'yu', char: 'ユ', romaji: 'yu', progress: 0 },
      { id: 'yo', char: 'ヨ', romaji: 'yo', progress: 0 },
    ],
    [
      { id: 'ra', char: 'ラ', romaji: 'ra', progress: 0 },
      { id: 'ri', char: 'リ', romaji: 'ri', progress: 0 },
      { id: 'ru', char: 'ル', romaji: 'ru', progress: 0 },
      { id: 're', char: 'レ', romaji: 're', progress: 0 },
      { id: 'ro', char: 'ロ', romaji: 'ro', progress: 0 },
    ],
    [
      { id: 'wa', char: 'ワ', romaji: 'wa', progress: 0 },
      { id: 'wo', char: 'ヲ', romaji: 'wo', progress: 0 },
      { id: 'n', char: 'ン', romaji: 'n', progress: 0 },
    ],
  ];

  useEffect(() => {
    if (tab && ['hiragana', 'katakana'].includes(tab.toString())) {
      setActiveTab(tab.toString());
    }
  }, [tab]);

  // Get characters based on active tab
  const getCharacters = () => {
    switch (activeTab) {
      case 'hiragana':
        return hiraganaCharacters;
      case 'katakana':
        return katakanaCharacters;
      default:
        return hiraganaCharacters;
    }
  };

  const characters = getCharacters();

  // Navigate to practice page
  const handlePractice = (charId: string) => {
    router.push({
      pathname: `learning/jp/alphabet/${charId}`,
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <ScrollView
          className="w-full p-4"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.content}>
              {/* Tabs */}
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setActiveTab('hiragana');
                    router.push('/learning/jp/alphabet?tab=hiragana');
                  }}
                  style={[
                    styles.tab,
                    activeTab === 'hiragana' && styles.activeTab,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === 'hiragana' && styles.activeTabText,
                    ]}
                  >
                    Hiragana
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setActiveTab('katakana');
                    router.push('/learning/jp/alphabet?tab=katakana');
                  }}
                  style={[
                    styles.tab,
                    activeTab === 'katakana' && styles.activeTab,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === 'katakana' && styles.activeTabText,
                    ]}
                  >
                    Katakana
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Character Grid */}
              <View style={styles.gridContainer}>
                {characters.map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.row}>
                    {row.map((char) => (
                      <TouchableOpacity
                        key={char.id}
                        style={styles.characterContainer}
                        onPress={() => handlePractice(char.id)}
                      >
                        <View
                          style={[
                            styles.characterBox,
                            char.progress === 100 && {
                              backgroundColor: '#FFA500',
                            },
                          ]}
                        >
                          <Text style={styles.characterDisplay}>
                            {char.char}
                          </Text>
                          <Text style={styles.characterRomaji}>
                            {char.romaji}
                          </Text>
                          {char.progress < 100 && (
                            <View style={styles.progressBarContainer}>
                              <View
                                style={[
                                  styles.progressBar,
                                  { width: `${char.progress}%` },
                                ]}
                              />
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

// Styles (unchanged)
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#3B82F6',
  },
  gridContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
  },
  characterContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  characterBox: {
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  characterDisplay: {
    fontSize: 24,
    color: '#1F2937',
    fontWeight: '600',
    textAlign: 'center',
  },
  characterRomaji: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
});

export default Alphabet;
