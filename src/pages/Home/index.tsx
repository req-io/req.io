import './index.scss';
import Sidebar from '../../components/Sidebar';
import AppBody from '../../components/AppBody';
import Header from '../../components/Header';
import PaneSplitter from '../../components/PaneSplitter';

import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded';
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded';

const Home = () => {
  const items = [
    {
      icon: <CollectionsBookmarkRoundedIcon className="icon" />,
      label: 'collections',
      action: () => {},
      active: true,
    },
    {
      icon: <DataObjectRoundedIcon className="icon" />,
      label: 'environments',
      action: () => {},
      active: false,
    },
  ];

  return (
    <div className="home">
      <Header />
      <PaneSplitter direction="vertical" />
      <div className="main-container">
        <Sidebar items={items} />
        <PaneSplitter direction="horizontal" />
        <AppBody />
      </div>
    </div>
  );
};

export default Home;
