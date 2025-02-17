

const express = require('express')
const mongoose = require('mongoose')

const cookie = require('cookie-parser')
const app = express()
const cors = require('cors')
const errorHandler = require('./middleware/errorMiddleware')
const  routes = require('./routes/index')

require('dotenv').config()

const connectDB=async() =>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("DB running");
        
    } catch (error) {
        console.log(error)
    }
}

connectDB()

const corsOptions = {
    origin: process.env.FRONTEND_URL, 
    optionsSuccessStatus: 200,
    credentials:true
  
  }

app.use(cors(corsOptions))
app.use(cookie())
app.use(express.json())

app.use(routes)


app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    console.log("running successfully")
})

 