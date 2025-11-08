import { Router } from 'express'
import type { Request, Response } from 'express'
import { nanoid } from 'nanoid'
import Joi from 'joi'
import { redis } from './connection.ts'

const schema = Joi.object({
	title: Joi.string().required().min(3).max(100),
	noteText: Joi.string().required().min(3).max(2000),
})

type NotesData = {
	id: string
	title: string
	noteText: string
	createdAt: Date
	updatedAt: Date
}

type NotesUpdateData = {
	title: string
	noteText: string
	updatedAt: Date
}

export const router = Router()

// Get all notes
router.get('/notes', async (req: Request, res: Response) => {
	try {
		const notesData = await redis.get('notesDb')
		if (notesData) {
			const notes = JSON.parse(notesData) as NotesData[]
			res.status(200).json(notes)
			return
		}
		throw new Error('Notes not found')
	} catch (error) {
		res.status(404).json(error)
	}
})

// Get one note
router.get('/notes/:id', async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const notesData = await redis.get('notesDb')
		if (notesData) {
			const notes = JSON.parse(notesData) as NotesData[]
			const note = notes.find((item: NotesData) => item.id === id)
			res.status(200).json(note)
			return
		}
		throw new Error('Note not found')
	} catch (error) {
		res.status(404).json(error)
	}
})

// Create note
router.post('/notes', async (req: Request, res: Response) => {
	// Get note data
	const { body } = req
	if (!body) {
		res.status(400).json({
			error: 'Empty Request',
			message: 'The request body is empty. Please provide valid note data.',
		})
	}
	// Validate note Data
	const { error, value } = schema.validate(body)
	if (error) {
		res.status(400).json(error.message)
	}

	// Create new note
	const newNote: NotesData = { id: nanoid(), ...value, createdAt: new Date(), updatedAt: new Date() }

	// Get note data. If no data create new array with note
	try {
		const notesData = await redis.get('notesDb')
		if (!notesData) {
			// await writeFile('./notes.json', JSON.stringify([newNote]))
			await redis.set('notesDb', JSON.stringify([newNote]))
			res.status(201).json({ message: 'Success, new note created', note: newNote })
			return
		}

		// Get all notes data
		const notes = JSON.parse(notesData) as NotesData[]

		// Check if note with current title already in database
		const conflict = notes.find((note) => note.title === newNote.title)
		if (conflict) {
			res.status(409).json({
				error: 'Conflict',
				message: 'A note with this title already exists.',
			})
			return
		}

		// Add new note to array
		notes.push(newNote)
		// Save new notes
		await redis.set('notesDb', JSON.stringify(notes))

		res.status(201).json({ message: 'Success, new note created' })
		return
	} catch (error) {
		res.status(400).json(error)
	}
})

// Edit a note
router.put('/notes/:id', async (req: Request, res: Response) => {
	const { id } = req.params
	if (!id) {
		res.status(400).json({
			error: 'Empty Request',
			message: 'The request id is empty. Please provide a valid id.',
		})
	}
	const { body } = req
	// Check for incoming data
	if (!body) {
		res.status(400).json({
			error: 'Empty Request',
			message: 'The request body is empty. Please provide valid note data.',
		})
	}
	// Validate incoming data
	const { error, value } = schema.validate(body)
	if (error) {
		res.status(400).json(error.message)
		return
	}
	// Create update data object
	const updateData: NotesUpdateData = { ...value, updatedAt: new Date() }

	try {
		const notesData = await redis.get('notesDb')

		const newNote: NotesData = { id: nanoid(), ...updateData, createdAt: new Date() }
		if (!notesData) {
			await redis.set('notesDb', JSON.stringify([newNote]))
			res.status(201).json({ message: 'Success, new note created', note: newNote })
			return
		}

		let notes = JSON.parse(notesData) as NotesData[]

		// Return not found if note not found
		let currentNote = notes.find((note) => note.id === id)
		if (!currentNote) {
			res.status(404).json({
				error: 'Not found',
				message: `A note with this id(${id}) is not found`,
			})
			return
		}
		// Update current note
		currentNote = { ...currentNote, ...updateData }
		// Remove old note
		notes = notes.filter((note) => note.id !== id)
		// Add updated note
		notes.push(currentNote)

		await redis.set('notesDb', JSON.stringify(notes))
		res.status(200).json(currentNote)
		return
	} catch (error) {
		res.status(400).json(error)
	}
})

// Delete a note
router.delete('/notes/:id', async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		let notesData = await redis.get('notesDb')
		if (!notesData) {
			res.status(404).json({ message: 'No data found' })
			return
		}

		let notes = JSON.parse(notesData) as NotesData[]

		notes = notes.filter((note) => note.id !== id)

		await redis.set('notesDb', JSON.stringify(notes))
		res.status(200).json({ message: `Note with id(${id}) deleted` })
		return
	} catch (error) {
		res.status(400).json(error)
	}
})
