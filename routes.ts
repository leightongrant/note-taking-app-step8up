import { Router } from 'express'
import type { Request, Response } from 'express'
import { readFile, writeFile } from 'node:fs/promises'
import { nanoid } from 'nanoid'
import Joi from 'joi'

const schema = Joi.object({
	title: Joi.string().required().min(3).max(100),
	noteText: Joi.string().required().min(3).max(2000),
})

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
	const notes = JSON.parse(notesData) as NotesData[]
	res.status(200).json(notes)
})

// Get one note
router.get('/notes/:id', async (req: Request, res: Response) => {
	const { id } = req.params
	const notesData = await readFile(new URL('./notes.json', import.meta.url), 'utf-8')
	const notes = JSON.parse(notesData) as NotesData[]
	const note = notes.find((item: NotesData) => item.id === id)
	res.status(200).json(note)
})

// Create note
router.post('/notes', async (req: Request, res: Response) => {
	const { body } = req
	if (!body) {
		res.status(400).json({
			error: 'Empty Request',
			message: 'The request body is empty. Please provide valid note data.',
		})
	}
	const { error, value } = schema.validate(body)
	if (error) {
		res.status(400).json(error.message)
	}

	const newNote: NotesData = { id: nanoid(), ...value, createdAt: new Date(), updatedAt: new Date() }

	try {
		const notesData = await readFile(new URL('./notes.json', import.meta.url), 'utf-8')
		if (!notesData) {
			await writeFile('./notes.json', JSON.stringify([newNote]))
			res.status(201).json({ message: 'success' })
			return
		}
		const notes = JSON.parse(notesData) as NotesData[]

		const conflict = notes.find((note) => note.title === newNote.title)
		if (conflict) {
			res.status(409).json({
				error: 'Conflict',
				message: 'A note with this title already exists.',
			})
			return
		}

		notes.push(newNote)

		await writeFile('./notes.json', JSON.stringify(notes))

		res.status(201).json({ message: 'success' })
	} catch (error) {
		res.status(400).json(error)
	}
})
