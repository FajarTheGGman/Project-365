const app = require('./app');
const chalk = require('chalk');
const json = require('jsome');
const color = require('colors');
const box = require('boxen')
//const loading = require('ora')
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
//        open("http://" + process.argv[2] + ":" + port, { app: 'google chrome' })
//        loading(color.cyan('[+] Server Running at port : ' + port)).start()
    });
}else if(process.argv[4]){
    app.listen(port, process.argv[4], () => {
//        open('http://' + process.argv[4] + ":" + port, { app: 'google chrome' })
    })
}else{
    app.listen(port, () => {
        open('http://0.0.0.0:' + port, { app: 'google chrome' })
        loading(color.cyan('[+] Server Running at port : ' + port)).start()
    })
}
