import { FlatList } from "react-native";
import { MEALS } from "../data/data";
import Meal from "../components/Meal";

export default function MealsPage({ route, navigation }) {
  function showIngerdient(itemData) {
    function pressHandler() {
      navigation.navigate("MealDetails", {
        data: itemData.item,
      });
    }
    return <Meal onPress={pressHandler} data={itemData.item} />;
  }
  return (
    <FlatList
      data={MEALS}
      keyExtractor={(item) => item.id}
      renderItem={showIngerdient}
    />
  );
}
