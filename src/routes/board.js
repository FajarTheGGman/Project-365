const express = require('express')
const route = express.Router()
const jwt = require('jsonwebtoken')
const axios = require('axios')
const ch = require('cheerio')
const modelRelay = require('../models/Relay');
const modelUsers = require('../models/Users');
const modelBoard = require('../models/Board');
const modelSensor = require('../models/Sensor');
const modelRelayBoard = require('../models/Relay_Board');


route.get('/relay', (req,res) => {
    jwt.verify(req.query.token, req.query.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Error Authorization'}).status(301)
        }else{
            modelUsers.find({ username: token.username }, (err, user) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelRelay.find({ username: token.username, name: req.query.name }, (err, done) => {
                        if(err){
                            res.json({ error: '[!] Something Wrong in server' }).status(501)
                        }else{
                            res.json(done)
                        }
                    })
                }
            })
        }
    })
})

route.get('/relay/activities', (req,res) => {
    jwt.verify(req.query.token, req.query.secret, (err, token) => {
        if(err){
            res.json({ error: "[!] Wrong Authorization" }).status(301)
        }else{
            modelUsers.find({ username: token.username }, (err, user) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelRelayBoard.find({ username: 'Fajar' }, (err, done) => {
                        res.json(done[0])
                    })
                }
            })
        }
    })
})

route.post('/relay/activities/update', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: "[!] Wrong Authorization" }).status(301)
        }else{
            modelUsers.find({ username: token.username }, (err, user) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelRelayBoard.find({ username: token.username }, (err, dataUser) => {
                        if(dataUser.length == 0){
                            modelRelayBoard.insertMany({ name: req.body.name, username: token.username, pin: req.body.pin, status: req.body.status }, (err, doneInput) => {
                                if(err){
                                    res.json({ error: '[!] Something Wrong in server' }).status(501)
                                }else{
                                    res.json({ success: '[+] Successfully updated activities' })
                                }
                            })
                        }else{
                            modelRelayBoard.updateMany({ username: token.username }, { name: req.body.name, pin: req.body.pin, status: req.body.status }, (err, done) => {
                                if(err){
                                    res.json({ error: '[!] Something Wrong in server' }).status(501)
                                }else{
                                    res.json({ success: '[+] Successfully updated activities' })
                                }
                            })
                        }
                    })
               }
            })
        }
    })
})

route.get('/sensor/activities', (req,res) => {
    jwt.verify(req.query.token, req.query.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Error Authorization' }).status(301);
        }

        modelUsers.find({ username: token.username }, (err, user) => {
            if(err){
                res.json({ error: '[!] Users not found'}).status(301)
            }

            modelSensor.find({ username: token.username }, (err, done) => {
                res.json(done)
            })
        })
    })
})

route.post('/sensor/activities/update', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: "[!] Wrong Authorization" }).status(301)
        }

        modelUsers.find({ username: token.username }, (err, user) => {
            if(err){
                res.json({ error: '[!] Users not found' }).status(301)
            }

            modelSensor.find({ 
                username: token.username,
                name: req.body.name
            }, (err, done) => {
                if(done.length == 0){
                    modelSensor.insertMany({ 
                        username: token.username,
                        name: req.body.name,
                        pin: req.body.pin,
                    }, (err, input) => {
                        res.json({ success: '[!] Success updating data sensor' })
                    })
                }else{
                    modelSensor.update({
                        username: token.username,
                        name: req.body.name
                    }, {
                        data: req.body.data
                    })
                }
            })
        })
    })
})

route.get('/relay/getall', (req,res) => {
    jwt.verify(req.query.token, req.query.secret, (err, token) => {
        if(err){
            res.json({ error: "[!] Error Authorization" }).status(301)
        }else{
            modelUsers.find({ username: token.username }, (err, data) => {
                if(err){
                    res.json({ error: "[!] Users not found" }).status(301)
                }else{
                    modelRelay.find({ username: token.username }, (err, done) => {
                        if(err){
                            res.json({ error: '[!] Something wrong in server' }).status(301)
                        }else{
                            res.json(done)
                        }
                    })
                }
            })
        }
    })
})

route.get('/relayStatus', (req,res) => {
    jwt.verify(req.query.token, req.query.key, (err, token) => {
        modelUsers.find({ username: token.username }, (err, data) => {
            if(err){
                res.status(301)
                res.json({ error: "[!] Error Authorization" })
            }else{
                modelRelay.findOne({ name: req.query.name }, (err, result) => {
                    res.json({ relay: result.status })
                })
            }
        })
    })
})

route.get('/relay/update/status', (req,res) => {
    jwt.verify(req.query.token, req.query.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Error Authorization' }).status(301)
        }else{
            modelUsers.findOne({ username: token.username }, (err, user) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelRelay.updateMany({ username: token.username, name: req.query.relay }, { status: req.query.status },(err, done) => {
                        if(err){
                            res.json({ error: '[!] Something wrong in server' }).status(501)
                        }else{
                            res.json({ success: '[+] Successfully updated status' })
                        }
                    })
                }
            })
        }
    })
})

route.get('/localip', (req,res) => {
    jwt.verify(req.query.token, req.query.secret, (err, token) => {
        if(err){
            res.status(501)
            res.json({ error: '[!] Error Authorization' })
        }

        modelUsers.find({ username: token.username }, (err, data) => {
            if(err){
                res.status(501)
                res.json({ error: "[!] Error Authorization" })
            }

            modelUsers.updateOne({ username: token.username }, { $set: { localip: req.body.localip } }, (err, response) => {
                if(err){
                    res.json({ error: '[!] Server Error' })
                }

                res.status(200)
                res.json({ success: '[+] Successfully changed local ip' })
            })
        })
    })
})

route.get('/location', (req,res) => {
    jwt.verify(req.query.token, req.query.secret, (err, token) => {
        if(err){
            res.status(501)
            res.json({ error: '[!] Wrong Authorization' })
        }

        modelUsers.find({ username: token.username }, (err, user) => {
            if(err){
                res.json({ error: '[!] Users not found' })
            }else{
                modelBoard.update({ username: token.username }, { location: req.query.location }, (err, done) => {
                    if(err){
                        res.json({ error: '[!] Something Wrong in server' })
                    }else{
                        res.json({ success: '[+] Successfully updating location '})
                    }
                })
            }
        })
    })
})

module.exports = route;
