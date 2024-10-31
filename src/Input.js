import React, { useState } from 'react';
import './Input.css';

const Input = ({ onGuess }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuess(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength="10"
        placeholder="Enter your guess"
      />
      <button type="submit">Guess</button>
    </form>
  );
};

export default Input;
