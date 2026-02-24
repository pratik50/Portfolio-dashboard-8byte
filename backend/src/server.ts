import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import stocksRouter from './routes/stocks'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// stocks router
app.use('/api/stocks', stocksRouter)

// Simple health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})