import { Pressable, StyleSheet, Text, View } from "react-native";

interface ICard {
    title?: string;
    icon?: React.ReactNode
    onPress?: () => void
}

const Card = ({ title, icon, onPress }: ICard) => {
    return (
        <Pressable onPress={onPress} style = {[styles.container]}>
            <View>{icon}</View>
            <View><Text>{title}</Text></View>
        </Pressable>
        )
}

export default Card

const styles = StyleSheet.create({
    container: { 
    }
})