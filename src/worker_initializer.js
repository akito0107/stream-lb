/* @flow */

const net = require('net')

const server = net.createServer((socket) => {
  socket.end('good bye \n')
}).on('error', (err) => {
  throw err
})

server.listen(0, () => {
})

process.on('exit', (code) => {
  console.log(code)
})

process.on('message', (data /* */) => {
  console.log(data)
})
