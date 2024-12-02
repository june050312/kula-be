const mongoose = require("mongoose")
const { Schema } = mongoose

const shopSchema = new Schema({
    shopname: String,
})

module.exports = mongoose.model('shop', shopSchema);