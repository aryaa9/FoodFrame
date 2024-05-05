import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MealsPage from "./screen/MealsPage";
import AddIngredients from "./screen/AddIngredients";
import IngredientsPage from "./screen/IngredientsPage";
import IngredientDetails from "./screen/IngredientDetails";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealDetails from "./screen/MealDetails";
import CartScreen from "./screen/CartScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  function pressedButton() {
    return;
  }
  function IngDetails() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#016b3f" },
          headerTintColor: "white",
          contentStyle: { backgroundColor: "#e3e9e5" },
        }}
      >
        <Stack.Screen
          name="IngredientsPage"
          component={IngredientsPage}
          options={{
            title: "Ingredients",
            headerRight: () => {
              <Button
                title="Cart"
                onPress={() => alert("Button clicked")}
                color="white"
              />;
            },
          }}
        />
        <Stack.Screen name="Details" component={IngredientDetails} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    );
  }

  function MeDetails() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#016b3f" },
          headerTintColor: "white",
          contentStyle: { backgroundColor: "#e3e9e5" },
        }}
      >
        <Stack.Screen
          name="MealsPage"
          component={MealsPage}
          options={{
            title: "Meals Page",
          }}
        />
        <Stack.Screen
          name="MealDetails"
          component={MealDetails}
          options={{ title: "Meal Details" }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#016b3f" },
          headerTintColor: "white",
          contentStyle: { backgroundColor: "#e3e9e5" },
          tabBarActiveTintColor: { backgroundColor: "#016b3f" },
        }}
      >
        <Tab.Screen
          name="Mealss"
          component={MeDetails}
          options={{
            tabBarLabel: "Meals",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="AddIngredients"
          component={AddIngredients}
          options={{
            title: "Add Ingredients",
            tabBarLabel: "Add",
          }}
        />
        <Tab.Screen
          name="Ingredientss"
          component={IngDetails}
          options={{
            tabBarLabel: "Ingredients",
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
