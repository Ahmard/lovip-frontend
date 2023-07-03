export interface CheckBox {
  id: string,
  html: string
  row: HTMLTableRowElement,
  onChange: (e: Event) => void
  onCheck?: (value: string | number) => void
  onUncheck?: (value: string | number) => void
}
