const mongoose = require('mongoose')

const laundarySchema = mongoose.Schema({

    name: {
        type: String,
    },
    status: {
        type: String,
    }
});

const Laundary = mongoose.model('Laundary', laundarySchema);

module.exports = {
    Laundary
}