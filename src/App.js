import './App.css';
import uniqid from 'uniqid';
import Header from './components/Header/Header.js';

function App() {
  const uniqueId = uniqid();

  return (
    <div className="App">
      <header>
        <Header/>
      </header>
     <p>Your unique ID is: {uniqueId}</p>
    </div>
  );
}

export default App;
