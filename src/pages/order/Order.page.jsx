import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import Input from "components/input/Input.component";
import Button from "components/button/Button.component";
import { Container } from "components/container/Container.component";
import List from "components/list/List.component";
import IsVisible from "components/is-visible/IsVisible.component";
// SLICES
import { commonSelector } from "store/common/common.slice";
import { orderSelector } from "store/order/order.slice";
// ACTIONS
import {
  cancelOrder,
  resetOrderInfo,
  setIsFirstCode,
  setIsSecondCode,
  getSecondCode,
  setIsRepeatClicked,
} from "store/order/order.actions";
import {
  resetSelectedOption,
  setIsOrderDone,
} from "store/common/common.actions";
// EFFECTS
import useInput from "effects/useInput.effect";
// UTILS
import { initialCounter } from "utils/constants";
import { generateOrderOptions, resetTimer } from "utils/helper-functions";

const OrderPage = () => {
  const [counter, setCounter] = useState(720000);
  const [hasCounter, setHasCounter] = useState(true);
  const { inputState, handleInput, handleInvalidMessage, invalidMessages } =
    useInput({ phone: "" });
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedOptions, tgHash } = useSelector(commonSelector);
  const {
    orderId,
    orderInfoLoading,
    orderInfo,
    isFirstCodeSet,
    isSecondCodeSet,
    isRepeatClicked,
  } = useSelector(orderSelector);

  function handleInputChange(event) {
    handleInput(event);
  }

  function onCounterEnd() {
    setHasCounter(false);
    onCancellClick();
  }

  function onCancellClick() {
    const params = {
      auth_data: {
        auth: tgHash.checkDataString,
        hash: tgHash.hash,
      },
      id: orderId,
    };
    dispatch(cancelOrder(params));
    dispatch(resetOrderInfo());
    dispatch(setIsFirstCode(false));
    dispatch(setIsSecondCode(false));
    dispatch(setIsRepeatClicked(false));
    dispatch(resetSelectedOption());
    dispatch(setIsOrderDone(false));
    resetTimer("end_date");
    navigate("/");
  }

  function onChangeClick() {
    setCounter(initialCounter);
  }

  function onRepeatCode() {
    const params = {
      auth_data: {
        auth: tgHash.checkDataString,
        hash: tgHash.hash,
      },
      order_id: orderId,
    };
    dispatch(getSecondCode(params));
    dispatch(setIsRepeatClicked(true));
  }

  function onDoneClik() {
    dispatch(resetOrderInfo());
    dispatch(setIsFirstCode(false));
    dispatch(setIsSecondCode(false));
    dispatch(setIsRepeatClicked(false));
    dispatch(resetSelectedOption());
    dispatch(setIsOrderDone(false));
    resetTimer("end_date");
    navigate("/");
  }

  return (
    <PageWrapper>
      <Container className="pd-b-25">
        <List
          title="YOUR ORDER"
          items={generateOrderOptions(selectedOptions)}
        />
      </Container>
      <Container className="pd-b-25">
        <Input
          label="YOUR NUMBER"
          name="phone"
          value={orderInfo?.phone ? orderInfo?.phone : inputState.phone}
          placeholder="+1 403 656 66 44"
          onChange={handleInputChange}
          onInvalid={handleInvalidMessage}
          error={invalidMessages}
          iconVariant="phone"
          wrapperClass="sm-border-none sm-bg-grey"
          hasCounter={hasCounter}
          counter={counter}
          onCounterEnd={onCounterEnd}
          copiable={true}
        />
      </Container>
      <Container
        className={`pd-b-10 ${isRepeatClicked ? "sms-code__wrapper" : ""}`}
      >
        <Input
          label="YOUR SMS CODE"
          name="sms"
          value={orderInfo?.first_code}
          onChange={handleInputChange}
          onInvalid={handleInvalidMessage}
          error={invalidMessages}
          placeholder={orderInfoLoading ? "" : "Wait"}
          wrapperClass="sm-border-none sm-bg-grey"
          isLoading={!orderInfo?.first_code}
          hasLoader={true}
          copiable={true}
          readOnly={true}
        />
        <IsVisible isVisible={isRepeatClicked}>
          <Input
            name="secondCode"
            value={orderInfo?.second_code}
            onChange={handleInputChange}
            onInvalid={handleInvalidMessage}
            error={invalidMessages}
            placeholder={!orderInfo?.second_code ? "Wait" : ""}
            wrapperClass="sm-border-none sm-bg-grey"
            isLoading={!orderInfo?.second_code}
            hasLoader={true}
            copiable={true}
            readOnly={true}
          />
        </IsVisible>
      </Container>
      <Container className="pd-b-25">
        <div className="sm-code-text">
          If the SMS code has not arrived within 3 minutes, change the number
        </div>
      </Container>
      <Container variant="row" space="center" className="m-l-r">
        <IsVisible isVisible={!isFirstCodeSet}>
          <Button text="CANCEL" variant="dark" onClick={onCancellClick} />
          <Button
            text="CHANGE NUMBER"
            variant="light"
            onClick={onChangeClick}
          />
        </IsVisible>
        <IsVisible isVisible={isFirstCodeSet}>
          <IsVisible isVisible={!isSecondCodeSet}>
            <Button
              text="REPEAT"
              variant="dark"
              onClick={onRepeatCode}
              className="w-75"
            />
          </IsVisible>
          <Button
            text="DONE"
            variant="light"
            onClick={onDoneClik}
            className="w-75"
          />
        </IsVisible>
      </Container>
    </PageWrapper>
  );
};

export default OrderPage;
