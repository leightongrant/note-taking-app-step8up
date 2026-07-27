export type NotesData = {
	id: string
	title: string
	noteText: string
	createdAt: Date
	updatedAt: Date
}

export type NotesUpdateData = {
	title: string
	noteText: string
	updatedAt: Date
}
