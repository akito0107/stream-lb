/* @flow */
const Transform = require('transform')

class WorkerStream extends Transform {
  constructor(options /* :Object */) {
    super(options)
    this.work = options.work
    this.master = options.master
    this.pipe(this.master)
  }
  
  _transform(chunk, enc, cb) {
    this.work(chunk, enc, cb)
  }
}

module.exports = WorkerStream
