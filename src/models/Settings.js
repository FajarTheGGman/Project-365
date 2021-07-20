let mongoose = require('mongoose')


let Settings = new mongoose.Schema({
    username: { type: String },
    board_type: { type: String, default: 'none' },
    url: { type: String, default: 'none' },
    status: { type: Boolean, default: false }
}, { collections: 'settings' })

module.exports = mongoose.model('Settings', Settings)
