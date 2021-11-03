const firebase = require('firebase')

const config = {
    // Put your firebase config here...
}

let fire = firebase.initializeApp(config)


module.exports = fire;
