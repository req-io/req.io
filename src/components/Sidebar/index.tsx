import './index.scss';
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded';
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded';

const Sidebar = () => {
  const itemsConfig = [
    {
      icon: <CollectionsBookmarkRoundedIcon className='icon'/>,
      label: 'Collections',
      action: () => {},
      active: true
    },
    {
      icon: <DataObjectRoundedIcon className='icon'/>,
      label: 'Environments',
      action: () => {},
      active: false
    },
  ];

  const items = itemsConfig.map((itemConfig) => {
    return (
        <li className={itemConfig.active ? 'item active' : 'item'} key={itemConfig.label} onClick={itemConfig.action}>
          {itemConfig.icon}
        </li>
    )
  })

  return (
    <div className='sidebar'>
      <ul className='items'>{items}</ul>
    </div>
  );
};

export default Sidebar;