import { h, ActionsType } from 'hyperapp';
import { filter } from 'fuzzy';

interface PaneItem {
  getTitle?: () => String
  getURI?: () => String
  getUri?: () => String
}

interface State {
  items: Array<PaneItem>
  matchedItems: Array<PaneItem> | null
}

export const initState = (): State => ({
  items: [],
  matchedItems: null,
});

export interface Actions {
  registerPaneItem: (item: object) => void
  unregisterPaneItem: (item: object) => void
  changeFilterText: (text: string) => void
}

export const actions: ActionsType<State, Actions> = {
  registerPaneItem: (item: PaneItem) => (state: State) => ({ items: state.items.concat(item) }),
  unregisterPaneItem: (item: PaneItem) => (state: State) => {
    const index = state.items.findIndex((value: object) => (value == item));
    return { items: (index > -1 ? state.items.slice(0, index).concat(state.items.slice(index + 1)) : state.items) };
  },
  changeFilterText: (text: string) => (state: State) => {
    if (text.length) {
      const matchedItems = filter(text, state.items, { extract: getTitle });
      return { matchedItems }
    } else {
      return { matchedItems: null }
    }
  },
}

function getTitle(item: PaneItem): string {
  if (typeof item.getTitle === 'function') {
    return (String)(item.getTitle());
  } else if (typeof item.getURI === 'function') {
    return (String)(item.getURI());
  } else if (typeof item.getUri === 'function') {
    return (String)(item.getUri());
  } else {
    return '';
  }
}

export const view = (state: State, _actions: Actions): any => {
  const items = state.matchedItems || state.items;
  return (
    <div>
      {items.map(item => (<div>{getTitle(item)}</div>))}
    </div>
  );
}
