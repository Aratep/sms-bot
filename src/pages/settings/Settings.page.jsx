// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import SettingsMenu from "./components/settings-menu/SettingsMenu.component";
// UTILS
import { settingsMenuItems } from "utils/constants";

const SettingsPage = () => {
  return (
    <PageWrapper className="" headerType="settings">
      <SettingsMenu items={settingsMenuItems} title="account settings" />
    </PageWrapper>
  );
};

export default SettingsPage;
