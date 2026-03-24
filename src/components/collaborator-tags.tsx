interface CollaboratorTagsProps {
	userId: string
}

// TODO: Implement with real tags API
export function CollaboratorTags({ userId: _ }: CollaboratorTagsProps) {
	return <span className="text-sm text-muted-foreground">—</span>
}
