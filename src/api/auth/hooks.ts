import { useMutation } from "@tanstack/react-query";
import { AuthApi, type RegisterRequest, type ResetPasswordRequest } from ".";

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) => AuthApi.register(data)
  })
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => AuthApi.forgotPassword(email)
  })
}

export function useResetPassword() {
	return useMutation({
		mutationFn: (props: ResetPasswordRequest) => AuthApi.resetPassword(props),
	})
}
