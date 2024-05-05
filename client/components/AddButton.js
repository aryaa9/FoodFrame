import { Pressable } from "react-native";

export default function AddButton({children, onPress}){
    return(
        <Pressable onPress={onPress}>
            {children}
        </Pressable>
    )
}