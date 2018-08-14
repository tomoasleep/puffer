import { assert } from 'chai';
import { resolve } from 'path';
import { openModal } from './main';

describe('Main', () => {
  describe('activate', () => {
    beforeEach(() => {
      return atom.packages.activatePackage('puffer')
    })

    it('registers commands', () => {
      assert.isOk(atom.packages.isPackageActive('puffer'))
      assert.isNotEmpty(atom.commands.findCommands({ target: atom.views.getView(atom.workspace) }).filter((command) => command.name === 'puffer:open-modal'))
    })
  })

  describe('openModal', () => {
    const paneUrl1 = resolve(__dirname, '../fixtures/fixture1.txt');

    context('when there are items', () => {
      it('returns an panel', async () => {
        await atom.workspace.open(paneUrl1, { pending: false, split: 'left' });
        assert.isOk(openModal())
      });
    });
  })
})
