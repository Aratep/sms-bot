import { useEffect, useRef } from "react";

const MoneyInput = ({ name, value, onChange, ...rest }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input element when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // Empty dependency array ensures this runs only once after the initial render

  function handleInputChange(event) {
    onChange(event.target);
  }

  return (
    <div className="money-input">
      <span>$</span>
      <input
        ref={inputRef}
        name={name}
        value={value}
        onChange={handleInputChange}
        type="number"
        {...rest}
      />
    </div>
  );
};

export default MoneyInput;
