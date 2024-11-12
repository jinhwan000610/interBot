import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // useNavigation을 가져옵니다.
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; // RootStackParamList 가져오기

// 네비게이션 타입 정의
type CodingLevelNavigationProp = StackNavigationProp<RootStackParamList, 'CodingTest'>;

const CodingLevel: React.FC = () => {
  const navigation = useNavigation<CodingLevelNavigationProp>(); // 네비게이션 객체 타입 지정

  const handleLevelSelection = () => {
    navigation.navigate('CodingTest'); // 'CodingTest'로 이동
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <Text style={styles.header}>난이도를 선택해주세요</Text>
      <View style={styles.separator} />

      {/* 첫 번째 난이도 */}
      <TouchableOpacity 
        style={styles.levelBox} 
        onPress={handleLevelSelection}>
        <Image source={require('../assets/images/level1.png')} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.levelTitle}>입문자 난이도</Text>
          <Text style={styles.levelDescription}>
            코딩을 처음 접해보는 사람들에게 적합한 교육용 난이도예요!
          </Text>
        </View>
      </TouchableOpacity>

      {/* 두 번째 난이도 */}
      <TouchableOpacity 
        style={styles.levelBox} 
        onPress={handleLevelSelection}>
        <Image source={require('../assets/images/level2.png')} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.levelTitle}>중급자 난이도</Text>
          <Text style={styles.levelDescription}>
            코딩의 기초 개념을 어느 정도 이해하고, 간단한 코드 작성에 익숙해진 사람들에게 추천해요!
          </Text>
        </View>
      </TouchableOpacity>

      {/* 세 번째 난이도 */}
      <TouchableOpacity 
        style={styles.levelBox} 
        onPress={handleLevelSelection}>
        <Image source={require('../assets/images/level3.png')} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.levelTitle}>숙련자 난이도</Text>
          <Text style={styles.levelDescription}>
            기본 개념에 익숙해진 후, 보다 복잡한 코드와 구조적인 사고를 요구하는 단계입니다!
          </Text>
        </View>
      </TouchableOpacity>

      {/* 네 번째 난이도 */}
      <TouchableOpacity 
        style={styles.levelBox} 
        onPress={handleLevelSelection}>
        <Image source={require('../assets/images/level4.png')} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.levelTitle}>InTerBot 난이도</Text>
          <Text style={styles.levelDescription}>
            프로그래밍의 모든 핵심 개념을 숙달하고, 복잡하고 실무에 가까운 문제를 독창적으로 해결할 수 있는 능력을 키우기 위한 단계입니다!
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // 전체 화면을 차지하도록 설정
    justifyContent: 'flex-start', // 내용이 화면 상단에 오도록 설정
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5, // 선과 가까이 붙이기 위해 여백을 줄임
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5, // 텍스트와 선 사이의 간격을 최소화
  },
  levelBox: {
    flexDirection: 'row',
    alignItems: 'center', // 아이콘과 텍스트가 수직 중앙 정렬
    marginVertical: 10,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#E6E6FA', // 연한 보라색 배경
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, 
  },
  icon: {
    width: 50, 
    height: 50,
    marginRight: 15, // 아이콘과 텍스트 사이 간격을 추가
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center', 
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  levelDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default CodingLevel;
