import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image, Alert, Platform } from 'react-native';
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedJob) {
      Alert.alert('오류', '선택된 직업이 없습니다. 이전 화면으로 돌아가세요.');
      return;
    }

    // 컴포넌트 마운트 시 GPT API 호출하여 질문 가져오기
    const getQuestions = async () => {
      setLoading(true);
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
        setLoading(false);
      }
    };
    getQuestions();
  }, [selectedJob]);

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
      setLoading(true);
      const evaluation = await fetchInterviewEvaluation(selectedJob, responses);
      navigation.navigate('Feedback', { evaluation });
    } catch (error) {
      console.error('평가를 가져오는 중 오류 발생:', error);
      Alert.alert('오류', '평가를 가져오는 중 문제가 발생했습니다. 나중에 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  // 메시지가 추가될 때마다 FlatList가 자동으로 맨 아래로 스크롤 되도록 처리
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

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
      {!loading && (
        <View style={styles.inputArea}>
          <TextInput
  style={[styles.input, Platform.OS === 'android' && { paddingVertical: 0 }]} // Android padding issue fix
  placeholder="답변을 입력하세요"
  placeholderTextColor="gray" // Move this prop here
  value={inputText}
  onChangeText={(text) => setInputText(text)}
  onSubmitEditing={handleSendMessage}
  multiline={true}
  autoCapitalize="none"
  autoCorrect={false}
  keyboardType="default"
  importantForAccessibility="yes"
  textContentType="none" // 입력 내용의 타입을 명시적으로 설정
  editable={true}
/>
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      )}
      {loading && <Text style={styles.loadingText}>응답을 가져오는 중...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    alignItems: 'flex-start', // 텍스트가 위쪽에 맞춰지도록 설정
    flexWrap: 'wrap', // 줄바꿈 가능하도록 설정
    maxWidth: '80%', // 화면 너비의 최대 80%로 설정하여 긴 텍스트 처리
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
    borderRadius: 30, // Rounded corners for a more modern look
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  sendButton: {
    backgroundColor: '#4a80f0',
    paddingVertical: 12, // Adjust button size
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
    color: 'gray',
   
  },
});
