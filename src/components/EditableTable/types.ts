export type DataEntry = {
  [key: string]: any;
}

export type Column = {
  name: string,
  selector: string,
  onChange: (id: number, updatedEntry: any) => void,
  placeholder: string
}

export type EditableTableProps = {
  columns: Column[],
  data: DataEntry[]
}