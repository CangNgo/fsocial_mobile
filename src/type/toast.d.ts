export interface ToastType {
    type : "success" | "error" | " info"
    title : string;
    content ?: string;
}