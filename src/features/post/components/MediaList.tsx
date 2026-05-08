import { ImagePickerAsset } from "expo-image-picker"
import { StyleSheet, View } from "react-native"
import MediaItem from "./MediaItem"

interface MediaListProps {
    assets: ImagePickerAsset[]
    onPressItem: (asset: ImagePickerAsset) => void
    onRemoveItem: (uri: string) => void
}

const ITEM_GAP = 3

const MediaList = ({ assets, onPressItem, onRemoveItem }: MediaListProps) => {
    if (assets.length === 0) return null

    return (
        <View style={styles.container}>
            {assets.map((asset) => (
                <View key={asset.uri} style={styles.cell}>
                    <MediaItem
                        asset={asset}
                        onPress={onPressItem}
                        onRemove={onRemoveItem}
                    />
                </View>
            ))}
        </View>
    )
}

export default MediaList

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 8,
        gap: ITEM_GAP,
    },
    cell: {
        width: `30%`,
        paddingRight: ITEM_GAP,
        paddingBottom: ITEM_GAP,
    },
})
