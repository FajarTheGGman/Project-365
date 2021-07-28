const express = require('express')
const route = express.Router()
const jwt = require('jsonwebtoken')
const model = require('../models/Users');
const bcrypt = require('bcrypt')

route.get('/', (req,res) => {
    res.json({ section: "auth" })
})

route.post('/login', (req,res) => {
    model.find({ username: req.body.username }, (err, done) => {
        if(err){
            res.status(301)
            res.json({ failed: "[!] Username or password is wrong" })
        }

        try{
            bcrypt.compare(req.body.password, done[0].password, (err, x) => {
            
                if(err){
                    res.status(301)
                    res.json({ failed: "[!] Username or password is wrong" })
                }

                const data = {
                    username: done[0].username,
                    password: done[0].password
                }

                let token = jwt.sign(data, 'Important')
                res.status(200)
                res.header('Token', token)
                res.json({ success: '[+] Users successfully login' })
            })
        }catch(e){
            res.status(201)
            res.json({ error: "[!] Login Error" })
        }
    })
})
/*
route.post('/log/getall', (req,res) => {
    jwt.verify(req.body.token, req.bodu.key, (err, token) => {

    })
})*/

route.post('/log', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        model.findOne({ username: token.username }, (err, data) => {
            if(err){
                res.status(301)
                res.json({ error: '[!] Error Authorization' })
            }else{
                let date = new Date();
                model.update({ username: token.username }, { $push: { "log": { time: date.toLocaleDateString(), title: req.body.title, description: req.body.description } } }, (err, done) => {
                    if(err){
                        res.status(301)
                        res.json({ error: "[!] Server Error" })
                    }else{
                        res.json({ success: "Successfully add log" })
                    }
                })
            }
        })
    })
})

route.post('/getall', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        model.findOne({ username: token.username }, (err, data) => {
                res.json({ result: data })
        })
    })
})

route.post('/register', (req,res) => {
    model.find({ 
        username: req.body.username,
        password: req.body.password
    }, (err, done) => {
        if(done.length == null || done.length == 0){

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                
                var profile;

                try{
                    req.files.profile.mv('./' + req.files.profile.name, (err, done) => {
                        if(err){
                            console.log('error')
                        }
                    })

                    profile = req.files.profile.name;
                }catch(e){
                    profile = 'profile.png'
                }

                let date = new Date()

                model.insertMany({
                    username: req.body.username,
                    password: hash,
                    picture: profile,
                    since: date.toLocaleDateString()
                }, (err, done) => {
                    if(err){
                        res.status(301)
                        res.json({ error: '[!] Something wrong in server' })
                    }

                    res.status(200)
                    res.json({ success: 'Users successfully registered' })
                })
            })
        }else{
            res.status(301)
            res.json({ error: 'Users already registered' })
        }
    })
})

module.exports = route;
