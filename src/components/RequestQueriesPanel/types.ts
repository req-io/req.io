import { Query } from "../RequestPanel/types.ts";

export type RequestQueriesPanelProps = {
  query: Query[];
  onQueryChange: (queries: Query[]) => void;
  onNewQueryAddition: (query: Query) => void;
}