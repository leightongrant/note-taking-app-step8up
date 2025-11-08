import express from 'express'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import cors from 'cors'
import path from 'path'
import { redis } from './connection.ts'
import { router } from './routes.ts'
import type { Request, Response } from 'express'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

if (redis.isReady) {
	if (!(await redis.get('notesDb'))) {
		try {
			const result = await redis.set('notesDb', JSON.stringify([]))
			console.log(result)
		} catch (error) {
			console.log(error)
		}
	}
}

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use('/api/', router)

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

export default app
