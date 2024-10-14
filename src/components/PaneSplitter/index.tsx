import './index.scss';

export type PaneSplitterProps = {
  direction: string;
};

const PaneSplitter = (props: PaneSplitterProps) => {
  return <div className={`pane-splitter-${props.direction}`}></div>;
};

export default PaneSplitter;
