import { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Countdown from "react-countdown";

// BASE COMPONENTS
import IsVisible from "components/is-visible/IsVisible.component";
// CONTEXT
import { FocusedContext } from "context/IsFocused.context";
// UTILS
import { notify } from "utils/helper-functions";
// ICONS
import SearchIcon from "components/icons/SearchIcon.component";
// IMAGES
import phoneIcon from "assets/imgs/input/phone.png";
import messageIcon from "assets/imgs/input/message.png";
import spinner from "assets/imgs/input/spinner.png";

const getLocalStorageValue = (s) => localStorage.getItem(s);

const Input = (props) => {
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
    copiable = false,
    hasCounter = false,
    ...otherProps
  } = props;
  const { name } = props;
  const { toggleFocused } = useContext(FocusedContext);

  const [data, setData] = useState({
    date: Date.now(),
    delay: counter,
  });
  const wantedDelay = counter;

  useEffect(() => {
    const savedDate = getLocalStorageValue("end_date");
    if (savedDate != null && !isNaN(savedDate)) {
      const currentTime = Date.now();
      const delta = parseInt(savedDate, 10) - currentTime;

      if (delta > wantedDelay) {
        if (localStorage.getItem("end_date").length > 0)
          localStorage.removeItem("end_date");
      } else {
        setData({ date: currentTime, delay: delta });
      }
    }
  }, []);

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

  const imgLabelClasses = classNames({
    "sm-input__wrapper--img-label": true,
    "sm-input__wrapper--img-search_label": iconVariant === "search",
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

  const handleFocus = () => {
    toggleFocused(true);
  };

  const handleBlur = () => {
    toggleFocused(false);
  };

  const onCopy = () => {
    notify("Copied!", "success", {
      autoClose: 5000,
      position: "bottom-center",
    });
  };

  const iconVariants = {
    phone: phoneIcon,
    message: messageIcon,
  };

  return (
    <div className={inputClasses}>
      {label && <div className={labelClasses}>{label}</div>}
      <div className={inputWrapperClasses}>
        <IsVisible isVisible={!!iconVariant && iconVariant !== "search"}>
          <label htmlFor={id} className={imgLabelClasses}>
            <img src={iconVariants[iconVariant]} alt="icon" />
          </label>
        </IsVisible>
        <IsVisible isVisible={iconVariant === "search"}>
          <label htmlFor={id} className={imgLabelClasses}>
            <SearchIcon />
          </label>
        </IsVisible>
        <IsVisible isVisible={hasLoader}>
          <label htmlFor={id} className="sm-input__wrapper--img-label">
            <IsVisible isVisible={!isLoading}>
              <img src={messageIcon} alt="spinner" />
            </IsVisible>
            <IsVisible isVisible={isLoading}>
              <img src={spinner} alt="spinner" className="spinner-gif" />
            </IsVisible>
          </label>
        </IsVisible>
        <IsVisible isVisible={copiable}>
          <CopyToClipboard text={value} onCopy={onCopy}>
            <input
              className={nativeInputClasses}
              autoComplete="off"
              value={value || ""}
              onChange={handleChange}
              onInvalid={onInvalid}
              onSelect={handleSelect}
              onFocus={handleFocus}
              onBlur={handleBlur}
              id={id}
              {...otherProps}
            />
          </CopyToClipboard>
        </IsVisible>
        <IsVisible isVisible={!copiable}>
          <input
            className={nativeInputClasses}
            autoComplete="off"
            value={value || ""}
            onChange={handleChange}
            onInvalid={onInvalid}
            onSelect={handleSelect}
            onFocus={handleFocus}
            onBlur={handleBlur}
            id={id}
            {...otherProps}
          />
        </IsVisible>
        <IsVisible isVisible={hasCounter}>
          <Countdown
            renderer={({ minutes, seconds, completed }) => {
              const formattedMinutes = minutes === 0 ? `0${minutes}` : minutes;
              const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
              return completed ? (
                <span className="sm-input__wrapper-counter">00:00</span>
              ) : (
                <span className="sm-input__wrapper-counter">
                  {formattedMinutes}:{formattedSeconds}
                </span>
              );
            }}
            date={data.date + data.delay}
            onStart={() => {
              if (localStorage.getItem("end_date") == null)
                localStorage.setItem(
                  "end_date",
                  JSON.stringify(data.date + data.delay)
                );
            }}
            onComplete={() => {
              onCounterEnd();
              if (localStorage.getItem("end_date") != null)
                localStorage.removeItem("end_date");
            }}
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
