import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/InterBot.png')} style={styles.logo} />
      <Text style={styles.title}>Inter Bot</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F0F8FF', // 부드럽고 시원한 컬러로 배경색 설정 (밝은 파란색 계열)
  
    elevation: 5, // 안드로이드에서 그림자 효과
    shadowColor: '#000', // 그림자 색상 (iOS)
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치 (iOS)
    shadowOpacity: 0.2, // 그림자 투명도 (iOS)
    shadowRadius: 3.84, // 그림자 반경 (iOS)
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1E90FF', // 텍스트 색상
    textShadowColor: '#B0C4DE', // 텍스트 그림자 색상
    textShadowOffset: { width: 1, height: 1 }, // 텍스트 그림자 위치
    textShadowRadius: 2, // 텍스트 그림자 반경
  },
});

export default Header;
