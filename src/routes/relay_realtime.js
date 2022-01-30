const mongoose = require('mongoose');
const express = require('express');
const RelayRealtime = require('../models/RelayRealtime');
const modelUsers = require('../models/Users');
const route = express.Router();
const jwt = require('jsonwebtoken');

route.post('/getall', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        modelUsers.find({ username: token.username }, (err, user) => {
            if(err){
                res.json({ error: '[!] Users not found' }).status(301)
            }else{
                RelayRealtime.find({ username: token.username }, (err, relay) => {
                    if(err){
                        res.json({ error: '[!] Relay not found' }).status(301)
                    }else{
                        res.json({ relay }).status(200)
                    }
                })
            }
        })
    });
});

route.post('/add', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        modelUsers.find({ username: token.username }, (err, user) => {
            if(err){
                res.json({ error: '[!] Users not found' }).status(301)
            }else{
                RelayRealtime.find({ 
                    username: token.username, 
                    name: req.body.name,
                    io_feeds: req.body.feeds
                }, (err, relay) => {
                    if(err){
                        res.json({ error: '[!] Relay not found' }).status(301)
                    }else{
                        RelayRealtime.insertMany({
                            username: token.username,
                            name: req.body.name,
                            type: req.body.type,
                            status: req.body.status,
                            io_feeds: req.body.feeds
                        }, (err, relay) => {
                            if(err){
                                res.json({ error: '[!] Relay not found' }).status(501)
                            }else{
                                res.json({ success: 'Successfully inserting an relay' }).status(200)
                            }
                        })
                    }
                })
            }
        })
    });
});

route.post('/update', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        modelUsers.find({ username: token.username }, (err, user) => {
            if(err){
                res.json({ error: '[!] Users not found' }).status(301)
            }else{
                RelayRealtime.find({ username: token.username }, (err, relay) => {
                    if(err){
                        res.json({ error: '[!] Relay not found' }).status(301)
                    }else{
                        RelayRealtime.updateMany({ username: token.username, name: req.body.name }, { $set: { status: req.body.status } }, (err, relay) => {
                            if(err){
                                res.json({ error: '[!] Relay not found' }).status(301)
                            }else{
                                res.json({ relay }).status(200)
                            }
                        })
                    }
                })
            }
        })
    });
});

route.post('/delete', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        modelUsers.find({ username: token.username }, (err, user) => {
            if(err){
                res.json({ error: '[!] Users not found' }).status(301)
            }else{
                RelayRealtime.find({ username: token.username }, (err, relay) => {
                    if(err){
                        res.json({ error: '[!] Relay not found' }).status(301)
                    }else{
                        RelayRealtime.deleteMany({ username: token.username, name: req.body.name }, (err, relay) => {
                            if(err){
                                res.json({ error: '[!] Relay not found' }).status(301)
                            }else{
                                res.json({ success: "Successfully deleting relay" }).status(200)
                            }
                        })
                    }
                })
            }
        })
    });
});

route.post('/updateName', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        modelUsers.find({ username: token.username }, (err, user) => {
            if(err){
                res.json({ error: '[!] Users not found' }).status(301)
            }else{
                RelayRealtime.find({ username: token.username }, (err, relay) => {
                    if(err){
                        res.json({ error: '[!] Relay not found' }).status(301)
                    }else{
                        RelayRealtime.updateMany({ username: token.username, name: req.body.name }, { $set: { name: req.body.newName } }, (err, relay) => {
                            if(err){
                                res.json({ error: '[!] Relay not found' }).status(301)
                            }else{
                                res.json({ relay }).status(200)
                            }
                        })
                    }
                })
            }
        })
    });
});

module.exports = route
