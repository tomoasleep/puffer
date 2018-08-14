declare module 'atom-select-list' {
  class SelectListView<T> {
    constructor(options: {
      items: Array<T>
      elementForItem: (item: T, options: { selected: boolean, index: number, visible: boolean }) => HTMLElement
      maxResults?: number
      filter?: (items: Array<T>, query: string) => Array<T>
      filterKeyForItem?: (item: T) => string
      filterQuery?: (query: string) => string
      query?: string
      selectQuery?: boolean
      order?: (item1: T, item2: T) => number
      emptyMessage?: string
      errorMessage?: string
      infoMessage?: string
      loadingMessage?: string
      loadingBadge?: string | number
      itemsClassList?: Array<string>
      initialSelectionIndex?: number
      didChangeQuery?: (query: string) => void
      didChangeSelection?: (item: T) => void
      didConfirmSelection?: (item: T) => void
      didConfirmEmptySelection?: () => void
      didCancelSelection?: () => void
      initiallyVisibleItemCount?: number
    })

    element: HTMLElement
    destroy(): Promise<void>
    focus(): void
  }

  export = SelectListView
}
