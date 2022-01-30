const mongoose = require('mongoose')

const RelayRealtime = mongoose.Schema({
    username: { type: String },
    name: { type: String },
    type: { type: String },
    status: { type: Boolean, default: false },
    io_feeds: { type: String },
})

module.exports = mongoose.model('RelayRealtime', RelayRealtime)
