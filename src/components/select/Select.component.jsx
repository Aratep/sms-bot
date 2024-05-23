import { useState, useEffect } from "react";
import classNames from "classnames";

// COMPONENTS
import Input from "components/input/Input.component";
import Image from "components/image/Image.component";
import IsVisible from "components/is-visible/IsVisible.component";
// EFFECTS
import useInput from "effects/useInput.effect";
// IMAGES
import usdt from "assets/imgs/select/usdt.png";
import arrow from "assets/imgs/select/arrow.png";
import close from "assets/imgs/select/close.png";
import wa from "assets/imgs/wa.png"; // temporary

const Select = ({
                  name,
                  value,
                  handleChange,
                  inputVariant,
                  label,
                  placeholder,
                  list,
                  inputType = "text",
                }) => {
  const initialList = list.slice(0, 3);
  const [isMore, setIsMore] = useState(false);
  const [isOptionClicked, setIsOptionClicked] = useState(false);
  const [filteredList, setFilteredList] = useState(initialList);
  const {
    handleInput,
    updateInputState,
    handleInvalidMessage,
    invalidMessages,
  } = useInput();

  useEffect(() => {
    if (isMore) {
      setFilteredList(list);
    } else {
      setFilteredList(initialList);
    }
    // eslint-disable-next-line
  }, [isMore]);

  function handleInputChange(event) {
    handleInput(event);
    handleChange(event.target);
  }

  function onArrowClick() {
    setIsMore(!isMore);
    setFilteredList(list);
  }

  function onOptionClick(target) {
    setIsOptionClicked(true);
    handleChange(target);
  }

  function onCloseBtnClick() {
    setIsOptionClicked(false);
    updateInputState({ [name]: "" });
    handleChange({ name, value: "" });
  }

  const arrowClasses = classNames({
    "arrow-up": isMore,
  });

  return (
    <div className="sm-select">
      <IsVisible isVisible={isOptionClicked}>
        <div className="sm-select__selected">
          <label className="sm-select__selected-label">{label}</label>
          <div className="sm-select__selected-container">
            <div className="sm-select__selected-container__icon">
              <Image src={wa} alt="wa" />
              <span>Telegram</span>
            </div>
            <div
              onClick={onCloseBtnClick}
              className="sm-select__selected-container__btn"
            >
              <Image src={close} alt="close" className="close-btn" />
            </div>
          </div>
        </div>
      </IsVisible>
      <IsVisible isVisible={!isOptionClicked}>
        <Input
          name={name}
          value={value}
          error={invalidMessages}
          onChange={handleInputChange}
          onInvalid={handleInvalidMessage}
          label={label}
          placeholder={placeholder}
          iconVariant={inputVariant}
          type={inputType}
        />
        <div className="sm-select__options">
          {filteredList.map((option) => (
            <div
              className="sm-select__options-item"
              onClick={() => onOptionClick({ name, value: option.title })}
              key={option.id}
            >
              <div className="sm-select__options-item__logo">
                <Image src={option.src} alt="wa" />
                <span>{option.title}</span>
              </div>
              <div className="sm-select__options-item__info">
                <div>
                  <span className="from">from {option.from}</span>
                  <Image src={usdt} alt="usdt" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="sm-select__more-less" onClick={onArrowClick}>
          <IsVisible isVisible={isMore}>
            <span>Show less</span>
          </IsVisible>
          <IsVisible isVisible={!isMore}>
            <span>Show all</span>
          </IsVisible>
          <Image src={arrow} alt="arrow" className={arrowClasses} />
        </div>
      </IsVisible>
    </div>
  );
};

export default Select;
