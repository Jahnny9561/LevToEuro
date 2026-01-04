import { useState } from 'react';
import './App.css';
import SimpleConverterBGNtoEUR from './components/simpleConverterBGNtoEUR';
import ChangeCalculator from './components/ChangeCalculator';
import InstallButton from './components/installButton';
import SimpleConverterEURtoBGN from './components/simpleConverterEURtoBGN';

function App() {
  const [mode, setMode] = useState('converterBGNtoEUR');

  return (
    <div className="App">
      <header className="App-header">
        <h1>LevToEuro</h1>
        <p>Помощник за преминаване към Евро</p>
      </header>

      <nav className="App-nav">
        <button
          className={mode === 'converterBGNtoEUR' ? 'active' : ''}
          onClick={() => setMode('converterBGNtoEUR')}
        >
          Лев ➔ Евро
        </button>
        <button
          className={mode === 'change' ? 'active' : ''}
          onClick={() => setMode('change')}
        >
          Калкулатор за Ресто
        </button>
        <button
          className={mode === 'converterEURtoBGN' ? 'active' : ''}
          onClick={() => setMode('converterEURtoBGN')}
        >
          Евро ➔ Лев
        </button>
      </nav>

      <main>
        {/* Conditional rendering: Show only the active component */}
        {mode === 'converterBGNtoEUR' && <SimpleConverterBGNtoEUR />}
        {mode === 'change' && <ChangeCalculator />}
        {mode === 'converterEURtoBGN' && <SimpleConverterEURtoBGN />}
      </main>
      <InstallButton />
    </div>
  );
}

export default App;