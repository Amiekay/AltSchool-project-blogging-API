const express = require('express')
// const connectToMongodb = require('./db')
const userRoute = require('./routes/userRoute')
const blogRoute = require('./routes/blogRoute')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const viewRouter = require('./views/views.router')


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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
res.status(200).render('home')
})
app.use('/views', viewRouter)
    
app.use('/', userRoute )
app.use('/blogs', blogRoute)

// global error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        data: null,
        error: 'Server Error'
    })
})

module.exports = app




