let mongoose = require('mongoose')


let Board = new mongoose.Schema({
    username: { type: String },
    board_type: { type: String, default: 'none' },
    location: { type: String, default: 'none' },
    status: { type: Boolean, default: false }
}, { collections: 'board' })

module.exports = mongoose.model('Board', Board)
