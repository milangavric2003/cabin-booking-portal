import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routers/user.router'
import vikendicaRouter from './routers/vikendica.router'
import rezervacijaRouter from './routers/rezervacija.router'

const app = express()
app.use(cors())

// .png slike 300x300 zauzimaju vise mesta nego sto json predvidja:
//app.use(express.json())
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ limit: '1mb', extended: true }))

mongoose.connect('mongodb://localhost:27017/projekat')
const conn = mongoose.connection
conn.once('open', () => {
    console.log("DB ok")
})

const router = express.Router()
router.use('/korisnici', userRouter)
router.use('/vikendice', vikendicaRouter)
router.use('/rezervacije', rezervacijaRouter)

app.use('/', router)

app.listen(4000, ()=>console.log('Express running on port 4000'))
