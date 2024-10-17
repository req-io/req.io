import { QueryParam } from '../RequestPanel/types.ts';

export type RequestParamPanelProps = {
  params: QueryParam[];
  onParamsChange: (params: QueryParam[]) => void;
  onNewParamAddition: (param: QueryParam) => void;
};
