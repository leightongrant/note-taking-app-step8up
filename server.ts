import express from 'express'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import { router } from './routes.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/', router)

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

export default app
