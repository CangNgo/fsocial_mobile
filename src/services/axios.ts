import { ResponseApi } from "@/type/response-api"
import { tokenStore } from "@/features/auth/store/secure-store"
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios"

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_LOCATION

if (!BASE_URL) {
    console.warn("EXPO_PUBLIC_BACKEND_LOCATION is not set in .env")
}

// Các endpoint không cần refresh token
const AUTH_ENDPOINTS = ["/auth/login", "/auth/refresh-token", "/auth/register"]

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
})

// Trạng thái refresh token
let isRefreshing = false
let retryCount = 0
const MAX_RETRY = 3

type QueueItem = { resolve: (token: string) => void; reject: (err: unknown) => void }
let failedQueue: QueueItem[] = []

const processQueue = (error: unknown, token: string | null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        error ? reject(error) : resolve(token!)
    })
    failedQueue = []
}

const redirectToLogin = () => {
    // Dùng dynamic import tránh circular dependency
    require("expo-router").router.replace("/(auth)/login")
}

// ─── Request interceptor ─────────────────────────────────────────────────────
instance.interceptors.request.use(async (config) => {
    const token = await tokenStore.getAccessToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data"
    }
    return config
})

// ─── Response interceptor ────────────────────────────────────────────────────
instance.interceptors.response.use(
    response => response.data,
    async (error) => {
        const originalRequest: InternalAxiosRequestConfig & { _retry?: boolean } = error.config

        const isAuthEndpoint = AUTH_ENDPOINTS.some(ep => originalRequest?.url?.includes(ep))
        const is401 = error.response?.status === 401

        if (is401 && !originalRequest?._retry && !isAuthEndpoint) {

            if (isRefreshing) {
                return new Promise<string>((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    return instance(originalRequest)
                })
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const refreshToken = await tokenStore.getRefreshToken()
                if (!refreshToken) throw new Error("No refresh token")

                const res = await instance.post("/auth/refresh-token", { refreshToken })
                const data = (res as any)?.data ?? res
                const newAccessToken: string = data.accessToken
                const newRefreshToken: string = data.refreshToken

                await tokenStore.saveTokens(newAccessToken, newRefreshToken)
                instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`

                processQueue(null, newAccessToken)
                retryCount = 0

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return instance(originalRequest)

            } catch (refreshError) {
                retryCount++
                processQueue(refreshError, null)

                if (retryCount >= MAX_RETRY) {
                    retryCount = 0
                    await tokenStore.clearTokens()
                    redirectToLogin()
                }

                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        if (axios.isAxiosError(error)) {
            console.error("API Error:", {
                code: error.code,
                status: error.response?.status,
                url: originalRequest?.url,
                data: error.response?.data,
                message: error.message,
            })
        }
        return Promise.reject(error)
    }
)

const api = {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
        instance.get(url, config) as unknown as Promise<ResponseApi<T>>,

    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        instance.post(url, data, config) as unknown as Promise<ResponseApi<T>>,

    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        instance.put(url, data, config) as unknown as Promise<ResponseApi<T>>,

    patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        instance.patch(url, data, config) as unknown as Promise<ResponseApi<T>>,

    delete: <T>(url: string, config?: AxiosRequestConfig) =>
        instance.delete(url, config) as unknown as Promise<ResponseApi<T>>,
}

export default api
