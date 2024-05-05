import { View, Text, StyleSheet } from "react-native";

export default function Nutri({calories, fat, carbohydrates, protein}){
    return (
        <View style={styles.root}>
            <View style={styles.item}>
                <Text style={styles.tit}>Cal.</Text>
                <Text style={styles.sub}>{calories}</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.tit}>Fat</Text>
                <Text style={styles.sub}>{fat}</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.tit}>Carb.</Text>
                <Text style={styles.sub}>{carbohydrates}</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.tit}>Protein</Text>
                <Text style={styles.sub}>{protein}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around'
    },
    tit: {
        fontSize: 15,
        fontWeight: 'bold'
    }
})