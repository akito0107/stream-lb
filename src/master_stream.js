/* @flow */

const Duplex = require('stream').Duplex
const Transform = require('stream').Transform
const _ = require('lodash')

class MasterStream extends Duplex {
  constructor(options) {
    super({objectMode: true})
    this.children = fork(10, {})
  }
 
  _read(size /* :number */) {
  }
 
  // interface for child processes
  _write(chunk /* :Object */, enc /* :string */, cb /* :function */) {
    console.log(chunk)
    cb(null)
  }
}

module.exports = MasterStream

function fork(n, options) {
  return 0
}
