import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

import Header from './src/pages/header';
import Footer from './src/pages/footer';
import MainPage from './src/pages/mainPage';
import SelectJob from './src/pages/selectJob';

// RootStackParamList 타입을 export하여 다른 파일에서도 사용 가능하게 함
export type RootStackParamList = {
  MainPage: undefined;
  SelectJob: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <View style={styles.appContainer}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="dark-content" />
          <Header />
          <Stack.Navigator initialRouteName="MainPage" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainPage" component={MainPage} />
            <Stack.Screen name="SelectJob" component={SelectJob} />
          </Stack.Navigator>
        </SafeAreaView>
        <Footer />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default App;
