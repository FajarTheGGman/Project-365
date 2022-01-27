const db = require('mongoose')

const date = new Date()

const Log = new db.Schema({
    time: { type: String },
    title: { type: String },
    description: { type: String }
})

const Users = new db.Schema({
    username: { type: String },
    password: { type: String },
    nickname: { type: String },
    picture: { type: String, default: 'profile.png' },
    since: { type: String },
    localip: { type: String, default: '' },
    mqtt_nickname: { type: String, default: '' },
    mqtt_server: { type: String, default: '' },
    mqtt_token: { type: String, default: '' },
    log: [Log]

}, { collections: "users" })

module.exports = db.model('Users', Users);
