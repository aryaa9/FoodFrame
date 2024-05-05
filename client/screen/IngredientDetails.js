import { View, Text } from "react-native"
import { useLayoutEffect } from "react";

export default function IngredientDetails({ route, navigation }){
    const data = route.params.data;

    useLayoutEffect(() => {
        navigation.setOptions({
          title: data.title,
        });
      }, [data, navigation]);

    return (
        <View>
            <Text> {data.title}</Text>
        </View>
    )
}