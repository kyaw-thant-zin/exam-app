import { Stack, useNavigation } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { RouteProp, NavigationProp } from '@react-navigation/native';

interface LearningDetailParams {
  learningId?: string;
  name?: string;
  date?: string;
  imageKey?: string;
  alphabet?: string; // Add alphabet to params interface
}

type LearningDetailParamList = {
  '[learningId]': LearningDetailParams;
  'jp/alphabet/[alphabet]/index': LearningDetailParams; // Add this route to the param list
};

type LearningDetailRouteProp = RouteProp<
  LearningDetailParamList,
  '[learningId]' | 'jp/alphabet/[alphabet]/index'
>;
type NavigationProps = NavigationProp<LearningDetailRouteProp>;

export default function Layout() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <Stack>
      <Stack.Screen
        name="[learningId]"
        options={{
          title: 'Detail',
          headerShown: true,
          headerLeft: () => <ChevronLeft onPress={() => navigation.goBack()} />,
        }}
      />
      <Stack.Screen
        name="jp/alphabet/index"
        options={{
          title: 'Alphabet',
          headerShown: true,
          headerLeft: () => <ChevronLeft onPress={() => navigation.goBack()} />,
        }}
      />
      <Stack.Screen
        name="jp/alphabet/[alphabet]/index"
        options={({ route }) => {
          // Extract the alphabet parameter from the route
          const { alphabet } = route.params || {};
          return {
            title: alphabet ? `Learning "${alphabet}"` : 'Learning Detail3',
            headerShown: true,
          };
        }}
      />
      <Stack.Screen
        name="jp/alphabet/[alphabet]/stroke"
        options={{ title: 'Learning Storke', headerShown: true }}
      />

      <Stack.Screen
        name="exam/[examId]/play"
        options={{
          title: 'Play',
          headerShown: true,
          headerBackVisible: false, 
        }}
      />
    </Stack>
  );
}
