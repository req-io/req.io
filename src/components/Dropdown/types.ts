export interface DropdownItem {
  name: string;
  onSelect: () => void;
  color?: string;
}

export interface DropdownProps {
  items: DropdownItem[];
}
