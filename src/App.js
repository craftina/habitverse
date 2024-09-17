import './App.css';
// import uniqid from 'uniqid';
import Header from './components/Header/Header.js';
import MainView from './components/MainView/MainView.js';
import SideMenu from './components/SideMenu/SideMenu.js';

function App() {
  // const uniqueId = uniqid();

  return (
    <div className="App">
      <header>
        <Header/>
      </header>
      <main className="main">
        <SideMenu/>
        <div className="main-container">
          <MainView/>
        </div>
      </main>
     {/* <p>Your unique ID is: {uniqueId}</p> */}
    </div>
  );
}

export default App;
