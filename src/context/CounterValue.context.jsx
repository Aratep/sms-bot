import { createContext, useState } from "react";

// UTILS
import { initialCounter } from "utils/constants";

const CounterValueContext = createContext();

const CounterValueProvider = ({ children }) => {
  const [dateCounter, setDateCounter] = useState({
    date: Date.now(),
    delay: initialCounter,
  });

  const setDateCounterValue = (counter) => {
    setDateCounter(counter);
  };

  return (
    <CounterValueContext.Provider value={{ dateCounter, setDateCounterValue }}>
      {children}
    </CounterValueContext.Provider>
  );
};

export { CounterValueProvider, CounterValueContext };
