// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import { Container } from "components/container/Container.component";
import List from "components/list/List.component";
// UTILS
import { myOrdersItems } from "utils/constants";

const MyOrdersPage = () => {
  return (
    <PageWrapper className="" headerType="settings">
      <Container>
        <List
          title="my orders"
          items={myOrdersItems}
          isShowAllBtn={true}
          isItemClickable={true}
        />
      </Container>
    </PageWrapper>
  );
};

export default MyOrdersPage;
