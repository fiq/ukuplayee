import logo from './logo.svg';
import './App.css';
import Ukulele from './components/ukulele';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Ukulele/>
    </div>
  );
}

export default App;
