import { openItemInCurrentPane } from './pane';
import { Pane } from 'atom';
import { resolve } from 'path';
import { expect } from 'chai';

describe('Pane', () => {
  describe('openItemInCurrentPane', () => {
    const paneUrl1 = resolve(__dirname, '../fixtures/fixture1.txt');
    const paneUrl2 = resolve(__dirname, '../fixtures/fixture2.txt');

    context('when the specified item is in another pane', () => {
      it('moves the specified item to the current pane and activate it', async () => {
        const item1 = await atom.workspace.open(paneUrl1, { pending: false, split: 'left' });
        const item2 = await atom.workspace.open(paneUrl2, { pending: false, split: 'right' });

        expect(atom.workspace.getActivePane()).not.to.equal(atom.workspace.getCenter().paneForItem(item1));
        openItemInCurrentPane(item1, atom.workspace.getCenter().paneForItem(item2) as Pane);
        expect(atom.workspace.getActivePane()).to.equal(atom.workspace.getCenter().paneForItem(item1));
        expect(atom.workspace.getActivePaneItem()).to.equal(item1);
      });
    });

    context('when the specified item is in the current pane', () => {
      it('moves the specified item to the current pane and activate it', async () => {
        const item1 = await atom.workspace.open(paneUrl1, { pending: false, split: 'left' });
        const item2 = await atom.workspace.open(paneUrl2, { pending: false });

        expect(atom.workspace.getActivePane()).to.equal(atom.workspace.getCenter().paneForItem(item1));
        openItemInCurrentPane(item1, atom.workspace.getCenter().paneForItem(item2) as Pane);
        expect(atom.workspace.getActivePane()).to.equal(atom.workspace.getCenter().paneForItem(item1));
        expect(atom.workspace.getActivePaneItem()).to.equal(item1);
      });
    });
  });
});
