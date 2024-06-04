import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import { Container } from "components/container/Container.component";
import SettingsMenu from "./components/settings-menu/SettingsMenu.component";
// SLICES
import { commonSelector } from "store/common/common.slice";
// ACTIONS
import { getUser } from "store/user/user.actions";
// UTILS
import { settingsMenuItems } from "utils/constants";

const SettingsPage = () => {
  const dispatch = useDispatch();

  const { tgHash } = useSelector(commonSelector);

  useEffect(() => {
    const params = {
      auth_data: {
        auth: tgHash.checkDataString,
        hash: tgHash.hash,
      },
    };
    dispatch(getUser(params));
  }, []);

  return (
    <PageWrapper headerType="settings">
      <Container>
        <SettingsMenu items={settingsMenuItems} title="account settings" />
      </Container>
    </PageWrapper>
  );
};

export default SettingsPage;
