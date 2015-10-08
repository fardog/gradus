import tape from 'tape'

import lib from '../lib/cli'

tape('processes args', t => {
  t.plan(4)

  lib(['-s', 'topExample', 'beep'], (err, argv) => {
    t.notOk(err)
    t.false(argv.debug)
    t.equal(argv.section, 'topExample')
    t.equal(argv.query, 'beep')
  })
})

tape('disallows empty query', t => {
  t.plan(2)

  lib(['-s', 'topExample'], (err, argv) => {
    t.ok(err)
    t.ok(err.message.includes('query'))
  })
})

tape('maps section names', t => {
  t.plan(2)

  lib(['-s', 'top', 'beep'], (err, argv) => {
    t.notOk(err)
    t.equal(argv.section, 'topExample')
  })
})
