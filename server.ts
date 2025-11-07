import express from 'express'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import cors from 'cors'
import path from 'path'
//import { writeFile } from 'node:fs/promises'
//import { existsSync } from 'node:fs'
import { router } from './routes.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

//if (!existsSync('notes.json')) await writeFile('notes.json', JSON.stringify([]))

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use('/api/', router)

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

export default app
