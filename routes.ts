import { Router } from 'express'
import type { Request, Response } from 'express'
import { readFile } from 'node:fs/promises'

type NotesData = {
	id: string
	title: string
	noteText: string
	createdAt: string
	updatedAt: string
}

export const router = Router()

// Get all notes
router.get('/notes', async (req: Request, res: Response) => {
	const notesData = await readFile(new URL('./notes.json', import.meta.url), 'utf-8')
	res.status(200).json(JSON.parse(notesData))
})

// Get one note
router.get('/notes/:id', async (req: Request, res: Response) => {
	console.log(req.params)
	const { id } = req.params
	const notesData = await readFile(new URL('./notes.json', import.meta.url), 'utf-8')
	const notes = JSON.parse(notesData)
	const note = notes.find((item: NotesData) => item.id === id)
	res.status(200).json(note)
})
