import { View, Text } from "react-native"

export default function IngredientDetails({ route, navigation }){
    const data = route.params.data;
    return (
        <View>
            <Text> {data.title}</Text>
        </View>
    )
}