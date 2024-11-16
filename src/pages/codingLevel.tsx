import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import LinearGradient from 'react-native-linear-gradient'; // LinearGradient 추가

// 네비게이션 타입 정의
type CodingLevelNavigationProp = StackNavigationProp<RootStackParamList, 'LanguageSelect'>;

const CodingLevel: React.FC = () => {
  const navigation = useNavigation<CodingLevelNavigationProp>();

  const handleLevelSelection = () => {
    navigation.navigate('LanguageSelect');
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <Text style={styles.header}>난이도를 선택해주세요</Text>
      <View style={styles.separator} />

      {/* 첫 번째 난이도 */}
      <LinearGradient 
        colors={['#ADD8E6', '#5DADE2']} // 연한 하늘색 그라데이션 추가
        style={styles.levelBoxWrapper}
      >
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
      </LinearGradient>

      {/* 두 번째 난이도 */}
      <LinearGradient 
        colors={['#ADD8E6', '#5DADE2']} // 동일한 연한 하늘색 그라데이션
        style={styles.levelBoxWrapper}
      >
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
      </LinearGradient>

      {/* 세 번째 난이도 */}
      <LinearGradient 
        colors={['#ADD8E6', '#5DADE2']} // 동일한 연한 하늘색 그라데이션
        style={styles.levelBoxWrapper}
      >
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
      </LinearGradient>

      {/* 네 번째 난이도 */}
      <LinearGradient 
        colors={['#ADD8E6', '#5DADE2']} // 동일한 연한 하늘색 그라데이션
        style={styles.levelBoxWrapper}
      >
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
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#F0F4F8',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#868296',
    marginVertical: 5,
    marginBottom: 40,
  },
  levelBoxWrapper: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden', // 그라데이션과 버튼 모서리 일치
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 5 }, // 그림자 오프셋
    shadowOpacity: 0.3, // 그림자 투명도
    shadowRadius: 6.27, // 그림자 반경
    elevation: 10, // 안드로이드용 그림자 효과
  },
  levelBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'transparent', // 그라데이션을 덮지 않도록
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15,
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
