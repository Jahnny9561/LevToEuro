import React, { useState } from 'react';
import { BGN_TO_EUR_RATE } from '../components/rates';
import './components.css'; 

function ChangeCalculator() {
  const [eurPrice, setEurPrice] = useState(''); // Price in EUR (e.g., "10.00")
  const [bgnPaid, setBgnPaid] = useState('');   // Amount paid in BGN (e.g., "40.00")

  // State for our result
  const [changeEUR, setChangeEUR] = useState(0); // The final change in EUR (as cents)

  // This helper regex validates input and includes the "fast dot" feature
  const validateInput = (value) => {
    // 1. Allow clearing the field
    if (value === '') {
      return '';
    }

    // 2. Replace comma with dot
    let input = value.replace(',', '.');

    // 3. YOUR FEATURE: Auto-insert dot after a leading 0
    // (e.g., 05 -> 0.5 and 005 -> 0.05)
    if (/^0\d/.test(input) && !input.includes('.')) {
      input = '0.' + input.substring(1);
    }

    // 4. Prevent non-numeric characters (except one dot)
    if (!/^\d*\.?\d*$/.test(input)) {
      return null; // Return null (invalid) to stop state update
    }

    // 5. Prevent more than 2 decimal places
    if (input.includes('.') && input.split('.')[1].length > 2) {
      return null; // Return null (invalid)
    }

    // 6. Set a maximum value (e.g., 100 million)
    if (parseFloat(input) > 100000000) {
      return null; // Return null (invalid)
    }

    // 7. All checks passed! Return the valid input string.
    return input;
  };

  const handleEurPriceChange = (e) => {
    const validValue = validateInput(e.target.value);
    if (validValue !== null) {
      setEurPrice(validValue);
      calculateChange(validValue, bgnPaid);
    }
  };

  const handleBgnPaidChange = (e) => {
    const validValue = validateInput(e.target.value);
    if (validValue !== null) {
      setBgnPaid(validValue);
      calculateChange(eurPrice, validValue);
    }
  };

  const calculateChange = (currentEurPrice, currentBgnPaid) => {
    // 1. Convert string inputs to integers (cents/stotinki)
    const priceInEurCents = Math.round(parseFloat(currentEurPrice) * 100);
    const paidInBgnStotinki = Math.round(parseFloat(currentBgnPaid) * 100);

    // 2. Check if we have enough info to calculate
    if (isNaN(priceInEurCents) || isNaN(paidInBgnStotinki) || priceInEurCents <= 0 || paidInBgnStotinki <= 0) {
      setChangeEUR(0);
      return;
    }

    // 3. Convert the BGN Paid amount into EUR Cents
    const paidInEurCents = Math.round(paidInBgnStotinki / BGN_TO_EUR_RATE);

    // 4. Calculate the change in EUR Cents
    const changeInEurCents = paidInEurCents - priceInEurCents;

    // 5. Save the result
    setChangeEUR(changeInEurCents);
  };

  // --- Display Logic ---

  const formatCents = (cents) => {
    if (cents <= 0) return "0.00";
    return (cents / 100).toFixed(2);
  };

  const isError = changeEUR < 0;

  return (
    <div className="calculator-card">
      <h2>Калкулатор за Ресто (в Евро)</h2>
      <p>Цена в Евро, плащане в Лева, ресто в Евро.</p>

      <div className="input-wrapper">
        <label htmlFor="total-eur">Цена в Евро (EUR)</label>
        <input
          id="total-eur"
          className="input"
          type="text"
          inputMode="decimal"
          value={eurPrice}
          onChange={handleEurPriceChange}
          placeholder="0.00"
        />
        <span className="currency-suffix">€</span>
      </div>

      <div className="input-wrapper" style={{ marginTop: '1rem' }}>
        <label htmlFor="paid-bgn">Платено в Лева (BGN)</label>
        <input
          id="paid-bgn"
          className="input"
          type="text"
          inputMode="decimal"
          value={bgnPaid}
          onChange={handleBgnPaidChange}
          placeholder="0.00"
        />
        <span className="currency-suffix">лв</span>
      </div>

      <div className="result-group">
        <h3>Ресто за Връщане:</h3>
        
        {isError ? (
          <p className="result-value" style={{ color: '#D32F2F', fontSize: '1.2rem' }}>
            Платената сума е недостатъчна
          </p>
        ) : (
          <p className="result-value">
            {formatCents(changeEUR)} €
          </p>
        )}
      </div>
    </div>
  );
}

export default ChangeCalculator;