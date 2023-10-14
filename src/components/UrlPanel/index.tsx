import './index.scss';

const MethodSelect = ({methods}: { methods: string[] }) => {
    const items = methods.map((method: string) => <option>{method}</option>);
    return (
        <select className='method-select'>
            {items}
        </select>
    );
}

const UrlPanel = () => {
    return (
        <div className='url-panel'>
            <MethodSelect methods={['GET', 'POST', 'PATCH', 'PUT', 'DELETE']}/>
            <input type='text' className='url-input' placeholder='https://example.com'/>
            <button className='send-button'>Send</button>
        </div>
    );
};

export default UrlPanel;