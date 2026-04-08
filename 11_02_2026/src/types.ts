export interface PostType {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface UserType {
    id: number;
    name: string;
}

export interface CommentType {
    id: number;
    email: string;
    body: string;
}
