import { useState } from "react";
import classNames from "classnames";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Countdown from "react-countdown";

// BASE COMPONENTS
import IsVisible from "components/is-visible/IsVisible.component";
// IMAGES
import phoneIcon from "assets/imgs/input/phone.png";
import searchIcon from "assets/imgs/input/search.png";
import messageIcon from "assets/imgs/input/message.png";
import spinner from "assets/imgs/input/spinner.png";
import sad from "assets/imgs/input/sad.png";

const Input = (props) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const {
    className,
    wrapperClass,
    iconVariant,
    inputData,
    value = inputData?.inputState[props.name],
    onChange = inputData?.handleInput,
    error = inputData?.invalidMessages,
    onInvalid = inputData?.handleInvalidMessage,
    onCounterEnd,
    label,
    id,
    isLoading,
    hasLoader = false,
    counter,
    ...otherProps
  } = props;
  const { name } = props;
  const inputClasses = classNames({
    "sm-input": true,
    [className]: !!className,
  });

  const nativeInputClasses = classNames({
    "sm-input__native": true,
  });

  const labelClasses = classNames({
    "sm-input__label": true,
  });

  const errorMessageBlockClasses = classNames({
    "sm-input__error": true,
    "sm-input__error-with-label": label !== undefined,
  });

  const inputWrapperClasses = classNames({
    [wrapperClass]: !!wrapperClass,
    "sm-input__wrapper": true,
  });

  const handleChange = async (event) => {
    onChange(event);
  };

  const handleSelect = (event) => {
    if (error) onInvalid(event, "");
  };

  const iconVariants = {
    phone: phoneIcon,
    message: messageIcon,
    search: searchIcon,
  };

  console.log("ISLOADINGGGGGGGGGG", isLoading);

  return (
    <div className={inputClasses}>
      {label && <div className={labelClasses}>{label}</div>}
      <div className={inputWrapperClasses}>
        <IsVisible isVisible={!!iconVariant}>
          <label htmlFor={id} className="sm-input__wrapper--img-label">
            <img src={iconVariants[iconVariant]} alt="icon" />
          </label>
        </IsVisible>
        <IsVisible isVisible={hasLoader}>
          <label htmlFor={id} className="sm-input__wrapper--img-label">
            <IsVisible isVisible={!isLoading}>
              <img src={sad} alt="spinner" />
            </IsVisible>
            <IsVisible isVisible={isLoading}>
              <img src={spinner} alt="spinner" className="spinner-gif" />
            </IsVisible>
          </label>
        </IsVisible>
        <CopyToClipboard text={value}>
          <input
            className={nativeInputClasses}
            autoComplete="off"
            value={value || ""}
            onChange={handleChange}
            onInvalid={onInvalid}
            onSelect={handleSelect}
            id={id}
            {...otherProps}
          />
        </CopyToClipboard>
        <IsVisible isVisible={!!counter}>
          <Countdown
            renderer={({ minutes, seconds, completed }) => {
              return completed ? (
                <span className="sm-input__wrapper-counter">00:00</span>
              ) : (
                <span className="sm-input__wrapper-counter">
                  {minutes}:{seconds}
                </span>
              );
            }}
            date={Date.now() + counter}
            onComplete={onCounterEnd}
          />
        </IsVisible>
      </div>
      {!!error?.[name] && (
        <p className={errorMessageBlockClasses}>{error?.[name] || ""}</p>
      )}
    </div>
  );
};

export default Input;
