import type { CollaboratorRoleEnum } from "@/constants/enums/collaborator-role-enum";
import { httpClient } from "../httpClient";

const baseURL = "/collaborators"

interface Collaborator {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  role: CollaboratorRoleEnum;
  expertise?: string;
  inviteStatus: 'PENDING' | 'ACCEPTED';
  expiresAt?: string;
}

export interface AddCollaboratorRequest {
  name: string;
  role: string;
  email: string;
  expertise?: string;
  tagIds?: string[];
}

export interface CollaboratorInvite {
  id: string;
  email: string;
  name: string;
  role: CollaboratorRoleEnum;
  expertise?: string;
  expiresAt: string;
}

type AddCollaboratorsResponse = Collaborator;
type GetCollaboratorsResponse = Collaborator[];

interface GetCollaboratorsRequest {
  isActive?: boolean;
  role?: CollaboratorRoleEnum;
}

export const CollaboratorsApi = {
  getCollaborators: async (params?: GetCollaboratorsRequest) => {
    const { data } = await httpClient.get<GetCollaboratorsResponse>(`${baseURL}`, { params });
    return data
  },
  addCollaborator: async (body: AddCollaboratorRequest): Promise<CollaboratorInvite> => {
    const { data } = await httpClient.post<CollaboratorInvite>(`${baseURL}`, body);
    return data
  },

  acceptInvite: async (inviteId: string, password: string): Promise<AddCollaboratorsResponse> => {
    const { data } = await httpClient.post<AddCollaboratorsResponse>(`${baseURL}/invites/${inviteId}/accept`, { password });
    return data;
  },

  getInviteInfo: async (inviteId: string): Promise<CollaboratorInvite> => {
    const { data } = await httpClient.get<CollaboratorInvite>(`${baseURL}/invites/${inviteId}`);
    return data;
  },

  cancelInvite: async (inviteId: string): Promise<void> => {
    await httpClient.delete(`${baseURL}/invites/${inviteId}`);
  },

  deactiveCollaborator: async(id: string): Promise<void> => {
    await httpClient.delete(`${baseURL}/${id}`);
  },

  updateCollaborator: async(id: string, body: Partial<AddCollaboratorRequest>) => {
    const { data } = await httpClient.put(`/collaborators/${id}`, body);
    return data;
  },

  updateCollaboratorRole: async (id: string, role: CollaboratorRoleEnum) => {
    const { data } = await httpClient.patch(`${baseURL}/${id}/role`, { role });
    return data;
  },
}