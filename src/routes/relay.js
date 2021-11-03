let express = require('express')
let route = express.Router()
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
let modelUsers = require('../models/Users')
let modelRelay = require('../models/Relay')
let firebase = require('../../firebase_config.js')

route.get('/get', (req,res) => {
    jwt.verify(req.query.token, req.query.secret, (err, token) => {
        if(err){
            res.json({ error: "[!] Error Authorization" }).status(301)
        }
        modelUsers.find({ username: token.username }, (err, done) => {
            if(done.length == 0 || done.length == null){
                res.status(301)
                res.json({ error: '[!] Error Authorization' })
            }

            modelRelay.find({ username: token.username, name: req.query.name }, (err, data) => {
                res.json({ hasil: data })
            })
        })
    })
})

route.post('/getall', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        modelUsers.find({ username: token.username }, (err, done) => {
            if(err){
                res.status(301)
                res.json({ error: "[!] Users not found!" })
            }else{
                modelRelay.find({ username: token.username }, (err, data) => {
                    res.json(data)
                })
            }
        })
    })
})

route.post('/updateMany', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: "[!] Wrong Authorization" }).status(301)
        }
        modelRelay.updateOne({ 
            username: token.username,
            name: req.body.name
        }, {
            name: req.body.newName,
        }, (err, done) => {
            if(err){
                res.json({ error: '[!] Something Wrong in Server' }).status(301)
            }else{
                res.json({ success: "[+] Successfully updated the relay" })
            }
        })
    })
})

route.post('/update', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.status(301)
            res.json({ error: '[!] Wrong Authorization' })
        }

        if(req.query.type == 'status'){
            modelRelay.updateOne({ username: token.username, name: req.body.name }, { status: req.body.status }, (err, done) => {
                if(err){
                    res.status(301)
                    res.json({ error: '[!] Something Wrong in server :(' })
                }else{
                    modelRelay.find({ username: token.username, name: req.body.name }, (err, relay) => {
                        if(err){
                            res.json({ error: '[!] Something wrong in server' }).status(501)
                        }else{
                            firebase.database().ref('/relay/' + token.username + '/' + relay[0].id).update({
                                status: req.body.status
                            }).then(() => {
                                res.json({ success: '[+] Successfully updated status' })
                            }).catch(err => {
                                res.json({ error: '[!] Something wrong in server' }).status(501)
                            })
                        }
                    })
                }
            })
        }else if(req.query.type == 'name'){
            modelRelay.updateOne({ username: token.username, name: req.body.name }, { name: req.body.name }, (err, done) => {
                if(err){
                    res.status(301)
                    res.json({ error: '[!] Something wrong in server :(' })
                }else{
                    res.json({ success: '[+] Successfully updated relay name' })
                }
            })
        }else if(req.query.type == 'type'){
            modelRelay.updateOne({ username: token.username, name: req.body.name }, { type: req.body.type }, (err, done) => {
                if(err){
                    res.status(301)
                    res.json({ error: '[!] Something Wrong in server :(' })
                }else{
                    res.json({ success: "[+] Successfully updated relay type" })
                }
            })
        }else if(req.query.type == 'type_button'){
            modelRelay.updateOne({ username: token.username, name: req.body.name }, { type_button: req.body.type_button }, (err, done) => {
                if(err){
                    res.status(301)
                    res.json({ error: "[!] Something Wrong in server :(" })
                }else{
                    res.json({ success: '[+] Successfully updated relay button type' })
                }
            })
        }
    })
})

route.post('/add', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.status(301)
            res.json({ error: '[!] Wrong Authorization' })
        }

        modelUsers.find({ username: token.username }, (err, user) => {
            if(err){
                res.status(301)
                res.json({ warning: '[!] Username or password is wrong' })
            }

            modelRelay.insertMany({ username: token.username, name: req.body.name, timeout_time: req.body.timeout_time, timeout: req.body.timeout, type: req.body.relay_category, type_button: req.body.type_button, pin: req.body.pin, id: req.body.id }, (err, done) => {
                if(err){
                    res.status(301)
                    res.json({ error: '[!] Something Wrong in server :(' })
                }else{
                    firebase.database().ref('/relay/' + token.username + '/' + req.body.id).set({ username: token.username, name: req.body.name, timeout_time: req.body.timeout_time, timeout: req.body.timeout, type: req.body.relay_category, type_button: req.body.type_button, pin: req.body.pin }).then(() => {
                        res.json({ success: "[+] Relay successfully added" })
                    }).catch(err => {
                        res.json({ error: '[!] Something Wrong in server' }).status(501)
                    })
                }
            })
        })
    })
})

route.post('/delete', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        modelUsers.find({ username: token.username }, (err, data) => {
            if(data.length == 0 || data.length == null){
                res.status(301)
                res.json({ failed: '[!] Username or password is wrong' })
            }

            modelRelay.deleteOne({ username: token.username, name: req.body.name }, (err, done) => {
                if(err){
                    res.status(501)
                    res.json({ error: '[!] Something Wrong in server' })
                }else{
                    firebase.database().ref('/relay/' + token.username + "/" + req.body.id).remove().then(() => {
                        res.json({ success: '[+] Successfully deleting the relay' })
                    }).catch(err => {
                        res.json({ error: '[!] Something Wrong in server' }).status(501)
                    })
                }
            })
        })
    })
})

module.exports = route
