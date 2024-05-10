const express = require('express')
const userRoute = require('./routes/userRoute')
const blogRoute = require('./routes/blogRoute')
const app = express()
const connectToMongodb = require('./db')
const expressWinston = require('express-winston')
require('dotenv').config()
require('winston')
require('winston-mongodb')

const viewsRoute = require('./views/views.router')
const logger = require('./logger')

const PORT = process.env.PORT || 3200
connectToMongodb()



app.use(expressWinston.logger(
  {
    winstonInstance: logger,
    statusLevels: true
  }
))


app.get("/", (req, res) => {
  res.status(200).json( { msg: "Welcome" });
});
  
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');
app.use('/views',viewsRoute )
    
app.use('/', userRoute )
app.use('/blogs', blogRoute)




// global error handler

app.use((err, req, res, next) => {
  // logger.warn('This is a warn log')
  console.log(err.stack)
    res.status(500).json({
        data: null,
        error: err
    })
})

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`)
}
)





