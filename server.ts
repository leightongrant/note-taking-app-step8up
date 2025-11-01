import express from 'express'
import type { Request, Response } from 'express'

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
	res.status(200).json({ message: 'Hello World' })
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
