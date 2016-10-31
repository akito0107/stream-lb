/* @flow */
const Transform = require('stream').Transform

class WorkerStream extends Transform {
  constructor(options /* :Object */) {
    super(options)
    this.work = options.work
  }
  
  _transform(chunk /* :any */, enc /* :string */, cb /* :function */) {
    this.work(chunk, enc, cb)
  }
}

module.exports = WorkerStream
