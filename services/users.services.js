const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config()




const createUser = async ({ first_name, last_name, email, password})=>{
    const userFromRequest = { first_name, last_name, email, password}
    
    try {
        const existingUser = await userModel.findOne({email: userFromRequest.email})
        if(existingUser){
            return res.status(409).json({
                message: 'user already created'
            })
        }
        const createdUser = await userModel.create({
            first_name: userFromRequest.first_name,
            last_name: userFromRequest.last_name,
            email: userFromRequest.email,
            password: userFromRequest.password
        })
        const token =  await jwt.sign({email: createdUser.email, _id: createdUser._id}, process.env.JWT_SECRET,        
             { expiresIn: '1h' })
    

        return {
            code: 200,
            message: 'Registered successfuly',
            data: {
                createdUser,
                token
            }
        }
    } catch (error) {
        return{code: 400,
            message: 'an error occured',
            data: error
    }
    
    }
    
    }
    


const Login = async ({ email, password }) => {
    const userFromRequest = { email, password }

    const user = await UserModel.findOne({
        email: userFromRequest.email,
    });

    if (!user) { 
        return {
            message: 'User not found',
            code: 404
        }
    }

    const validPassword = await user.isValidPassword(userFromRequest.password)

    if (!validPassword) {
        return {
            message: 'Email or password is not correct',
            code: 422,
        }
    }

    const token = await jwt.sign({ 
        email: user.email, 
        _id: user._id
    }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' })

        return {
            message: 'Login successful',
            code: 200,
            data: {
                user,
                token
            }
        }
}

module.exports = {
    Login,
    createUser
}