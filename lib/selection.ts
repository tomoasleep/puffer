import { PaneItem, getTitle } from './pane-item';
import { openItemInCurrentPane } from './pane';
import { Pane } from 'atom';
import SelectListView = require('atom-select-list');

interface ViewOptions {
  paneItems: Array<PaneItem>
  paneToOpen: Pane
  onDidDestroy?: () => void
}

export function createView({ paneItems , paneToOpen, onDidDestroy }: ViewOptions): SelectListView {
  const selectListView = new SelectListView({
    items: paneItems,
    selectQuery: true,
    filterKeyForItem: getTitle,
    elementForItem,
    didConfirmSelection: (item) => {
      openItemInCurrentPane(item, paneToOpen);
      selectListView.destroy()
      if (onDidDestroy) { onDidDestroy() }
    },
    didCancelSelection: () => {
      selectListView.destroy()
      if (onDidDestroy) { onDidDestroy() }
    }
  })

  return selectListView
}

export function elementForItem(item: PaneItem, { selected }: { selected: boolean }) {
  const dom = document.createElement('li')
  if (selected) { dom.classList.add('selected') }

  const primaryLine = document.createElement('div')
  primaryLine.appendChild(document.createTextNode(getTitle(item)))
  dom.appendChild(primaryLine)

  if (item.getPath) {
    const secondaryLine = document.createElement('div')
    secondaryLine.appendChild(document.createTextNode(item.getPath()))
    dom.appendChild(secondaryLine)
  }

  return dom
}
