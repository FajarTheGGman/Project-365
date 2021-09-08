let mongoose = require('mongoose')


let Relay_Board = new mongoose.Schema({
    username: { type: String },
    name: { type: String },
    status: { type: Boolean, default: false },
    pin: { type: Number }
}, { collection: 'relay_board' })

module.exports = mongoose.model('relay_board', Relay_Board)
