// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import { Container } from "components/container/Container.component";
import SettingsMenu from "./components/settings-menu/SettingsMenu.component";
// UTILS
import { settingsMenuItems } from "utils/constants";

const SettingsPage = () => {
  return (
    <PageWrapper headerType="settings">
      <Container>
        <SettingsMenu items={settingsMenuItems} title="account settings" />
      </Container>
    </PageWrapper>
  );
};

export default SettingsPage;
