import { pushNotification } from "@/apis/notification"
import { useAuthStore } from "@/features/auth/store/auth-store"
import { ToastMessage } from "@/utils/toast"
import { ImagePickerAsset } from "expo-image-picker"
import { create } from "zustand"
import { createPost } from "../apis/post.api"


interface PostContent {
    html: string
    text: string
}

interface CreatePostState {
    content: PostContent
    assets: ImagePickerAsset[]
    isLoading: boolean
    shouldResetEditor: boolean
    setContent: (content: PostContent) => void
    addAssets: (newAssets: ImagePickerAsset[]) => void
    removeAsset: (uri: string) => void
    setShouldResetEditor: (value: boolean) => void
    reset: () => void
    submit: () => Promise<number>
    validate: () => boolean
}

export const useCreatePostStore = create<CreatePostState>((set, get) => ({
    content: { html: "", text: "" },
    assets: [],
    isLoading: false,
    shouldResetEditor: false,
    setContent: (content) => set({ content }),
    setShouldResetEditor: (value) => set({ shouldResetEditor: value }),
    addAssets: (newAssets) => set((state) => ({
        assets: [...state.assets, ...newAssets],
    })),
    removeAsset: (uri) => set((state) => ({
        assets: state.assets.filter((a) => a.uri !== uri),
    })),
    reset: () => set({ content: { html: "", text: "" }, assets: [], isLoading: false, shouldResetEditor: true }),
    submit: async () => {
        const { content, assets } = get()
        set({ isLoading: true })
        const user = useAuthStore.getState().user
        try {
            if (!get().validate()) {
                ToastMessage.show({ title: "Bài viết không có nội dung", content: "Bài viết phải có ít nhất một nội dung", type: "error" })
                return 0
            }

            const formData = new FormData()
            formData.append("text", content.text)
            formData.append("HTMLText", content.html)

            assets.forEach((asset, index) => {
                formData.append("media", {
                    uri: asset.uri,
                    name: asset.fileName ?? `file_${index}.${asset.type === "video" ? "mp4" : "jpg"}`,
                    type: asset.mimeType ?? (asset.type === "video" ? "video/mp4" : "image/jpeg"),
                } as any)
            })

            const response = await createPost(formData)

            const fcmToken = useAuthStore.getState().fcmToken
            if (fcmToken) {
                await pushNotification(String(user?.id), {
                    title: "Bạn đã đăng bài viết thành công",
                    body: "Xem bài viết",
                    token: fcmToken,
                    data: { screen: "/profile" },
                })
            }

            console.log("fcm token: ", fcmToken)

            debugger
            get().reset()
            ToastMessage.show({ title: "Đăng bài viết thành công", type: "success" })
            return response.statusCode
        } catch (error: any) {
            const message =  error?.response?.data?.message + "Lỗi không thể đăng bài viết"
            ToastMessage.show({
                title: "Đăng bài viết thất bại",
                content: message,
                type: "error"
            })

            return error?.response?.status ?? 500
        } finally {
            set({ isLoading: false })
        }
    },
    validate: () => {
        const hasText = get().content.text.trim().length > 0
        const hasAssets = get().assets.length > 0
        return hasText || hasAssets
    }
}))
