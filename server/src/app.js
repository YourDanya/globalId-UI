import express from 'express'

import cors from 'cors'
import helmet from 'helmet';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import router from './routes/router.js'
import connectDB from './configs/mongo.js';

process.setMaxListeners(0)

dotenv.config({
    path: './src/.env'
})

await connectDB()


const port = process.env.PORT || 5000

const app = express()

app.use(cors({
    origin: ["https://vigorous-volhard-c82a2c.netlify.app", "http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true
}))

app.use(cookieParser())
app.use(helmet())

app.use('/', router)
app.get('/', (req, res) => res.send('123'))




app.listen(port, () => console.log(`Listening on port ${port}`))

