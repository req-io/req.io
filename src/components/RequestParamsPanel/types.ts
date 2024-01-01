import { Param } from "../RequestPanel/types.ts";

export type RequestParamsPanelProps = {
  params: Param[];
  onParamsChange: (params: Param[]) => void;
  onNewParamAddition: (param: Param) => void;
}