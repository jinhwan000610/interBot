import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CodingLevel = () => {
  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <Text style={styles.header}>난이도를 선택해주세요</Text>
      <View style={styles.separator} />

      {/* 첫 번째 난이도 */}
      <View style={styles.levelBox}>
        <Image source={require('../assets/images/level1.png')} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.levelTitle}>입문자 난이도</Text>
          <Text style={styles.levelDescription}>
            코딩을 처음 접해보는 사람들에게 적합한 교육용 난이도예요!
          </Text>
        </View>
      </View>

      {/* 두 번째 난이도 */}
      <View style={styles.levelBox}>
        <Image source={require('../assets/images/level2.png')} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.levelTitle}>중급자 난이도</Text>
          <Text style={styles.levelDescription}>
            코딩의 기초 개념을 어느 정도 이해하고, 간단한 코드 작성에 익숙해진 사람들에게 추천해요!
          </Text>
        </View>
      </View>

      {/* 세 번째 난이도 */}
      <View style={styles.levelBox}>
        <Image source={require('../assets/images/level3.png')} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.levelTitle}>숙련자 난이도</Text>
          <Text style={styles.levelDescription}>
            기본 개념에 익숙해진 후, 보다 복잡한 코드와 구조적인 사고를 요구하는 단계입니다!
          </Text>
        </View>
      </View>

      {/* 네 번째 난이도 */}
      <View style={styles.levelBox}>
        <Image source={require('../assets/images/level4.png')} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.levelTitle}>InTerBot 난이도</Text>
          <Text style={styles.levelDescription}>
            프로그래밍의 모든 핵심 개념을 숙달하고, 복잡하고 실무에 가까운 문제를 독창적으로 해결할 수 있는 능력을 키우기 위한 단계입니다!
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // 콘텐츠를 세로 가운데 정렬
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
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15, // 아이콘과 텍스트 사이 간격
  },
  textContainer: {
    flex: 1,
    backgroundColor: '#E6E6FA', // 연한 보라색 배경
    borderRadius: 10,
    padding: 15,
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
