import api from "@/services/axios"
import { User } from "../types/user"

export const getProfile = async () => {
    return api.get<User>("/profile")
}
