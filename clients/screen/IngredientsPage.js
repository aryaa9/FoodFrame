import {FlatList} from "react-native";
import { MEALS } from "../data/data";
import Ingredient from "../components/Ingredient";

export default function IngredientsPage({route, navigation}) {
  function showIngerdient(itemData) {
    function pressHandler() {
        navigation.navigate("Details",{
            data: itemData.item
        })
    }
    return <Ingredient onPress={pressHandler} data={itemData.item} />;
  }
  return (
    <FlatList
      data={MEALS}
      keyExtractor={(item) => item.id}
      renderItem={showIngerdient}
    />
  );
}
