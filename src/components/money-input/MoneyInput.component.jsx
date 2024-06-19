import { useEffect, useRef } from "react";
import IsVisible from "../is-visible/IsVisible.component";

const MoneyInput = ({ name, value, onChange, id = "sm-input", ...rest }) => {
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

  // function formatNumber(str) {
  //   const numArr = str.split(".");
  //   return [numArr[0], numArr[1]];
  // }

  // const integral = formatNumber(value)[0];
  // const decimal = formatNumber(value)[1];

  return (
    <div className="money-input">
      <label htmlFor={id}>$</label>
      <IsVisible isVisible={!!value}>
        <div className="money-input__text">
          <span className="money-input__first">{value}</span>
          {/*{decimal && <span className="money-input__last">{decimal}</span>}*/}
        </div>
      </IsVisible>
      <input
        ref={inputRef}
        id={id}
        name={name}
        value={value}
        onChange={handleInputChange}
        type="number"
        step="0.01"
        className={`${!value ? "w-20" : "w-0"}`}
        {...rest}
      />
    </div>
  );
};

export default MoneyInput;
