import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLayoutEffect } from "react";
import Nutri from "../components/Nutri";
import List from "../components/List";

export default function MealDetailsScreen({ route, navigation }) {
  const selectedMeal = route.params.data;

  const mealData = {
    dish_name: "Broccoli and Chicken Stir-Fry",
    ingredients: ["broccoli", "rotisserie_chicken"],
    instructions: [
      "Heat a large skillet or wok over medium-high heat.",
      "Add the broccoli and cook, stirring occasionally, until tender-crisp, about 5 minutes.",
      "Add the chicken and cook, stirring occasionally, until heated through, about 2 minutes.",
      "Season with salt and pepper to taste.",
      "Serve immediately.",
    ],
    nutritional_information: {
      calories: 145,
      fat: 3.5,
      carbohydrates: 9,
      protein: 20,
    },
    tips: [
      "For a vegetarian version of this dish, omit the chicken and add an extra cup of broccoli.",
      "To make this dish ahead of time, cook the broccoli and chicken according to the instructions and then store them in separate containers in the refrigerator for up to 3 days.",
      "When you're ready to serve, reheat the broccoli and chicken in a skillet or microwave and then combine them.",
    ],
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: mealData.dish_name,
    });
  }, [mealData, navigation]);

  
  return (
    <ScrollView style={styles.root}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <View style={styles.foodData}>
        <View>
          <Text style={styles.subtitle}>Ingredients</Text>
          <List data={mealData.ingredients}/>
        </View>

        <View>
          <Text style={styles.subtitle}>Nutritional Information</Text>
          <Nutri {...mealData.nutritional_information} />
        </View>

        <View>
          <Text style={styles.subtitle}>Instructions</Text>
          <List data={mealData.instructions}/>
        </View>

        <View>
          <Text style={styles.subtitle}>Tips</Text>
          <List data={mealData.tips}/>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root:{
    flex: 1,
    height: '150%'
  },
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    color: "white",
  },
  textPositioner: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  foodData: {
    position: "absolute",
    top: 280,
    backgroundColor: "white",
    width: "100%",
    borderRadius: 20,
    paddingTop: 15,
    paddingHorizontal: 15,
    flex: 1,
    height: 1000
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
