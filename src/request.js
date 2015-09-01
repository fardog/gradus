import https from 'https'
import url from 'url'

import concat from 'concat-stream'
import templater from 'tiny-templater'

export default wordnikApi

const URL_TEMPLATE = `https://api.wordnik.com/v4/{{ resource }}.json/{{ query }}/{{ section }}?api_key={{ apiKey }}`

const urlTemplate = templater(URL_TEMPLATE)

function wordnikApi (options, ready) {
  const urlObj = url.parse(urlTemplate(options), true)

  let sent = false

  delete urlObj.search

  const req = https.request(urlObj, res => {
    res.pipe(concat(done))
    res.on('error', onError)

    function done (body) {
      try {
        body = JSON.parse(body.toString())
      } catch (err) {
        return ready(err)
      }

      if (!sent) {
        ready(null, body)
      }
    }
  })

  req.on('error', onError)
  req.end()

  function onError (err) {
    if (!sent) {
      process.nextTick(() => ready(err))
    }

    sent = true
  }
}
