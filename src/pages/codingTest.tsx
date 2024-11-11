import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';

const CodingTest = () => {
  return (
    <View style={styles.container}>
      {/* Solution 코드 작성 영역 */}
      <View style={styles.solutionSection}>
        <Text style={styles.sectionTitle}>Solution</Text>
        <ScrollView style={styles.codeInputContainer}>
          <TextInput
            style={styles.codeInput}
            multiline
            placeholder="여기에 코드를 작성하세요"
          />
        </ScrollView>
      </View>

      {/* 출력 결과 영역 */}
      <View style={styles.outputSection}>
        <Text style={styles.sectionTitle}>출력 결과</Text>
        <View style={styles.outputTextContainer}>
          <Text style={styles.outputText}>여기에 출력 결과가 표시됩니다.</Text>
        </View>
        {/* 작은 제출 버튼 */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>제출</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  solutionSection: {
    backgroundColor: '#E6E6FA',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    height: 250,
  },
  codeInputContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    borderColor: '#dddddd',
    borderWidth: 1,
  },
  codeInput: {
    fontSize: 14,
    color: '#333333',
    height: 150,
  },
  outputSection: {
    backgroundColor: '#E6E6FA',
    padding: 15,
    borderRadius: 10,
    minHeight: 100,
    marginBottom: 20,
    position: 'relative', // 제출 버튼 배치용
  },
  outputTextContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
  },
  outputText: {
    fontSize: 14,
    color: '#333333',
  },
  submitButton: {
    backgroundColor: '#87CEEB', // 하늘색 배경
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    position: 'absolute', // 오른쪽 아래 배치
    bottom: 10,
    right: 10,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CodingTest;
