import { CompositeDisposable, DisposableLike } from 'atom';
import { Actions } from './app';

export function registerWatcher(actions: Actions): DisposableLike {
  return (new Watcher(actions)).disposable;
}

export class Watcher{
  disposable: CompositeDisposable;

  constructor(actions: any) {
    this.disposable = new CompositeDisposable();
    this.disposable.add(atom.workspace.getCenter().observePaneItems((item: object) => {
      actions.registerPaneItem(item)
    }));
    this.disposable.add(atom.workspace.getCenter().observePaneItems((item: object) => {
      actions.unregisterPaneItem(item)
    }));
  }
}
