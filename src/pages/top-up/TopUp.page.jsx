import { useState } from "react";

// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import { Container } from "components/container/Container.component";
import Button from "components/button/Button.component";
import MoneyInput from "components/money-input/MoneyInput.component";

const TopUpPage = () => {
  const [amount, setAmount] = useState(0);

  function handleChange(e) {
    setAmount(e.value);
  }

  console.log(amount);

  return (
    <PageWrapper headerType="settings">
      <Container variant="col">
        <label className="label-text">TOP UP BALANCE</label>
        <Container space="center" className="pd-b-25">
          <MoneyInput
            value={amount}
            name="amount"
            onChange={handleChange}
            placeholder="0"
          />
        </Container>
        <Container space="center">
          <Button text={`PAY ${amount} USDT`} hasIcon={true} />
        </Container>
      </Container>
    </PageWrapper>
  );
};

export default TopUpPage;
