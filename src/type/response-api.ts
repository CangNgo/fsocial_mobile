import defaultImage from "@/assets/images/default_image.png";

export interface ResponseApi<T>{
    statusCode: number; 
    message: string; 
    data: T;
}

export const imageDefault = defaultImage