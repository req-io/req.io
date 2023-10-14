import './index.scss';

const UrlPanel = () => {
    return (
        <div className='url-panel'>
            <select className='method-select'>
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
            </select>
            <input type='text' className='url-input' placeholder='https://example.com'/>
            <button className='send-button'>Send</button>
        </div>
    );
};

export default UrlPanel;