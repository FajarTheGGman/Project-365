const app = require('./app');
const chalk = require('chalk');
const jsome = require('jsome');
const color = require('colors');
<<<<<<< HEAD
//const box = require('boxen')
//const loading = require('ora')
const open = require('open')

//console.log(color.rainbow(box("Smarthome 2.0", { padding: 1, borderStyle: 'double' }) + '\n'))
=======
const say = require('yosay')
const open = require('open')

console.log(say('Project 365%'))
>>>>>>> 09228086f61e8676bf6daa2943ba9f718038d4e2

jsome({
    'Coder': 'Fajar Firdaus',
    'IG': '@fajar.psd',
    'Twitter': '@kernel024',
    'Github': 'FajarTheGGman',
})

const port = process.env.PORT || 5000;
if(process.argv[2]){
    app.listen(port, process.argv[2], () => {
        console.log(color.yellow('[+] Server Running at ' + process.argv[2] + ' : ' + port))
    });
}else if(process.argv[4]){
    app.listen(port, process.argv[4], () => {
        console.log(color.yellow('[+] Server Running at ' + process.argv[4] + ' : ' + port))
   })
}else{
    app.listen(port, () => {
       console.log(color.cyan('[+] Server Running at port : ' + port))
    })
}
