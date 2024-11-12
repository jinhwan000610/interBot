// App.tsx

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CodingTest from './src/pages/interviewChang';


function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <CodingTest />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // 배경색을 원하는 대로 설정할 수 있습니다.
  },
});

export default App;