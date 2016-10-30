
const test = require('ava')
const MasterStream = require('../src/master_stream')

test('Initialize master with given children numbers', (expect) => {
  const stream = new MasterStream({workerNumber: 10})
  expect.is(stream.children.size, 10)
})