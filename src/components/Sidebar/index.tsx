import './index.scss';
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded';
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded';

const Sidebar = () => {
  const itemsConfig = [
    {
      icon: <CollectionsBookmarkRoundedIcon />,
      label: 'Collections',
      action: () => {}
    },
    {
      icon: <DataObjectRoundedIcon />,
      label: 'Environments',
      action: () => {}
    },
  ];

  const items = itemsConfig.map((itemConfig) =>
    <li className='item' key={itemConfig.label} onClick={itemConfig.action}>{itemConfig.icon}</li>
  )

  return (
    <div className='sidebar'>
      <ul className='items'>{items}</ul>
    </div>
  );
};

export default Sidebar;