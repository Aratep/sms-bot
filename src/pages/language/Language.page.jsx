// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import { Container } from "components/container/Container.component";
import List from "components/list/List.component";
// UTILS
import { languages } from "utils/constants";

const LanguagePage = () => {
  return (
    <PageWrapper headerType="settings">
      <Container>
        <List items={languages} />
      </Container>
    </PageWrapper>
  );
};

export default LanguagePage;
