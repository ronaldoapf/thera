import { useMutation, useQuery } from "@tanstack/react-query";
import { CollaboratorsApi, type AddCollaboratorRequest } from ".";
import { queryClient } from "../queryClient";
import type { CollaboratorRoleEnum } from "@/constants/enums/collaborator-role-enum";

export function useGetCollaborators() {
  return useQuery({
    queryKey: ['collaborators'],
    queryFn: () => CollaboratorsApi.getCollaborators(),
  })
}

export function useGetActiveCollaborators() {
  return useQuery({
    queryKey: ['collaborators', 'active'],
    queryFn: () => CollaboratorsApi.getCollaborators({ isActive: true }),
  })
}

export function useGetInvite(inviteId: string) {
  return useQuery({
    queryKey: ['invite', inviteId],
    queryFn: () => CollaboratorsApi.getInviteInfo(inviteId),
    enabled: !!inviteId,
  });
}

export function useCreateCollaborator() {
  return useMutation({
    mutationFn: async (body: AddCollaboratorRequest) => await CollaboratorsApi.addCollaborator(body),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collaborators"]
      })
    }
  })
}

export function useAcceptInvite() {
  return useMutation({
    mutationFn: async ({ inviteId, password }: { inviteId: string, password: string }) =>
      await CollaboratorsApi.acceptInvite(inviteId, password),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collaborators"]
      })
    }
  })
}

export function useCancelInvite() {
  return useMutation({
    mutationFn: async (inviteId: string) => await CollaboratorsApi.cancelInvite(inviteId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collaborators"]
      })
    }
  })
}

export function useDeactiveCollaborator(onSuccess?: () => void, onError?: () => void) {
  return useMutation({
    mutationFn: async (id: string) => await CollaboratorsApi.deactiveCollaborator(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collaborators"] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });
}

export function useUpdateCollaborator() {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return CollaboratorsApi.updateCollaborator(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collaborators"] });
    },
  });
}

export function useUpdateCollaboratorRole() {
  return useMutation({
    mutationFn: async ({ id, role }: { id: string; role: CollaboratorRoleEnum }) => {
      return CollaboratorsApi.updateCollaboratorRole(id, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collaborators"] });
    },
  });
}
