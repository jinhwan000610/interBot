import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 네비게이션 사용
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; // RootStackParamList 가져오기

// 네비게이션 타입 정의
type LanguageSelectNavigationProp = StackNavigationProp<RootStackParamList, 'CodingWait'>;

const LanguageSelect: React.FC = () => {
  const navigation = useNavigation<LanguageSelectNavigationProp>(); // 네비게이션 객체 타입 지정

  // 언어 선택 버튼에 대한 데이터 설정
  const languageCategories = [
    { title: 'C', icon: require('../assets/images/C.png') },
    { title: 'C#', icon: require('../assets/images/CSharp.png') },
    { title: 'C++', icon: require('../assets/images/C++.png') },
    { title: 'Python', icon: require('../assets/images/python.png') },
    { title: 'Java', icon: require('../assets/images/java.png') },
    { title: 'JavaScript', icon: require('../assets/images/javascriptIcon.png') },
  ];
  

  // 버튼 클릭 시 다음 화면으로 이동
  const handleLanguageSelection = (language: string) => {
    console.log(`선택된 언어: ${language}`);
    navigation.navigate('CodingWait'); // 'CodingTest'로 이동
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>원하시는 언어를 선택해주세요</Text>
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {/* 언어 버튼 목록 렌더링 */}
        {languageCategories.map((language, index) => (
          <TouchableOpacity
            key={index}
            style={styles.languageButton}
            onPress={() => handleLanguageSelection(language.title)} // 버튼 클릭 시 언어 선택
          >
            <Image source={language.icon} style={styles.icon} />
            <Text style={styles.languageTitle}>{language.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 30,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 20,
  },
  languageButton: {
    width: '45%',
    aspectRatio: 1,
    marginVertical: 15,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  icon: {
    width: '50%', // 너비를 작게 설정해서 이미지가 잘리지 않게 함
    height: '50%', // 높이를 작게 설정해서 이미지가 잘리지 않게 함
    marginBottom: 10,
    resizeMode: 'contain', // 이미지를 잘리지 않도록 설정
  },
  languageTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#34495E',
    textAlign: 'center',
  },
});

export default LanguageSelect;
