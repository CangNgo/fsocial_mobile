import * as yup from 'yup'

export const loginSchema = yup.object({
    email: yup
        .string().email("Email không đúng định dạng").min(6, "Email tối thiểu 6 ký tự đã bao gồm @gmail.com")
        .required("Email không được để trống"),
    password: yup
        .string().min(6, "Mật khẩu phải ít nhất 6 ký tự").required("Mật khẩu không được bỏ trống")
})

export type LoginForm = yup.InferType<typeof loginSchema>;