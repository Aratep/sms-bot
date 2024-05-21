// ThemeContext.js
import React, { createContext, useState } from "react";

const FocusedContext = createContext();

const FocusedProvider = ({ children }) => {
  const [isFocused, setIsFocused] = useState(false);

  const toggleFocused = (bool) => {
    setIsFocused(bool);
  };

  return (
    <FocusedContext.Provider value={{ isFocused, toggleFocused }}>
      {children}
    </FocusedContext.Provider>
  );
};

export { FocusedProvider, FocusedContext };
