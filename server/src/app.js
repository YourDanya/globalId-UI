import express from 'express'

import cors from 'cors'
import helmet from 'helmet';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'

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
    origin: [process.env.FRONTEND_DEPLOY_ADDRESS, "http://localhost:3000", 'https://quirky-jang-62bfee.netlify.app'],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true
}))

app.use(cookieParser())
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: 50 * 1024 * 1024
}))
app.use(helmet())

app.use('/', router)
app.get('/', (req, res) => res.send('123'))




app.listen(port, () => console.log(`Listening on port ${port}`))

