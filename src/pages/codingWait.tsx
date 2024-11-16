import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type CodingLevelNavigationProp = StackNavigationProp<RootStackParamList, 'CodingTest'>;

const CodingWait = () => {
  const navigation = useNavigation<CodingLevelNavigationProp>();
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('CodingTest');
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리
  }, [navigation]);

  useEffect(() => {
    const dotsTimer = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return '.';
        } else {
          return prevDots + '.';
        }
      });
    }, 400); // 0.5초마다 점 개수 변경

    return () => clearInterval(dotsTimer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.waitText}>인터봇이 문제를 생성중입니다{dots}</Text>
      <ActivityIndicator size="large" color="#87CEEB" style={styles.activityIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waitText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
  },
  activityIndicator: {
    marginBottom: 50,
  },
});

export default CodingWait;
