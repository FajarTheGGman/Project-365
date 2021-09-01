const app = require('./app');
const chalk = require('chalk');
const json = require('jsome');
const color = require('colors');
const box = require('boxen')
const open = require('open')

console.log(color.rainbow(box("Smarthome 2.0", { padding: 1, borderStyle: 'double' }) + '\n'))

json({
    'Coder': 'Fajar Firdaus',
    'IG': '@kernel024',
    'Twitter': '@kernel024',
    'Github': 'FajarTheGGman'
})

const port = process.env.PORT || 5000;
if(process.argv[2]){
    app.listen(port, process.argv[2], () => {
        console.log(color.yellow('[+] Server Running at' + process.argv[2] + ' : ' + port))
    });
}else if(process.argv[4]){
    app.listen(port, process.argv[4], () => {
        console.log(color.yellow('[+] Server Running at' + process.argv[4] + ' : ' + port))
   })
}else{
    app.listen(port, () => {
        console.log(color.cyan('[+] Server Running at port : ' + port))
    })
}
