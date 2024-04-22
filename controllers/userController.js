const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const logger = require('../logger')
require('winston-mongodb')


const createUser = async (req, res)=>{
const user = req.body

try {
    const existingUser = await userModel.findOne({email: user.email})
    if(existingUser){
        return res.status(409).json({
            message: 'user already created'
        })
    }
    const createdUser = await userModel.create({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    })
    const token =  await jwt.sign({email: createdUser.email, _id: createdUser._id, first_name: createdUser.first_name}, process.env.JWT_SECRET,        
         { expiresIn: '1h' })


         logger.info('[CreateUser] => login process done')
    res.status(200).json({
        token,
        message: 'Registered successfuly',
        data: {
            name: createdUser.name,
            email: createdUser.email,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt
        }
    })
} catch (error) {
    logger.warn('Login process not completed')
    res.status(400).json({
        message: 'an error occured',
        data: error

    })
}

}

const login = async(req, res)=>{
 const {email, password} = req.body
 try {
    logger.info('[CreateUser] => login process started')
    // check if user exists
    const user= await userModel.findOne({
        email: email
    })

    if(!user){
       return res.status(401).json({
            message:'Unauthorized, please signup'  
        })
    }
    
        const validPassword = await user.isValidPassword(password)
    
        if (!validPassword) {
            return res.status(422).json({
                message: 'Email or password is not correct',
            }) 
        }
    
        const token =  await jwt.sign({email: user.email, _id: user._id, first_name: user.first_name}, process.env.JWT_SECRET,
        { expiresIn: '1h' })

        res.status(200).json( {
        message: 'Login successful',
        token: token,
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt

    }
})

 } catch (error) {
    res.status(401).json({
        message: 'Bad Request',
        error: error
    })
 }

}


module.exports = {createUser, login}