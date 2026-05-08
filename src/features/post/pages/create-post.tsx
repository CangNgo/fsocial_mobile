import { useAuthStore } from "@/features/auth/store/auth-store"
import { imageDefault } from "@/type/response-api"
import { COLORS } from "@/utils/variable-color"
import { PlaceholderBridge, RichText, TenTapStartKit, useEditorBridge } from '@10play/tentap-editor'
import { Feather, Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from "react"
import { Alert, Pressable, StyleSheet, Text, View } from "react-native"
import Card from "../components/card"
import MediaList from "../components/MediaList"
import MediaPreviewModal from "../components/MediaPreviewModal"
import { useCreatePostStore } from "../stores/create-post"

const CreatPost = () => {
    const { user } = useAuthStore()
    const { setContent, addAssets, removeAsset, assets, setShouldResetEditor } = useCreatePostStore()
    const [previewAsset, setPreviewAsset] = useState<ImagePicker.ImagePickerAsset | null>(null)

    const editor = useEditorBridge({
        autofocus: false,
        avoidIosKeyboard: true,
        bridgeExtensions: [
            ...TenTapStartKit,
            PlaceholderBridge.configureExtension({
                placeholder: "Bạn đang nghĩ gì?",
            }),
        ],
    })

    useEffect(() => {
        const unsubscribe = editor._subscribeToContentUpdate(async () => {
            const [html, text] = await Promise.all([
                editor.getHTML(),
                editor.getText(),
            ])
            setContent({ html, text })
        })
        return unsubscribe
    }, [editor])

    const shouldResetEditor = useCreatePostStore((state) => state.shouldResetEditor)
    useEffect(() => {
        if (shouldResetEditor) {
            editor.setContent("")
            setShouldResetEditor(false)
        }
    }, [shouldResetEditor])

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!permission.granted) {
            Alert.alert("Chưa có quyền", "Bạn không có quyền truy cập thư viện")
            return
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: true,
            mediaTypes: ['images', 'videos'],
            quality: 0.8,
            selectionLimit: 10,
        })
        if (!result.canceled) {
            addAssets(result.assets)
        }
    }

    const listCard = [
        {
            title: "Image",
            icon: <Ionicons name="image-outline" size={24} color="black" />,
            onPress: pickImage,
        },
        {
            title: "Map",
            icon: <Feather name="map-pin" size={24} color="black" />,
            onPress: pickImage,
        }
    ]

    return (
        <View style={styles.container}>
            <Pressable onPress={() => editor.blur()} style ={styles.post_header}>
                <View style={styles.user_information}>
                    <Image
                        style={styles.avatar}
                        source={user?.avatar ? { uri: user.avatar } : imageDefault}
                        contentFit="cover"
                    />
                    <View>
                        <Text style={{ fontWeight: "600" }}>{user?.username}</Text>
                        <View style={styles.status_post}>
                            <Text style={styles.status_text}>Public</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.card}>
                    {listCard.map((item, index) => (
                        <Card key={index} onPress={item.onPress} title={item.title} icon={item.icon} />
                    ))}
                </View>
            </Pressable>
            <View style={styles.post_content}>
                <RichText editor={editor} style={styles.editor} />
            </View>

            <MediaList
                assets={assets}
                onPressItem={setPreviewAsset}
                onRemoveItem={removeAsset}
            />

            <MediaPreviewModal
                asset={previewAsset}
                onClose={() => setPreviewAsset(null)}
            />
        </View>
    )
}
export default CreatPost

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "#ffffff",
    },
    post_header: {
        flexDirection: "row",
        justifyContent:"space-between"
    },
    user_information: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingVertical: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#ffffff"
    },
    status_post: {
        backgroundColor: COLORS.background_post,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 5,
        borderRadius: 24
    },
    status_text: {
        color: COLORS.primary
    },
    editor: {
        flex: 1,
    },
    post_content: {
        flex: 0.7
    },
    card: {
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        columnGap: 12,
    },
})
