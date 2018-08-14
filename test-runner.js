const { createRunner } = require('atom-mocha-test-runner')
const path = require('path')
const fs = require('fs-extra')
const { resolve } = require('path')
const Mocha = require('mocha');

module.exports = createRunner({ globalAtom: false }, mocha => {
  if (!mocha.files.length) {
    const testPath = resolve(__dirname, 'out');
    Mocha.utils.lookupFiles(testPath, ['test.js'], true).forEach((path) => { mocha.addFile(path) });
  }

  global.atom = global.buildAtomEnvironment({enablePersistence: false})

  mocha.suite.afterEach(() => {
    global.atom.reset();
  });

  let packageName = require('./package.json').name
  const packageDir = path.join(atom.configDirPath, 'packages')
  fs.ensureSymlinkSync(__dirname, path.join(packageDir, packageName))
})
