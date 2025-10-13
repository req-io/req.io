import './index.scss';

interface ItemConfig {
  icon: JSX.Element;
  label: string;
  action: () => void;
  active: boolean;
}
interface SidebarProps {
  items: ItemConfig[];
}

const Sidebar = (props: SidebarProps) => {
  const items = props.items.map((itemConfig) => {
    return (
      <li
        className={itemConfig.active ? 'item active' : 'item'}
        key={itemConfig.label}
        data-testid={itemConfig.label}
        onClick={itemConfig.action}>
        {itemConfig.icon}
      </li>
    );
  });

  return (
    <div className="sidebar">
      <ul className="items">{items}</ul>
    </div>
  );
};

export default Sidebar;
