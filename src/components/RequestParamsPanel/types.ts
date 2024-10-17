import { Param } from '../RequestPanel/types.ts';

export type RequestParamPanelProps = {
  params: Param[];
  onParamsChange: (params: Param[]) => void;
  onNewParamAddition: (param: Param) => void;
};
