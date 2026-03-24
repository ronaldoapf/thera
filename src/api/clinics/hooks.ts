import { useMutation, useQuery } from "@tanstack/react-query";
import { ClinicsApi, type CreateClinicRequest } from ".";

export function useCreateClinic() {
  return useMutation({
    mutationFn: (body: CreateClinicRequest) => ClinicsApi.createClinic(body)
  })
}

export function useGetLoggedUserClinic(enabled: boolean) {
  return useQuery({
    queryKey: ['clinic'],
    queryFn: () => ClinicsApi.getLoggedUserClinic(),
    enabled: !!enabled
  })
}