const express = require('express')
const jwt = require('jsonwebtoken')
const route = express.Router()
const modelRelay = require('../models/RelaySchedule');
const modelUser = require('../models/Users')

route.get('/', (req, res) => {
    res.json({ section: 'Relay Schedule' })
})

route.post('/get', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Error Authorization' }).status(301)
        }

        modelUser.findOne({ username: token.username }, (err, user) => {
            if(err){
                res.json({ error: '[!] User not found' })
            }

            modelRelay.find({ username: token.username, name: req.body.name }, (err, done) => {
                if(err){
                    res.json({ error: '[!] Data not found' }).status(404)
                }else{
                    res.json({ data: done })
                }
            })
        })
    })
})

route.post('/getall', (req, res) => {
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
                modelRelay.findOne({ username: token.username, name: req.body.name }, (err, duplicate) => {
                    if(duplicate.length == 0){
                        modelRelay.insertMany({ username: token.username, name: req.body.name, pin: req.body.pin, schedule: req.body.schedule }, (err, done) => {
                            if(err){
                                res.status(301)
                                res.json({ error: "Server Error :(" })
                            }else{
                                res.json({ success: "[+] Successfully insert relay" })
                            }
                        })
                    }else{
                        res.json({ error: '[!] Relay already added' }).status(301)
                    }
                })
            }
        })
    })
})

route.post('/update', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.status(301)
            res.json({ error: "[!] Error Authorization" })
        }

        modelUser.find({ username: token.username }, (err, user) => {
            if(err){
                res.status(301)
                res.json({ error: "[!] Users not found" })
            }

            modelRelay.updateOne({ username: token.username, name: req.body.name }, (err, done) => {
                if(err){
                    res.json({ error: "[!] Something wrong in server" }).status(501)
                }else{
                    res.json({ success: "[+] Successfully update relay" })
                }
            })
        })
    })
})

route.post('/delete', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.status(301)
            res.json({ error: "[!] Error Authorization" })
        }

        modelUser.find({ username: token.username }, (err, user) => {
            if(err){
                res.status(301)
                res.json({ error: "[!] Users not found" })
            }

            modelRelay.removeOne({ username: token.username, name: req.body.name }, (err, done) => {
                if(err){
                    res.status(501)
                    res.json({ error: "[!] Something Wrong in Server :(" })
                }else{
                    res.json({ success: '[+] Successfully delete relay' })
                }
            })
        })
    })
})

module.exports = route;
