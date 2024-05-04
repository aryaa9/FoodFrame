import { View, Text, StyleSheet, Pressable, Image, Button } from "react-native";

export default function Ingredient({ data, onPress }) {
  return (
    <View style={styles.root}>
      <Pressable android_ripple={{ color: "#ccc" }} onPress={onPress}>
        <View style={styles.inner}>
          <Image source={{ uri: data.imageUrl }} style={styles.image} />
        </View>
        <View>
            <Text>{data.title}</Text>
            <Button title="Add to prepper"/>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    margin: 16,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 180,
  },
  inner: {
    borderRadius: 8,
    overflow: "hidden",
  },
});
