const mongoose = require('mongoose')

const laundarySchema = mongoose.Schema({
    laundary_id: Number,
    status: String,
    shopname: String,
    user: String,
});

module.exports = mongoose.model('Laundary', laundarySchema);