import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import { Container } from "components/container/Container.component";
import List from "components/list/List.component";
import Loader from "components/loader/Loader.component";
// SLICES
import { userSelector } from "store/user/user.slice";
import { commonSelector } from "store/common/common.slice";
// ACTIONS
import { getUserOrders } from "store/user/user.actions";
// UTILS
import { generateOrders } from "utils/helper-functions";

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const { userOrders, userOrdersLoading } = useSelector(userSelector);
  const { tgHash } = useSelector(commonSelector);
  const orders = generateOrders(userOrders);

  useEffect(() => {
    const params = {
      auth_data: {
        auth: tgHash.checkDataString,
        hash: tgHash.hash,
      },
      limit: 50,
      offset: 0,
    };
    dispatch(getUserOrders(params));
  }, []);

  return (
    <PageWrapper headerType="settings">
      <Container>
        <Loader isLoading={userOrdersLoading}>
          <List
            title="my orders"
            items={orders}
            isShowAllBtn={true}
            isItemClickable={true}
          />
        </Loader>
      </Container>
    </PageWrapper>
  );
};

export default MyOrdersPage;
