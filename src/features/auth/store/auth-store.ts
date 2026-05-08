import { create } from "zustand";
import { ResponseApi } from './../../../type/response-api';

import notificationService from "@/services/notifications/notification-service";
import { loginAPI } from "../services/authen-service";
import { getProfile } from "../services/user-service";
import { Login, LoginResponse } from "../types/authen";
import { User } from "../types/user";
import { tokenStore } from "./secure-store";

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    fcmToken: string | null;
    setFcmToken: (token: string) => void;
    login: (param: Login) => Promise<ResponseApi<LoginResponse>>;
    restoreSession: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: false,
    fcmToken: null,
    setFcmToken: (token) => set({ fcmToken: token }),
    login: async (param: Login) => {
        set({ isLoading: true })
        try {
            const response = await loginAPI(param)
            if (response.statusCode === 200) {
                await tokenStore.saveTokens(response.data.accessToken, response.data.refreshToken)
                const user = await getProfile()
                set({ isAuthenticated: true, user: user.data })

                notificationService.registerForPushNotifications().then(token => {
                    if (token) {
                        notificationService.registerTokenWithBackend(String(user.data.id), token)
                        set({ fcmToken: token })
                    }
                })
            }
            return response
        } finally {
            set({ isLoading: false })
        }
    },
    restoreSession: async () => {
        const token = await tokenStore.getAccessToken()
        if (!token) return
        try {
            const user = await getProfile()
            set({ isAuthenticated: true, user: user.data })
        } catch {
            await tokenStore.clearTokens()
        }
    }

}))