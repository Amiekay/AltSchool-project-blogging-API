const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const express = require('express')
const app = express()

const userModel = new mongoose.Schema({
        first_name: {
            type: String,
            required: true},

        last_name: {
                type: String,
                required: true},
    
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        
        } ,
        password: {
            type: String,
            required: true,
            unique: true},

        createdAt:{
            type: Date,
            default: Date.now
        },
    
        updatedAt:{
            type: Date,
            default: Date.now
        }
      }  
  
)


// before save

app.use(express.json())
userModel.pre('save', async function (next) {
    const user = this
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  })
  
  userModel.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }
module.exports = mongoose.model('User', userModel)