export interface PostResponse {
    id: string; 
    userId: string; 
    createDatetime: Date; 
    content: Content; 
    originPostId: string; 
    likes: string[]; 
    isShare: boolean; 
    status: boolean;
}

export interface Content {
    text:string; 
    HTMLText: string; 
    media: string[]
}