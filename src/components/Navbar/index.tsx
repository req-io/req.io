import './index.scss';
import { NavbarProps } from "./types.ts";

const Navbar = ({ items }: NavbarProps) => {
  const navbarItems = items.map((itemConfig) => {
    const className = itemConfig.isActive ? 'item active' : 'item';
    return (
      <li className={ className } key={ itemConfig.label } onClick={ itemConfig.onClick }>
        { itemConfig.label }
      </li>
    )
  })

  return (
    <div className='navbar'>
      <ul className='items'>{ navbarItems }</ul>
    </div>
  );
};

export default Navbar;