import fs from 'fs'
import path from 'path'
import os from 'os'

import rc from 'rc'
import prompt from 'cli-prompt'

export default processRc

function processRc (ready) {
  const conf = rc('gradus')

  if (!conf.apiKey) {
    prompt('Wordnik API Key: ', apiKey => {
      conf.apiKey = apiKey.trim()

      if (!conf.apiKey) {
        let err = new Error('No API Key was provided.')

        return ready(err)
      }

      fs.writeFile(
        path.join(os.homedir(), '.gradusrc'),
        JSON.stringify(conf),
        err => {
          ready(err, conf)
        }
      )
    })
  } else {
    process.nextTick(() => ready(null, conf))
  }
}
