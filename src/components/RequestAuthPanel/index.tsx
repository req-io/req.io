import './index.scss';

import Dropdown from '../Dropdown';

const RequestAuthPanel = () => {
  const items = [
    { id: 'NoAuth', name: 'NO AUTH', onSelect: () => {}, color: '#a3a3a3' },
    { id: 'BasicAuth', name: 'BASIC AUTH', onSelect: () => {}, color: '#a3a3a3' },
    { id: 'ApiKey', name: 'API KEY', onSelect: () => {}, color: '#a3a3a3' },
  ];

  return (
    <div className="request-auth-panel">
      <Dropdown items={items} />
      <div className="auth-placeholder">Select authentication type!</div>
    </div>
  );
};

export default RequestAuthPanel;
