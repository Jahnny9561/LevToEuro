import { useState } from 'react';
import './App.css';
import SimpleConverter from './components/simpleConverter';
//import ChangeCalculator from './components/ChangeCalculator';

function App() {
  const [mode, setMode] = useState('converter');

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} alt="LevToEuro Logo" className="logo" /> */}
        <h1>LevToEuro</h1>
        <p>Помощник за преминаване към Евро</p>
      </header>

      <nav className="App-nav">
        <button
          className={mode === 'converter' ? 'active' : ''}
          onClick={() => setMode('converter')}
        >
          Лев ➔ Евро
        </button>
        <button
          className={mode === 'change' ? 'active' : ''}
          onClick={() => setMode('change')}
        >
          Калкулатор за Ресто
        </button>
      </nav>

      <main>
        {/* Conditional rendering: Show only the active component */}
        {mode === 'converter' && <SimpleConverter />}
        {mode === 'change' && <ChangeCalculator />}
      </main>
    </div>
  );
}

export default App;