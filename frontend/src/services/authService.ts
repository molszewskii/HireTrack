import axios from "axios";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types/Auth";

const API_URL = 'http://127.0.0.1:8000/api/';

export const registerUser = async(data: RegisterRequest): Promise<void> =>{
    await axios.post(`${API_URL}register/`, data);
}

export const loginUser = async(data:LoginRequest): Promise<AuthResponse> =>{
    const response = await axios.post<AuthResponse>(`${API_URL}login/`,data);
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return response.data;
}