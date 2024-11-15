import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type FeedbackRouteProp = RouteProp<RootStackParamList, 'Feedback'>;

const Feedback: React.FC = () => {
  const route = useRoute<FeedbackRouteProp>();
  const { evaluation } = route.params;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [evaluation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>면접 결과 피드백</Text>
      <View style={styles.separator} />
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.feedbackText}>{evaluation}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#cccccc',
    marginVertical: 16,
  },
  scrollViewContainer: {
    paddingBottom: 16,
  },
  feedbackText: {
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
  },
});

export default Feedback;
