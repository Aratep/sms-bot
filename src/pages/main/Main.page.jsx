import { useState, useEffect } from "react";
// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import { ContainerRow } from "components/container/Container.component";
import Select from "components/select/Select.component";
import Button from "components/button/Button.component";
// EFFECTS
// UTILS
import { countriesList } from "utils/constants";
import IsVisible from "../../components/is-visible/IsVisible.component";

const MainPage = () => {
  const [formData, setFormData] = useState({ service: "", country: "" });
  const [isFormReady, setIsFormReady] = useState(false);

  useEffect(() => {
    if (formData.service !== "" && formData.country !== "") {
      setIsFormReady(true);
    } else {
      setIsFormReady(false);
    }
  }, [formData]);

  const handleInputChange = (event) => {
    const { name, value } = event;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  console.log(formData, isFormReady);

  return (
    <PageWrapper className="">
      <ContainerRow>
        <Select
          label="Select a service:"
          placeholder="Find a service"
          name="service"
          inputVariant="search"
          handleChange={handleInputChange}
          list={countriesList}
        />
      </ContainerRow>
      <ContainerRow>
        <Select
          label="Select a country:"
          placeholder="Find a country"
          name="country"
          inputVariant="search"
          handleChange={handleInputChange}
          list={countriesList}
        />
      </ContainerRow>
      <IsVisible isVisible={isFormReady}>
        <ContainerRow>
          <Button text="BUY 1,5 USDT" />
        </ContainerRow>
      </IsVisible>
    </PageWrapper>
  );
};

export default MainPage;
