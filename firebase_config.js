const firebase = require('firebase')

const config = {
      apiKey: "AIzaSyA4j7TKyig3Ec5qLJFtDTKjbCzB3At39gY",
      authDomain: "bot-gukrqm.firebaseapp.com",
      databaseURL: "https://bot-gukrqm.firebaseio.com",
      projectId: "bot-gukrqm",
      storageBucket: "bot-gukrqm.appspot.com",
      messagingSenderId: "278336884781",
      appId: "1:278336884781:web:d05d0874d44d9de93ba8a4"
}

let fire = firebase.initializeApp(config)


module.exports = fire;
