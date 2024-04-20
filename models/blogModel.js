
const mongoose = require('mongoose')

const blogModel = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    tags: String,

    author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
    },
    // author: {
    //     type: String
    //     },

    state: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },
    read_count: {
        type: Number,
        default: 0,
    },
    reading_time: {
        type: String,
      },
      timestamps:{
        type: Date,
        default: Date.now()

      }

    }

    
  
)

module.exports = mongoose.model('Post', blogModel)



