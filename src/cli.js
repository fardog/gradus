import minimist from 'minimist'

export default processCli

function processCli (args, ready) {
  const argv = minimist(args, {
    alias: {
      section: 's',
      limit: 'l',
      debug: 'd'
    },
    default: {
      section: 'definitions',
      resource: 'word',
      limit: 0
    },
    boolean: ['debug'],
    string: ['section']
  })

  const sections = [
    'definitions',
    'topExample',
    'relatedWords',
    'pronunciations',
    'hyphenation',
    'frequency',
    'phrases'
  ]

  const sectionMap = {
    example: 'examples',
    definition: 'definitions',
    define: 'definitions',
    top: 'topExample',
    related: 'relatedWords',
    pronounce: 'pronunciations',
    pronunciation: 'pronunciations',
    hyphenate: 'hyphenation'
  }

  const allowedSections = new Set(sections.concat(Object.keys(sectionMap)))

  if (!allowedSections.has(argv.section)) {
    let err = new Error('Unrecognized selection passed for --section')

    return ready(err)
  }

  if (sectionMap[argv.section]) {
    argv.section = sectionMap[argv.section]
  }

  argv.query = argv._[0]

  if (!argv.query) {
    let err = new Error('No query provided')

    return ready(err)
  }

  ready(null, argv)
}
