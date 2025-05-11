import { Stack, useRouter } from 'expo-router';
import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const AlphabetDetail: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { alphabet } = useLocalSearchParams();
  const router = useRouter();

  const romaji = Array.isArray(alphabet) ? alphabet[0] : alphabet || 'a';
  const charMap: { [key: string]: { char: string; type: string } } = {
    a: { char: 'あ', type: 'Hiragana' },
    i: { char: 'い', type: 'Hiragana' },
    u: { char: 'う', type: 'Hiragana' },
    e: { char: 'え', type: 'Hiragana' },
    o: { char: 'お', type: 'Hiragana' },
    ka: { char: 'か', type: 'Hiragana' },
    ki: { char: 'き', type: 'Hiragana' },
    ku: { char: 'く', type: 'Hiragana' },
    ke: { char: 'け', type: 'Hiragana' },
    ko: { char: 'こ', type: 'Hiragana' },
    sa: { char: 'さ', type: 'Hiragana' },
    shi: { char: 'し', type: 'Hiragana' },
    su: { char: 'す', type: 'Hiragana' },
    se: { char: 'せ', type: 'Hiragana' },
    so: { char: 'そ', type: 'Hiragana' },
    ta: { char: 'た', type: 'Hiragana' },
    chi: { char: 'ち', type: 'Hiragana' },
    tsu: { char: 'つ', type: 'Hiragana' },
    te: { char: 'て', type: 'Hiragana' },
    to: { char: 'と', type: 'Hiragana' },
    na: { char: 'な', type: 'Hiragana' },
    ni: { char: 'に', type: 'Hiragana' },
    nu: { char: 'ぬ', type: 'Hiragana' },
    ne: { char: 'ね', type: 'Hiragana' },
    no: { char: 'の', type: 'Hiragana' },
    ha: { char: 'は', type: 'Hiragana' },
    hi: { char: 'ひ', type: 'Hiragana' },
    fu: { char: 'ふ', type: 'Hiragana' },
    he: { char: 'へ', type: 'Hiragana' },
    ho: { char: 'ほ', type: 'Hiragana' },
    ma: { char: 'ま', type: 'Hiragana' },
    mi: { char: 'み', type: 'Hiragana' },
    mu: { char: 'む', type: 'Hiragana' },
    me: { char: 'め', type: 'Hiragana' },
    mo: { char: 'も', type: 'Hiragana' },
    ya: { char: 'や', type: 'Hiragana' },
    yu: { char: 'ゆ', type: 'Hiragana' },
    yo: { char: 'よ', type: 'Hiragana' },
    ra: { char: 'ら', type: 'Hiragana' },
    ri: { char: 'り', type: 'Hiragana' },
    ru: { char: 'る', type: 'Hiragana' },
    re: { char: 'れ', type: 'Hiragana' },
    ro: { char: 'ろ', type: 'Hiragana' },
    wa: { char: 'わ', type: 'Hiragana' },
    wo: { char: 'を', type: 'Hiragana' },
    n: { char: 'ん', type: 'Hiragana' },
  };
  const { char, type } = charMap[romaji] || { char: 'あ', type: 'Hiragana' };

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

  const hiraganaFlat = hiraganaCharacters.flat();
  const katakanaFlat = katakanaCharacters.flat();
  const characterSet = type === 'Hiragana' ? hiraganaFlat : katakanaFlat;
  const currentIndex = characterSet.findIndex((item) => item.id === romaji);
  const prevChar = currentIndex > 0 ? characterSet[currentIndex - 1] : null;
  const nextChar =
    currentIndex < characterSet.length - 1
      ? characterSet[currentIndex + 1]
      : null;

  const practiceStats = {
    correct: 7,
    totalQuestions: 7,
    wrong: 0,
    details: [
      { char: 'あ', romaji: 'a', correct: 4, total: 4, percentage: 100 },
    ],
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const speak = (text: string) => {
    console.log('Attempting to speak:', text);
    Speech.speak(text, {
      language: 'ja',
      pitch: 1.0,
      rate: 1.0,
      onError: (error) => {
        console.error('Text-to-speech error:', error);
        Alert.alert('Text-to-speech error', error.message);
      },
      onDone: () => console.log('Text-to-speech finished'),
    });
  };

  const checkLanguages = async () => {
    const availableVoices = await Speech.getAvailableVoicesAsync();
    console.log('Available voices:', availableVoices);
  };

  React.useEffect(() => {
    checkLanguages();
  }, []);

  const handleStrokeOrderPress = () => {
    router.push({
      pathname: '/learning/jp/alphabet/[alphabet]/stroke',
      params: { char },
    });
  };

  const handlePractice = (charId: string) => {
    router.push(`/learning/jp/alphabet/${charId}`);
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
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.headerContainer}>
                <Text style={styles.characterText}>{char}</Text>
                <Text style={styles.typeText}>{type}</Text>
                <Text style={styles.romajiText}>{romaji}</Text>
              </View>
              <View style={styles.navContainer}>
                <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={() => speak(romaji)}>
                    <MaterialIcons
                      name="volume-up"
                      size={24}
                      color="#1E90FF"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MaterialIcons
                      name="gesture"
                      size={24}
                      color="#1E90FF"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.statsCard}>
                <Text style={styles.sectionTitle}>Practice stats</Text>
                <View style={styles.statsRow}>
                  <View style={styles.progressCircle}>
                    <Text style={styles.progressText}>
                      {practiceStats.details[0].percentage}%
                    </Text>
                  </View>
                  <View style={styles.statsColumn}>
                    <View style={styles.statsItem}>
                      <Text style={styles.statsLabel}>Correct</Text>
                      <Text style={styles.statsValue}>
                        {practiceStats.correct} / {practiceStats.totalQuestions}
                      </Text>
                    </View>
                    <View style={styles.statsItem}>
                      <Text style={styles.statsLabel}>Wrong</Text>
                      <Text style={styles.statsValue}>
                        {practiceStats.wrong} / {practiceStats.totalQuestions}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.statsCard}
                onPress={handleStrokeOrderPress}
              >
                <Text style={styles.sectionTitle}>
                  Stroke order (tap to draw)
                </Text>
                <View style={styles.strokeOrderContainer}>
                  <Text style={styles.strokeCharacterText}>{char}</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.navigationContainer}>
                {prevChar && (
                  <TouchableOpacity
                    onPress={() => handlePractice(prevChar.id)}
                    style={styles.navButton}
                  >
                    <MaterialIcons
                      name="keyboard-double-arrow-left"
                      size={24}
                      color="#1E90FF"
                    />
                    <Text style={styles.navButtonText}>
                      Previous ({prevChar.romaji.toUpperCase()})
                    </Text>
                  </TouchableOpacity>
                )}
                <View style={styles.spacer} />
                {nextChar && (
                  <TouchableOpacity
                    onPress={() => handlePractice(nextChar.id)}
                    style={styles.navButton}
                  >
                    <Text style={styles.navButtonText}>
                      Next ({nextChar.romaji.toUpperCase()})
                    </Text>
                    <MaterialIcons
                      name="keyboard-double-arrow-right"
                      size={24}
                      color="#1E90FF"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingBottom: 20 },
  container: { flex: 1 },
  content: { padding: 16 },
  headerContainer: { alignItems: 'center', marginBottom: 20 },
  characterText: { fontSize: 120, color: '#666666', fontWeight: 'bold' },
  typeText: { fontSize: 24, color: '#666666', marginTop: -15 },
  romajiText: { fontSize: 36, color: '#666666', fontStyle: 'italic' },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: { flexDirection: 'row' },
  icon: { marginLeft: 15 },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: { color: '#1E90FF', fontSize: 16, fontWeight: 'bold' },
  statsColumn: { flex: 1, marginHorizontal: 15 },
  statsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  statsLabel: { fontSize: 14, color: '#666666' },
  statsValue: { fontSize: 14, color: '#333333', fontWeight: 'bold' },
  strokeOrderContainer: { alignItems: 'center', marginTop: 10 },
  strokeCharacterText: { fontSize: 60, color: '#999999' },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  navButtonText: {
    color: '#1E90FF',
    fontSize: 16,
    marginHorizontal: 8,
  },
  spacer: {
    flex: 1,
  },
});

export default AlphabetDetail;
