const mongoose = require('mongoose')

const Serial = mongoose.Schema({
    username: { type: String },
    name: { type: String },
    data: { type: String, default: 'No data available' },
    type: { type: String, default: 'photoresistor.png' }
}, { collection: 'sensor' })

module.exports = mongoose.model('sensor', Serial)
