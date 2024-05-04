import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import ImagePickerComponent from './components/ImagePickerComponent'; 
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}> Image part  </Text>
      <ImagePickerComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  }
});

export default App;
