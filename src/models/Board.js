let mongoose = require('mongoose')


let Board = new mongoose.Schema({


}, { collections: board })

module.exports = mongoose.model('Board', Board)
