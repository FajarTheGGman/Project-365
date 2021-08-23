#!/usr/bin/env zx
// Copyright 2021 By Fajar Firdaus

if(process.argv[3] == '--models'){
    let name = process.argv[4]

    let data = `let mongoose = require('mongoose')\n\n\nlet ${name} = new mongoose.Schema({\n\n\n}, { collections: ${process.argv[5]} })\n\nmodule.exports = mongoose.model('${name}', ${name})`
    
    $`touch ./src/models/${name}.js`
    $`echo ${data} > ./src/models/${name}.js`

    console.log(chalk.bgGreen('[+] Successfully created database schema'))
}else if(process.argv[3] == '--routes'){
    let name = process.argv[4]

    let data = `let express = require('express')\nlet route = express.Router()\n\n\nroute.get('/', (req,res) => {\n\nres.json({ hello: 'world' })\n\n})\n\n\nmodule.exports = route`

    $`touch ./src/routes/${name}.js`
    $`echo ${data} > ./src/routes/${name}.js`

    console.log(chalk.bgGreen('[+] Successfully created route'))
}else if(process.argv[3] == 'dev'){
    $`npm run dev`
}else if(process.argv[3] == 'prod'){
    $`npm start`
}


