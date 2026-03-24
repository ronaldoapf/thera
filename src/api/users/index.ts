import { httpClient } from "../httpClient";

const baseURL = "/users"

interface GetLoggedInUserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserRequest {
  council?: string;
  councilRegistration?: string;
}

export const UsersApi = {
  getLoggedUser: async () => {
    const { data } = await httpClient.post<GetLoggedInUserResponse>(`${baseURL}/me`);
    return data
  },
  updateUser: async (body: UpdateUserRequest) => {
    const { data } = await httpClient.put(`${baseURL}/me`, body);
    return data
  }
}