import minimist from 'minimist'

export default processCli

function processCli (args, ready) {
  const argv = minimist(args, {
    aliases: {
      section: 's'
    },
    default: {
      section: 'definitions',
      resource: 'word'
    }
  })

  const sections = [
    'definitions',
    'topExample',
    'relatedWords',
    'pronunciations',
    'hyphenation',
    'frequency',
    'phrases',
    'etymologies'
  ]

  const sectionMap = {
    example: 'examples',
    definition: 'definitions',
    define: 'definitions',
    top: 'topExample',
    related: 'relatedWords',
    pronounce: 'pronunciations',
    hyphenate: 'hyphenation',
    etymology: 'etymologies'
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