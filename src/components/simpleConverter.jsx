import React, { useState } from 'react';
import { BGN_TO_EUR_RATE } from '../components/rates';
import './components.css';

function SimpleConverter() {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    let input = e.target.value;

    if (input === '') {
      setValue('');
      return;
    }

    input = input.replace(',', '.');

    if (/^0\d/.test(input) && !input.includes('.')) {
      // This logic correctly handles 05 -> 0.5 AND 005 -> 0.05
      input = '0.' + input.substring(1); 
    }

    // Prevent non-numeric characters (except one dot)
    if (!/^\d*\.?\d*$/.test(input)) {
      return;
    }

    // Prevent more than 2 decimal places
    if (input.includes('.') && input.split('.')[1].length > 2) {
      return;
    }

    // Set a maximum value
    if (parseFloat(input) > 100000000) {
      return;
    }

    // All checks passed, update the state
    setValue(input);
  };

  const euroValue =
    value && !isNaN(parseFloat(value))
      ? (parseFloat(value) / BGN_TO_EUR_RATE).toFixed(2)
      : '';

  return (
    <div className="calculator-card">
      <h2>Лев ➔ Евро</h2>
      <p>Въведете сума в лева, за да видите колко е в евро.</p>
      
      <div className="input-wrapper">
        <input
          className="input"
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder="0.00"
          maxLength={12}
        />
        <span className="currency-suffix">лв</span>
      </div>

      <div className="result-group">
        <h3>Равно на:</h3>
        <p className="result-value">
          {euroValue ? euroValue : '0.00'} €
        </p>
      </div>

      {value && (
        <footer>
          <h3>Официален курс: 1 EUR = 1.95583 BGN</h3>
        </footer>
      )}
    </div>
  );
}

export default SimpleConverter;