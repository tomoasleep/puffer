export interface PaneItem {
  getTitle?: () => String
  getURI?: () => String
  getUri?: () => String

  getPath?: () => String
}

export function getTitle(item: PaneItem): string {
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
