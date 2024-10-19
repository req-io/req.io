import './index.scss';
import React from 'react';
import { RequestParamPanelProps } from './types.ts';
import { QueryParam } from '../RequestPanel/types.ts';
import DeleteIcon from '@mui/icons-material/Delete';

const RequestParamsPanel = (props: RequestParamPanelProps) => {
  const onParamsChange = (id: number, updatedParam: QueryParam) => {
    const updatedParams = [...props.params];
    updatedParams[id] = updatedParam;
    props.onParamsChange(updatedParams);
  };

  const onNewParamAddition = () => {
    props.onNewParamAddition({ key: '', value: '' });
  };

  const onParamDelete = (index: number) => {
    const updatedParams = props.params.filter((_, paramIndex) => paramIndex !== index);
    props.onParamsChange(updatedParams);
  };

  const paramRows = props.params.map((param: QueryParam, index) => {
    const onParamKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onParamsChange(index, { ...param, key: e.target.value });
    };

    const onParamValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onParamsChange(index, { ...param, value: e.target.value });
    };

    return (
      <tr key={index}>
        <td>
          <input type="text" placeholder="Key" value={param.key} onChange={onParamKeyChange} />
        </td>
        <td>
          <input
            type="text"
            placeholder="Value"
            value={param.value}
            onChange={onParamValueChange}
          />
        </td>
        <td>
          <button className="delete-button" onClick={() => onParamDelete(index)}>
            <DeleteIcon fontSize="small" />
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div className="request-params-panel">
      <table className="params-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{paramRows}</tbody>
      </table>
      <button className="button" onClick={onNewParamAddition}>
        Add Param
      </button>
    </div>
  );
};

export default RequestParamsPanel;
