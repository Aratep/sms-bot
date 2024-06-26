import { useEffect, useRef } from "react";

// COMPONENTS
import IsVisible from "components/is-visible/IsVisible.component";
// UTILS
import { formatTopUpNumber } from "utils/helper-functions";

const MoneyInput = ({ name, value, onChange, id = "sm-input", ...rest }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input element when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }); // Empty dependency array ensures this runs only once after the initial render

  function handleInputChange(event) {
    onChange(event.target);
  }

  const integral = formatTopUpNumber(value)[0];
  const decimal = formatTopUpNumber(value)[1];

  return (
    <div className="money-input">
      <label className="money-input__label" htmlFor={id}>
        $
      </label>
      <label htmlFor={id}>
        <IsVisible isVisible={!!value}>
          <div className="money-input__text">
            <span className="money-input__integral">
              {integral}
              {!decimal && <span className="money-input__decimal">.00</span>}
            </span>
            {decimal && (
              <span className="money-input__decimal">.{decimal}</span>
            )}
          </div>
        </IsVisible>
      </label>
      <input
        ref={inputRef}
        id={id}
        name={name}
        value={value}
        onChange={handleInputChange}
        type="number"
        pattern="\d*"
        inputMode="decimal"
        step="0.01"
        className="w-0"
        {...rest}
      />
      <IsVisible isVisible={!value}>
        <label htmlFor={id} className="styled-placeholder">
          <span className="money-input__integral">0.</span>
          <span className="money-input__decimal">00</span>
        </label>
      </IsVisible>
    </div>
  );
};

export default MoneyInput;
