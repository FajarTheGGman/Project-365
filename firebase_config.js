const firebase = require('firebase')

const config = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: ""
}

let fire = firebase.initializeApp(config)


module.exports = fire;
