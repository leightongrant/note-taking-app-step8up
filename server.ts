import express from 'express'
import type { Request, Response } from 'express'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req: Request, res: Response) => {
	res.status(200).json({ message: 'Hello World' })
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
