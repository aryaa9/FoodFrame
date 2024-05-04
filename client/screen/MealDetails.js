import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLayoutEffect } from "react";

export default function MealDetailsScreen({ route, navigation }) {
  const selectedMeal = route.params.data;
  navigation.setOptions({
    title: selectedMeal.title,
  });

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
  return (
    <ScrollView style={styles.root}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <View style={styles.foodData}>

        <View>
          <Text style={styles.subtitle}>Ingredients</Text>
          <View>
            <Text>ingredients information</Text>
          </View>
        </View>

        <View>
          <Text style={styles.subtitle}>Nutritional Information</Text>
          <View>
            <Text>Nutritional information</Text>
          </View>
        </View>

        <View>
          <Text style={styles.subtitle}>Instructions</Text>
          <View>
            <Text>Instructions information</Text>
          </View>
        </View>

        <View>
          <Text style={styles.subtitle}>Tips</Text>
          <View>
            <Text>tips</Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    height: 500,
    borderRadius: 20,
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
