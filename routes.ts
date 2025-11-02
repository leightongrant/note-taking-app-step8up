import { Router } from 'express'
import type { Request, Response } from 'express'
import { readFile } from 'node:fs/promises'

export const router = Router()

router.get('/notes', async (req: Request, res: Response) => {
	const notesData = await readFile(new URL('./notes.json', import.meta.url), 'utf-8')
	res.status(200).json(JSON.parse(notesData))
})
