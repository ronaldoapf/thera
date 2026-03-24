import { httpClient } from "../httpClient";

const baseURL = "/clinics"

export interface Clinic {
  id: string;
  cnpj: string;
  municipalRegistration: string;
  legalName: string;
  phone: string;
  state: string;
  city: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClinicRequest {
  cnpj: string;
  municipalRegistration: string;
  legalName: string;
  phone: string;
  state: string;
  city: string;
}

interface UpdateClinicRequest {
  id: string;
}

export interface LoggedUserClinicResponse {
  clinic: Clinic;
}

export const ClinicsApi = {
  createClinic: async (body: CreateClinicRequest) => {
    const { data } = await httpClient.post<Clinic>(`${baseURL}`, {
      ...body
    });
    return data
  },
  updateClinic: async ({ id }: UpdateClinicRequest) => {
    const { data } = await httpClient.patch<{ success: true }>(`${baseURL}/${id}`);
    return data
  },
  getLoggedUserClinic: async () => {
    const { data } = await httpClient.get<LoggedUserClinicResponse>(`${baseURL}/me`);
    return data
  },
}