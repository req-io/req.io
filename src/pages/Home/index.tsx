import './index.scss'
import Sidebar from "../../components/Sidebar";
import AppBody from "../../components/AppBody";
import Header from "../../components/Header";
import PaneSplitter from "../../components/PaneSplitter";

const Home = () => {
  return (
    <div className='home'>
      <Header/>
      <PaneSplitter direction='vertical'/>
      <div className='main-container'>
        <Sidebar/>
        <PaneSplitter direction='horizontal'/>
        <AppBody/>
      </div>
    </div>
  );
}

export default Home;