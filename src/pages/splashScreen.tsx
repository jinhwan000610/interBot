import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, ImageBackground } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // 텍스트 애니메이션 값 설정
  const textFadeAnim = useRef(new Animated.Value(0)).current;  // 텍스트 페이드 애니메이션
  const textPositionAnim = useRef(new Animated.Value(0)).current;  // 텍스트 위치 애니메이션

  // 로고 애니메이션 값 설정
  const logoFadeAnim = useRef(new Animated.Value(0)).current;  // 로고 페이드 애니메이션

  useEffect(() => {
    // 글씨가 2초 동안 서서히 출력되는 애니메이션 실행
    Animated.timing(textFadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      // 글씨가 아래로 이동하는 애니메이션 (0.5초 동안)
      Animated.timing(textPositionAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // 텍스트 이동이 끝난 후 로고 애니메이션 실행 (3초 동안)
        Animated.timing(logoFadeAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }).start();
      });
    });

    // 6초 후에 메인 페이지로 이동
    const timer = setTimeout(() => {
      navigation.navigate('MainPage');
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/images/Intro.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Animated.Text
          style={[
            styles.text,
            { 
              opacity: textFadeAnim,
              transform: [
                {
                  translateY: textPositionAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 80], // 텍스트가 아래로 이동하는 거리
                  }),
                },
              ],
            },
          ]}
        >
          Welcome to InterBot
        </Animated.Text>
        <Animated.Image
          source={require('../assets/images/InterBot.png')}
          style={[
            styles.logo,
            {
              opacity: logoFadeAnim,
              transform: [
                {
                  translateX: 13, 
                },
              ],
            },
          ]}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // 배경색 설정을 투명하게 유지
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: -60,
    position: 'absolute',
    top: '50%',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    position: 'absolute',
  },
});

export default SplashScreen;
