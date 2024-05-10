
const joi = require('joi')

const ValidateUserCreationWithJoi = async (req, res, next) => {
    try {
        const schema = joi.object({
            first_name: joi.string().required(),
            last_name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9@#]{3,30}$')).required()
        })

        await schema.validateAsync(req.body, { abortEarly: true })
    
        next()
    } catch (error) {
        return res.status(422).json({
            message: error.message,
            success: false
        })
    }
}

const LoginValidation = async (req, res, next) => {
    try {
        const schema = joi.object({
            password: joi.string().required(),
            email: joi.string().email().required(),
        })

        await schema.validateAsync(req.body, { abortEarly: true })
    
        next()
    } catch (error) {
        return res.status(422).json({
            message: error.message,
            success: false
        })
    }
}


module.exports = {
    ValidateUserCreationWithJoi,
    LoginValidation
}