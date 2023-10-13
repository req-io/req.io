import './index.scss';
import RequestPanel from "../RequestPanel";
import ResponsePanel from "../ResponsePanel";
import PaneSplitter from "../PaneSplitter";


const Container = () => {
    return <div className='container'>
        <RequestPanel/>
        <PaneSplitter direction='horizontal'/>
        <ResponsePanel/>
    </div>
};

export default Container;