import { CopyToClipboard } from "react-copy-to-clipboard";
// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import { Container } from "components/container/Container.component";
import Button from "components/button/Button.component";

const ReferralPage = () => {
  const tgLing = "t.me/msketch_smsbot?referal=343";

  return (
    <PageWrapper className="" headerType="settings">
      <Container variant="col">
        <label>referral program</label>
        <div>
          Invite people via the link and earn money for each participant!
        </div>
        <CopyToClipboard text={tgLing}>
          <span>{tgLing}</span>
        </CopyToClipboard>
      </Container>
      <Container space="center">
        <Button text="COPY LINK" />
      </Container>
    </PageWrapper>
  );
};

export default ReferralPage;
