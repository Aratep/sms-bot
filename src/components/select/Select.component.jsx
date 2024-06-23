import { useState, useEffect } from "react";
import classNames from "classnames";

// COMPONENTS
import Input from "components/input/Input.component";
import Image from "components/image/Image.component";
import IsVisible from "components/is-visible/IsVisible.component";
import Loader from "components/loader/Loader.component";
// EFFECTS
import useInput from "effects/useInput.effect";
// IMAGES
import usdt from "assets/imgs/select/usdt.png";
import arrow from "assets/imgs/select/arrow.png";
import close from "assets/imgs/select/close.png";

const Select = ({
  name,
  value,
  handleChange,
  handleOptionClick,
  inputVariant,
  label,
  placeholder,
  list,
  inputType = "text",
  isLoading,
  onClose = () => null,
  selectedOptionName,
}) => {
  const initialList = list.slice(0, 3);
  const [isMore, setIsMore] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});
  const [isOptionClicked, setIsOptionClicked] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
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
  }, [isMore]);

  useEffect(() => {
    setFilteredList(initialList);
  }, [list]);

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
    setSelectedOption(target);
    handleOptionClick(target);
  }

  function onCloseBtnClick() {
    setIsOptionClicked(false);
    updateInputState({ [name]: "" });
    handleChange({ name, value: "" });
    handleOptionClick({ name, value: "", src: "", id: "", price: "" });
    onClose(name);
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
              <Image src={selectedOption.src} alt="icon" />
              <span>{selectedOption.value}</span>
            </div>
            <div
              onClick={onCloseBtnClick}
              className="sm-select__selected-container__btn"
            >
              <IsVisible
                isVisible={
                  selectedOptionName === name && !!selectedOption.price
                }
              >
                <div className="price">
                  <span className="from">{selectedOption.price}</span>
                  <Image src={usdt} alt="usdt" />
                </div>
              </IsVisible>
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
        <Loader isLoading={isLoading}>
          <div className="sm-select__options">
            {filteredList.map((option) => (
              <div
                className={`sm-select__options-item ${filteredList.length <= 1 ? "rounded" : "semi-rounded"}`}
                onClick={() =>
                  onOptionClick({
                    id: option.id,
                    name,
                    value: option.title,
                    src: option.src,
                    price: option.from,
                  })
                }
                key={option.id}
              >
                <div className="sm-select__options-item__logo">
                  <Image src={option.src} alt="wa" />
                  <span>{option.title}</span>
                </div>
                <IsVisible isVisible={!!option.from && option.from !== ""}>
                  <div className="sm-select__options-item__info">
                    <div>
                      <span className="from">from {option.from}</span>
                      <Image src={usdt} alt="usdt" />
                    </div>
                  </div>
                </IsVisible>
              </div>
            ))}
          </div>
        </Loader>
        <IsVisible isVisible={filteredList.length >= 3}>
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
      </IsVisible>
    </div>
  );
};

export default Select;
