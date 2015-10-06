# gradus: alpha version

Look up a word using the [wordnik][] API.

**Note:** This is alpha quality: it has no unit tests, but it works and I use it
daily.

## Install

```bash
$ npm install -g gradus
```

On first run, you'll be prompted for a wordnik API key; to get one, sign up for
an account and then visit your profile's "edit" page.

## Example

```bash
$ gradus beep

beep (noun)
  A sound or a signal, as from a horn or an electronic
  device.
                                 source: ahd-legacy
```

Run with `--help` to see all options:

```
$ gradus --help

gradus: Get information about a word using the Wordnik API

You must have a valid Wordnik API key to use this application, and will be
prompted for one if it isn't already stored in your `~/.gradusrc`

Usage: gradus [options] <term>

Options:
  --help                    Show this help text
  --version                 Show version number and exit
  --section -s <section>    Informational section (default: 'definitions')

Valid Sections:

definitions         Get the definitions available (default)
topExample          See the top usage example
relatedWords        Get related words
pronunciations      Pronunciation
hyphenation         Valid hyphenations
frequency           No idea
phrases             Phrases using the word

Powered by Wordnik: https://www.wordnik.com/
```

## License

MIT. See [LICENSE](./LICENSE) for details.

[wordnik]: https://wordnik.com/

[buildstatus]: https://travis-ci.org/fardog/gradus
[npminstall]: https://www.npmjs.org/package/gradus
[jsstandard]: https://github.com/feross/standard
[buildstatusimg]: http://img.shields.io/travis/fardog/gradus/master.svg?style=flat-square
[npminstallimg]: http://img.shields.io/npm/dm/gradus.svg?style=flat-square
[jsstandardimg]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
