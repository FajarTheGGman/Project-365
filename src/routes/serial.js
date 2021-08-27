const express = require("express")
const route = express.Router()
const jwt = require('jsonwebtoken')
const modelUsers = require('../models/Users')
const modelSerial = require('../models/Serial')

route.post('/getall', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Error Authorization' }).status(301)
        }else{
            modelUsers.findOne({ username: token.username }, (err, user) => {
                if(err || user.length == 0){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelSerial.find({ username: token.username, name: req.body.name }, (err, done) => {
                        if(err){
                            res.json({ error: '[!] Something wrong in server' }).status(501)
                        }else{
                            res.json({ data: done })
                        }
                    })
                }
            })
        }
    })
})

route.post('/add', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.findOne({ username: token.username }, (err, user) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelSerial.insert({ username: token.username, name: req.body.name }, (err, done) => {
                        if(err){
                            res.json({ error: '[!] Something wrong in server' }).status(501)
                        }else{
                            res.json({ success: "[+] Successfully inserting data" })
                        }
                    })
                }
            })
        }
    })
})

route.post('/update', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.findOne({ username: token.username }, (err, user) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelSerial.update({ username: token.username }, { data: req.body.data }, (err, done) => {
                        if(err){
                            res.json({ error: '[!] Something wrong in server' }).status(501)
                        }else{
                            res.json({ 
                                status: '[+] Data successfully updated',
                                data: req.body.data
                            })
                        }
                    })
                }
            })
        }
    })
})

route.post('/delete', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.findOne({ username: token.username }, (err, user) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelSerial.deleteOne({ username: token.username, name: req.body.token }, (err, done) => {
                        if(err){
                            res.json({ error: '[!] Something wrong in server' }).status(501)
                        }else{
                            res.json({ success: "[+] Successfully deleting some serial data" })
                        }
                    })
                }
            })
        }
    })
})

module.exports = route;
