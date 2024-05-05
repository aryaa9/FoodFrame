import { View, Text, StyleSheet, Pressable, Image, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddButton from "./AddButton";

export default function Ingredient({ data, onPress, addData }) {
  function addData(){
    return data;
  }

  return (
    <View style={styles.root}>
      <View style={styles.inner}>
        <Pressable onPress={onPress}>
          <Image source={{ uri: data.imageUrl }} style={styles.image} />
        </Pressable>

        <View style={styles.bottom}>
          <Text style={styles.title}>{data.title}</Text>
          <AddButton onPress={addData}>
            <Ionicons name="add-circle-outline" size={36} color="green" />
          </AddButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    margin: 5,
  },
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
    backgroundColor: "white",
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
});
