const { createLogger } = require("winston");
require('dotenv').config()
const { transports , format, transport} = require('winston')
require('express-winston')
require('winston-mongodb')


const logger = createLogger({

    transports: [
        new transports.Console(),
        new transports.File(
          {
            level: 'warn',
            filename: 'logsWarnings.log'
          }
        ),
        new transports.File(
          {
            level: 'error',
            filename: 'logsErrors.log'
          }
        ),
        new transports.MongoDB({
          db:process.env.MONGODB_CONNECTION_URL,
          collection: 'logs'
        })
      ],
  
      format: format.combine(
        format.json(),
        format.prettyPrint(),
        format.timestamp(),
        format.metadata()
      )
    }
)

module.exports = logger