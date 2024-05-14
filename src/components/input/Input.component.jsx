import classNames from "classnames";

// BASE COMPONENTS
import IsVisible from "components/is-visible/IsVisible.component";
// IMAGES
import phoneIcon from "assets/imgs/input/phone.png";
import searchIcon from "assets/imgs/input/search.png";
import messageIcon from "assets/imgs/input/message.png";

const Input = (props) => {
  const {
    className,
    iconVariant,
    inputData,
    value = inputData?.inputState[props.name],
    onChange = inputData?.handleInput,
    error = inputData?.invalidMessages,
    onInvalid = inputData?.handleInvalidMessage,
    label,
    id,
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
    "sm-input__wrapper": true,
    "sm-input__wrapper--reversed": otherProps.type === "password",
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

  return (
    <div className={inputClasses}>
      {label && <div className={labelClasses}>{label}</div>}
      <div className={inputWrapperClasses}>
        <IsVisible isVisible={!!iconVariant}>
          <label htmlFor={id} className="sm-input__wrapper--img-label">
            <img src={iconVariants[iconVariant]} alt="icon" />
          </label>
        </IsVisible>
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
      </div>
      {!!error?.[name] && (
        <p className={errorMessageBlockClasses}>{error?.[name] || ""}</p>
      )}
    </div>
  );
};

export default Input;
