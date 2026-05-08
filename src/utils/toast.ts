import { ToastType } from "@/type/toast"
import Toast from "react-native-toast-message"
export class ToastMessage {
    static show(data: ToastType) {

        if (data?.content) {
            return Toast.show({
                type: data.type,
                text1: data.title,
                text2: data.content,
                position: "top",
                visibilityTime: 2000,
            })
        } else {
            return Toast.show({
                type: data.type,
                text1: data.title,
                text2: data.content,
                position: "top",
                visibilityTime: 2000,
            })
        }
    }
}