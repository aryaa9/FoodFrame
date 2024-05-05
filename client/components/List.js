import { Text, View, StyleSheet } from "react-native";

export default function List({ data }) {
  return data.map((dataPoints) => (
    <View style={styles.listItem} key={dataPoints}> 
      <Text style={styles.itemText}>{dataPoints}</Text>
    </View>
  ));
}

const styles = StyleSheet.create({
    listItem: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: "#e3e9e5"
    },
    itemText: {
        textAlign: 'center'
    }
});
