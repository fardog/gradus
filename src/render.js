import fs from 'fs'
import path from 'path'

import chalk from 'chalk'
import {decodeHTML as decode} from 'entities'
import handlebars from 'handlebars'
import wordwrap from 'wordwrap'

export default render

handlebars.registerHelper('urlencode', encodeURIComponent)
handlebars.registerHelper('wrap', wrap)
handlebars.registerHelper('color', color)
handlebars.registerHelper('align', align)

function render (argv, result, ready) {
  const templateName = argv.section
  const templatePath = path.resolve(__dirname, '..', 'templates', `${templateName}.hbs`)

  fs.readFile(templatePath, (err, rawTemplate) => {
    if (err) {
      return ready(err)
    }

    const template = handlebars.compile(rawTemplate.toString())

    ready(null, decode(template({result, argv})))
  })
}

function wrap (start, stop, options) {
  const wrapFn = wordwrap(Number(start), Number(stop))

  return wrapFn(options.fn(this))
}

function color (_params, options) {
  const params = _params.split(',')

  let clr = chalk

  params.forEach(param => {
    clr = clr[param]
  })

  return clr(options.fn(this))
}

function align (...args) {
  const align = args[0]
  const options = args.slice(-1)[0]
  const text = options.fn(this).trim()

  if (align === 'right') {
    let width = Number(args[1])

    return ' '.repeat(width - text.length) + text
  } else if (align === 'center') {
    let width = Number(args[1])

    return ' '.repeat((width - text.length) / 2) + text
  }
}
