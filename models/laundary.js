const mongoose = require('mongoose')

const laundarySchema = mongoose.Schema({

    name: {
        type: String,
    },
    status: {
        type: String,
    }
});

module.exports = mongoose.model('Laundary', laundarySchema);