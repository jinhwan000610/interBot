import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

import Header from './src/pages/header';
import Footer from './src/pages/footer';
import MainPage from './src/pages/mainPage';
import SelectJob from './src/pages/selectJob';
import CodingLevel from './src/pages/codingLevel';
import CodingTest from './src/pages/codingTest';
import InterviewChang from './src/pages/interviewChang'; // 수정된 이름

// RootStackParamList 타입을 export하여 다른 파일에서도 사용 가능하게 함
export type RootStackParamList = {
  MainPage: undefined;
  SelectJob: undefined;
  CodingLevel: undefined;
  CodingTest: undefined;
  InterviewChang: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <View style={styles.appContainer}>
        {/* 헤더는 항상 페이지 상단에 위치 */}
        <SafeAreaView style={styles.headerContainer}>
          <StatusBar barStyle="dark-content" />
          <Header />
        </SafeAreaView>

        {/* Stack.Navigator는 화면 전환만 담당 */}
        <View style={styles.navigatorContainer}>
          <Stack.Navigator initialRouteName="MainPage" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainPage" component={MainPage} />
            <Stack.Screen name="SelectJob" component={SelectJob} />
            <Stack.Screen name="CodingLevel" component={CodingLevel} />
            <Stack.Screen name="CodingTest" component={CodingTest} />
            <Stack.Screen name="InterviewChang" component={InterviewChang} />
          </Stack.Navigator>
        </View>

        {/* 푸터는 항상 페이지 하단에 위치 */}
        <Footer />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1, // 화면 전체를 차지하게 설정
  },
  headerContainer: {
    flex: 0, // 헤더는 고정
  },
  navigatorContainer: {
    flex: 1, // Stack.Navigator는 중간 영역을 차지
  },
});

export default App;
