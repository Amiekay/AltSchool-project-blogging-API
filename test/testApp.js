const express = require('express')
const app = express()
const blogRoute = require('../routes/blogRoute')
const userRoute = require('../routes/userRoute')
const userModel = require('../models/userModel')




app.use(express.json())


app.get('/', async (req, res) => {
    const users = await userModel.find({ email: 'jerry@gmail.com' }).limit(2).select({ name: 1, _id: 1 })
    return res.json({
        users
    })})

   
    app.use('/', userRoute )
    app.use('/blogs', blogRoute)



app.get('*', (req, res) => {
    return res.status(404).json({
        data: null,
        error: 'Route not found'
    })
})

// globah error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        data: null,
        error: 'Server Error'
    })
})

module.exports = app;




