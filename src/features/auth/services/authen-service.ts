import api from "@/services/axios"
import { Login, LoginResponse } from "../types/authen"

export const loginAPI = async (param: Login) => {
    return api.post<LoginResponse>("/auth/login", param)
}
