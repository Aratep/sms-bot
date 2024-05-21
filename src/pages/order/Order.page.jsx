import { useState } from "react";
import { useNavigate } from "react-router-dom";

// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import Input from "components/input/Input.component";
import Button from "components/button/Button.component";
import { Container } from "components/container/Container.component";
import List from "components/list/List.component";
// EFFECTS
import useInput from "effects/useInput.effect";
// UTILS
import { initialCounter, orders } from "utils/constants";

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
    setIsLoading(false);
  }

  function onCancellClick() {
    navigate("/");
  }

  function onChangeClick() {
    setCounter(initialCounter);
  }

  return (
    <PageWrapper>
      <Container className="pd-b-25">
        <List title="YOUR ORDER" items={orders} />
      </Container>
      <Container className="pd-b-25">
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
      <Container className="pd-b-10">
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
      <Container className="pd-b-25">
        <div className="sm-code-text">
          If the SMS code has not arrived within 3 minutes, change the number
        </div>
      </Container>
      <Container variant="row" space="center" className="m-l-r">
        <Button text="CANCEL" variant="dark" onClick={onCancellClick} />
        <Button text="CHANGE NUMBER" variant="light" onClick={onChangeClick} />
      </Container>
    </PageWrapper>
  );
};

export default OrderPage;
