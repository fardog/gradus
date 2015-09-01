import extend from 'xtend'

import cli from './cli'
import rc from './rc'
import request from './request'
import render from './render'

export default gradus

function gradus (args, ready) {
  cli(args, (err, argv) => {
    if (err) {
      return ready(err)
    }

    rc((err, rcOpts) => {
      if (err) {
        return ready(err)
      }

      request(extend(argv, rcOpts), (err, result) => {
        if (err) {
          return ready(err)
        }

        render(argv, result, (err, rendered) => {
          ready(err, rendered)
        })
      })
    })
  })
}
