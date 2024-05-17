import { useState } from "react";

// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import { Container } from "components/container/Container.component";
import Button from "components/button/Button.component";

const TopUpPage = () => {
  const [amount, setAmount] = useState(0);
  return (
    <PageWrapper headerType="settings">
      <Container variant="col">
        <label className="label-text">TOP UP BALANCE</label>
        <Button text={`PAY ${amount} USDT`} hasIcon={true} />
      </Container>
    </PageWrapper>
  );
};

export default TopUpPage;
