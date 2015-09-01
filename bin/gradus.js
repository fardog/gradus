#!/usr/bin/env node
var fs = require('fs')
var path = require('path')

var gradus = require('../lib')

if (process.argv.indexOf('--help') !== -1) {
  var help = fs.createReadStream(path.join(__dirname, 'help.txt'))

  help.on('end', process.exit.bind(process, 1))
  help.pipe(process.stdout)
} else if (process.argv.indexOf('--version') !== -1) {
  var pkg = require('../package.json')

  console.log(pkg.version)
  process.exit(1)
} else {
  gradus(process.argv.slice(2), function (err, result) {
    if (err) {
      return console.error(err)
    }

    console.log(result)
  })
}
