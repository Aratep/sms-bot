// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import { Container } from "components/container/Container.component";
// ICONS
import DangerTriangleIcon from "components/icons/DangerTriangleIcon.component";
import Button from "components/button/Button.component";

const WelcomePage = () => {
  return (
    <PageWrapper hasHeader={false} className="welcome-page">
      <Container variant="col" className="welcome-page__container">
        <div />
        <div className="welcome-page__container-wrapper">
          <DangerTriangleIcon />
          <div className="welcome-page__container-text">
            You must be subscribed <br />
            on <span>@msketch_sms</span> channel
          </div>
        </div>
        <Button
          text="SUBSCRIBE"
          link="https://t.me/msketch_smsbot"
          className="p-lr30"
        />
      </Container>
    </PageWrapper>
  );
};

export default WelcomePage;
