// import { PaneItem } from './pane-item';
import { Panel, CompositeDisposable } from 'atom';
import { createView } from './selection';
import { PaneItem } from './pane-item';

let disposable = new CompositeDisposable;

export function activate(): void {
  disposable.add(
    atom.commands.add('atom-workspace', 'puffer:open-modal', {
      displayName: 'Open Puffer Selector',
      description: 'Open another buffer in current pane',
      hiddenInCommandPalette: false,
      didDispatch: openModal,
    })
  )
}

export function deactivate() {
  if (disposable) { disposable.dispose() }
}

export function openModal(): Panel {
  const paneItems = atom.workspace.getCenter().getPaneItems() as Array<PaneItem>
  const paneToOpen = atom.workspace.getCenter().getActivePane()

  let panel: Panel;
  const selectListView = createView({ paneItems, paneToOpen, onDidDestroy: () => { panel.destroy() } })
  panel = atom.workspace.addModalPanel({ item: selectListView, autoFocus: true })

  selectListView.element.classList.add('puffer-selection')
  selectListView.focus()

  return panel;
}
