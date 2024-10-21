import { DropdownProps } from './types';
import './index.scss';

const Dropdown = ({ methods, onSelect }: DropdownProps) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };
  const items = methods.map((method: string) => (
    <option className="method-option">{method}</option>
  ));
  return (
    <select className="method-select" onChange={onChange}>
      {items}
    </select>
  );
};

export default Dropdown;
