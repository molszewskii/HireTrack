export interface RegisterRequest{
    email: string;
    username: string;
    password: string;
    confirm_password: string;
} 

export interface LoginRequest{
    email: string;
    password: string;
}

export interface AuthResponse{
    access: string;
    refresh: string;
}