import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import CustomText from '../assets/fonts/components/CustomText';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; // RootStackParamList 가져오기
import LinearGradient from 'react-native-linear-gradient'; // 그라데이션 컴포넌트 가져오기
import { useRef } from 'react';

// StackNavigationProp을 사용해 타입 지정
type MainPageNavigationProp = StackNavigationProp<RootStackParamList, 'MainPage'>;

const MainPage: React.FC = () => {
  const navigation = useNavigation<MainPageNavigationProp>(); // 네비게이션 타입 지정
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.containermain}>
      {/* 모의 면접 버튼 */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity 
          style={[styles.buttonWrapper, styles.shadowEffect]} 
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={() => navigation.navigate('SelectJob')} // SelectJob으로 이동
        >
          <LinearGradient 
            colors={['#E0BBE4', '#957DAD']} // 그라데이션 색상
            style={styles.button}
          >
            <Image source={require('../assets/images/Interview.png')} style={styles.icon} />
            <CustomText style={styles.buttonTitle}>모의 면접 +</CustomText>
            <View style={styles.descriptionContainer}>
              <CustomText style={styles.buttonDescription}>여러 주제를 선택한 연습</CustomText>
              <CustomText style={styles.buttonDescription}>실제 면접처럼 자신감 키우기</CustomText>
              <CustomText style={styles.buttonDescription}>AI를 통한 완벽한 면접 준비</CustomText>
              <CustomText style={styles.buttonDescription}>다양한 질문에 대비한 실전 감각 키우기</CustomText>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* 코딩 레벨 버튼 */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity 
          style={[styles.buttonWrapper, styles.shadowEffect]} 
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={() => navigation.navigate('CodingLevel')} // CodingLevel로 이동
        >
          <LinearGradient 
            colors={['#ADD8E6', '#5DADE2']} // 그라데이션 색상
            style={styles.button}
          >
            <Image source={require('../assets/images/Test.png')} style={styles.icon} />
            <CustomText style={styles.buttonTitle}>코딩 레벨 +</CustomText>
            <View style={styles.descriptionContainer}>
              <CustomText style={styles.buttonDescription}>테스트를 통한 코딩 레벨 평가</CustomText>
              <CustomText style={styles.buttonDescription}>실력 점검 및 필요한 부분 개선</CustomText>
              <CustomText style={styles.buttonDescription}>다양한 문제를 풀어 실력 향상</CustomText>
              <CustomText style={styles.buttonDescription}>자신의 실력에 따라 단계적으로 테스트 공부</CustomText>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.footer}>
  <CustomText style={styles.footerText}>
    © 2024 Inter Bot. All Rights Reserved.
  </CustomText>
</View>
      </Animated.View>
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
  buttonWrapper: {
    marginBottom: 20,
  },
  button: {
    borderRadius: 15,
    padding: 20,
    alignItems: 'flex-start',
    height: 290,
    position: 'relative',
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
  descriptionContainer: {
    marginTop: 'auto', // 내용이 버튼의 아래쪽에 위치하도록 설정
    paddingBottom: 10, // 아래쪽에 약간의 여백 추가
  },
  buttonDescription: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  shadowEffect: {
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 5 }, // 그림자 오프셋
    shadowOpacity: 0.3, // 그림자 투명도
    shadowRadius: 6.27, // 그림자 반경
    elevation: 10, // 안드로이드용 그림자 효과
  },

  footer: {
    marginTop: 'auto',
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#888888',
  },

});

export default MainPage;
