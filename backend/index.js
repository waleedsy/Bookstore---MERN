import express from "express";
import { PORT, mongoDBURL } from '../backend/config.js'
import mongoose from "mongoose"
import { Book } from "./models/bookModel.js"; 
import { message } from "antd";
import cors from 'cors'
import booksRoute from "./routes/booksRoute.js";

const app = express()

//Middleware for parsing request body
app.use(express.json())

//Middleware for handling CORS POLICY
//Option 1: Allow all origins with Default of cors(*)
app.use(cors())
//Option 2: Allow custom origins
// cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// })


app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('WELCOME TO MERN STACK TUTORIAL')
})

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database!')
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    });