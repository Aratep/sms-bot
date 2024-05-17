import { useState } from "react";

// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import { Container } from "components/container/Container.component";
import Button from "components/button/Button.component";

const TopUpPage = () => {
  const [amount, setAmount] = useState(0);
  return (
    <PageWrapper className="" headerType="settings">
      <Container>
        <label>TOP UP BALANCE</label>
      </Container>
      <Container>
        <Button text={`PAY ${amount} USDT`} hasIcon={true} />
      </Container>
    </PageWrapper>
  );
};

export default TopUpPage;
