let express = require('express')
let route = express.Router()
let tf = require('@tensorflow/tfjs')
let mobilenet = require('@tensorflow-models/mobilenet')
let fs = require('fs')

route.get('/', (req,res) => {
    res.json({ section: 'tensorflow' })
})

route.post('/mobilenet', (req,res) => {
    console.log('yoi')
/*    (async() => {
        const file = fs.readFileSync(__dirname + "/x.jpg")
        const decode = tf.node.decodeImage(file, 3)
        const model = await mobilenet.load()
        const klasifikasi = await model.classify(decode)
        console.log(klasifikasi)
    })()*/
})

module.exports = route
