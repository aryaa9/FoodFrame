import { View, Text, StyleSheet, Pressable, Image, Button } from "react-native";

export default function Meal({ data, onPress }) {
  return (
    <View style={styles.root}>
      <Pressable android_ripple={{ color: "#ccc" }} onPress={onPress}>
        <View style={styles.inner}>
          <Image source={{ uri: data.imageUrl }} style={styles.image} />
          <View style={styles.textHolder}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.second}>{data.complexity}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginHorizontal: '5%',
    marginVertical: '3%',
    borderRadius: 8,
    width: '90%',
    height: 150,
    backgroundColor: '#b3d4c3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 1000,
    marginRight: 10
  },
  inner: {
    borderRadius: 8,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: 'center',
  },
  title:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  second:{
    fontSize: 15
  }
});
