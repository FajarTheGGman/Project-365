const express = require('express')
const route = express.Router()
const jwt = require('jsonwebtoken')
const axios = require('axios')
const ch = require('cheerio')
const modelRelay = require('../models/Relay');
const modelUsers = require('../models/Users')

route.get('/relay', (req,res) => {
    jwt.verify(req.query.token, req.query.key, (err, token) => {
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
                            res.json({ data: done })
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

route.post('/weather', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.status(501)
            res.json({ "[!] Error ": 'Wrong Credentials' })
        }

        let location;

        axios.get('http://wttr.in/?format=j1').then(response => {
            res.json({ 
                condition: response.data.current_condition[0].weatherDesc[0].value,
                temp: response.data.current_condition[0].temp_C + "°"
            })
        })
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
            res.json({ '[!] Error': 'Wrong Credentials' })
        }

        axios.get('http://ip-api.com/json/' + req.body.ip).then(response => {
            res.json({ result: response.data })
        })
    })
})

module.exports = route;
