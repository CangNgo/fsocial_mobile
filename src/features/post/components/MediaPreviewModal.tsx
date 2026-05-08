import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { ImagePickerAsset } from "expo-image-picker"
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native"

interface MediaPreviewModalProps {
    asset: ImagePickerAsset | null
    onClose: () => void
}

const MediaPreviewModal = ({ asset, onClose }: MediaPreviewModalProps) => {
    return (
        <Modal
            visible={!!asset}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.close_btn} onPress={onClose}>
                    <Ionicons name="close" size={28} color="white" />
                </TouchableOpacity>
                {asset && (
                    <Image
                        source={{ uri: asset.uri }}
                        style={styles.image}
                        contentFit="contain"
                    />
                )}
            </View>
        </Modal>
    )
}

export default MediaPreviewModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.9)",
        justifyContent: "center",
        alignItems: "center",
    },
    close_btn: {
        position: "absolute",
        top: 48,
        right: 20,
        zIndex: 10,
    },
    image: {
        width: "100%",
        height: "80%",
    },
})
