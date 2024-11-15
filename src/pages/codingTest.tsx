import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, Animated } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; // RootStackParamList의 경로를 맞게 수정해주세요

const CodingTest = () => {
  // 문제 데이터를 상태로 관리
  const problems = [
    {
      title: '두 숫자의 합을 구하시오',
      content: '두 숫자 num1과 num2가 주어졌을 때, 이 두 숫자의 합을 구하는 코드를 작성하세요. 이 문제는 기본적인 수학 연산을 통해 두 값을 더하는 방법을 이해하기 위한 문제입니다. 각 언어에서 제공하는 기본적인 덧셈 연산을 사용하여 풀이해 보세요.',
      solution: {
        JavaScript: {
          solution: 'const num1 = 5; const num2 = 7;',
          answer: 'const num1 = 5; const num2 = 7; console.log(num1 + num2);'
        },
        C: {
          solution: 'int num1 = 5; int num2 = 7;',
          answer: 'int num1 = 5, num2 = 7; printf("%d", num1 + num2);'
        }
      }
    },
    {
      title: '대소문자 바꿔서 출력하기',
      content: '영어 알파벳으로 이루어진 문자열 str이 주어집니다. 각 알파벳을 대문자는 소문자로, 소문자는 대문자로 변환해서 출력하는 코드를 작성하세요.',
      solution: {
        JavaScript: {
          solution: `const str = "Hello World";
let value = "";
for() {
  if(str[i] === str[i].toUpperCase()) {
    value += str[i].toLowerCase();
  } else {
    value += str[i].toUpperCase();
  }
}
console.log(value);`,
          answer: `const str = "Hello World";
let value = "";
for(let i = 0; i < str.length; i++) {
  if(str[i] === str[i].toUpperCase()) {
    value += str[i].toLowerCase();
  } else {
    value += str[i].toUpperCase();
  }
}
console.log(value);`
        },
        C: {
          solution: `#include <stdio.h>
#include <ctype.h>

int main() {
  char str[] = "Hello World";
  for() {
    if(isupper(str[i])) {
      str[i] = tolower(str[i]);
    } else if(islower(str[i])) {
      str[i] = toupper(str[i]);
    }
  }
  printf("%s", str);
  return 0;
}`,
          answer: `#include <stdio.h>
#include <ctype.h>

int main() {
  char str[] = "Hello World";
  for(int i = 0; str[i] != '\0'; i++) {
    if(isupper(str[i])) {
      str[i] = tolower(str[i]);
    } else if(islower(str[i])) {
      str[i] = toupper(str[i]);
    }
  }
  printf("%s", str);
  return 0;
}`
        }
      }
    },
    {
      title: '배열의 합 구하기',
      content: '정수 배열 [1, 2, 3, 4, 5]가 주어졌을 때, 배열의 모든 요소의 합을 구하는 코드를 작성하세요. 이 문제는 반복문을 사용하여 배열의 각 요소에 접근하고 합산하는 과정을 이해하기 위한 것입니다.',
      solution: {
        JavaScript: {
          solution: `const arr = [1, 2, 3, 4, 5];
let sum = 0;
for(let i = 0; i < arr.length; i++) {

}
console.log(sum);`,
          answer: `const arr = [1, 2, 3, 4, 5];
let sum = 0;
for(let i = 0; i < arr.length; i++) {
  sum += arr[i];
}
console.log(sum);`
        },
        C: {
          solution: `#include <stdio.h>

int main() {
  int arr[] = {1, 2, 3, 4, 5};
  int sum = 0;let i = 0; i < str.length; i++
  for(int i = 0; i < 5; i++) {

  }
  printf("%d", sum);
  return 0;
}`,
          answer: `#include <stdio.h>

int main() {
  int arr[] = {1, 2, 3, 4, 5};
  int sum = 0;
  for(int i = 0; i < 5; i++) {
    sum += arr[i];
  }
  printf("%d", sum);
  return 0;
}`
        }
      }
    }
  ];

  const [value, setValue] = useState<'JavaScript' | 'C'>('JavaScript'); // 언어 상태
  const [modalVisible, setModalVisible] = useState(false); // 모달 상태
  const [problemIndex, setProblemIndex] = useState(0); // 현재 문제 인덱스 상태
  const [code, setCode] = useState(problems[problemIndex]?.solution[value]?.solution ?? ''); // 코드 작성 영역 상태
  const [result, setResult] = useState(''); // 실행 결과 상태
  const animation = useState(new Animated.Value(0))[0]; // 애니메이션 상태
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30분 타이머 (초 단위로 저장)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // 네비게이션 훅 사용 시 타입 지정

  // 문제 데이터를 설정하는 함수
  const setProblemData = () => {
    setCode(problems[problemIndex]?.solution[value]?.solution ?? ''); // 선택된 언어에 맞는 솔루션 템플릿을 설정
    setResult(''); // 문제 변경 시 결과 영역 초기화
  };

  useEffect(() => {
    setProblemData(); // 페이지 로드시 문제 제목, 내용, 코드 솔루션 설정
  }, [problemIndex, value]); // 문제와 언어가 변경될 때마다 호출

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []); // 컴포넌트 마운트 시 타이머 시작

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible); // 모달 열기/닫기
  };

  const handleRunCode = () => {
    const correctSolution = problems[problemIndex]?.solution[value]?.answer?.trim();
    const userSolution = code?.trim();

    if (userSolution === correctSolution) {
      setResult('정답입니다!');
    } else {
      setResult('오답입니다! 다시 시도해 보세요.');
    }
  };

  const handleSubmit = () => {
    if (result === '정답입니다!') {
      if (problemIndex < problems.length - 1) {
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          animation.setValue(0);
          setProblemIndex(problemIndex + 1); // 다음 문제로 이동
        });
      } else {
        navigation.navigate('CodingEnd' as never); // 모든 문제를 풀었을 때 codingEnd 페이지로 이동
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* 문제 제목과 타이머 */}
      <View style={styles.headerContainer}>
        <Text style={styles.timerText}>🕒 {formatTime(timeLeft)}</Text>
        <Text style={styles.problemTitle}>{problems[problemIndex].title}</Text>
        <TouchableOpacity style={styles.themeButton} onPress={toggleModal}>
          <Text style={styles.themeButtonText}>A</Text>
        </TouchableOpacity>
      </View>

      {/* 구분선 */}
      <View style={styles.separator} />

      {/* 코드 작성 및 실행 결과 영역 */}
      <Animated.View style={[styles.combinedSection, { opacity: animation.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }]}>
        <View style={styles.codeInputContainer}>
          <ScrollView>
            <TextInput
              style={[styles.codeInput, styles.codeTextHighlight]}
              multiline
              placeholder="여기에 코드를 작성하세요"
              value={code}
              onChangeText={setCode}
            />
          </ScrollView>
          <TouchableOpacity style={styles.runButton} onPress={handleRunCode}>
            <Text style={styles.buttonText}>코드 실행</Text>
          </TouchableOpacity>
        </View>

        <Dropdown
          style={styles.dropdown}
          data={[
            { label: 'JavaScript', value: 'JavaScript' },
            { label: 'C', value: 'C' },
            { label: 'C++', value: 'C++' },
            { label: 'Python', value: 'Python' },
            { label: 'Java', value: 'Java' },
            { label: 'C#', value: 'C#' },
          ]}
          labelField="label"
          valueField="value"
          value={value}
          onChange={item => setValue(item.value as 'JavaScript' | 'C')}
          placeholder="언어 선택"
        />

        <View style={styles.outputTextContainer}>
          <Text style={styles.outputText}>{result}</Text>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>제출</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* 모달 */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{problems[problemIndex].title}</Text>
            <ScrollView style={styles.modalBody}>
              <Text style={styles.modalText}>{problems[problemIndex].content}</Text>
            </ScrollView>
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
    backgroundColor: '#000000',
    marginTop: 5,
    marginBottom: 10,
  },
  combinedSection: {
    backgroundColor: '#E6E6FA',
    padding: 15,
    borderRadius: 10,
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
  },
  codeInput: {
    fontSize: 14,
    color: '#333333',
    height: '100%',
    fontFamily: 'Courier New, monospace',
    lineHeight: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 4,
  },
  codeTextHighlight: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalBody: {
    flex: 1,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    lineHeight: 24,
    color: '#333333',
  },
  closeButton: {
    backgroundColor: '#87CEEB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default CodingTest;
