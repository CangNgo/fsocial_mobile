import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { ImagePickerAsset } from "expo-image-picker"
import { StyleSheet, TouchableOpacity, View } from "react-native"

interface MediaItemProps {
    asset: ImagePickerAsset
    onPress: (asset: ImagePickerAsset) => void
    onRemove: (uri: string) => void
}

const MediaItem = ({ asset, onPress, onRemove }: MediaItemProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touch} onPress={() => onPress(asset)} activeOpacity={0.8}>
                <Image
                    source={{ uri: asset.uri }}
                    style={styles.thumbnail}
                    contentFit="cover"
                />
                {asset.type === "video" && (
                    <View style={styles.play_icon}>
                        <Ionicons name="play" size={28} color="white" />
                    </View>
                )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.remove_btn} onPress={() => onRemove(asset.uri)}>
                <Ionicons name="close-outline" size={28} color="black" />
            </TouchableOpacity>
        </View>
    )
}

export default MediaItem

const styles = StyleSheet.create({
    container: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 8,
        overflow: "hidden",
    },
    touch: {
        flex: 1,
    },
    thumbnail: {
        flex: 1,
    },
    play_icon: {
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    remove_btn: {
        position: "absolute",
        top: 4,
        right: 4,
    },
})
