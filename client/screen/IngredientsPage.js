import { FlatList, Button, View, StyleSheet, Text } from "react-native";
import { MEALS } from "../data/data";
import Ingredient from "../components/Ingredient";
import { useLayoutEffect } from "react";
import AddButton from "../components/AddButton";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useEffect } from "react";

export default function IngredientsPage({ route, navigation }) {
  const [cartData, setCartData] = useState([]);

  function showIngerdient(itemData) {
    function pressHandler() {
      navigation.navigate("Details", {
        data: itemData.item,
      });
    }
    
    function adder(){
      setCartData((last) => [itemData.item, ...last])
    }
    return (
      <Ingredient
        onPress={pressHandler}
        data={itemData.item}
        addData={adder}
      />
    );
  }

  function cartOpener() {
    alert(cartData);
    navigation.navigate("Cart", {
      data: cartData,
    });
  }

  return (
    <View>
      <View style={styles.cartHolder}>
        <AddButton onPress={cartOpener}>
          <Ionicons name="cart" size={36} color="green" />
        </AddButton>
        <Text style={styles.cartNum}>{cartData.length}</Text>
      </View>
      <FlatList
        data={MEALS}
        keyExtractor={(item) => item.id}
        renderItem={showIngerdient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cartHolder: {
    margin: "5%",
    width: "90%",
    backgroundColor: "white",
    height: 60,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  cartNum: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
