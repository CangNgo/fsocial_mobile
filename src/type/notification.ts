export interface NotificationDTO {
  title: string
  body: string
  token: string
  data?: Record<string, string>
}