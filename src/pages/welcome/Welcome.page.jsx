import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import Loader from "components/loader/Loader.component";
import { Container } from "components/container/Container.component";
// SLICES
import { userSelector } from "store/user/user.slice";
import { commonSelector } from "store/common/common.slice";
// ACTIONS
import { getUser } from "store/user/user.actions";
// ICONS
import DangerTriangleIcon from "components/icons/DangerTriangleIcon.component";
import Button from "components/button/Button.component";

const WelcomePage = () => {
  const dispatch = useDispatch();

  const { tgHash } = useSelector(commonSelector);
  const { loading: userDataLoading } = useSelector(userSelector);

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
    <PageWrapper hasHeader={false} className="welcome-page">
      <Loader isLoading={userDataLoading}>
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
            link="https://t.me/msketch_sms"
            className="p-lr30"
          />
        </Container>
      </Loader>
    </PageWrapper>
  );
};

export default WelcomePage;
