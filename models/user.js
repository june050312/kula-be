const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    school_id: {
          type: String,
          required: true
    }
})

module.exports = mongoose.model('User', userSchema);