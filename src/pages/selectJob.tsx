import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import CustomText from '../assets/fonts/components/CustomText'; 

const SelectJob: React.FC = () => {
  const jobCategories = [
    { title: 'Android', icon: require('../assets/images/android.png') },
    { title: '자료구조', icon: require('../assets/images/data_structure.png') },
    { title: '데이터베이스', icon: require('../assets/images/database.png') },
    { title: 'JavaScript', icon: require('../assets/images/javascript.png') },
    { title: '운영체제', icon: require('../assets/images/os.png') },
    { title: 'React', icon: require('../assets/images/react.png') },
    { title: 'Python', icon: require('../assets/images/python.png') },
    { title: 'Spring', icon: require('../assets/images/spring.png') },
    { title: 'Java', icon: require('../assets/images/java.png') },
  ];

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>원하시는 직종을 선택해주세요</CustomText>
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {jobCategories.map((job, index) => (
          <TouchableOpacity key={index} style={styles.jobButton} onPress={() => console.log(`${job.title} 버튼 클릭`)}>
            <Image source={job.icon} style={styles.icon} />
            <CustomText style={styles.jobTitle}>{job.title}</CustomText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F0F4F8', 
    padding: 20,
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
  jobButton: {
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
    overflow: 'hidden', 
  },
  icon: {
    width: 50, 
    height: 50,
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#34495E', 
    textAlign: 'center',
  },
});

export default SelectJob;
