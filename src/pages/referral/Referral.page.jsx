import { CopyToClipboard } from "react-copy-to-clipboard";
// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import { Container } from "components/container/Container.component";
import Button from "components/button/Button.component";
// UTILS
import { notify } from "utils/helper-functions";

const ReferralPage = () => {
  const tgLing = "t.me/msketch_smsbot?referal=343";

  const onCopy = () => {
    notify("Copied!", "success", {
      autoClose: 5000,
      position: "bottom-center",
    });
  };

  return (
    <PageWrapper headerType="settings">
      <Container variant="col">
        <label className="label-text">referral program</label>
        <Container variant="col" className="pd-b-20">
          <div>
            Invite people via the link and earn money for each participant!
          </div>
        </Container>
        <Container variant="col" className="pd-b-25">
          <CopyToClipboard text={tgLing} onCopy={onCopy}>
            <span className="color-grey pd-l-19">{tgLing}</span>
          </CopyToClipboard>
        </Container>
        <Container space="center">
          <CopyToClipboard text={tgLing} onCopy={onCopy}>
            <Button text="COPY LINK" />
          </CopyToClipboard>
        </Container>
      </Container>
    </PageWrapper>
  );
};

export default ReferralPage;
