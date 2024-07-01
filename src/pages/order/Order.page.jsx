import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import Input from "components/input/Input.component";
import Button from "components/button/Button.component";
import { Container } from "components/container/Container.component";
import List from "components/list/List.component";
import IsVisible from "components/is-visible/IsVisible.component";
import Loader from "components/loader/Loader.component";
// CONTEXT
import { CounterValueContext } from "context/CounterValue.context";
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
  makeOrderAsync,
  abortOrder,
  resetFirstCode,
} from "store/order/order.actions";
import {
  resetSelectedOption,
  setIsOrderDone,
  setIsTimerEnd,
} from "store/common/common.actions";
// EFFECTS
import useInput from "effects/useInput.effect";
// UTILS
import { initialCounter, API_URL } from "utils/constants";
import { resetTimerToZero } from "utils/helper-functions";

const OrderPage = () => {
  const [counter] = useState(initialCounter);
  const { inputState, handleInput, handleInvalidMessage, invalidMessages } =
    useInput({ phone: "" });
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedOptions, tgHash, isTimerEnd } = useSelector(commonSelector);
  const {
    orderId,
    orderInfoLoading,
    orderInfo,
    isFirstCodeSet,
    isSecondCodeSet,
    isRepeatClicked,
    isOrderAborted,
  } = useSelector(orderSelector);

  const { setDateCounterValue } = useContext(CounterValueContext);

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetOrderInfo());
  //     dispatch(setIsFirstCode(false));
  //     dispatch(setIsSecondCode(false));
  //     dispatch(setIsRepeatClicked(false));
  //     dispatch(resetSelectedOption());
  //     dispatch(setIsOrderDone(false));
  //     dispatch(setIsTimerEnd(false));
  //     resetTimerToZero("end_date");
  //     resetCounter(initialCounter, "end_date");
  //     dispatch(abortOrder(false));
  //   };
  // }, []);

  function handleInputChange(event) {
    handleInput(event);
  }

  function onCounterEnd() {
    dispatch(setIsTimerEnd(true));
    dispatch(abortOrder(true));
    dispatch(resetFirstCode());
    dispatch(resetOrderInfo());
    dispatch(setIsFirstCode(false));
    dispatch(setIsRepeatClicked(false));
    dispatch(resetSelectedOption());
    resetCounter(counter, "end_date");
    navigate("/main");
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
    resetTimerToZero("end_date");
    resetCounter(counter, "end_date");
    dispatch(abortOrder(false));
    navigate("/main");
  }

  function onChangeClick() {
    const orderParams = {
      auth_data: {
        auth: tgHash.checkDataString,
        hash: tgHash.hash,
      },
      country_id: selectedOptions.country.id,
      service_id: selectedOptions.service.id,
    };
    const cancelParams = {
      auth_data: {
        auth: tgHash.checkDataString,
        hash: tgHash.hash,
      },
      id: orderId,
    };
    dispatch(cancelOrder(cancelParams));
    dispatch(makeOrderAsync({ params: orderParams }));
    dispatch(setIsTimerEnd(false));
    dispatch(abortOrder(false));
    resetCounter(counter, "end_date");
  }

  const resetCounter = (counter, name) => {
    const newDate = Date.now();
    const newDelay = counter;
    localStorage.setItem(name, JSON.stringify(newDate + newDelay));
    setDateCounterValue({ date: newDate, delay: newDelay });
  };

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
    resetTimerToZero("end_date");
    dispatch(setIsTimerEnd(false));
    dispatch(abortOrder(false));
    navigate("/main");
  }

  const countryInfo = {
    id: "1",
    title: orderInfo?.country?.name,
    src: `${API_URL}${orderInfo?.country?.image_url}`,
  };
  const serviceInfo = {
    id: "2",
    title: orderInfo?.service?.name,
    src: `${API_URL}${orderInfo?.service?.image_url}`,
  };

  return (
    <PageWrapper>
      <Loader isLoading={orderInfoLoading}>
        <Container className="pd-b-25">
          <List title="YOUR ORDER" items={[serviceInfo, countryInfo]} />
        </Container>
      </Loader>
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
          hasCounter={true}
          counter={counter}
          onCounterEnd={onCounterEnd}
          copiable={true}
          readOnly={true}
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
          placeholder={
            orderInfoLoading
              ? ""
              : isOrderAborted
                ? "Sorry, no SMS received"
                : "Wait"
          }
          wrapperClass="sm-border-none sm-bg-grey"
          isLoading={isOrderAborted ? false : !orderInfo?.first_code}
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
        <IsVisible isVisible={isTimerEnd}>
          <Button
            text="CHANGE NUMBER"
            variant="light"
            onClick={onChangeClick}
          />
        </IsVisible>
        <IsVisible isVisible={!isTimerEnd}>
          <IsVisible isVisible={!isFirstCodeSet}>
            <Button
              text="CANCEL"
              variant="dark"
              onClick={onCancellClick}
              disabled={orderInfoLoading}
            />
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
                disabled={orderInfoLoading || !orderInfo?.first_code}
              />
            </IsVisible>
            <Button
              text="DONE"
              variant="light"
              onClick={onDoneClik}
              className="w-75"
              disabled={orderInfoLoading || !orderInfo?.first_code}
            />
          </IsVisible>
        </IsVisible>
      </Container>
    </PageWrapper>
  );
};

export default OrderPage;
