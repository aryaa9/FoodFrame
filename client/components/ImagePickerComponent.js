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

  const submitImageData = async (imageUri, ingredientName) => {
    console.log(ingredientName);
    try {
      const firebaseUrl = await uploadImage(imageUri); // Assuming this function uploads the image and returns the URL
  
      const response = await fetch('http://192.168.37.35:3000/upload_image_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: firebaseUrl,
          ingredient_name: ingredientName,
        }),
      });
  
      const responseData = await response.json();
      console.log('Server response:', responseData);
    } catch (error) {
      console.error('Error uploading image data:', error);
    }
  };
  
  const submitData = () => {
    submitImageData(image, ingredientName).catch((e) => console.log("Error submitting data:", e));
  }

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
      <Button onPress={submitData} title='Submit'/>
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


