import EE from 'events'

import test from 'tape'
import proxyquire from 'proxyquire'

const fakeCli = createFakeModule()
const fakeRc = createFakeModule()
const fakeRequest = createFakeModule()
const fakeRender = createFakeModule()

const lib = proxyquire(
  '../lib',
  {
    './cli': fakeCli.mock,
    './rc': fakeRc.mock,
    './request': fakeRequest.mock,
    './render': fakeRender.mock,
    '@noCallThru': true
  }
)

test('calls through all modules with correct opts', t => {
  t.plan(7)

  const args = {beep: 'boop'}
  const rc = {blip: 'blop'}
  const merged = dup(Object.assign({}, args, rc))
  const res = {ok: true}

  fakeCli.once('instantiated', (calledArgs, next) => {
    t.deepEqual(calledArgs, args)

    setImmediate(() => next(null, calledArgs))
  })

  fakeRc.once('instantiated', next => {
    t.pass('fakerc called')

    setImmediate(() => next(null, dup(rc)))
  })

  fakeRequest.once('instantiated', (calledArgs, next) => {
    t.deepEqual(calledArgs, merged)

    setImmediate(() => next(null, dup(res)))
  })

  fakeRender.once('instantiated', (calledArgs, calledRes, next) => {
    t.deepEqual(calledArgs, merged)
    t.deepEqual(calledRes, res)

    setImmediate(() => next(null, 'good work everyone'))
  })

  lib(dup(args), done)

  function done (err, result) {
    t.notOk(err)
    t.equal(result, 'good work everyone')
  }
})

test('error in cli is returned', t => {
  t.plan(3)

  const error = new Error('crap')

  fakeCli.once('instantiated', (calledArgs, next) => {
    t.pass('cli called')

    setImmediate(() => next(error))
  })

  lib({}, done)

  function done (err, result) {
    t.ok(err)
    t.equal(err.message, 'crap')
  }
})

test('error in rc is returned', t => {
  t.plan(4)

  const error = new Error('crap')

  fakeCli.once('instantiated', (calledArgs, next) => {
    t.pass('cli called')

    setImmediate(() => next(null, calledArgs))
  })

  fakeRc.once('instantiated', next => {
    t.pass('fakerc called')

    setImmediate(() => next(error))
  })

  lib({}, done)

  function done (err, result) {
    t.ok(err)
    t.equal(err.message, 'crap')
  }
})

test('error in request is returned', t => {
  t.plan(5)

  const error = new Error('crap')

  fakeCli.once('instantiated', (calledArgs, next) => {
    t.pass('cli called')

    setImmediate(() => next(null, calledArgs))
  })

  fakeRc.once('instantiated', next => {
    t.pass('fakerc called')

    setImmediate(() => next(null, {}))
  })

  fakeRequest.once('instantiated', (calledArgs, next) => {
    t.pass('fakerequest called')

    setImmediate(() => next(error))
  })

  lib({}, done)

  function done (err, result) {
    t.ok(err)
    t.equal(err.message, 'crap')
  }
})

test('error in render is returned', t => {
  t.plan(6)

  const error = new Error('crap')

  fakeCli.once('instantiated', (calledArgs, next) => {
    t.pass('cli called')

    setImmediate(() => next(null, calledArgs))
  })

  fakeRc.once('instantiated', next => {
    t.pass('fakerc called')

    setImmediate(() => next(null, {}))
  })

  fakeRequest.once('instantiated', (calledArgs, next) => {
    t.pass('fakerequest called')

    setImmediate(() => next(null, {}))
  })

  fakeRender.once('instantiated', (calledArgs, calledRes, next) => {
    t.pass('fakerender called')

    setImmediate(() => next(error))
  })

  lib({}, done)

  function done (err, result) {
    t.ok(err)
    t.equal(err.message, 'crap')
  }
})

function createFakeModule () {
  const events = new EE()

  events.mock = mock

  return events

  function mock (...args) {
    events.emit('instantiated', ...args)
  }
}

function dup (obj) {
  return JSON.parse(JSON.stringify(obj))
}
