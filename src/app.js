const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const db = require('mongoose');
const chalk = require('chalk');
const file = require('express-fileupload')

const routeAuth = require('./routes/auth');
const routeRelay = require('./routes/relay');
const routeSettings = require('./routes/settings');
const routeBoard = require('./routes/board');
const routeSensor = require('./routes/sensor')
const routeRelaySchedule = require('./routes/relay_schedule');

require('dotenv').config();

const api = require('./api');

const app = express();

// Mongodb connections
try{
    db.connect(process.env.DB, {
          useUnifiedTopology: true,
    })
}catch(err){
    console.log(chalk.bgRed("[!] Error Connecting to database"))
}

app.use(file())
app.use(morgan())
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }))

app.use('/board', routeBoard);
app.use('/auth', routeAuth)
app.use('/relay', routeRelay)
//app.use('/ai', routeTensorflow)
app.use('/settings', routeSettings)
app.use('/schedule', routeRelaySchedule)
app.use('/sensor', routeSensor)

app.get('/', (req, res) => {
  res.json({
    sup: "Wellcome to Project - 365% server"
  });
});

app.use('/api/v1', api);

app.use((req,res, next) => {
    if(res.status(404)){
        res.json({ nothing: "There's nothing in here"  })
    }
});

module.exports = app;
