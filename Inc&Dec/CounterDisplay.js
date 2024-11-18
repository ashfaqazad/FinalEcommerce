import React, { useContext } from 'react';
import { CounterContext } from './CounterProvider'; // Ensure the correct path

const CounterDisplay = () => {
  // CounterContext ko access kijiye
  const { count, increment, decrement } = useContext(CounterContext);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Counter: {count}</h1>
      <button onClick={increment} style={{ marginRight: '10px' }}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default CounterDisplay;
