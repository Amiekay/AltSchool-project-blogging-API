const mongoose = require('mongoose')
require('dotenv').config()
const express = require('express')

const app = express()
const PORT = process.env.PORT || 3200

const connectToMongodb= async () => {
  try {
     await mongoose.connect(process.env.MONGODB_CONNECTION_URL)
     console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

//Connect to the database before listening
connectToMongodb().then(() => 
    app.listen(PORT, () => {
        console.log(`Server started on Port ${PORT}`)
    }
    ))






module.exports = connectToMongodb