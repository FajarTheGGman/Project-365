const mongoose = require('mongoose')

const Serial = mongoose.Schema({
    username: { type: String },
    name: { type: String },
    data: { type: String, default: 'No data available' },
    pin: { type: Number },
    type: { type: String, default: 'photoresistor.png' }
}, { collection: 'serial' })

module.exports = mongoose.model('serial', Serial)
