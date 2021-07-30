let tf = require('@tensorflow/tfjs-node')
let mobilenet = require('@tensorflow-models/mobilenet')
let fs = require('fs')

async function x(){
   const file = fs.readFileSync("x.jpg")
   const decode = tf.node.decodeImage(file, 3)
   const model = await mobilenet.load()
   const klasifikasi = await model.classify(decode)
   console.log(klasifikasi)
}

x()