import api from "@/services/axios"
import { NotificationDTO } from "@/type/notification"

export const pushNotification = async (userId: string | undefined, data: NotificationDTO) => {
    const response = await api.post(`/notification/send/${userId}`, data)
    return response
}