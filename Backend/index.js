import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors';

import {auth} from './Routes/auth.js'
dotenv.config()
const app = express();


// Use CORS before defining routes
app.use(cors({
    origin: 'http://127.0.0.1:3000',        
    credentials: true
}));

// Start Server
app.listen(process.env.PORT,function (){
    console.log(`Server is listening at ${process.env.PORT}`)
})

//  Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/BlogHub").then(() => {
    console.log("MONGODB Connected Successfully to BlogHub Application");
}).catch((error) => {
    console.error("MongoDB connection failed", error);
});

//  Define Routes
app.use(express.json())
app.use('/',auth)