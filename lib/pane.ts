import { PaneItem } from './pane-item';
import { Pane } from 'atom';

export function openItemInCurrentPane(item: PaneItem, currentPane: Pane) {
  const center = atom.workspace.getCenter();
  const paneForItem = center.paneForItem(item);

  if (paneForItem) {
    if (paneForItem == currentPane) {
      currentPane.activateItem(item, { pending: false });
      currentPane.activate();
    } else {
      paneForItem.moveItemToPane(item, currentPane, 0);
      currentPane.activateItem(item, { pending: false });
      currentPane.activate();
    }
  } else {
    currentPane.activateItem(item, { pending: false });
    currentPane.activate();
  }
}
