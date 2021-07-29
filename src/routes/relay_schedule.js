const express = require('express')
const jwt = require('jsonwebtoken')
const route = express.Router()
const modelRelay = require('../models/RelaySchedule');
const modelUser = require('../models/Users')

route.get('/', (req, res) => {
    res.json({ section: 'Relay Schedule' })
})

route.get('/getall', (req, res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.status(501)
            res.json({ error: '[!] Error Authorization' })
        }

        modelUser.findOne({ username: token.username }, (err, user) => {
            if(err){
                res.status(501)
                res.json({ error: "[!] Users Not Found !" })
            }

            modelRelay.find({}, (err, done) => {
                if(err){
                    res.status(301)
                    res.json({ error: "Server Error :(" })
                }else{
                    res.json({ relays: done })
                }
            })
        })
    })
})

route.post('/input', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.status(501)
            res.json({ error: '[!] Error Authorization' })
        }

        modelUser.find({ username: token.username }, (err, user) => {
            if(user.length != 0){
                modelRelay.insertMany({ username: token.username, name: req.body.name, url_offline: req.body.url, schedule: req.body.schedule }, (err, done) => {
                    if(err){
                        res.status(301)
                        res.json({ error: "Server Error :(" })
                    }else{
                        res.json({ success: "[+] Successfully insert relay" })
                    }
                })
            }
        })
    })
})

module.exports = route;
