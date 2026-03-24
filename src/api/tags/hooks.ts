import { useMutation } from '@tanstack/react-query'

// TODO: Implement with real tags API
export function useAssignTags() {
	return useMutation({
		mutationFn: async (_: { userId: string; tagIds: string[] }) => {},
	})
}

export function useRemoveTags() {
	return useMutation({
		mutationFn: async (_: { userId: string; tagIds: string[] }) => {},
	})
}
