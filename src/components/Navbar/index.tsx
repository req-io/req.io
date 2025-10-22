import './index.scss';
import { NavbarProps } from './types.ts';

const Navbar = ({ items }: NavbarProps) => {
  const navbarItems = items.map((itemConfig) => {
    const className = itemConfig.isActive ? 'item active' : 'item';
    return (
      <li className={className} key={itemConfig.label} onClick={itemConfig.onClick}>
        {itemConfig.label}
        {itemConfig.badge !== undefined && itemConfig.badge > 0 && (
          <span className="badge">{itemConfig.badge}</span>
        )}
      </li>
    );
  });

  return (
    <div className="navbar">
      <ul className="items">{navbarItems}</ul>
    </div>
  );
};

export default Navbar;
