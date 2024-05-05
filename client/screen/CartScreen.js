import { View, Text, FlatList } from "react-native";
import Ingredient from "../components/Ingredient";


export default function CartScreen({ route, navigation }) {
  const cartItems = route.params.data;
  return (
    <View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
            <Text>{itemData.item.title}</Text>
        }}
      />
    </View>
  );
}
