import api from "@/services/axios"
import { PostResponse } from "../types/post-response"

export const createPost = async (data: FormData) => {
    return api.post<PostResponse>("/actions", data)
}
