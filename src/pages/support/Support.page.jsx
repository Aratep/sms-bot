// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import { Container } from "components/container/Container.component";
import Button from "components/button/Button.component";

const SupportPage = () => {
  return (
    <PageWrapper headerType="settings">
      <Container variant="col">
        <label>SUPPORT</label>
        <div>
          If you have technical problems with the bot or other issues, you need
          to write to <span>@popoze</span>
        </div>
      </Container>
      <Container space="center">
        <Button text="SUPPORT" />
      </Container>
    </PageWrapper>
  );
};

export default SupportPage;
