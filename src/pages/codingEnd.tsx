import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import ConfettiCannon from 'react-native-confetti-cannon';

const CodingEnd = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showConfetti, setShowConfetti] = useState(true);

  return (
    <View style={styles.container}>
      {showConfetti && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />}
      <Text style={styles.congratsText}>축하합니다!</Text>
      <Text style={styles.messageText}>모든 코딩 테스트 문제를 해결했습니다!</Text>
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('MainPage')}>
        <Text style={styles.buttonText}>홈으로 돌아가기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100, // 텍스트를 위로 올리기 위해 상단 패딩 추가
  },
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: '#87CEEB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 70
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CodingEnd;
