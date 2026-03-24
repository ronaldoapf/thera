import { httpClient } from "../httpClient"

const baseURL = "/auth"

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  id: string
  name: string
  role: string;
  email: string
  avatarUrl: string | null
  access_token: string
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export const AuthApi = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await httpClient.post(`${baseURL}/register`, data);
    return response.data
  },
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await httpClient.post(`${baseURL}/login`, data);
    return response.data
  },
  forgotPassword: async (email: string) => {
    const { data } = await httpClient.post(`${baseURL}/forgot-password`, { email });
    return data
  },
  resetPassword: async (props: ResetPasswordRequest) => {
    const { data } = await httpClient.post(`${baseURL}/reset-password`, props);
    return data
  }
}