import { useState } from 'react'
import './App.css'

function App() {
const [value, setValue] = useState('');

  const handleChange = (e) => {
    let input = e.target.value;

    // Allow clearing the field
    if (input === '') {
      setValue('');
      return;
    }

    // Replace comma with dot
    input = input.replace(',', '.');

    // If input is just "0", wait for user to type more
    if (input === '0') {
      setValue('0');
      return;
    }

    // If input starts with 0 but is not "0." (like "01"), convert to "0."
    if (/^0\d+/.test(input)) {
      input = '0.' + input*1;
    }

    // Accept only valid format: numbers with up to 2 decimals
    if (/^\d*\.?\d{0,2}$/.test(input)) {
      setValue(input);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Цена в Лева"
      />
      <p>Цена в Евро: {value ? (parseFloat(value) * 0.511292).toFixed(2) : '—'}</p>
    </div>
  );
}

export default App
