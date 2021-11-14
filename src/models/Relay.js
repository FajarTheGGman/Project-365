let mongoose = require('mongoose')


let Relay = new mongoose.Schema({
    username: { type: String },
    name: { type: String },
    message: { type: String, default: '' },
    timeout_time: { type: Number, default: 0 },
    status: { type: Boolean, default: false },
    pin: { type: Number },
    type_button: { type: Boolean, default: false },
    type: { type: String, default: 'lights' },
    timeout: { type: Boolean, default: false },
    schedule: { type: String, default: '' },
    id: { type: String }
}, { collections: 'relay' })

module.exports = mongoose.model('Relay', Relay)
