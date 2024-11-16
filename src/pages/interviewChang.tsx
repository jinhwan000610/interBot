import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image, Alert, ActivityIndicator, Platform } from 'react-native';
import { useRoute, RouteProp, useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; // RootStackParamList를 가져옵니다.
import { fetchInterviewQuestions, fetchInterviewEvaluation } from '../services/gptService';

type InterviewChangRouteProp = RouteProp<RootStackParamList, 'InterviewChang'>;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export default function InterviewChang() {
  const route = useRoute<InterviewChangRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // useNavigation에 타입 지정
  const selectedJob = route.params?.selectedJob;
  console.log('Selected Job:', selectedJob); 

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]); // 사용자 응답 저장
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const [loading, setLoading] = useState<'initial' | 'analyzing' | null>('initial'); // 로딩 상태를 더 세분화함
  const [countdown, setCountdown] = useState<number | null>(null); // 카운트다운을 위해 추가된 상태
  const [dots, setDots] = useState('.'); // 애니메이션 효과를 위해 추가된 상태

  useEffect(() => {
    if (!selectedJob) {
      Alert.alert('오류', '선택된 직업이 없습니다. 이전 화면으로 돌아가세요.');
      return;
    }

    // 컴포넌트 마운트 시 GPT API 호출하여 질문 가져오기
    const getQuestions = async () => {
      try {
        console.log('API 요청 시작 - selectedJob:', selectedJob);  // selectedJob 로그 확인
        const fetchedQuestions = await fetchInterviewQuestions(selectedJob); // string[] 타입을 반환
        console.log('받은 질문들:', fetchedQuestions); // 받은 질문들을 로그로 확인
        setQuestions(fetchedQuestions);
        if (fetchedQuestions.length > 0) {
          setMessages([{ id: '1', text: fetchedQuestions[0], sender: 'bot' }]);
        }
      } catch (error) {
        console.error('질문을 가져오는 중 오류 발생:', error);
        Alert.alert('오류', '질문을 가져오는 중 문제가 발생했습니다. 나중에 다시 시도해주세요.');
      } finally {
        setLoading(null); // 질문을 다 가져오면 로딩 종료
        setCountdown(3); // 로딩 종료 후 카운트다운 시작
      }
    };
    getQuestions();
  }, [selectedJob]);

  // 점의 애니메이션 효과를 위한 useEffect
  useEffect(() => {
    if (loading || countdown !== null) {
      const dotsTimer = setInterval(() => {
        setDots((prevDots) => {
          if (prevDots.length >= 3) {
            return '.';
          } else {
            return prevDots + '.';
          }
        });
      }, 500); // 0.5초마다 점 개수 변경

      return () => clearInterval(dotsTimer);
    }
  }, [loading, countdown]);

  // 카운트다운이 끝난 후 로딩을 완료하고 면접 시작
  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000); // 1초마다 카운트 감소

      return () => clearTimeout(timer);
    } else {
      setCountdown(null); // 카운트다운이 끝나면 상태를 null로 설정하여 화면 표시 종료
    }
  }, [countdown]);

  // 사용자가 메시지를 전송하고 AI 응답을 추가하는 함수
  const handleSendMessage = () => {
    if (inputText.trim()) {
      const userMessage = { id: Date.now().toString(), text: inputText, sender: 'user' as const };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setResponses((prevResponses) => [...prevResponses, inputText]); // 사용자 응답 저장
      setInputText('');

      // 다음 질문이 있는지 확인
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        setTimeout(() => {
          const nextQuestion = { id: Date.now().toString(), text: questions[nextIndex], sender: 'bot' as const };
          setMessages((prevMessages) => [...prevMessages, nextQuestion]);
          setCurrentQuestionIndex(nextIndex);
        }, 1000);
      } else {
        // 모든 질문이 끝난 후 Feedback 페이지로 이동
        handleFinishInterview();
      }
    }
  };

  // 면접 종료 후 피드백 페이지로 이동하는 함수
  const handleFinishInterview = async () => {
    try {
      setLoading('analyzing'); // 'analyzing' 상태로 설정하여 로딩 화면에 피드백 분석중 메시지 표시
      const evaluation = await fetchInterviewEvaluation(selectedJob, responses);
      navigation.navigate('Feedback', { evaluation });
    } catch (error) {
      console.error('평가를 가져오는 중 오류 발생:', error);
      Alert.alert('오류', '평가를 가져오는 중 문제가 발생했습니다. 나중에 다시 시도해주세요.');
    } finally {
      setLoading(null);
    }
  };

  // 메시지가 추가될 때마다 FlatList가 자동으로 맨 아래로 스크롤 되도록 처리
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  if (loading === 'initial') {
    // 초기 질문을 로딩 중인 경우, 로딩 화면을 표시
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>인터봇이 질문을 생성중입니다{dots}</Text>
        <ActivityIndicator size="large" color="#87CEEB" style={styles.activityIndicator} />
      </View>
    );
  }

  if (loading === 'analyzing') {
    // 피드백을 분석 중인 경우, 로딩 화면을 표시
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>사용자의 답변을 분석중입니다{dots}</Text>
        <ActivityIndicator size="large" color="#87CEEB" style={styles.activityIndicator} />
      </View>
    );
  }

  if (countdown !== null) {
    // 카운트다운이 진행 중일 때 카운트다운 화면 표시
    return (
      <View style={styles.countdownContainer}>
        <Text style={styles.countdownText}>면접이 시작됩니다{dots}</Text>
        <Text style={styles.countdownNumber}>{countdown}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 채팅 영역 */}
      <View style={styles.chatArea}>
        <Text style={styles.title}>모의 면접 - {selectedJob}</Text>
        <View style={styles.separator} />

        {/* 면접 질문 영역 */}
        <FlatList
          ref={flatListRef}
          style={styles.chatContainer}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={item.sender === 'user' ? styles.chatBubbleUser : styles.chatBubbleBot}>
              {item.sender === 'user' && <Text style={styles.chatTextUser}>{item.text}</Text>}
              {item.sender === 'user' && (
                <Image source={require('../assets/images/user.png')} style={styles.userImage} />
              )}
              {item.sender === 'bot' && (
                <Image source={require('../assets/images/InterBot.png')} style={styles.botImage} />
              )}
              {item.sender === 'bot' && <Text style={styles.chatTextBot}>{item.text}</Text>}
            </View>
          )}
        />
      </View>

      {/* 입력 필드 */}
      <View style={styles.inputArea}>
        <TextInput
          style={[styles.input, Platform.OS === 'android' && { paddingVertical: 0 }]}
          placeholder="답변을 입력하세요"
          placeholderTextColor="gray"
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          onSubmitEditing={handleSendMessage}
          multiline={true}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          importantForAccessibility="yes"
          textContentType="none"
          editable={true}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
  },
  countdownContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
  },
  countdownText: {
    fontSize: 24,
    marginBottom: 20,
  },
  countdownNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ff6347',
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#cccccc',
    marginVertical: 8,
  },
  chatContainer: {
    flex: 1,
    marginTop: 8,
  },
  chatBubbleBot: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e7ff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    maxWidth: '80%',
  },
  chatTextBot: {
    fontSize: 16,
    color: '#000',
  },
  chatBubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#d0f0ff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    maxWidth: '80%',
  },
  chatTextUser: {
    fontSize: 16,
    color: '#000',
  },
  botImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
  },
  inputArea: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  sendButton: {
    backgroundColor: '#4a80f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  activityIndicator: {
    marginVertical: 20,
  },
});
