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
    padding: 10,
    backgroundColor: '#FFFFFF', // 배경색 설정, 필요시 수정 가능
  },
  logo: {
    width: 50, // 로고 너비, 이미지 크기에 맞게 조정
    height: 50, // 로고 높이, 이미지 크기에 맞게 조정
    marginRight: 8, // 텍스트와 로고 간격
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1E90FF', // 텍스트 색상, 필요시 수정 가능
  },
});

export default Header;
