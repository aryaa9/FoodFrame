import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet, Text, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../config/firebase_config';

const ImagePickerComponent = () => {
  const [image, setImage] = useState(null);
  const [ingredientName, setIngredientName] = useState(""); // State to hold ingredient name

  useEffect(() => {
    console.log("Ingredient Name:", ingredientName); // Log the ingredient name whenever it changes
  }, [ingredientName]); // This effect depends on `ingredientName` and runs on change

  const handleMediaAccess = async (type) => {
    let result;
    if (type === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      }).catch((e) => {
        console.log("Error accessing media:", e);
      });
    }

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri).catch((e) => console.log("Error uploading image:", e));
    }
  };

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();  // Use blob instead of arrayBuffer
      const fileRef = ref(storage, `images/${new Date().toISOString()}.jpg`);
      await uploadBytes(fileRef, blob);  // Upload the blob directly
      const firebaseUrl = await getDownloadURL(fileRef);
      console.log('Image uploaded successfully! URL:', firebaseUrl);
      return firebaseUrl; 
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={() => handleMediaAccess('gallery')} />
      <Button title="Take a photo" onPress={() => handleMediaAccess('camera')} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TextInput
        style={styles.input}
        onChangeText={setIngredientName}
        value={ingredientName}
        placeholder="Enter Ingredient Name"
        keyboardType="default"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  input: 
  {
    height: 40,
    width: '80%', // Making the input take most of the container width
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  }
});

export default ImagePickerComponent;


