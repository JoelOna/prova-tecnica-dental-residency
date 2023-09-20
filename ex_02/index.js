const fs = require('node:fs')

const text = ()=> {
    const textFile = fs.readFileSync('./datos.txt', 'utf-8')
    console.log(textFile)
}

text()