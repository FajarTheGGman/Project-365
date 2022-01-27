const mongoose = require('mongoose')

const RelayRealtime = mongoose.Schema({
    name: { type: String },
    desc: { type: String },
    io_feeds: { type: String },
})

module.exports = mongoose.model('RelayRealtime', RelayRealtime)
