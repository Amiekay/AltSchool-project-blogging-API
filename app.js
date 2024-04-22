const express = require('express')
const userRoute = require('./routes/userRoute')
const blogRoute = require('./routes/blogRoute')
const app = express()
const connectToMongodb = require('./db')
const expressWinston = require('express-winston')
require('dotenv').config()
const viewRouter = require('./views/views.router')
const { transports , format, transport} = require('winston')
require('winston-mongodb')
const logger = require('./logger')

const PORT = process.env.PORT || 3200
connectToMongodb()



app.use(expressWinston.logger(
  {
    winstonInstance: logger,
    statusLevels: true
  }
))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
res.status(200).json({
  message: success
})
})
app.use('/views', viewRouter)
    
app.use('/', userRoute )
app.use('/blogs', blogRoute)


app.get('/error', (req, res)=>{
  throw new Error('This is a custom error')
})
const myFormat = format.printf(({level, meta, timestamp})=>{
  return ` ${timestamp}, ${level}: ${meta.message}`
})
app.use(expressWinston.errorLogger({
  transports: [ 
    new transports.File(
    {
      filename: 'logsInternalErrors.log'
    })],
 
    format: format.combine(
      format.json(),
      format.timestamp(),
      myFormat
      
    ),
 
}))
 


// global error handler

app.use((err, req, res, next) => {
  logger.warn('This is a warn log')
    res.status(500).json({
        data: null,
        error: 'Server Error'
    })
})

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`)
}
)





