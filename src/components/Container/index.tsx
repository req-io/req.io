import './index.scss';
import RequestPanel from "../RequestPanel";
import ResponsePanel from "../ResponsePanel";
import PaneSplitter from "../PaneSplitter";
import UrlPanel from "../UrlPanel";


const Container = () => {
    return <div className='container'>
        <UrlPanel/>
        <div className='sub-container'>
            <RequestPanel/>
            <PaneSplitter direction='horizontal'/>
            <ResponsePanel/>
        </div>
    </div>
};

export default Container;