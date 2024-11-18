import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

import Header from './src/pages/header';
import SplashScreen from './src/pages/splashScreen'; // SplashScreen 추가
import MainPage from './src/pages/mainPage';
import SelectJob from './src/pages/selectJob';
import CodingLevel from './src/pages/codingLevel';
import CodingTest from './src/pages/codingTest';
import InterviewChang from './src/pages/interviewChang'; 
import CodingEnd from './src/pages/codingEnd';
import LanguageSelect from './src/pages/LanguageSelect';
import Feedback from './src/pages/feedback'; 
import CodingWait from './src/pages/codingWait';

// RootStackParamList 타입을 export하여 다른 파일에서도 사용 가능하게 함
export type RootStackParamList = {
  SplashScreen: undefined;
  MainPage: undefined;
  SelectJob: undefined;
  CodingLevel: undefined;
  CodingTest: undefined;
  CodingWait: undefined;
  CodingEnd: undefined;
  LanguageSelect: undefined;
  InterviewChang: { selectedJob: string };
  Feedback: { evaluation: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <View style={styles.appContainer}>
        {/* Stack.Navigator는 화면 전환만 담당 */}
        <Stack.Navigator initialRouteName="SplashScreen">
          {/* SplashScreen에서만 헤더가 보이지 않도록 설정 */}
          <Stack.Screen 
            name="SplashScreen" 
            component={SplashScreen} 
            options={{ headerShown: false }} 
          />
          {/* 이후의 다른 페이지들은 기본적으로 헤더가 보이도록 설정 */}
          <Stack.Screen 
            name="MainPage" 
            component={MainPage} 
            options={{ headerShown: true, header: () => <Header /> }} 
          />
          <Stack.Screen name="SelectJob" component={SelectJob} options={{ headerShown: true, header: () => <Header /> }} />
          <Stack.Screen name="CodingLevel" component={CodingLevel} options={{ headerShown: true, header: () => <Header /> }} />
          <Stack.Screen name="CodingTest" component={CodingTest} options={{ headerShown: true, header: () => <Header /> }} />
          <Stack.Screen name="CodingWait" component={CodingWait} options={{ headerShown: true, header: () => <Header /> }} />
          <Stack.Screen name="InterviewChang" component={InterviewChang} options={{ headerShown: true, header: () => <Header /> }} />
          <Stack.Screen name="CodingEnd" component={CodingEnd} options={{ headerShown: true, header: () => <Header /> }} />
          <Stack.Screen name="Feedback" component={Feedback} options={{ headerShown: true, header: () => <Header /> }} />
          <Stack.Screen name="LanguageSelect" component={LanguageSelect} options={{ headerShown: true, header: () => <Header /> }} />
        </Stack.Navigator>
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
