import { useState, useEffect } from "react";
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
import { getOrderInfo, cancelOrder } from "store/order/order.actions";
// EFFECTS
import useInput from "effects/useInput.effect";
// UTILS
import { initialCounter } from "utils/constants";
import { generateOrderOptions } from "utils/helper-functions";

const OrderPage = () => {
  const [counter, setCounter] = useState(9000);
  const [isLoading, setIsLoading] = useState(true);
  const { inputState, handleInput, handleInvalidMessage, invalidMessages } =
    useInput({ phone: "+1 403 656 66 44" });
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedOptions, tgHash } = useSelector(commonSelector);
  const { orderId, orderInfoLoading, orderInfo } = useSelector(orderSelector);

  const params = {
    auth_data: {
      auth: tgHash.checkDataString,
      hash: tgHash.hash,
    },
    id: orderId,
  };

  useEffect(() => {
    const fetchOrderInfo = () => {
      dispatch(getOrderInfo(params));
    };

    fetchOrderInfo(); // Initial fetch
    // const intervalId = setInterval(fetchOrderInfo, 2000); // Fetch every 2 seconds

    // return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  function handleInputChange(event) {
    handleInput(event);
  }

  function onCounterEnd() {
    setIsLoading(false);
  }

  function onCancellClick() {
    dispatch(cancelOrder(params));
    navigate("/");
  }

  function onChangeClick() {
    setCounter(initialCounter);
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
          value={inputState.phone}
          onChange={handleInputChange}
          onInvalid={handleInvalidMessage}
          error={invalidMessages}
          iconVariant="phone"
          wrapperClass="sm-border-none sm-bg-grey"
          counter={counter}
          onCounterEnd={onCounterEnd}
          copiable={true}
        />
      </Container>
      <Container className="pd-b-10">
        <Input
          label="YOUR SMS CODE"
          name="sms"
          value={orderInfoLoading ? inputState.sms : orderInfo?.first_code}
          onChange={handleInputChange}
          onInvalid={handleInvalidMessage}
          error={invalidMessages}
          placeholder={orderInfoLoading ? "Wait" : "Sorry, no SMS received"}
          disabled={orderInfoLoading}
          wrapperClass="sm-border-none sm-bg-grey"
          isLoading={orderInfoLoading}
          hasLoader={true}
          copiable={true}
        />
      </Container>
      <Container className="pd-b-25">
        <div className="sm-code-text">
          If the SMS code has not arrived within 3 minutes, change the number
        </div>
      </Container>
      <Container variant="row" space="center" className="m-l-r">
        <Button text="CANCEL" variant="dark" onClick={onCancellClick} />
        <IsVisible isVisible={orderInfo?.first_code === ""}>
          <Button
            text="CHANGE NUMBER"
            variant="light"
            onClick={onChangeClick}
          />
        </IsVisible>
        <IsVisible isVisible={orderInfo?.first_code !== ""}>
          <Button text="DONE" variant="light" />
        </IsVisible>
      </Container>
    </PageWrapper>
  );
};

export default OrderPage;
