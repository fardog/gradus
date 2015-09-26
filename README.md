# gradus: pre-alpha

Look up a word using the [wordnik][] API.

**Note:** This is pre-alpha; nothing except from a word's definition works yet,
but I use this so often that I wanted it published.

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

## License

MIT. See [LICENSE](./LICENSE) for details.

[wordnik]: https://wordnik.com/

[buildstatus]: https://travis-ci.org/fardog/gradus
[npminstall]: https://www.npmjs.org/package/gradus
[jsstandard]: https://github.com/feross/standard
[buildstatusimg]: http://img.shields.io/travis/fardog/gradus/master.svg?style=flat-square
[npminstallimg]: http://img.shields.io/npm/dm/gradus.svg?style=flat-square
[jsstandardimg]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
