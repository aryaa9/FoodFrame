import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import { Header, Card, Button, Icon } from 'react-native-elements';
import ImagePickerComponent from '../components/ImagePickerComponent'; 

export default function AddIngredients() {
  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Card.Divider/>
        <ImagePickerComponent />
  
      </Card>
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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
});
