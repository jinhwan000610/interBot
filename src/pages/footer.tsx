import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from '../assets/fonts/components/CustomText'; // CustomText 컴포넌트를 불러옴

const Footer: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* 내 정보 버튼 */}
      <TouchableOpacity style={styles.button} onPress={() => console.log('My Page Button Pressed')}>
        <Image source={require('../assets/images/MyPage.png')} style={styles.icon} />
        <CustomText style={styles.label}>내 정보</CustomText>
      </TouchableOpacity>

      {/* 홈 버튼 */}
      <TouchableOpacity style={styles.button} onPress={() => console.log('Home Button Pressed')}>
        <Image source={require('../assets/images/Home.png')} style={styles.icon} />
        <CustomText style={styles.label}>홈</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around', // 버튼 사이의 공간 균등 배치
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  button: {
    alignItems: 'center', // 아이콘과 텍스트를 수직으로 중앙 정렬
    padding: 10,
  },
  icon: {
    width: 25, // 아이콘 너비
    height: 25, // 아이콘 높이
  },
  label: {
    fontSize: 12, // 텍스트 크기
    color: '#333333', // 텍스트 색상
    marginTop: 5, // 아이콘과 텍스트 사이 간격
  },
});

export default Footer;
