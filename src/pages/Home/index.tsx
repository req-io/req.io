import './index.scss'
import Sidebar from "../../components/Sidebar";
import Container from "../../components/Container";
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
        <Container/>
      </div>
    </div>
  );
}

export default Home;