import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const CodingTest = () => {
  const [value, setValue] = useState<string | null>('JavaScript'); // 기본값으로 'JavaScript' 설정
  const [modalVisible, setModalVisible] = useState(false); // 모달 visible 상태

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      {/* 문제 제목과 타이머, A 버튼 */}
      <View style={styles.headerContainer}>
        <Text style={styles.timerText}>🕒 9:59</Text>
        <Text style={styles.problemTitle}>문제 제목</Text>
        <TouchableOpacity style={styles.themeButton} onPress={toggleModal}>
          <Text style={styles.themeButtonText}>A</Text>
        </TouchableOpacity>
      </View>

      {/* 구분선 */}
      <View style={styles.separator} />

      {/* 코드 작성 및 실행 결과 영역 */}
      <View style={styles.combinedSection}>
        {/* 코드 작성 영역 */}
        <View style={styles.codeInputContainer}>
          <ScrollView>
            <TextInput style={styles.codeInput} multiline placeholder="여기에 코드를 작성하세요" />
          </ScrollView>
          <TouchableOpacity style={styles.runButton}>
            <Text style={styles.buttonText}>코드 실행</Text>
          </TouchableOpacity>
        </View>

        {/* 언어 선택 드롭다운 */}
        <Dropdown
          style={styles.dropdown}
          data={[
            { label: 'C', value: 'C' },
            { label: 'C++', value: 'C++' },
            { label: 'JavaScript', value: 'JavaScript' },
            { label: 'Python', value: 'Python' },
            { label: 'Java', value: 'Java' },
            { label: 'C#', value: 'C#' },
          ]}
          labelField="label"
          valueField="value"
          value={value}
          onChange={item => setValue(item.value)} // 선택된 값 설정
          placeholder="언어 선택"
        />

        {/* 실행 결과 영역 */}
        <View style={styles.outputTextContainer}>
          <Text style={styles.outputText}>실행 결과가 여기 표시됩니다.</Text>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.buttonText}>제출</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 모달 */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* 문제 제목 텍스트 추가 */}
            <Text style={styles.modalTitle}>문제 제목</Text>

            {/* 모달 내용 영역 */}
            <View style={styles.modalBody}>
              <Text style={styles.modalText}>문제의 내용이 여기에 표시됩니다.</Text>
            </View>

            {/* 닫기 버튼을 모달 하단 가운데로 배치 */}
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.buttonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 5,
  },
  timerText: {
    fontSize: 16,
    color: '#333333',
    position: 'absolute',
    left: 15,
  },
  problemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  themeButton: {
    position: 'absolute',
    right: 15,
    backgroundColor: '#E6E6FA',
    padding: 5,
    borderRadius: 5,
  },
  themeButtonText: {
    fontSize: 16,
    color: '#7B68EE',
    fontWeight: 'bold',
  },
  separator: {
    width: '90%',
    height: 1,
    backgroundColor: '#DDDDDD',
    marginTop: 5,
    marginBottom: 10,
  },
  combinedSection: {
    backgroundColor: '#E6E6FA',
    padding: 15,
    borderRadius: 10,
    height: 50,
    width: '90%',
    position: 'relative',
    alignItems: 'center',
    flex: 1,
    marginBottom: 100,
  },
  codeInputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 15,
    borderColor: '#dddddd',
    borderWidth: 1,
    width: '100%',
    height: 350,
    marginBottom: 15,
    position: 'relative',
  },
  codeInput: {
    fontSize: 14,
    color: '#333333',
    height: '100%',
  },
  runButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#87CEEB',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  dropdown: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 120,
    backgroundColor: '#87CEEB',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  outputTextContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    height: 140,
    marginBottom: 10,
    position: 'relative',
  },
  outputText: {
    fontSize: 14,
    color: '#333333',
  },
  submitButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#87CEEB',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Modal 스타일
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경을 어두운 색으로 처리
  },
  modalContent: {
    width: '80%', // 모달 크기 설정 (너비와 높이)
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start', // 상단 정렬
  },
  modalTitle: {
    fontSize: 24, // 크기 크게 설정
    fontWeight: 'bold',
    marginBottom: 20, // 아래쪽 여백 추가
    textAlign: 'center', // 가운데 정렬
  },
  modalBody: {
    width: '110%',
    height: 475,
    backgroundColor: '#85A2C3', // 직사각형 배경 색상 설정
    padding: 5,
    borderRadius: 5,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    color: '#E1E9F2', // 흰색 텍스트
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    bottom: 20, // 버튼을 하단에 배치
    left: '50%',
    backgroundColor: '#87CEEB',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
});

export default CodingTest;
