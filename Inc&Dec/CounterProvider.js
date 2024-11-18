import React, { createContext, useContext, useState } from 'react';

// Step 1: CounterContext create kijiye
export const CounterContext = createContext();

// Step 2: CounterProvider Component banayein
export const CounterProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  // Increment aur Decrement functions
  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1)

    }
  }



  return (
    <CounterContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
};
