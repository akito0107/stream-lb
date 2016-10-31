/* @flow */

const Duplex = require('stream').Duplex
const fork = require('child_process').fork
const path = require('path')
const _ = require('lodash')
const WorkerStream = require('./worker_stream')

class MasterStream extends Duplex {
  constructor(options /* :Object */) {
    super({ objectMode: true })
    const task = options.task
    this.worker = new WorkerStream({ work: options.task })
    this.children = forkChildren(this, options.workerNumber, { task })
    setChildrenHandler(this)
  }
  
  _read() {
  }
  
  // interface for child processes
  _write(chunk /* :any */, enc /* :string */, cb /* :function */) /* :boolean */ {
    cb(null)
    return false
  }
}

module.exports = MasterStream

function forkChildren(stream, n  /* :number */, options /* :Object */) {
  return _.range(0, n).map(() => {
    const child = fork(path.join(__dirname, '/worker_initializer.js'), [], options)
    child.send(stream.worker)
    return child
  })
}

function setChildrenHandler(stream) {
  const children = stream.children
  stream.on('data', (data) => {
    children.forEach((cp) => {
      cp.send(data)
    })
  })
}
