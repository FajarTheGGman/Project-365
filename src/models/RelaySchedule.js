const mongoose = require('mongoose')

let RelaySchedule = mongoose.Schema({
    username: { type: String },
    name: { type: String },
    url_offline: { type: String },
    schedule: { type: String }
}, { collections: 'relay_schedule' })

module.exports = mongoose.model('relay_schedule', RelaySchedule)
