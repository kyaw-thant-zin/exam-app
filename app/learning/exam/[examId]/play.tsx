import { useLocalSearchParams, Stack } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';

// Get device width for full-screen image and modal
const { width } = Dimensions.get('window');

interface ExamParams {
  id?: string;
  name?: string;
  date?: string;
  imageKey?: string;
  description?: string;
}

const PlayExam: React.FC = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [result, setResult] = useState<{ isCorrect: boolean; explanation: string } | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const totalQuestions = 10;

  const navigation = useNavigation();
  const params = useLocalSearchParams() as ExamParams;
  const { id, name, date, imageKey, description } = params || {};

  const jobData = {
    id: id || 'unknown-id',
    name: name || 'Single Choice Exam',
    img: imageKey
      ? `https://random.imagecdn.app/500/150?category=tech`
      : 'https://random.imagecdn.app/500/150?category=tech',
    date: date || 'Date not available',
    description:
      description ||
      `What process is depicted in the image above? This question tests your understanding of the water cycle.`,
    location: 'Online Classroom',
  };

  // Sample questions with correct answer and explanation
  const questions = [
    {
      id: '1',
      description: `What process is depicted in the image above? This question tests your understanding of the water cycle.`,
      img: 'https://random.imagecdn.app/500/150?category=tech',
      options: [
        { id: '1', label: 'Evaporation' },
        { id: '2', label: 'Condensation' },
        { id: '3', label: 'Precipitation' },
        { id: '4', label: 'Transpiration' },
      ],
      correctAnswer: 'Evaporation',
      explanation:
        'The image shows water turning into vapor, which is the process of evaporation, a key part of the water cycle.',
    },
    {
      id: '2',
      description: `What process is depicted in the image above? This question tests your understanding of the water cycle.`,
      img: 'https://random.imagecdn.app/500/150?category=tech',
      options: [
        { id: '1', label: 'Evaporation' },
        { id: '2', label: 'Condensation' },
        { id: '3', label: 'Precipitation' },
        { id: '4', label: 'Transpiration' },
      ],
      correctAnswer: 'Condensation',
      explanation:
        'The image depicts condensation, where water vapor cools and turns back into liquid form.',
    },
    // Add more questions as needed
  ];

  const currentQuestionData = questions[currentQuestion - 1] || questions[0];

  // Calculate progress: 0% at start (question 1), 100% after last question
  const progressPercentage = ((currentQuestion - 1) / totalQuestions) * 100;

  // Refresh callback
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Handle option selection
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowAlert(false);
  };

  // Handle navigation
  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
      setModalVisible(false);
      setShowAlert(false);
    }
  };

  const handleNext = () => {
    if (!selectedOption) {
      setShowAlert(true);
      return;
    }

    // Check if the answer is correct
    const isCorrect = selectedOption === currentQuestionData.correctAnswer;
    setResult({
      isCorrect,
      explanation: currentQuestionData.explanation,
    });
    setModalVisible(true);

    // Move to the next question after the modal is acknowledged
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Modal for Result and Explanation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Incorrect/Correct Status */}
            <Text style={styles.modalTitle}>
              {result?.isCorrect ? 'Correct!' : 'Incorrect'}
            </Text>
            {/* Question Image */}
            <Image
              source={{ uri: currentQuestionData.img }}
              style={styles.modalImage}
              resizeMode="cover"
            />
            {/* Explanation Description */}
            <Text style={styles.modalExplanation}>{result?.explanation}</Text>
            {/* Selected Answer */}
            <Text style={styles.modalSelectedAnswer}>
              Your Answer: {selectedOption || 'None'}
            </Text>
            {/* Correct Answer */}
            <Text style={styles.modalCorrectAnswer}>
              Correct Answer: {currentQuestionData.correctAnswer}
            </Text>
            {/* Continue Button */}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView
        className="w-full"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Stack.Screen
          options={{
            title: jobData.name,
            headerStyle: { backgroundColor: '#FFFFFF' },
            headerTintColor: '#1F2937',
            headerBackVisible: false,
          }}
        />
        <View style={styles.content}>
          {/* Progress Indicator (Above Image) */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              Question {currentQuestion} of {totalQuestions}
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${progressPercentage}%` }]}
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round(progressPercentage)}%
            </Text>
          </View>

          {/* Exam Image with Spacing */}
          <Image
            source={{ uri: currentQuestionData.img }}
            style={styles.examImage}
            resizeMode="cover"
          />

          {/* Description Below Image (Aligned Left) */}
          <Text style={styles.description}>{currentQuestionData.description}</Text>

          {/* Options List (Aligned Left, Same Width as Description) */}
          <FlatList
            data={currentQuestionData.options}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedOption === item.label && styles.selectedOption,
                ]}
                onPress={() => handleOptionSelect(item.label)}
              >
                <View style={styles.radioCircle}>
                  {selectedOption === item.label && (
                    <View style={styles.selectedRadio} />
                  )}
                </View>
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
          />

          {/* Navigation Buttons */}
          <View style={styles.navigationContainer}>
            {currentQuestion > 1 && (
              <TouchableOpacity
                style={[styles.navButton, styles.previousButton]}
                onPress={handlePrevious}
              >
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
            )}
            <View style={styles.nextButtonContainer}>
              <TouchableOpacity
                style={[styles.navButton, styles.nextButton]}
                onPress={handleNext}
                disabled={currentQuestion === totalQuestions && !selectedOption}
              >
                <Text
                  style={[
                    styles.navButtonText,
                    styles.nextButtonText,
                    currentQuestion === totalQuestions && !selectedOption && styles.disabledText,
                  ]}
                >
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {showAlert && (
            <Text style={styles.alertText}>Please select an option to proceed.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    padding: 16,
    alignItems: 'flex-start',
  },
  examImage: {
    width: width - 32,
    height: 200,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'left',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    width: width - 32,
  },
  selectedOption: {
    backgroundColor: '#E0F7FA',
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00BCD4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadio: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#00BCD4',
  },
  optionText: {
    fontSize: 16,
    color: '#1F2937',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
  },
  nextButtonContainer: {
    width: '48%', // Slightly less than 50% to account for spacing
  },
  navButton: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 5,
    alignItems: 'center',
  },
  previousButton: {
    width: '48%', // Slightly less than 50% to account for spacing
    backgroundColor: '#FFFFFF',
  },
  nextButton: {
    backgroundColor: '#00BCD4',
    borderColor: '#00BCD4',
  },
  navButtonText: {
    fontSize: 16,
    color: '#6B7280',
  },
  nextButtonText: {
    color: '#FFFFFF',
  },
  disabledText: {
    color: '#A1A1AA',
  },
  alertText: {
    fontSize: 14,
    color: '#EF4444',
    marginBottom: 10,
    textAlign: 'right',
    width: '100%',
  },
  progressContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    marginVertical: 5,
  },
  progressBar: {
    width: '90%',
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00BCD4',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  modalSelectedAnswer: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 5,
  },
  modalCorrectAnswer: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 20,
  },
  modalExplanation: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'left',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#00BCD4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default PlayExam;