import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CustomText from '../assets/fonts/components/CustomText';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; // RootStackParamList 가져오기

// StackNavigationProp을 사용해 타입 지정
type MainPageNavigationProp = StackNavigationProp<RootStackParamList, 'MainPage'>;

const MainPage: React.FC = () => {
  const navigation = useNavigation<MainPageNavigationProp>(); // 네비게이션 타입 지정

  return (
    <View style={styles.containermain}>
      {/* 모의 면접 버튼 */}
      <TouchableOpacity 
        style={[styles.button, styles.mockInterviewButton]} 
        onPress={() => navigation.navigate('SelectJob')} // SelectJob으로 이동
      >
        <Image source={require('../assets/images/Interview.png')} style={styles.icon} />
        <CustomText style={styles.buttonTitle}>모의 면접 +</CustomText>
        <CustomText style={styles.buttonDescription}>주제를 선택하여 연습을 해보세요!</CustomText>
      </TouchableOpacity>

      {/* 코딩 테스트 버튼 */}
      <TouchableOpacity 
        style={[styles.button, styles.codingTestButton]} 
        onPress={() => console.log('코딩 테스트 버튼 클릭')}
      >
        <Image source={require('../assets/images/Test.png')} style={styles.icon} />
        <CustomText style={styles.buttonTitle}>코딩 테스트 +</CustomText>
        <CustomText style={styles.buttonDescription}>당신의 실력을 키워보세요!</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containermain: {
  
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#F0F4F8', 
  },
  button: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'flex-start',
    height: 200,
    position: 'relative',
  },
  mockInterviewButton: {
    backgroundColor: '#E0BBE4',
  },
  codingTestButton: {
    backgroundColor: '#ADD8E6',
  },
  icon: {
    width: 70,
    height: 70,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  buttonTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  buttonDescription: {
    fontSize: 17,
    color: '#666666',
    marginTop: 100,
  },
});

export default MainPage;
