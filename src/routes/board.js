const express = require('express')
const route = express.Router()
const jwt = require('jsonwebtoken')
const axios = require('axios')
const ch = require('cheerio')
const modelRelay = require('../models/Relay');
const modelUsers = require('../models/Users')

route.post('/relayStatus', (req,res) => {
    jwt.verify(req.body.token, req.body.key, (err, token) => {
        modelUsers.find({ username: token.username }, (err, data) => {
            if(err){
                res.status(301)
                res.json({ error: "[!] Error Authorization" })
            }else{
                modelRelay.findOne({ name: req.body.name }, (err, result) => {
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

        axios.get('https://weather.com/weather/today/l/1673678103f5ee4a01282fc6dc796d2d1502778e0383ced20aca25e9f51f651f').then(response => {
            const parsing = ch.load(response.data)

            res.json({ 
                condition: parsing('.CurrentConditions--phraseValue--17s79').text(),
                temp: parsing('.CurrentConditions--tempValue--1RYJJ').text()
            })
        })
    })
})

route.post('/localip', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
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

route.post('/location', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
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
