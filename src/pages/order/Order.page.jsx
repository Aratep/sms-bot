import { useState } from "react";
import { useNavigate } from "react-router-dom";

// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import Input from "components/input/Input.component";
import Button from "components/button/Button.component";
import { Container } from "components/container/Container.component";
import OrderItem from "./components/order-item/OrderItem.component";
// EFFECTS
import useInput from "effects/useInput.effect";
// UTILS
import { initialCounter } from "utils/constants";

const OrderPage = () => {
  const [counter, setCounter] = useState(9000);
  const [isLoading, setIsLoading] = useState(true);
  const { inputState, handleInput, handleInvalidMessage, invalidMessages } =
    useInput();
  let navigate = useNavigate();

  function handleInputChange(event) {
    handleInput(event);
  }

  function onCounterEnd(event) {
    console.log(event);
    setIsLoading(false);
  }

  function onCancellClick() {
    navigate("/");
  }

  function onChangeClick() {
    console.log("CLICK");
    setCounter(initialCounter);
  }

  // console.log("ISLOADINGGGGGGG", isLoading);

  return (
    <PageWrapper>
      <Container>
        <OrderItem />
      </Container>
      <Container>
        <Input
          label="YOUR NUMBER"
          name="phone"
          value={inputState.phone || "+1 403 656 66 44"}
          onChange={handleInputChange}
          onInvalid={handleInvalidMessage}
          error={invalidMessages}
          iconVariant="phone"
          wrapperClass="sm-border-none sm-bg-grey"
          counter={counter}
          onCounterEnd={onCounterEnd}
        />
      </Container>
      <Container>
        <Input
          label="YOUR SMS CODE"
          name="sms"
          value={inputState.sms}
          onChange={handleInputChange}
          onInvalid={handleInvalidMessage}
          error={invalidMessages}
          placeholder={isLoading ? "Wait" : "Sorry, no SMS received"}
          disabled={isLoading}
          wrapperClass="sm-border-none sm-bg-grey"
          isLoading={isLoading}
          hasLoader={true}
        />
      </Container>
      <Container>
        <div className="sm-code-text">
          If the SMS code has not arrived within 3 minutes, change the number
        </div>
      </Container>
      <Container variant="row" space="around">
        <Button text="CANCEL" variant="dark" onClick={onCancellClick} />
        <Button text="CHANGE NUMBER" variant="light" onClick={onChangeClick} />
      </Container>
    </PageWrapper>
  );
};

export default OrderPage;
