const test = require('ava')
const MasterStream = require('../src/master_stream')

let stream

test.afterEach('cleanup', (t) => {
  if (!stream.children) {
    return
  }
  stream.children.forEach((cp) => {
    cp.disconnect()
    cp.kill('SIGKILL')
  })
  stream.end()
  t.pass()
})

test('Initialize master with given children numbers', (expect) => {
  stream = new MasterStream({ workerNumber: 10, task: () => {} })
  expect.is(stream.children.length, 10)
})

test('Initialize master with given children numbers returns PIDs', (expect) => {
  stream = new MasterStream({ workerNumber: 2, task: () => {} })
  stream.children.forEach((child) => {
    expect.true(child.pid > 0)
    expect.true(child.connected)
  })
})

test.cb('Initialize worker with given work function', (expect) => {
  const message = { message: 'message' }
  stream = new MasterStream({
    workerNumner: 1,
    task: (chunk, enc, cb) => {
      cb(null)
    },
  })
  stream.push(message)
  expect.end()
})

// test.cb('child process emitted message when master pushed', (expect) => {
//   stream = new MasterStream({ workerNumber: 1 })
//   const child = stream.children[0]
//   const message = { message: 'message' }
//   child.on('message', (data) => {
//     expect.deepEqual(data, message)
//     expect.pass()
//   })
//   stream.push(message)
// })
