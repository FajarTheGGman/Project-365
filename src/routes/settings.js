let express = require('express')
let route = express.Router()
let jwt = require('jsonwebtoken')
let modelUsers = require('../models/Users')
let modelSettings = require('../models/Settings')

route.get('/', (req,res) => {

res.json({ section: 'settings' })

})

route.post('/users', (req,res) => {
    jwt.verify(req.body.token, process.env.KEY, (err, token) => {
        console.log(token.username)
        modelUsers.find({ username: token.username }, (err, data) => {
            res.json({ user: data })
        })
    })
})

route.post('/board_type', (req,res) => {
    jwt.verify(req.body.token, process.env.KEY, (err, token) => {
        modelUsers.find({ username: token.username }, (err, data) => {
            if(data.length == 0 || data.length == null){
                res.json({ error: '[!] Invalid Authorization' })
            }

            modelSettings.findOneAndUpdate({ username: token.username }, { board_type: req.body.board_type }, (err, done) => {
                if(err){
                    res.json({ error: '[!] Server Error' })
                }

                res.json({ success: "Successfully update board" })
            })
        })
    })
})

route.post('/status', (req,res) => {
    jwt.verify(req.body.token, process.env.KEY, (err, token) => {
        modelUsers.findOne({ username: token.username }, (err, data) => {
            modelSettings.findOneAndUpdate({ username: data[0].username }, { status: req.body.status }, (err, done) => {
                if(err){
                    res.json({ error: '[!] Something Wrong in server' })
                }

                res.json({ success: 'Successfully update status board' })
            })
        })
    })
})


module.exports = route
