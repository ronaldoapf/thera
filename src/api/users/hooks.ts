import { useMutation, useQuery } from '@tanstack/react-query'
import { type ResetPasswordRequest, type UpdateUserRequest, UsersApi } from '.'

export function useGetLoggedUser() {
	return useQuery({
		queryKey: ['me'],
		queryFn: () => UsersApi.getLoggedUser(),
	})
}

export function useUpdateUser() {
	return useMutation({
		mutationFn: (props: UpdateUserRequest) => UsersApi.updateUser(props),
	})
}