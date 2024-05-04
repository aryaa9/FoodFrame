import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerComponent = () => {
  const [image, setImage] = useState(null);

  const handleMediaAccess = async (type) => {
    let result;
    // Request the appropriate permissions
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
      });
    }

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri); // Ensure correct property is used, typically 'uri'
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={() => handleMediaAccess('gallery')} />
      <Button title="Take a photo" onPress={() => handleMediaAccess('camera')} />
      {image && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Image Preview:</Text>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}
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
  previewContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  previewText: {
    fontSize: 16,
    marginBottom: 10,
  }
});

export default ImagePickerComponent;
