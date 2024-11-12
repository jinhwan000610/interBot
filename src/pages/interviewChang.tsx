import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

export default function ChatScreen() {
  const [messages, setMessages] = useState<{ id: string, text: string, sender: 'user' | 'bot' }[]>([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null); // FlatList의 ref 추가

  // 컴포넌트가 마운트될 때 AI의 첫 메시지를 추가
  useEffect(() => {
    setMessages([{ id: '1', text: '면접질문입니다.', sender: 'bot' }]);
  }, []);

  // 메시지를 전송하고 AI 응답을 추가하는 함수
  const handleSendMessage = () => {
    if (inputText.trim()) {
      const userMessage = { id: Date.now().toString(), text: inputText, sender: 'user' as const };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputText('');

      setTimeout(() => {
        const aiMessage = { id: Date.now().toString(), text: 'AI가 응답합니다.', sender: 'bot' as const };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      }, 1000);
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
        {/* 모의 면접 타이틀 */}
        <Text style={styles.title}>모의 면접</Text>
        
        {/* 구분선 */}
        <View style={styles.separator} />

        {/* 면접 질문 영역 */}
        <FlatList
          ref={flatListRef} // FlatList에 ref 추가
          style={styles.chatContainer}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={item.sender === 'user' ? styles.chatBubbleUser : styles.chatBubbleBot}>
              {/* 사용자 대화일 경우 텍스트 먼저 배치하고 이미지 오른쪽에 배치 */}
              {item.sender === 'user' && (
                <Text style={styles.chatTextUser}>{item.text}</Text>
              )}
              {item.sender === 'user' && (
                <Image
                  source={require('../assets/images/user.png')} // 사용자 이미지 경로
                  style={styles.userImage}
                />
              )}

              {/* AI 대화일 경우 이미지 왼쪽에 배치 */}
              {item.sender === 'bot' && (
                <Image
                  source={require('../assets/images/InterBot.png')} // AI 이미지 경로
                  style={styles.botImage}
                />
              )}
              {item.sender === 'bot' && (
                <Text style={styles.chatTextBot}>{item.text}</Text>
              )}
            </View>
          )}
        />
      </View>

      {/* 입력 필드 자리 (footer 아래에 위치) */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="답변을 입력하세요"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>전송</Text>
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
  header: {
    height: 60, // Header 높이 설정
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4a80f0',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatArea: {
    flex: 1, // 채팅 영역이 남은 공간을 채우도록 설정
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
    height: 0.5, // 구분선의 높이
    backgroundColor: '#cccccc',
    marginVertical: 8, // 상하 여백 추가
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
    flexDirection: 'row', // 이미지와 텍스트를 가로로 배치
    alignItems: 'center', // 이미지와 텍스트 세로 정렬
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
    flexDirection: 'row', // 이미지와 텍스트를 가로로 배치하고 오른쪽으로
    alignItems: 'center', // 이미지와 텍스트 세로 정렬
  },
  chatTextUser: {
    fontSize: 16,
    color: '#000',
  },
  botImage: {
    width: 40, // 이미지 너비
    height: 40, // 이미지 높이
    borderRadius: 20, // 원형으로 만들기
    marginRight: 8, // 텍스트와 이미지 간격 조정
  },
  userImage: {
    width: 40, // 이미지 너비
    height: 40, // 이미지 높이
    borderRadius: 20, // 원형으로 만들기
    marginLeft: 8, // 텍스트와 이미지 간격 조정
  },
  inputArea: {
    height: 60, // 입력 필드 높이 설정
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  sendButton: {
    backgroundColor: '#4a80f0',
    padding: 10,
    borderRadius: 25,
    marginLeft: 8,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    height: 60, // Footer 높이 설정
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  footerText: {
    fontSize: 22,
    color: '#333',
  },
});
