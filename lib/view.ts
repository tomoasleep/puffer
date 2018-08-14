import { TextEditor } from 'atom';
import { app } from 'hyperapp';
import { initState, actions, view } from './app';

export function createView(element: HTMLElement) {
  const editor = new TextEditor({mini: true});
  const hyperappElement = document.createElement('div')

  element.appendChild(atom.views.getView(editor));
  element.appendChild(hyperappElement)

  const appActions = app(initState(), actions, view, element);
  editor.onDidChange(() => {
    appActions.changeFilterText(editor.getText());
  });

  return {
    editor: editor,
    actions: appActions,
    element: element,
  };
}
