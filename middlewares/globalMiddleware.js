const express = require('express')
const app = express()


app.use(express.json())

const checkBody = async (req, res, next) => {
    if (req.body === '{}') {
       return res.status(400).json({
            data: null,
            error: 'must have a body'
     
       })

    }

    else{
    next()

    }
    
}

module.exports = {checkBody}