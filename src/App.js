import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import DailyView from './components/DailyView/DailyView.js';
// import uniqid from 'uniqid';
import Header from './components/Header/Header.js';
import MainView from './components/MainView/MainView.js';
import SideMenu from './components/SideMenu/SideMenu.js';
import Calendar from './components/MainView/Calendar/Calendar.js';
import HabitsList from './components/HabitsList/HabitsList.js';
import AreasList from './components/MainView/AreasList/AreasList.js';
import HabitView from './components/MainView/HabitView/HabitView.js';

function App() {
  // const uniqueId = uniqid();

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Header />
        </header>
        <main className="main">
          <SideMenu />
          <div className="main-container">
            <MainView>
              <Routes>
                <Route path="/" element={<Calendar />} />
                <Route path="/habits" element={<HabitsList />} />
                <Route path="/areas" element={<AreasList />} />
                <Route path="/habits/:id" element={<HabitView />} />
              </Routes>
            </MainView>
          </div>
          <DailyView />
        </main>
        {/* <p>Your unique ID is: {uniqueId}</p> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
